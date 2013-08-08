var Parser = (function () {
	function debugLog(value) {
		(window.debugLog || console.log)(value);
	}
	var uniqueIdCounter = 0;
	function uniqueId() {
		return uniqueIdCounter++;
	}

	function Parser(name, immediateConstraint) {
		if (!(this instanceof Parser)) {
			return new Parser(name, immediateConstraint);
		}
		if (immediateConstraint) {
			return new ImmediateParser(name, immediateConstraint);
		}
		this.id = uniqueId();
		this.name = name;
		this.extensionOptions = {};
		
		this.options = [];
	}
	Parser.sequence = function () {
		var sequence = [];
		while (sequence.length < arguments.length) {
			sequence[sequence.length] = arguments[sequence.length];
		}
		var parser = (new Parser('sequence'));
		return parser.option.apply(parser, sequence).replace();
	};
	Parser.repeat = function (sequence) {
		var parser = new Parser('repeat');
		parser.option('').replace(function () {
			return [];
		});
		parser.option.apply(parser, sequence.concat([parser])).replace(function () {
			if (!this.success) {
				return this;
			}
			var result = this.sequence.slice(0, sequence.length);
			result = result.concat(this.sequence[sequence.length]);
			return result;
		});
		return parser;
	};
	Parser.prototype = {
		parse: function (parseInput, offset) {
			if (typeof parseInput == 'string') {
				parseInput = new ParseInput(parseInput);
				var result = {
					result: this.parse(parseInput, offset || 0).replace(),
					failure: null
				};
				if (!result.result.success || result.result.length < parseInput.length) {
					result.failure = parseInput.furthestFailure;
				}
				return result;
			}
			offset = offset || 0;
			
			var longest = null;
			for (var i = 0; i < this.options.length; i++) {
				var attempt = parseInput.parseOption(this.options[i], offset);
				if (attempt.success) {
					if (!longest || !longest.success || attempt.length > longest.length) {
						longest = attempt;
					}
				} else if (!longest || (!longest.success && attempt.length > longest.length)) {
					longest = attempt;
				}
			}
			return longest || new ParseResult(this);
		},
		option: function () {
			if (arguments.length == 1 && Array.isArray(arguments[0])) {
				var sequence = arguments[0];
			} else {
				var sequence = [];
				while (sequence.length < arguments.length) {
					sequence[sequence.length] = arguments[sequence.length];
				}
			}
			var optionIndex = this.options.length;
			var newOption = new ParserOption(this, null, optionIndex, sequence);
			this.options.push(newOption);
			this.addStartingOption(newOption);
			return this;
		},
		butNot: function () {
			var lastOption = this.options[this.options.length - 1];
			var sequence = [];
			while (sequence.length < arguments.length) {
				sequence[sequence.length] = arguments[sequence.length];
			}
			var parser = new Parser('Banned from ' + this.name + " (" + lastOption.name + ")");
			parser.option(sequence);
			lastOption.bannedParsers.push(parser);
			return this;
		},
		named: function (name) {
			var lastOption = this.options[this.options.length - 1];
			lastOption.name = name;
			return this;
		},
		optional: function () {
			var parser = new Parser(this.name + " (optional)");
			parser.option('').replace(function () {return null});
			parser.option(this).replace();
			this.optional = function () {
				return parser;
			};
			return parser;
		},
		repeat: function () {
			if (arguments.length == 0) {
				return Parser.repeat([this]);
			}
			var repeating = [];
			while (repeating.length < arguments.length) {
				repeating[repeating.length] = arguments[repeating.length];
			}
			repeating.push(this);

			var repeatingSequence = new Parser('repeating');
			repeatingSequence.option('').replace(function () {
				return []
			});
			repeatingSequence.option.apply(repeatingSequence, repeating.concat([repeatingSequence])).replace(function () {
				if (!this.success) {
					return this;
				}
				return this.sequence.slice(0, repeating.length).concat(this.sequence[repeating.length]);
			});
			
			var parser = new Parser('repeat');
			parser.option(this, repeatingSequence).replace(function (initial, repeat) {
				if (!this.success) {
					return this;
				}
				return [initial].concat(repeat);
			});
			return parser;
		},
		replaceSuccess: function (replaceFunction) {
			for (var i = 0; i < this.options.length; i++) {
				(function (option) {
					var oldReplaceFunction = option.replaceResult;
					option.replaceResult = function () {
						if (!this.success) {
							return oldReplaceFunction.apply(this, arguments);
						}
						return replaceFunction.call(this, oldReplaceFunction.apply(this, arguments));
					};
				})(this.options[i]);
			}
			return this;
		},
		replaceAll: function (replaceFunction) {
			for (var i = 0; i < this.options.length; i++) {
				this.replace(replaceFunction, i);
			}
			return this;
		},
		replace: function (replaceFunction, optionIndex) {
			if (optionIndex == undefined) {
				optionIndex = this.options.length - 1;
			}
			var lastOption = this.options[optionIndex];
			if (typeof replaceFunction == 'function') {
				lastOption.replaceResult = replaceFunction;
			} else if (Array.isArray(replaceFunction)) {
				lastOption.replaceResult = function () {
					if (this.sequence.length != lastOption.sequence.length) {
						return this;
					}
					var result = [];
					while (result.length < replaceFunction.length) {
						result[result.length] = this.sequence[replaceFunction[result.length]];
					}
					return result;
				};
			} else if (typeof replaceFunction == 'number') {
				lastOption.replaceResult = function () {
					return (this.sequence.length == lastOption.sequence.length) ? this.sequence[replaceFunction] : this;
				};
			} else if (replaceFunction) {
				if (lastOption.sequence.length == 1) {
					lastOption.replaceResult = function (inner) {
						return inner;
					};
				} else {
					lastOption.replaceResult = function () {
						return this.sequence;
					};
				}
			} else {
				if (lastOption.sequence.length == 1) {
					lastOption.replaceResult = function (inner) {
						return (inner != null) ? inner : this;
					};
				} else {
					lastOption.replaceResult = function () {
						return (this.sequence.length == lastOption.sequence.length) ? this.sequence : this;
					};
				}
			}
			return this;
		},
		addExtension: function (extensionOption) {
			this.extensionOptions[extensionOption.id] = extensionOption;
			for (var i = 0; i < this.options.length; i++) {
				extensionOption.addStartingOption(this.options[i]);
			}
		},
		addStartingOption: function (option) {
			for (var key in this.extensionOptions) {
				this.extensionOptions[key].addStartingOption(option);
			}
		}
	};
	
	function ImmediateParser(name, actual) {
		Parser.call(this, name || 'literal');
		var immediateOption = new ImmediateParserOption(this, actual);
		this.options.push(immediateOption);
		this.addStartingOption(immediateOption);
		this.parse = function (parseInput, offset) {
			if (typeof parseInput == 'string') {
				var parseInput = new ParseInput(parseInput);
			}
			offset = offset || 0;
			
			var result = this.options[0].consume(parseInput, offset);
			parseInput.furthest(this.options[0], offset, result);
			return result;
		};
	}
	ImmediateParser.prototype = Object.create(Parser.prototype);
	
	function ParserOption(parser, name, index, sequence) {
		this.id = uniqueId();
		this.parser = parser;
		this.name = name || index.toString();
		this.immediate = false;

		this.immediateOptions = [];
		this.startingOptions = {};
		this.startingOptions[this.id] = this;

		this.sequence = [];
		for (var i = 0; i < sequence.length; i++) {
			var item = sequence[i];
			if (item instanceof Parser) {
				this.sequence[i] = item;
			} else {
				this.sequence[i] = new ImmediateParser(null, item).replace(false);
			}
		}
		
		var first = this.sequence[0];
		if (first) {
			first.addExtension(this);
		}
		
		this.bannedParsers = [];
	}
	ParserOption.prototype = {
		consume: function (parseInput, offset, startingSequence) {
			for (var i = 0; i < this.bannedParsers.length; i++) {
				var parser = this.bannedParsers[i];
				var result = parser.parse(parseInput, offset);
				if (result.success) {
					return new ParseResult(this);
				}
			}
			var result = new ParseResult(this);
			var itemResult;
			startingSequence = startingSequence || [];
			for (var i = 0; i < this.sequence.length; i++) {
				if (i < startingSequence.length) {
					itemResult = startingSequence[i];
				} else {
					var item = this.sequence[i];
					itemResult = item.parse(parseInput, offset);
				}
				result.add(itemResult);
				if (!itemResult.success) {
					return result;
				}
				offset += itemResult.length;
			}
			return result.done();
		},
		extend: function (parseInput, offset, firstResult, allowedExtensions) {
			allowedExtensions = allowedExtensions || this.parser.extensionOptions;
			var result = [];
			for (var key in this.parser.extensionOptions) {
				if (key in allowedExtensions) {
					var extensionOption = this.parser.extensionOptions[key];
					var consumed = extensionOption.consume(parseInput, offset, [firstResult]);
					if (consumed.success) {
						result.push(consumed);
					}
				}
			}
			return result;
		},
		replaceResult: function () {
			return this;
		},
		addStartingOption: function (option) {
			if (this.startingOptions[option.id]) {
				return;
			}
			this.startingOptions[option.id] = option;
			if (option.immediate) {
				this.immediateOptions.push(option);
			}
			this.parser.addStartingOption(option);
			for (var key in option.startingOptions) {
				this.addStartingOption(option.startingOptions[key]);
			}
		}
	};

	function ImmediateParserOption(parser, actual) {
		ParserOption.call(this, parser, actual.toString(), 0, []);

		this.immediate = true;
		this.sequence = ["placeholder"];
		if (typeof actual == "function") {
			this.consume = function (parseInput, offset) {
				var result = actual(parseInput, offset);
				if (result !== null) {
					return new ParseResult.literal(this, result);
				} else {
					return new ParseResult(this);
				}
			};
		} else if (typeof actual == "string") {
			this.consume = function (parseInput, offset) {
				if (parseInput.chars(offset, actual.length) == actual) {
					return ParseResult.literal(this, actual);
				}
				return new ParseResult(this);
			}
		} else if (actual instanceof RegExp) {
			this.consume = function (parseInput, offset) {
				var result;
				if (result = parseInput.match(offset, actual)) {
					return ParseResult.literal(this, result[0]);
				}
				return new ParseResult(this);
			}
		} else {
			throw new Error("Unknown entry type: " + actual);
		}
	}
	ImmediateParserOption.prototype = Object.create(ParserOption.prototype);
	
	function ParseResult(parseOption) {
		if (parseOption instanceof ParserOption) {
			this.option = function () {
				return parseOption;
			};
			this.parser = parseOption.parser.name;
			this.name = parseOption.parser.name + ": " + parseOption.name;
		} else {
			this.parser = function () {
				return parseOption;
			};
			this.option = function () {
				return null;
			};
			this.parser = parseOption.name;
			this.name = parseOption.name;
		}
		this.success = false;
		this.sequence = [];
		this.length = 0;
	}
	ParseResult.literal = function (parseOption, literal) {
		if (literal == null) {
			return new ParseResult(parseOption);
		}
		return new ParseResult(parseOption).add(literal).done();
	};
	ParseResult.prototype = {
		parser: function () {
			return this.option().parser;
		},
		replace: function () {
			var option = this.option();
			return option ? option.replaceResult.apply(this, this.sequence) : this;
		},
		add: function (item) {
			if (item) {
				this.length += item.length;
				if (item instanceof ParseResult) {
					item = item.replace();
				}
			}
			this.sequence.push(item);
			return this;
		},
		done: function () {
			this.success = true;
			return this;
		}
	};
	
	function ParseInput(code) {
		this.length = code.length;
		this.chars = function (offset, count) {
			return code.substring(offset, offset + count);
		};
		this.match = function (offset, regex) {
			return regex.exec(code.substring(offset));
		};
		this.furthestFailure = null;
		this.parseCache = {};
	}
	ParseInput.prototype = {
		furthest: function (parserOption, offset, result) {
			//console.log("Parsing " + parserOption.parser.name + " (" + parserOption.name + ") at " + offset);
			if (result.success) {
				return;
			}
			if (!this.furthestFailure || this.furthestFailure.position < offset) {
				//console.log("Parsing " + parserOption.parser.name + " (" + parserOption.name + ") at " + offset);
				this.furthestFailure = {
					position: offset,
					expected: [parserOption.parser.name + " (" + parserOption.name + ")"]
				}
			} else if (this.furthestFailure.position == offset) {
				this.furthestFailure.expected.push(parserOption.parser.name + " (" + parserOption.name + ")");
			}
			return null;
		},
		parseOption: function(parserOption, offset) {
			var results = [];
			var newResults = [];
			
			var allowedExtensions = parserOption.startingOptions;
			var immediateOptions = parserOption.immediate ? [parserOption] : parserOption.immediateOptions;
			for (var i = 0; i < immediateOptions.length; i++) {
				var option = immediateOptions[i];
				var consumed = option.consume(this, offset);
				if (consumed.success) {
					newResults.push(consumed);
				}
			}
			while (newResults.length) {
				results = results.concat(newResults);
				var baseOptions = newResults;
				newResults = [];
				for (var i = 0; i < baseOptions.length; i++) {
					var baseResult = baseOptions[i];
					newResults = newResults.concat(baseResult.option().extend(this, offset, baseResult, allowedExtensions));
				}
			}

			// Find longest one
			var longest = new ParseResult(parserOption);
			for (var i = 0; i < results.length; i++) {
				var result = results[i];
				if (result.option() == parserOption) {
					if (result.success) {
						if (!longest.success || longest.length < result.length) {
							longest = result;
						}
					} else if (!longest.success && longest.length < result.length) {
						longest = result;
					}
				}
			}
			this.furthest(parserOption, offset, longest);
			return longest;
		}
	};
	
	Parser.Result = ParseResult;
	Parser.extend = function (map) {
		for (var key in map) {
			Parser.prototype[key] = Parser.prototype[key] || map[key];
		}
	};
	return Parser;
})();