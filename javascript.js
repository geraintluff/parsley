(function (parsers) {
	var replaceFunction = function () {
		return (this.sequence.length == 1) ? this.sequence[0] : this
	};

	parsers["SourceCharacter"] = new Parser("SourceCharacter");
	parsers["SourceCharacteropt"] = parsers["SourceCharacter"].optional();
	parsers["InputElementDiv"] = new Parser("InputElementDiv");
	parsers["InputElementDivopt"] = parsers["InputElementDiv"].optional();
	parsers["InputElementRegExp"] = new Parser("InputElementRegExp");
	parsers["InputElementRegExpopt"] = parsers["InputElementRegExp"].optional();
	parsers["WhiteSpace"] = new Parser("WhiteSpace");
	parsers["WhiteSpaceopt"] = parsers["WhiteSpace"].optional();
	parsers["LineTerminator"] = new Parser("LineTerminator");
	parsers["LineTerminatoropt"] = parsers["LineTerminator"].optional();
	parsers["LineTerminatorSequence"] = new Parser("LineTerminatorSequence");
	parsers["LineTerminatorSequenceopt"] = parsers["LineTerminatorSequence"].optional();
	parsers["Comment"] = new Parser("Comment");
	parsers["Commentopt"] = parsers["Comment"].optional();
	parsers["MultiLineComment"] = new Parser("MultiLineComment");
	parsers["MultiLineCommentopt"] = parsers["MultiLineComment"].optional();
	parsers["MultiLineCommentChars"] = new Parser("MultiLineCommentChars");
	parsers["MultiLineCommentCharsopt"] = parsers["MultiLineCommentChars"].optional();
	parsers["PostAsteriskCommentChars"] = new Parser("PostAsteriskCommentChars");
	parsers["PostAsteriskCommentCharsopt"] = parsers["PostAsteriskCommentChars"].optional();
	parsers["MultiLineNotAsteriskChar"] = new Parser("MultiLineNotAsteriskChar");
	parsers["MultiLineNotAsteriskCharopt"] = parsers["MultiLineNotAsteriskChar"].optional();
	parsers["MultiLineNotForwardSlashOrAsteriskChar"] = new Parser("MultiLineNotForwardSlashOrAsteriskChar");
	parsers["MultiLineNotForwardSlashOrAsteriskCharopt"] = parsers["MultiLineNotForwardSlashOrAsteriskChar"].optional();
	parsers["SingleLineComment"] = new Parser("SingleLineComment");
	parsers["SingleLineCommentopt"] = parsers["SingleLineComment"].optional();
	parsers["SingleLineCommentChars"] = new Parser("SingleLineCommentChars");
	parsers["SingleLineCommentCharsopt"] = parsers["SingleLineCommentChars"].optional();
	parsers["SingleLineCommentChar"] = new Parser("SingleLineCommentChar");
	parsers["SingleLineCommentCharopt"] = parsers["SingleLineCommentChar"].optional();
	parsers["Token"] = new Parser("Token");
	parsers["Tokenopt"] = parsers["Token"].optional();
	parsers["Identifier"] = new Parser("Identifier");
	parsers["Identifieropt"] = parsers["Identifier"].optional();
	parsers["IdentifierName"] = new Parser("IdentifierName");
	parsers["IdentifierNameopt"] = parsers["IdentifierName"].optional();
	parsers["IdentifierStart"] = new Parser("IdentifierStart");
	parsers["IdentifierStartopt"] = parsers["IdentifierStart"].optional();
	parsers["IdentifierPart"] = new Parser("IdentifierPart");
	parsers["IdentifierPartopt"] = parsers["IdentifierPart"].optional();
	parsers["UnicodeLetter"] = new Parser("UnicodeLetter");
	parsers["UnicodeLetteropt"] = parsers["UnicodeLetter"].optional();
	parsers["UnicodeCombiningMark"] = new Parser("UnicodeCombiningMark");
	parsers["UnicodeCombiningMarkopt"] = parsers["UnicodeCombiningMark"].optional();
	parsers["UnicodeDigit"] = new Parser("UnicodeDigit");
	parsers["UnicodeDigitopt"] = parsers["UnicodeDigit"].optional();
	parsers["UnicodeConnectorPunctuation"] = new Parser("UnicodeConnectorPunctuation");
	parsers["UnicodeConnectorPunctuationopt"] = parsers["UnicodeConnectorPunctuation"].optional();
	parsers["ReservedWord"] = new Parser("ReservedWord");
	parsers["ReservedWordopt"] = parsers["ReservedWord"].optional();
	parsers["Keyword"] = new Parser("Keyword");
	parsers["Keywordopt"] = parsers["Keyword"].optional();
	parsers["FutureReservedWord"] = new Parser("FutureReservedWord");
	parsers["FutureReservedWordopt"] = parsers["FutureReservedWord"].optional();
	parsers["Punctuator"] = new Parser("Punctuator");
	parsers["Punctuatoropt"] = parsers["Punctuator"].optional();
	parsers["DivPunctuator"] = new Parser("DivPunctuator");
	parsers["DivPunctuatoropt"] = parsers["DivPunctuator"].optional();
	parsers["Literal"] = new Parser("Literal");
	parsers["Literalopt"] = parsers["Literal"].optional();
	parsers["NullLiteral"] = new Parser("NullLiteral");
	parsers["NullLiteralopt"] = parsers["NullLiteral"].optional();
	parsers["BooleanLiteral"] = new Parser("BooleanLiteral");
	parsers["BooleanLiteralopt"] = parsers["BooleanLiteral"].optional();
	parsers["NumericLiteral"] = new Parser("NumericLiteral");
	parsers["NumericLiteralopt"] = parsers["NumericLiteral"].optional();
	parsers["DecimalLiteral"] = new Parser("DecimalLiteral");
	parsers["DecimalLiteralopt"] = parsers["DecimalLiteral"].optional();
	parsers["DecimalIntegerLiteral"] = new Parser("DecimalIntegerLiteral");
	parsers["DecimalIntegerLiteralopt"] = parsers["DecimalIntegerLiteral"].optional();
	parsers["DecimalDigits"] = new Parser("DecimalDigits");
	parsers["DecimalDigitsopt"] = parsers["DecimalDigits"].optional();
	parsers["DecimalDigit"] = new Parser("DecimalDigit");
	parsers["DecimalDigitopt"] = parsers["DecimalDigit"].optional();
	parsers["NonZeroDigit"] = new Parser("NonZeroDigit");
	parsers["NonZeroDigitopt"] = parsers["NonZeroDigit"].optional();
	parsers["ExponentPart"] = new Parser("ExponentPart");
	parsers["ExponentPartopt"] = parsers["ExponentPart"].optional();
	parsers["ExponentIndicator"] = new Parser("ExponentIndicator");
	parsers["ExponentIndicatoropt"] = parsers["ExponentIndicator"].optional();
	parsers["SignedInteger"] = new Parser("SignedInteger");
	parsers["SignedIntegeropt"] = parsers["SignedInteger"].optional();
	parsers["HexIntegerLiteral"] = new Parser("HexIntegerLiteral");
	parsers["HexIntegerLiteralopt"] = parsers["HexIntegerLiteral"].optional();
	parsers["HexDigit"] = new Parser("HexDigit");
	parsers["HexDigitopt"] = parsers["HexDigit"].optional();
	parsers["StringLiteral"] = new Parser("StringLiteral");
	parsers["StringLiteralopt"] = parsers["StringLiteral"].optional();
	parsers["DoubleStringCharacters"] = new Parser("DoubleStringCharacters");
	parsers["DoubleStringCharactersopt"] = parsers["DoubleStringCharacters"].optional();
	parsers["SingleStringCharacters"] = new Parser("SingleStringCharacters");
	parsers["SingleStringCharactersopt"] = parsers["SingleStringCharacters"].optional();
	parsers["DoubleStringCharacter"] = new Parser("DoubleStringCharacter");
	parsers["DoubleStringCharacteropt"] = parsers["DoubleStringCharacter"].optional();
	parsers["SingleStringCharacter"] = new Parser("SingleStringCharacter");
	parsers["SingleStringCharacteropt"] = parsers["SingleStringCharacter"].optional();
	parsers["LineContinuation"] = new Parser("LineContinuation");
	parsers["LineContinuationopt"] = parsers["LineContinuation"].optional();
	parsers["EscapeSequence"] = new Parser("EscapeSequence");
	parsers["EscapeSequenceopt"] = parsers["EscapeSequence"].optional();
	parsers["CharacterEscapeSequence"] = new Parser("CharacterEscapeSequence");
	parsers["CharacterEscapeSequenceopt"] = parsers["CharacterEscapeSequence"].optional();
	parsers["SingleEscapeCharacter"] = new Parser("SingleEscapeCharacter");
	parsers["SingleEscapeCharacteropt"] = parsers["SingleEscapeCharacter"].optional();
	parsers["NonEscapeCharacter"] = new Parser("NonEscapeCharacter");
	parsers["NonEscapeCharacteropt"] = parsers["NonEscapeCharacter"].optional();
	parsers["EscapeCharacter"] = new Parser("EscapeCharacter");
	parsers["EscapeCharacteropt"] = parsers["EscapeCharacter"].optional();
	parsers["HexEscapeSequence"] = new Parser("HexEscapeSequence");
	parsers["HexEscapeSequenceopt"] = parsers["HexEscapeSequence"].optional();
	parsers["UnicodeEscapeSequence"] = new Parser("UnicodeEscapeSequence");
	parsers["UnicodeEscapeSequenceopt"] = parsers["UnicodeEscapeSequence"].optional();
	parsers["RegularExpressionLiteral"] = new Parser("RegularExpressionLiteral");
	parsers["RegularExpressionLiteralopt"] = parsers["RegularExpressionLiteral"].optional();
	parsers["RegularExpressionBody"] = new Parser("RegularExpressionBody");
	parsers["RegularExpressionBodyopt"] = parsers["RegularExpressionBody"].optional();
	parsers["RegularExpressionChars"] = new Parser("RegularExpressionChars");
	parsers["RegularExpressionCharsopt"] = parsers["RegularExpressionChars"].optional();
	parsers["RegularExpressionFirstChar"] = new Parser("RegularExpressionFirstChar");
	parsers["RegularExpressionFirstCharopt"] = parsers["RegularExpressionFirstChar"].optional();
	parsers["RegularExpressionChar"] = new Parser("RegularExpressionChar");
	parsers["RegularExpressionCharopt"] = parsers["RegularExpressionChar"].optional();
	parsers["RegularExpressionBackslashSequence"] = new Parser("RegularExpressionBackslashSequence");
	parsers["RegularExpressionBackslashSequenceopt"] = parsers["RegularExpressionBackslashSequence"].optional();
	parsers["RegularExpressionNonTerminator"] = new Parser("RegularExpressionNonTerminator");
	parsers["RegularExpressionNonTerminatoropt"] = parsers["RegularExpressionNonTerminator"].optional();
	parsers["RegularExpressionClass"] = new Parser("RegularExpressionClass");
	parsers["RegularExpressionClassopt"] = parsers["RegularExpressionClass"].optional();
	parsers["RegularExpressionClassChars"] = new Parser("RegularExpressionClassChars");
	parsers["RegularExpressionClassCharsopt"] = parsers["RegularExpressionClassChars"].optional();
	parsers["RegularExpressionClassChar"] = new Parser("RegularExpressionClassChar");
	parsers["RegularExpressionClassCharopt"] = parsers["RegularExpressionClassChar"].optional();
	parsers["RegularExpressionFlags"] = new Parser("RegularExpressionFlags");
	parsers["RegularExpressionFlagsopt"] = parsers["RegularExpressionFlags"].optional();

	parsers["SourceCharacter"].option(/^./);
	parsers["SourceCharacter"].replaceAll(replaceFunction);

	parsers["InputElementDiv"].option(parsers["WhiteSpace"]);
	parsers["InputElementDiv"].option(parsers["LineTerminator"]);
	parsers["InputElementDiv"].option(parsers["Comment"]);
	parsers["InputElementDiv"].option(parsers["Token"]);
	parsers["InputElementDiv"].option(parsers["DivPunctuator"]);
	parsers["InputElementDiv"].replaceAll(replaceFunction);

	parsers["InputElementRegExp"].option(parsers["WhiteSpace"]);
	parsers["InputElementRegExp"].option(parsers["LineTerminator"]);
	parsers["InputElementRegExp"].option(parsers["Comment"]);
	parsers["InputElementRegExp"].option(parsers["Token"]);
	parsers["InputElementRegExp"].option(parsers["RegularExpressionLiteral"]);
	parsers["InputElementRegExp"].replaceAll(replaceFunction);

	parsers["WhiteSpace"].option("\t");
	parsers["WhiteSpace"].option("\u000B");
	parsers["WhiteSpace"].option("\u000C");
	parsers["WhiteSpace"].option("\u0020");
	parsers["WhiteSpace"].option("\u00A0");
	parsers["WhiteSpace"].option("\uFEFF");
	//parsers["WhiteSpace"].option("<USP>"); // Any other Unicode “space separator”
	parsers["WhiteSpace"].replaceAll(replaceFunction);

	parsers["LineTerminator"].option("\n");
	parsers["LineTerminator"].option("\r");
	parsers["LineTerminator"].option("\u2028");
	parsers["LineTerminator"].option("\u2029");
	parsers["LineTerminator"].replaceAll(replaceFunction);

	parsers["LineTerminatorSequence"].option("\n");
	parsers["LineTerminatorSequence"].option("\r").butNot("\r\n");
	parsers["LineTerminatorSequence"].option("\u2028");
	parsers["LineTerminatorSequence"].option("\u2029");
	parsers["LineTerminatorSequence"].option("\r\n");
	parsers["LineTerminatorSequence"].replaceAll(replaceFunction);

	parsers["Comment"].option(parsers["MultiLineComment"]);
	parsers["Comment"].option(parsers["SingleLineComment"]);
	parsers["Comment"].replaceAll(replaceFunction);

	parsers["MultiLineComment"].option("/*", parsers["MultiLineCommentCharsopt"], "*/");
	parsers["MultiLineComment"].replaceAll(replaceFunction);

	parsers["MultiLineCommentChars"].option(parsers["MultiLineNotAsteriskChar"], parsers["MultiLineCommentCharsopt"]);
	parsers["MultiLineCommentChars"].option("*", parsers["PostAsteriskCommentCharsopt"]);
	parsers["MultiLineCommentChars"].replaceAll(replaceFunction);

	parsers["PostAsteriskCommentChars"].option(parsers["MultiLineNotForwardSlashOrAsteriskChar"], parsers["MultiLineCommentCharsopt"]);
	parsers["PostAsteriskCommentChars"].option("*", parsers["PostAsteriskCommentCharsopt"]);
	parsers["PostAsteriskCommentChars"].replaceAll(replaceFunction);

	parsers["MultiLineNotAsteriskChar"].option(parsers["SourceCharacter"]).butNot("*");
	parsers["MultiLineNotAsteriskChar"].replaceAll(replaceFunction);

	parsers["MultiLineNotForwardSlashOrAsteriskChar"].option(parsers["SourceCharacter"]).butNot("/").butNot("*");
	parsers["MultiLineNotForwardSlashOrAsteriskChar"].replaceAll(replaceFunction);

	parsers["SingleLineComment"].option("//", parsers["SingleLineCommentCharsopt"]);
	parsers["SingleLineComment"].replaceAll(replaceFunction);

	parsers["SingleLineCommentChars"].option(parsers["SingleLineCommentChar"], parsers["SingleLineCommentCharsopt"]);
	parsers["SingleLineCommentChars"].replaceAll(replaceFunction);

	parsers["SingleLineCommentChar"].option(parsers["SourceCharacter"]).butNot(parsers["LineTerminator"]);
	parsers["SingleLineCommentChar"].replaceAll(replaceFunction);

	parsers["Token"].option(parsers["IdentifierName"]);
	parsers["Token"].option(parsers["Punctuator"]);
	parsers["Token"].option(parsers["NumericLiteral"]);
	parsers["Token"].option(parsers["StringLiteral"]);
	parsers["Token"].replaceAll(replaceFunction);

	parsers["Identifier"].option(parsers["IdentifierName"]).butNot(parsers["ReservedWord"]);
	parsers["Identifier"].replaceAll(replaceFunction);

	parsers["IdentifierName"].option(parsers["IdentifierStart"]);
	parsers["IdentifierName"].option(parsers["IdentifierName"], parsers["IdentifierPart"]);
	parsers["IdentifierName"].replaceAll(replaceFunction);

	parsers["IdentifierStart"].option(parsers["UnicodeLetter"]);
	parsers["IdentifierStart"].option("$");
	parsers["IdentifierStart"].option("_");
	parsers["IdentifierStart"].option("\\", parsers["UnicodeEscapeSequence"]);
	parsers["IdentifierStart"].replaceAll(replaceFunction);

	parsers["IdentifierPart"].option(parsers["IdentifierStart"]);
	parsers["IdentifierPart"].option(parsers["UnicodeCombiningMark"]);
	parsers["IdentifierPart"].option(parsers["UnicodeDigit"]);
	parsers["IdentifierPart"].option(parsers["UnicodeConnectorPunctuation"]);
	parsers["IdentifierPart"].option("\u200C");
	parsers["IdentifierPart"].option("\u200D");
	parsers["IdentifierPart"].replaceAll(replaceFunction);

	parsers["UnicodeLetter"].option(/^[a-zA-Z]/); // TODO: at least find a decent approximation with a bunch of ranges in it!
	parsers["UnicodeLetter"].replaceAll(replaceFunction);

	//parsers["UnicodeCombiningMark"].option("any", "character", "in", "the", "Unicode", "categories", "Ã¢â‚¬Å“Non-spacing", "mark", "(Mn)Ã¢â‚¬Â", "or", "Ã¢â‚¬Å“Combining", "spacing", "mark", "(Mc)Ã¢â‚¬Â");
	parsers["UnicodeCombiningMark"].replaceAll(replaceFunction);

	parsers["UnicodeDigit"].option(/^[0-9]/); // TODO: find a better regex (proper Unicode category support is sketchy in JavaScript
	parsers["UnicodeDigit"].replaceAll(replaceFunction);

//	parsers["UnicodeConnectorPunctuation"].option("any", "character", "in", "the", "Unicode", "category", "Ã¢â‚¬Å“Connector", "punctuation", "(Pc)Ã¢â‚¬Â");
	parsers["UnicodeConnectorPunctuation"].replaceAll(replaceFunction);

	parsers["ReservedWord"].option(parsers["Keyword"]);
	parsers["ReservedWord"].option(parsers["FutureReservedWord"]);
	parsers["ReservedWord"].option(parsers["NullLiteral"]);
	parsers["ReservedWord"].option(parsers["BooleanLiteral"]);
	parsers["ReservedWord"].replaceAll(replaceFunction);

	parsers["Keyword"].option("break").option("do").option("instanceof").option("typeof");
	parsers["Keyword"].option("case").option("else").option("new").option("var");
	parsers["Keyword"].option("catch").option("finally").option("return").option("void");
	parsers["Keyword"].option("continue").option("for").option("switch").option("while");
	parsers["Keyword"].option("debugger").option("function").option("this").option("with");
	parsers["Keyword"].option("default").option("if").option("throw");
	parsers["Keyword"].option("delete").option("in").option("try");
	parsers["Keyword"].replaceAll(replaceFunction);

	parsers["FutureReservedWord"].option("class").option("enum").option("extends").option("super");
	parsers["FutureReservedWord"].option("const").option("export").option("import");
	// Strict mode
	parsers["FutureReservedWord"].option("implements").option("let").option("private").option("public");
	parsers["FutureReservedWord"].option("interface").option("package").option("protected").option("static");
	parsers["FutureReservedWord"].option("yield");
	parsers["FutureReservedWord"].replaceAll(replaceFunction);

	parsers["Punctuator"].option("{").option("}").option("(").option(")").option("[").option("]");
	parsers["Punctuator"].option(".").option(";").option(",").option("<").option(">").option("<=");
	parsers["Punctuator"].option(">=").option("==").option("!=").option("===").option("!==");
	parsers["Punctuator"].option("+").option("-").option("*").option("%").option("++").option("--");
	parsers["Punctuator"].option("<<").option(">>").option(">>>").option("&").option("|").option("^");
	parsers["Punctuator"].option("!").option("~").option("&&").option("||").option("?").option(":");
	parsers["Punctuator"].option("=").option("+=").option("-=").option("*=").option("%=").option("<<=");
	parsers["Punctuator"].option(">>=").option(">>>=").option("&=").option("|=").option("^=");
	parsers["Punctuator"].replaceAll(replaceFunction);

	parsers["DivPunctuator"].option("/").option("/=");
	parsers["DivPunctuator"].replaceAll(replaceFunction);

	parsers["Literal"].option(parsers["NullLiteral"]);
	parsers["Literal"].option(parsers["BooleanLiteral"]);
	parsers["Literal"].option(parsers["NumericLiteral"]);
	parsers["Literal"].option(parsers["StringLiteral"]);
	parsers["Literal"].option(parsers["RegularExpressionLiteral"]);
	parsers["Literal"].replaceAll(replaceFunction);

	parsers["NullLiteral"].option("null");
	parsers["NullLiteral"].replaceAll(replaceFunction);

	parsers["BooleanLiteral"].option("true");
	parsers["BooleanLiteral"].option("false");
	parsers["BooleanLiteral"].replaceAll(replaceFunction);

	parsers["NumericLiteral"].option(parsers["DecimalLiteral"]);
	parsers["NumericLiteral"].option(parsers["HexIntegerLiteral"]);
	parsers["NumericLiteral"].replaceAll(replaceFunction);

	parsers["DecimalLiteral"].option(parsers["DecimalIntegerLiteral"], ".", parsers["DecimalDigitsopt"], parsers["ExponentPartopt"]);
	parsers["DecimalLiteral"].option(".", parsers["DecimalDigits"], parsers["ExponentPartopt"]);
	parsers["DecimalLiteral"].option(parsers["DecimalIntegerLiteral"], parsers["ExponentPartopt"]);
	parsers["DecimalLiteral"].replaceAll(replaceFunction);

	parsers["DecimalIntegerLiteral"].option("0");
	parsers["DecimalIntegerLiteral"].option(parsers["NonZeroDigit"], parsers["DecimalDigitsopt"]);
	parsers["DecimalIntegerLiteral"].replaceAll(replaceFunction);

	parsers["DecimalDigits"].option(parsers["DecimalDigit"]);
	parsers["DecimalDigits"].option(parsers["DecimalDigits"], parsers["DecimalDigit"]);
	parsers["DecimalDigits"].replaceAll(replaceFunction);

	parsers["DecimalDigit"].option("0").option("1").option("2").option("3").option("4").option("5").option("6").option("7").option("8").option("9");
	parsers["DecimalDigit"].replaceAll(replaceFunction);

	parsers["NonZeroDigit"].option("1").option("2").option("3").option("4").option("5").option("6").option("7").option("8").option("9");
	parsers["NonZeroDigit"].replaceAll(replaceFunction);

	parsers["ExponentPart"].option(parsers["ExponentIndicator"], parsers["SignedInteger"]);
	parsers["ExponentPart"].replaceAll(replaceFunction);

	parsers["ExponentIndicator"].option("e").option("E");
	parsers["ExponentIndicator"].replaceAll(replaceFunction);

	parsers["SignedInteger"].option(parsers["DecimalDigits"]);
	parsers["SignedInteger"].option("+", parsers["DecimalDigits"]);
	parsers["SignedInteger"].option("-", parsers["DecimalDigits"]);
	parsers["SignedInteger"].replaceAll(replaceFunction);

	parsers["HexIntegerLiteral"].option("0x", parsers["HexDigit"]);
	parsers["HexIntegerLiteral"].option("0X", parsers["HexDigit"]);
	parsers["HexIntegerLiteral"].option(parsers["HexIntegerLiteral"], parsers["HexDigit"]);
	parsers["HexIntegerLiteral"].replaceAll(replaceFunction);

	parsers["HexDigit"].option("0").option("1").option("2").option("3").option("4").option("5").option("6").option("7").option("8").option("9").option("a").option("b").option("c").option("d").option("e").option("f").option("A").option("B").option("C").option("D").option("E").option("F");
	parsers["HexDigit"].replaceAll(replaceFunction);

	parsers["StringLiteral"].option("\"", parsers["DoubleStringCharactersopt"], "\"");
	parsers["StringLiteral"].option("'", parsers["SingleStringCharactersopt"], "'");
	parsers["StringLiteral"].replaceAll(replaceFunction);

	parsers["DoubleStringCharacters"].option(parsers["DoubleStringCharacter"], parsers["DoubleStringCharactersopt"]);
	parsers["DoubleStringCharacters"].replaceAll(replaceFunction);

	parsers["SingleStringCharacters"].option(parsers["SingleStringCharacter"], parsers["SingleStringCharactersopt"]);
	parsers["SingleStringCharacters"].replaceAll(replaceFunction);

	parsers["DoubleStringCharacter"].option(parsers["SourceCharacter"]).butNot("\"").butNot("\\").butNot(parsers["LineTerminator"]);
	parsers["DoubleStringCharacter"].option("\\", parsers["EscapeSequence"]);
	parsers["DoubleStringCharacter"].option(parsers["LineContinuation"]);
	parsers["DoubleStringCharacter"].replaceAll(replaceFunction);

	parsers["SingleStringCharacter"].option(parsers["SourceCharacter"]).butNot("'").butNot("\\").butNot(parsers["LineTerminator"]);
	parsers["SingleStringCharacter"].option("\\", parsers["EscapeSequence"]);
	parsers["SingleStringCharacter"].option(parsers["LineContinuation"]);
	parsers["SingleStringCharacter"].replaceAll(replaceFunction);

	parsers["LineContinuation"].option("\\", parsers["LineTerminatorSequence"]);
	parsers["LineContinuation"].replaceAll(replaceFunction);

	parsers["EscapeSequence"].option(parsers["CharacterEscapeSequence"]);
	parsers["EscapeSequence"].option("0").butNot("0", parsers["DecimalDigit"]);
	parsers["EscapeSequence"].option(parsers["HexEscapeSequence"]);
	parsers["EscapeSequence"].option(parsers["UnicodeEscapeSequence"]);
	parsers["EscapeSequence"].replaceAll(replaceFunction);

	parsers["CharacterEscapeSequence"].option(parsers["SingleEscapeCharacter"]);
	parsers["CharacterEscapeSequence"].option(parsers["NonEscapeCharacter"]);
	parsers["CharacterEscapeSequence"].replaceAll(replaceFunction);

	parsers["SingleEscapeCharacter"].option("'").option("\"").option("\\").option("b").option("f").option("n").option("r").option("t").option("v");
	parsers["SingleEscapeCharacter"].replaceAll(replaceFunction);

	parsers["NonEscapeCharacter"].option(parsers["SourceCharacter"]).butNot(parsers["EscapeCharacter"]).butNot(parsers["LineTerminator"]);
	parsers["NonEscapeCharacter"].replaceAll(replaceFunction);

	parsers["EscapeCharacter"].option(parsers["SingleEscapeCharacter"]);
	parsers["EscapeCharacter"].option(parsers["DecimalDigit"]);
	parsers["EscapeCharacter"].option("x");
	parsers["EscapeCharacter"].option("u");
	parsers["EscapeCharacter"].replaceAll(replaceFunction);

	parsers["HexEscapeSequence"].option("x", parsers["HexDigit"], parsers["HexDigit"]);
	parsers["HexEscapeSequence"].replaceAll(replaceFunction);

	parsers["UnicodeEscapeSequence"].option("u", parsers["HexDigit"], parsers["HexDigit"], parsers["HexDigit"], parsers["HexDigit"]);
	parsers["UnicodeEscapeSequence"].replaceAll(replaceFunction);

	parsers["RegularExpressionLiteral"].option("/", parsers["RegularExpressionBody"], "/", parsers["RegularExpressionFlags"]);
	parsers["RegularExpressionLiteral"].replaceAll(replaceFunction);

	parsers["RegularExpressionBody"].option(parsers["RegularExpressionFirstChar"], parsers["RegularExpressionChars"]);
	parsers["RegularExpressionBody"].replaceAll(replaceFunction);

	parsers["RegularExpressionChars"].option("");
	parsers["RegularExpressionChars"].option(parsers["RegularExpressionChars"], parsers["RegularExpressionChar"]);
	parsers["RegularExpressionChars"].replaceAll(replaceFunction);

	parsers["RegularExpressionFirstChar"].option(parsers["RegularExpressionNonTerminator"]).butNot("*").butNot("\\").butNot("/").butNot("[");
	parsers["RegularExpressionFirstChar"].option(parsers["RegularExpressionBackslashSequence"]);
	parsers["RegularExpressionFirstChar"].option(parsers["RegularExpressionClass"]);
	parsers["RegularExpressionFirstChar"].replaceAll(replaceFunction);

	parsers["RegularExpressionChar"].option(parsers["RegularExpressionNonTerminator"]).butNot("\\").butNot("/").butNot("[");
	parsers["RegularExpressionChar"].option(parsers["RegularExpressionBackslashSequence"]);
	parsers["RegularExpressionChar"].option(parsers["RegularExpressionClass"]);
	parsers["RegularExpressionChar"].replaceAll(replaceFunction);

	parsers["RegularExpressionBackslashSequence"].option("\\", parsers["RegularExpressionNonTerminator"]);
	parsers["RegularExpressionBackslashSequence"].replaceAll(replaceFunction);

	parsers["RegularExpressionNonTerminator"].option(parsers["SourceCharacter"]).butNot(parsers["LineTerminator"]);
	parsers["RegularExpressionNonTerminator"].replaceAll(replaceFunction);

	parsers["RegularExpressionClass"].option("[", parsers["RegularExpressionClassChars"], "]");
	parsers["RegularExpressionClass"].replaceAll(replaceFunction);

	parsers["RegularExpressionClassChars"].option("");
	parsers["RegularExpressionClassChars"].option(parsers["RegularExpressionClassChars"], parsers["RegularExpressionClassChar"]);
	parsers["RegularExpressionClassChars"].replaceAll(replaceFunction);

	parsers["RegularExpressionClassChar"].option(parsers["RegularExpressionNonTerminator"]).butNot("]").butNot("\\");
	parsers["RegularExpressionClassChar"].option(parsers["RegularExpressionBackslashSequence"]);
	parsers["RegularExpressionClassChar"].replaceAll(replaceFunction);

	parsers["RegularExpressionFlags"].option('');
	parsers["RegularExpressionFlags"].option(parsers["RegularExpressionFlags"], parsers["IdentifierPart"]);
	parsers["RegularExpressionFlags"].replaceAll(replaceFunction);

})(this.parsers = {});