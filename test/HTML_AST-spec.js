import HTML_AST from '../lib/HTML_AST';
/*
describe("Parser Tests parse", function() {
	
	it("Simple tag without NL at begnning", function() {
		
		var html = '<div class="oh"></div>';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        attrs: {
	            class: 'oh'
	        },
	        voidElement: false,
	        children: []
    	}];

    	expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});

	it("Simple tag with NL at beginning", function() {
		
		var html = '\n<div class="oh"></div>';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        attrs: {
	            class: 'oh'
	        },
	        voidElement: false,
	        children: []
    	}];

    	expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});

	it("Simple tag with multiple NL's at beginning", function() {
		
		var html = '\n\n<div class="oh"></div>';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        attrs: {
	            class: 'oh'
	        },
	        voidElement: false,
	        children: []
    	}];

    	expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});

	it("Simple tag with NL at end", function() {
		
		var html = '<div class="oh"></div>\n';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        attrs: {
	            class: 'oh'
	        },
	        voidElement: false,
	        children: []
    	}];

    	expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});

	it("Simple tag with multiple NL's at end", function() {
		
		var html = '<div class="oh"></div>\n\n';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        attrs: {
	            class: 'oh'
	        },
	        voidElement: false,
	        children: []
    	}];

    	expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});

	it("Simple tag with NL in tag", function() {
		
		var html = '<div class="oh">\n</div>';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        attrs: {
	            class: 'oh'
	        },
	        voidElement: false,
	        children: []
    	}];

    	expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});

	it("Simple tag with multiple NL's in tag", function() {
		
		var html = '<div class="oh">\n\n</div>';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        attrs: {
	            class: 'oh'
	        },
	        voidElement: false,
	        children: []
    	}];

    	expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});

	it("Simple tag with tab in tag", function() {
		
		var html = '<div class="oh">\t</div>';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        attrs: {
	            class: 'oh'
	        },
	        voidElement: false,
	        children: []
    	}];

    	expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});

	it("Simple tag with multiple r in tag", function() {
		
		var html = '<div class="oh">\r</div>';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        attrs: {
	            class: 'oh'
	        },
	        voidElement: false,
	        children: []
    	}];

    	expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});

	it("Simple tag with multiple r n in tag", function() {
		
		var html = '<div class="oh">\r\n</div>';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        attrs: {
	            class: 'oh'
	        },
	        voidElement: false,
	        children: []
    	}];

    	expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});

	it("Simple tag with NL and text in tag", function() {
		
		var html = '<div class="oh">\nhello\n\r</div>';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        attrs: {
	            class: 'oh'
	        },
	        voidElement: false,
	        children: [
	        	{
	        		type: 'text',
	        		content: 'hello'
	        	}
	        ]
    	}];

    	expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});

	it("Simple tag with text in at end of last closed tag", function() {
		
		var html = '<div class="oh"></div>asadasasdad';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        attrs: {
	            class: 'oh'
	        },
	        voidElement: false,
	        children: []
    	}];

    	expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});

	it("Simple tag with text in at end of last self closing tag", function() {
		
		var html = '<img>asadasasdad';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'img',
	        attrs: {},
	        voidElement: true,
	        children: []
    	}];

    	expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});

	it("Complex tag without text", function() {
		
		var html = '<div class="oh"><img><div><span></span></div></div>';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        voidElement: false,
	        attrs: {
	            class: 'oh'
	        },
	        children: [
	        	{
	        		type: 'tag',
	        		name: 'img',
	        		voidElement: true,
	        		attrs: {},
	        		children: []
	        	},
	        	{
	        		type: 'tag',
	        		name: 'div',
	        		voidElement: false,
	        		attrs: {},
	        		children: [
	        			{
	        				type: 'tag',
	        				name: 'span',
	        				voidElement: false,
	        				attrs: {},
	        				children: []
	        			}
	        		]
	        	}
	        ]
    	}];

    	expect(JSON.stringify(testAST)).toEqual(JSON.stringify(mockAST));
	});

	it("Complex tag with text", function() {
		
		var html = '<div class="oh"><img><div><span>hellohello</span></div></div>';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        voidElement: false,
	        attrs: {
	            class: 'oh'
	        },
	        children: [
	        	{
	        		type: 'tag',
	        		name: 'img',
	        		voidElement: true,
	        		attrs: {},
	        		children: []
	        	},
	        	{
	        		type: 'tag',
	        		name: 'div',
	        		voidElement: false,
	        		attrs: {},
	        		children: [
	        			{
	        				type: 'tag',
	        				name: 'span',
	        				voidElement: false,
	        				attrs: {},
	        				children: [
	        				{
	        					type: 'text',
	        					content: 'hellohello'
	        				}
	        				]
	        			}
	        		]
	        	}
	        ]
    	}];

    	expect(JSON.stringify(testAST)).toEqual(JSON.stringify(mockAST));
	});

	it("Component", function() {
			
			var html = '<div class="oh"><img><custom><span>hello hello hi</span></custom></div>';
	    	var testAST = HTML.parse(html);

		    var mockAST = [{
		    	type: 'tag',
		        name: 'div',
		        voidElement: false,
		        attrs: {
		            class: 'oh'
		        },
		        children: [
		        	{
		        		type: 'tag',
		        		name: 'img',
		        		voidElement: true,
		        		attrs: {},
		        		children: []
		        	},
		        	{
		        		type: 'tag',
		        		name: 'custom',
		        		voidElement: false,
		        		attrs: {},
		        		children: [
		        			{
		        				type: 'tag',
		        				name: 'span',
		        				voidElement: false,
		        				attrs: {},
		        				children: [
		        				{
		        					type: 'text',
		        					content: 'hello hello hi'
		        				}
		        				]
		        			}
		        		]
		        	}
		        ]
	    	}];

	    	expect(JSON.stringify(testAST)).toEqual(JSON.stringify(mockAST));
	});
});

describe("Parser Tests toString", function() {
	
	it("Simple", function() {
		
		var html = '<div class="oh"></div>';
    	var ast = HTML.parse(html);

    	var actual = HTML.toString(ast);
    	expect(actual).toEqual(html);
	});

	it("Complex", function() {
		
		var html = '<div class="oh"><div class="bll"></div><span><img></span><br></div>';
    	var ast = HTML.parse(html);

    	var actual = HTML.toString(ast);
    	expect(actual).toEqual(html);
	});
});

describe("Parser Tests", function() {
	
	it("tokenize", function() {
		
		var html = '<h1>Hello</h1><div class="oh"><span><p>HelloParag</p></span></div>';
    	var tokens = HTML.tokenize(html);

    	expect(tokens.length).toEqual(8);
	});

	it("isOpeningTag", function() {
		
		var tag = '<h1>'
    	var result = HTML.isOpeningTag(tag);

    	expect(result).toBe(true);
	});

	it("isClosingTag", function() {
		
		var tag = '</h1>'
    	var result = HTML.isClosingTag(tag);

    	expect(result).toBe(true);
	});

	it("getTagName", function() {
		
		var tag1 = '<h1>';
		var tag2 = '<h1 class="bla">';

    	var result1 = HTML.getTagName(tag1);
    	var result2 = HTML.getTagName(tag2);

    	expect(result1).toEqual('h1');
    	expect(result2).toEqual('h1');
	});
	
	it("findClosingToken simple", function() {
		
		var tokens = HTML.tokenize('<h1></h1>');

    	var result = HTML.findClosingToken(tokens.slice(1));

    	expect(result.indexInArray).toEqual(1);
	});

	it("findClosingToken nested", function() {
		
		var tokens = HTML.tokenize('<div><span></span><span></span><span></span></div>');
		var result = HTML.findClosingToken(tokens.slice(1));

    	expect(result.indexInArray).toEqual(7);
	});

	it("findClosingToken self closing", function() {
		
		var tokens = HTML.tokenize('<div><span></span><span><img></span><span></span></div>');
		var result = HTML.findClosingToken(tokens.slice(1));

    	expect(result.indexInArray).toEqual(8);
	});

	it("bla", function(){

		var html = '<h1></h1><div><span></span></div>';
    	var ast = HTML.parse1(html);

    	var expected = [{
    		type: 'tag',
    		name: 'h1',
    		voidElement: false,
    		attrs: {},
    		children: [ {
    			type: 'tag',
    			name: 'div',
    			voidElement: false,
    			attrs: {},
    			children: [{
    				type: 'tag',
    				name: 'span',
    				voidElement: false,
    				attrs: {},
    				children: []
    			}]
    		}]
    	}];

    	expect(JSON.stringify(ast)).toEqual(JSON.stringify(expected));
	})

	it("Missing Closing tag simple", function(){

		var html = '<h1>';
    	var ast = HTML.parse1(html);

    	var expected = [{
    		type: 'tag',
    		name: 'h1',
    		voidElement: false,
    		attrs: {},
    		children: []
    	}];

    	expect(JSON.stringify(ast)).toEqual(JSON.stringify(expected));
	})

	it("Missing Closing tag complex", function(){

		//there should be a /div after div
		var html = '<h1></h1><div><span></span>';
    	var ast = HTML.parse1(html);

    	var expected = [{
    		type: 'tag',
    		name: 'h1',
    		voidElement: false,
    		attrs: {},
    		children: [{
    			type: 'tag',
	    		name: 'div',
	    		voidElement: false,
	    		attrs: {},
	    		children: [
	    		{
	    			type: 'tag',
		    		name: 'span',
		    		voidElement: false,
		    		attrs: {},
		    		children: []
	    		}] 
	    	}]
    	}];

    	expect(JSON.stringify(ast)).toEqual(JSON.stringify(expected));
	})
});
*/

describe("HTML_AST Tests", function() {

	var mockTag = function( type, name, voidEl, attrs, startR, startC, endR, endC ) {
		return { type: type,
				name: name,
				voidElement: voidEl,
				attrs: attrs,
				children: [],
				location: {
					start: {
						row: startR,
						col: startC
					},
					end: {
						row: endR,
						col: endC
					}
				}
			}
	};

	describe("string to AST - Single Line with no text nodes", function() {
		
		it("Simple - one element with no text node", function() {
			var mockString = '<div></div>';

			var actual = HTML_AST.stringToAst(mockString);
			var expected = [ mockTag( 'tag', 'div', false, {}, 0, 0, 0, 10 ) ];

			expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
		});

		it("Simple - one element (self closing) with no text node", function() {
			var mockString = '<img>';

			var actual = HTML_AST.stringToAst(mockString);
			var expected = [ mockTag( 'tag', 'img', true, {}, 0, 0, 0, 4 ) ];

			expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
		});

		it("Simple - one element + nested (self closing) with no text node", function() {
			var mockString = '<div><img></div>';

			var actual = HTML_AST.stringToAst(mockString);

			var t1 = mockTag( 'tag', 'div', false, {}, 0, 0, 0, 15 );
			var t2 = mockTag( 'tag', 'img', true, {}, 0, 5, 0, 9 );

			t1.children.push(t2);

			var expected = [ t1 ];

			expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
		});

		it("Simple - one element + 2 nested (self closing) with no text node", function() {
			var mockString = '<div><img><img></div>';

			var actual = HTML_AST.stringToAst(mockString);

			var t1 = mockTag( 'tag', 'div', false, {}, 0, 0, 0, 20 );
			var t2 = mockTag( 'tag', 'img', true, {}, 0, 5, 0, 9 );
			var t3 = mockTag( 'tag', 'img', true, {}, 0, 10, 0, 14 );

			t1.children.push(t2);
			t1.children.push(t3);

			var expected = [ t1 ];

			expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
		});

		it("Mid - nested elements with no text node", function() {
			var mockString = '<div><span><p></p></span></div>';

			var actual = HTML_AST.stringToAst(mockString);

			var t1 = mockTag('tag', 'div', false, {}, 0, 0, 0, 30  );
			var t2 = mockTag('tag', 'span', false, {}, 0, 5, 0, 24  );
			var t3 = mockTag('tag', 'p', false, {}, 0, 11, 0, 17  );

			t1.children.push(t2);
			t2.children.push(t3);

			var expected = [t1];

			expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
		});
	
		it("Mid - nested elements with void elemetns and no text node", function() {
			var mockString = '<div><img><span><p></p></span></div>';

			var actual = HTML_AST.stringToAst(mockString);

			var t1 = mockTag('tag', 'div', false, {}, 0, 0, 0, 35  );
			var t2 = mockTag('tag', 'img', true, {}, 0, 5, 0, 9  );
			var t3 = mockTag('tag', 'span', false, {}, 0, 10, 0, 29  );
			var t4 = mockTag('tag', 'p', false, {}, 0, 16, 0, 22  );

			t1.children.push(t2);
			t1.children.push(t3);
			t3.children.push(t4);

			var expected = [t1];

			expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
		});

		it("Complex - multi nested elements with void elemetns and no text node", function() {
			var mockString = '<div><img><img><span><p></p></span><div><div><div></div></div></div><span><p></p><img><img></span></div><span></span>';

			var actual = HTML_AST.stringToAst(mockString);

			var t1 = mockTag('tag', 'div', false, {}, 0, 0, 0, 103  );
			var t2 = mockTag('tag', 'img', true, {}, 0, 5, 0, 9  );
			var t3 = mockTag('tag', 'img', true, {}, 0, 10, 0, 14  );
			var t4 = mockTag('tag', 'span', false, {}, 0, 15, 0, 34  );
			var t5 = mockTag('tag', 'p', false, {}, 0, 21, 0, 27  );

			var t6 = mockTag('tag', 'div', false, {}, 0, 35, 0, 67  );
			var t7 = mockTag('tag', 'div', false, {}, 0, 40, 0, 61  );
			var t8 = mockTag('tag', 'div', false, {}, 0, 45, 0, 55  );

			var t9 = mockTag('tag', 'span', false, {}, 0, 68, 0, 97 );
			var t10 = mockTag('tag', 'p', false, {}, 0, 74, 0, 80  );
			var t11 = mockTag('tag', 'img', true, {}, 0, 81, 0, 85  );
			var t12 = mockTag('tag', 'img', true, {}, 0, 86, 0, 90  );
			
			var t13 = mockTag('tag', 'span', false, {}, 0, 104, 0, 116  );

			t1.children.push(t2);
			t1.children.push(t3);
			t1.children.push(t4);
			t4.children.push(t5);
			t1.children.push(t6)
			t6.children.push(t7)
			t7.children.push(t8)
			t1.children.push(t9);
			t9.children.push(t10);
			t9.children.push(t11);
			t9.children.push(t12);

			var expected = [t1,t13];

			expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
		});
	});

	describe("string to AST - Single Line with no text nodes and missing closing", function() {

		it("simple One", function() {
			var mockString = '<div>';

			var actual = HTML_AST.stringToAst(mockString);
			var expected = [ mockTag( 'tag', 'div', false, {}, 0, 0, 0 , 4 ) ];

			expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
		});

		it("simple Two", function() {
			var mockString = '<div><span></span>';

			var actual = HTML_AST.stringToAst(mockString);

			var t1 = mockTag( 'tag', 'div', false, {}, 0, 0, 0, 17 );
			var t2 = mockTag( 'tag', 'span', false, {}, 0, 5, 0, 17 );

			t1.children.push(t2);

			var expected = [ t1 ];

			expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
		});

		it("multi One", function() {
			var mockString = '<div><span>';

			var actual = HTML_AST.stringToAst(mockString);

			var t1 = mockTag( 'tag', 'div', false, {}, 0, 0, 0, 10 );
			var t2 = mockTag( 'tag', 'span', false, {}, 0, 5, 0, 10 );

			t1.children.push(t2);

			var expected = [ t1 ];

			expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
		});

		it("multi Two", function() {
			var mockString = '<div><span><img><img>';

			var actual = HTML_AST.stringToAst(mockString);

			var t1 = mockTag( 'tag', 'div', false, {}, 0, 0, 0, 20 );
			var t2 = mockTag( 'tag', 'span', false, {}, 0, 5, 0, 20 );
			var t3 = mockTag( 'tag', 'img', true, {}, 0, 11, 0, 15 );
			var t4 = mockTag( 'tag', 'img', true, {}, 0, 16, 0, 20 );

			t1.children.push(t2);
			t2.children.push(t3);
			t2.children.push(t4);

			var expected = [ t1 ];

			expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
			//expect(actual[0]).toEqual(jasmine.objectContaining(expected[0]));
		});
	});

	describe("string to AST - Incomplete tags - Regex check", function() {

		it("ast should not contain anything", function() {
			var mockString = '<';

			var actual = HTML_AST.stringToAst(mockString);

			expect(actual.length).toBe(0);
		});

		it("ast should contain one tag", function() {
			var mockString = '<div></div><';

			var actual = HTML_AST.stringToAst(mockString);

			expect(actual.length).toBe(1);
		});

		it("ast should not contain any tags", function() {
			var mockString = '<d';

			var actual = HTML_AST.stringToAst(mockString);

			expect(actual.length).toBe(0);
		});

		it("ast should not contain any nested tags", function() {
			var mockString = '<div><</div>';

			var actual = HTML_AST.stringToAst(mockString);

			expect(actual.length).toBe(1);
			expect(actual[0].children.length).toBe(0);
		})
	});
});
