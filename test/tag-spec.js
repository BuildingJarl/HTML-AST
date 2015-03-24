import Tag from '../lib/Tag';

describe("Tag Tests", function() {

	it("Simple Test One", function() {
		var tag = '<div>';

		var mocktag = {
			type: 'tag',
			name: 'div',
			voidElement: false,
			attrs: {},
			children: []
		};

		var testTag = new Tag(tag);

		expect(testTag).toEqual(jasmine.objectContaining(mocktag));
	});

	it("Simple Test Two", function() {
		var tag = '<div class=thing other=stuff something=54 quote="me ">';

		var mocktag = {
			type: 'tag',
			name: 'div',
			attrs: {
				class: 'thing',
            	other: 'stuff',
            	something: '54',
            	quote: 'me'
			},
			voidElement: false,
			children: []
		};

		var testTag = new Tag(tag);

		expect(testTag).toEqual(jasmine.objectContaining(mocktag));
	});

	it("Simple Test Three", function() {
		var tag = '<something-custom class=\'single quoted thing\'>';

		var mocktag = {
			type: 'tag',
			name: 'something-custom',
			attrs: {
				class: 'single quoted thing'
			},
			voidElement: false,
			children: []
		};

		var testTag = new Tag(tag);

		expect(testTag).toEqual(jasmine.objectContaining(mocktag));
	});

	it("Void Element (img with /) test", function() {
		var tag = '<img src="something" alt="sweet picture"/>';

		var mocktag = {
			type: 'tag',
			name: 'img',
			attrs: {
				src: 'something',
            	alt: 'sweet picture'
			},
			voidElement: true,
			children: []
		};

		var testTag = new Tag(tag);

		expect(testTag).toEqual(jasmine.objectContaining(mocktag));
	});
	
	it("Void Element (img without /) test", function() {
		var tag = '<img src="something" alt="sweet picture">';

		var mocktag = {
			type: 'tag',
			name: 'img',
			attrs: {
				src: 'something',
            	alt: 'sweet picture'
			},
			voidElement: true,
			children: []
		};

		var testTag = new Tag(tag);

		expect(testTag).toEqual(jasmine.objectContaining(mocktag));
	});
});