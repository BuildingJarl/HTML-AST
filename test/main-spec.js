import HtmlAst from '../lib/main';


describe("", function() {
	
	it("", function() {

		var html = '<html><head></head><body><div>Hello World</div></body></html>';
		var ast = HtmlAst.toAst( html );
	});
})

/*
describe("calcRange", function() {

	it("one line", function() {
		var html = '<html><head></head><body></body></html>';

		var actual = Parser.calcRange( html );

		expect( actual.start ).toEqual( { row:0, col: 0 } );
		expect( actual.end ).toEqual( { row:0, col: 38 } );
	});

	it("multiline", function() {
		var html = '<html>\n<head></head>\n<body></body>\n</html>';

		var actual = Parser.calcRange( html );

		expect( actual.start ).toEqual( { row:0, col: 0 } );
		expect( actual.end ).toEqual( { row:3, col: 6 } );
	});

	it("multiline + spaces", function() {
		var html = '<html>\n    <head></head>\n        <body></body>\n    </html>';

		var actual = Parser.calcRange( html );

		expect( actual.start ).toEqual( { row: 0, col: 0 } );
		expect( actual.end ).toEqual( { row: 3, col: 10 } );
	});
});

describe("toAst", function() {
	describe("", function() {
		
		it("1000", function() {
                      //0123456789012345678901234567890123456789
			var html = '<html><head></head><body></body></html>';
			var actual = Parser.toAst(html);

			var expected = [{
				start: {
					row: 0,
					col: 0
				},
				end: {
					row: 0,
					col: 38
				}
			}, {
				start: {
					row: 0,
					col: 6
				},
				end: {
					row: 0,
					col: 18
				}
			}, {
				start: {
					row: 0,
					col: 19,
				},
				end: {
					row: 0,
					col: 31
				}
			}];

			var i = 0;
			Parser.traverse( actual, function(node) {
				expect( node.location ).toEqual( expected[i] );
				i++;
			});
		});
	});

	describe("", function() {
		
		it("1000", function() {
                      //0123456789012345678901234567890123456789
			var html = '<html>\n<head></head>\n<body></body>\n</html>';
			var actual = Parser.toAst(html);

			var expected = [{
				start: {
					row: 0,
					col: 0
				},
				end: {
					row: 3,
					col: 6
				}
			}, {
				start: {
					row: 1,
					col: 0
				},
				end: {
					row: 1,
					col: 12
				}
			}, {
				start: {
					row: 2,
					col: 0,
				},
				end: {
					row: 2,
					col: 12
				}
			}];

			var i = 0;
			Parser.traverse( actual, function(node) {
				expect( node.location ).toEqual( expected[i] );
				i++;
			});
		});
	});
});
*/