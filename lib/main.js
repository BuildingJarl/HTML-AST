class Parser {
	
	constructor() {
		this.regex = {
			html: /<[\s\S]+>/g,
			firstOpeningTag: /g/g,
			lastClosingTag: /<\/.*>$/g
		};
	}

	toAst( html ) {

		var ast = [];

		var start = html.indexOf('<');
		var end = html.lastIndexOf('>') + 1;

		var cleanedHtml = html.substring( start, end );

		console.log(cleanedHtml);
		console.log(start);

		return ast;
	}
}

export default new Parser();