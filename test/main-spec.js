import Parser from '../lib/main';

describe("", function() {

	console.log('--------');

	describe("", function() {
		
		it("1000", function() {

			var html1 = '<open><one><oneone></oneone></one></open>';
			var html2 = 'ishouldstart<open><one><oneone></oneone></one></open>ishouldend';

			var actual1 = Parser.toAst(html1);
			var actual2 = Parser.toAst(html2);

			var expecter = [{

			}];

			expect(actual1.length).toBe(1);

		});
	});
});