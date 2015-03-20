import HTML from '../lib/Parser';

describe("Parser Tests", function() {
	
	it("Simple Test without NL", function() {
		
		var html = '<div class="oh"></div>';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        attrs: {
	            class: 'oh'
	        },
	        voidElement: false,
	        children: [],
	        loc: {
	        	start: {
	        		line: 0,
	        		col: 0
	        	},
	        	end: {
	        		line: 0,
	        		col: 21
	        	}
	        }
    	}];

    	expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});

	it("Simple Test with NL at beginning of string", function() {
		
		var html = '\n<div class="oh"></div>';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        attrs: {
	            class: 'oh'
	        },
	        voidElement: false,
	        children: [],
	        loc: {
	        	start: {
	        		line: 1,
	        		col: 0
	        	},
	        	end: {
	        		line: 1,
	        		col: 21
	        	}
	        }
    	}];

    	expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});

	it("Simple Test with multiple NL at beginning of string", function() {
		
		var html = '\n\n<div class="oh"></div>';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        attrs: {
	            class: 'oh'
	        },
	        voidElement: false,
	        children: [],
	        loc: {
	        	start: {
	        		line: 2,
	        		col: 0
	        	},
	        	end: {
	        		line: 2,
	        		col: 21
	        	}
	        }
    	}];

    	expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});

	it("Simple Test with tab at beginning of string", function() {
		
		var html = '\n\n<div class="oh"></div>';
    	var testAST = HTML.parse(html);

	    var mockAST = [{
	    	type: 'tag',
	        name: 'div',
	        attrs: {
	            class: 'oh'
	        },
	        voidElement: false,
	        children: [],
	        loc: {
	        	start: {
	        		line: 3,
	        		col: 1
	        	},
	        	end: {
	        		line: 3,
	        		col: 22
	        	}
	        }
    	}];

    	//expect(testAST[0]).toEqual(jasmine.objectContaining(mockAST[0]));
	});
});
