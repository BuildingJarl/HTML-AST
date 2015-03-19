import HTML from '../lib/Parser';

describe("Parser Tests", function() {
	

	it("Simple Test One", function() {
		
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

    	//expect(testAST).toEqual(jasmine.objectContaining(mockAST[0]));
	});
});