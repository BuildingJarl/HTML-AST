import HTML_AST from '../lib/HTML_AST';
import Moment from 'moment';



describe("preformace normal", function() {

	console.log('--------');

	describe("preformace - not nested", function() {
		
		it("1000", function() {
			
			var moment = Moment();
			var mockString = "";

			for(var i = 0; i <= 1000; i++) {
				mockString += '<div></div>';
			}

			var start = Moment();

			var actual = HTML_AST.stringToAst(mockString);

			var end = Moment();
			
			var duration = Moment.duration(end.diff(start));
			
			console.log('1000 nodes')
			console.log(duration.asMilliseconds());
			console.log(duration.asSeconds());
			console.log('----')

			expect(true).toBe(true);
		});

		it("5000", function() {
			
			var moment = Moment();
			var mockString = "";

			for(var i = 0; i <= 5000; i++) {
				mockString += '<div></div>';
			}

			var start = Moment();

			var actual = HTML_AST.stringToAst(mockString);

			var end = Moment();
			
			var duration = Moment.duration(end.diff(start));
			
			console.log('5000 nodes')
			console.log(duration.asMilliseconds());
			console.log(duration.asSeconds());
			console.log('----')

			expect(true).toBe(true);
		});

		it("10000", function() {
			
			var moment = Moment();
			var mockString = "";

			for(var i = 0; i <= 10000; i++) {
				mockString += '<div></div>';
			}

			var start = Moment();

			var actual = HTML_AST.stringToAst(mockString);

			var end = Moment();
			
			var duration = Moment.duration(end.diff(start));
			
			console.log('10000 nodes')
			console.log(duration.asMilliseconds());
			console.log(duration.asSeconds());
			console.log('----')

			expect(true).toBe(true);
		});

		it("15000", function() {
			
			var moment = Moment();
			var mockString = "";

			for(var i = 0; i <= 15000; i++) {
				mockString += '<div></div>';
			}

			var start = Moment();

			var actual = HTML_AST.stringToAst(mockString);

			var end = Moment();
			
			var duration = Moment.duration(end.diff(start));
			
			console.log('10000 nodes')
			console.log(duration.asMilliseconds());
			console.log(duration.asSeconds());
			console.log('----')

			expect(true).toBe(true);
		});

	});

	describe("preformace - nested", function() {
		
		it("1000 - 5", function() {
			
			var moment = Moment();
			var mockString = "";

			for(var i = 0; i <= 1000; i++) {
				var str = '';
				for(var j = 0; j <= 5; j++) {
					str += '<div>';
				}
				for(var k = 0; k <= 5; k++) {
					str += '</div>';
				}

				mockString += str;
			}

			var start = Moment();

			var actual = HTML_AST.stringToAst(mockString);

			var end = Moment();
			
			var duration = Moment.duration(end.diff(start));
			
			console.log('1000 nodes with 5 level nesting')
			console.log(duration.asMilliseconds());
			console.log(duration.asSeconds());
			console.log('----')

			expect(true).toBe(true);
		});

		it("1000 - 10", function() {
			
			var moment = Moment();
			var mockString = "";

			for(var i = 0; i <= 1000; i++) {
				var str = '';
				for(var j = 0; j <= 10; j++) {
					str += '<div>';
				}
				for(var k = 0; k <= 10; k++) {
					str += '</div>';
				}

				mockString += str;
			}

			var start = Moment();

			var actual = HTML_AST.stringToAst(mockString);

			var end = Moment();
			
			var duration = Moment.duration(end.diff(start));
			
			console.log('1000 nodes with 10 level nesting')
			console.log(duration.asMilliseconds());
			console.log(duration.asSeconds());
			console.log('----')

			expect(true).toBe(true);
		});

		it("1000 - 20", function() {
			
			var moment = Moment();
			var mockString = "";

			for(var i = 0; i <= 1000; i++) {
				var str = '';
				for(var j = 0; j <= 20; j++) {
					str += '<div>';
				}
				for(var k = 0; k <= 20; k++) {
					str += '</div>';
				}

				mockString += str;
			}

			var start = Moment();

			var actual = HTML_AST.stringToAst(mockString);

			var end = Moment();
			
			var duration = Moment.duration(end.diff(start));
			
			console.log('1000 nodes with 20 level nesting')
			console.log(duration.asMilliseconds());
			console.log(duration.asSeconds());
			console.log('----')

			expect(true).toBe(true);
		});

		it("5000 - 10", function() {
			
			var moment = Moment();
			var mockString = "";

			for(var i = 0; i <= 5000; i++) {
				var str = '';
				for(var j = 0; j <= 10; j++) {
					str += '<div>';
				}
				for(var k = 0; k <= 10; k++) {
					str += '</div>';
				}

				mockString += str;
			}

			var start = Moment();

			var actual = HTML_AST.stringToAst(mockString);

			var end = Moment();
			
			var duration = Moment.duration(end.diff(start));
			
			console.log('5000 nodes with 10 level nesting')
			console.log(duration.asMilliseconds());
			console.log(duration.asSeconds());
			console.log('----')

			expect(true).toBe(true);
		});
	});

	console.log('--------');
});
