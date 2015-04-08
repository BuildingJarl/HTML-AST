import HELPER from '../lib/TokenHelper';

describe("Token Helper - tokenize", function() {
	
	var REG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

	var mockToken = function( tag, start, end ) {
		return { tag: tag, startOfTagPos: start, endOfTagPos: end };
	}

	describe("tokenize", function() {

		it("return correct tokens from string without text tags", function() {

			var mock = '<div></div><div></div>';

			var actual = HELPER.tokenize(REG, mock);

			expect( actual[0] ).toEqual(mockToken('<div>', 0, 4) );
			expect( actual[1] ).toEqual(mockToken('</div>', 5, 10) );
			expect( actual[2] ).toEqual(mockToken('<div>', 11, 15) );
			expect( actual[3] ).toEqual(mockToken('</div>', 16, 21) );
		});

		it("return correct tokens from string with text tags", function() {

			var mock = '<div>Hello</div><div>Goodbye</div>';

			var actual = HELPER.tokenize(REG, mock);

			expect( actual[0] ).toEqual(mockToken('<div>', 0, 4) );
			expect( actual[1] ).toEqual(mockToken('</div>', 10, 15) );
			expect( actual[2] ).toEqual(mockToken('<div>', 16, 20) );
			expect( actual[3] ).toEqual(mockToken('</div>', 28, 33) );
		});

		it("return correct tokens from string with - attrs", function() {

			var mock = '<div one-one="hello"></div>';

			var actual = HELPER.tokenize(REG, mock);

			expect( actual[0] ).toEqual(mockToken('<div one-one="hello">', 0, 20) );
			expect( actual[1] ).toEqual(mockToken('</div>', 21, 26) );
		});

		it("return correct tokens from string with - attrs", function() {

			var mock = '<div one-one="hello"><div two-one="hello"></div></div>';

			var actual = HELPER.tokenize(REG, mock);

			expect( actual[0] ).toEqual(mockToken('<div one-one="hello">', 0, 20) );
			expect( actual[1] ).toEqual(mockToken('<div two-one="hello">', 21, 41) );
			expect( actual[2] ).toEqual(mockToken('</div>', 42, 47) );
			expect( actual[3] ).toEqual(mockToken('</div>', 48, 53) );
		});
	});

	describe("get tag name", function() {

		it("Opening tag One", function() {

			var mt = mockToken('<div>', 5, 10);

			var actual = HELPER.getTagName(mt.tag);

			expect( actual ).toEqual('div');
		});

		it("Opening tag Two", function() {

			var mt = mockToken('<div class="bla">', 5, 10);

			var actual = HELPER.getTagName(mt.tag);

			expect( actual ).toEqual('div');
		});


		it("Closing tag", function() {

			var mt = mockToken('</div>', 5, 10);

			var actual = HELPER.getTagName(mt.tag);

			expect( actual ).toEqual('div');
		});
	});

	describe("is Opening Tag", function() {
	
		it("simple", function() {

			expect( HELPER.isOpeningTag('<div>') ).toBe(true);
		});

		it("Complex", function() {

			expect( HELPER.isOpeningTag('<div class="hello">') ).toBe(true);
		});
	});

	describe("is Closing Tag", function() {
	
		it("simple", function() {

			expect( HELPER.isClosingTag('</div>') ).toBe(true);
		});
	});

	describe("Token Helper find closing", function() {
		
		it("return correct closing tag from tokens array", function() {

			var mock = [
				mockToken('<div>', 0, 4),
				mockToken('</div>', 5, 6)
			];

			var actual = HELPER.findClosing( 'div', mock.slice(1));

			expect( mock.indexOf(actual) ).toEqual(1);
		});

		it("return correct closing tag from tokens array with void element - One", function() {

			var mock = [
				mockToken('<img>', 0, 4),
				mockToken('<div>', 0, 4),
				mockToken('</div>', 5, 6)
			];

			var actual = HELPER.findClosing( 'div', mock.slice(2));

			expect( mock.indexOf(actual) ).toEqual(2);
		});

		it("return correct closing tag from tokens array with void element - Two", function() {

			var mock = [
				mockToken('<div>', 0, 4),
				mockToken('<img>', 0, 4),
				mockToken('</div>', 5, 6)
			];

			var actual = HELPER.findClosing( 'div', mock.slice(1));

			expect( mock.indexOf(actual) ).toEqual(2);
		});

		it("return correct closing tag from tokens array", function() {

			var mock = [
				mockToken('<div>', 0, 4),
				mockToken('<span>', 0, 4),
				mockToken('</span>', 0, 4),
				mockToken('<p>', 0, 4),
				mockToken('</p>', 0, 4),
				mockToken('</div>', 5, 6)
			];

			var actual = HELPER.findClosing( 'div', mock.slice(1));

			expect( mock.indexOf(actual) ).toEqual(5);
		});

		it("return correct closing tag from tokens array", function() {

			var mock = [
				mockToken('<div>', 0, 4),
				mockToken('<span>', 0, 4),
				mockToken('</span>', 0, 4),
				mockToken('<p>', 0, 4),
				mockToken('</p>', 0, 4)
			];

			var actual = HELPER.findClosing( 'div', mock.slice(1));

			expect( actual ).toBe(null);
			expect( mock.indexOf(actual) ).toEqual(-1);
		});
	});

	describe("CalcLocation in String", function() {

		it("Simple 1 - should return the corrent location  - no nl", function() {

			var mockString = '<div><h1></h1></div>';
			//console.log(mockString.charAt(0)) //<
			//console.log(mockString.charAt(19)) //>
			var mockStart = 0;
			var mockEnd = 19;

			var expected = {
				start: {
					row:0,
					col:0
				},
				end: {
					row:0,
					col: 19
				}
			}

			var actual = HELPER.calcLocation(mockString, mockStart, mockEnd);

			expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
		})

		it("Simple 2 - should return the corrent location - with nl", function() {

			var mockString = '<div>\n<h1></h1></div>';
			//console.log(mockString.charAt(6)) //<
			//console.log(mockString.charAt(14)) //>
			var mockStart = 6;
			var mockEnd = 14;

			var expected = {
				start: {
					row:1,
					col:0
				},
				end: {
					row:1,
					col: 8
				}
			}

			var actual = HELPER.calcLocation(mockString, mockStart, mockEnd);

			expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
		});

		it("Simple 3 - should return the corrent location - with nl (multi)", function() {

			var mockString = '<div>\n<h1>\n</h1></div>';
			//console.log(mockString.charAt(6)) //<
			//console.log(mockString.charAt(15)) //>
			var mockStart = 6;
			var mockEnd = 15;

			var expected = {
				start: {
					row:1,
					col:0
				},
				end: {
					row:2,
					col: 4
				}
			}

			var actual = HELPER.calcLocation(mockString, mockStart, mockEnd);

			expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
		});

		it("Simple 4 - self closing", function() {

			var mockString = '<img>';
			//console.log(mockString.charAt(6)) //<
			//console.log(mockString.charAt(15)) //>
			var mockStart = 0;
			var mockEnd = 4;

			var expected = {
				start: {
					row:0,
					col:0
				},
				end: {
					row:0,
					col: 4
				}
			}

			var actual = HELPER.calcLocation(mockString, mockStart, mockEnd);

			expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
		});

		it("Simple 4 - self closing x 2", function() {

			var mockString = '<img><img>';
			//console.log(mockString.charAt(6)) //<
			//console.log(mockString.charAt(15)) //>
			var mockStart = 5;
			var mockEnd = 9;

			var expected = {
				start: {
					row:0,
					col:5
				},
				end: {
					row:0,
					col: 9
				}
			}

			var actual = HELPER.calcLocation(mockString, mockStart, mockEnd);

			expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
		});
	});
});