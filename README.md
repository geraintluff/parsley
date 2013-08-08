# parsley

Shift-reduce-style parsing engine, written in JavaScript, with configurable behaviour for replacement of results, and lookahead-capable "but not" rules.

Written because it's fun, so don't expect impressive performance or other real-world concerns. :)

## Short example

Here's a parser for an example grammar involving brackets, commas and letters, e.g.:

```
((a,b),c,d)
```

```javascript
	var expression = new Parser('Expression');

	var brackets = new Parser('Brackets');
	var items = new Parser('Bracket items');
	items.option(expression).replace([0]);   // replaces result with [expression]
	items.option(expression, ",", items).replace(function (first, comma, others) {
		return [first].concat(others);
	}); // custom replacement function, concatenating entries
	brackets.option("(", items, ")").replace(1);  // replace with the second argument

	expression.option(brackets).butNot(brackets.padded(), ",", brackets.padded()).replace();
	expression.option(/^[a-zA-Z]/).replace();
```

Note the penultimate line where it *disallows* having two bracket clauses next to each other.

## Replacement

`.replace()` declares replacement rules for the most recently-created option, and it can take custom functions, indices, arrays of indices, or blank (default replacement behaviour).

Without replacement, the result looks something like:

```json
{
	"parser": "Brackets",
	"name": "Brackets: 0",
	"success": true,
	"sequence": [
		"(",
		{...},
		")"
	],
	"length": 11
}
```

Custom replacement functions are called with the above structure as `this`, and the arguments taken from `this.sequence`.

## More stuff

There are some shorthand modifiers like `parser.optional()`, `parser.repeat()`, and construction functions like `Parser.sequence()`.  I'm sure I'll document them if this ever becomes a real project.

`generator.html` is a utility for code-generation.  I'm testing the library out by copy-and-pasting the grammar rules from the [ECMAScript spec](http://www.ecma-international.org/ecma-262/5.1/#sec-A), and it's just a utility to get thing going.

Hopefully in the future, it'll be able to read ABNF grammars.
