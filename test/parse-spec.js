import HTML from '../lib/Parser';

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
