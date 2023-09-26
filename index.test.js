const convert = require("./convert.js");
const msg = {
	chat: {
		id: "123456789",
	},
	from: {
		id: "123456789",
		username: "Jake Owlsky",
	},
	text: "https://x.com/Mr_Hasgaha/status/1706683674505187504?s=20"
};

const query = {
	id: "123456789",
	query: "https://x.com/Mr_Hasgaha/status/1706683674505187504?s=20",
	from: {
		id: "123456789",
		username: "Jake Owlsky",
	},

};

test("convert messages from x.com links to the various types of links", () => {
	let calledText = "";
	let calledID = "";
	let calledParse = {};
	const text = "Here are your new and improved links\\! Click the link text to have it automatically copied to your clipboard\\.\n\n`twitter`:\n`https://twitter.com/Mr_Hasgaha/status/1706683674505187504?s=20`\n\n`vxtwitter`:`https://vxtwitter.com/Mr_Hasgaha/status/1706683674505187504?s=20`\n\n`fxtwitter`:`https://fxtwitter.com/Mr_Hasgaha/status/1706683674505187504?s=20`";

	const client = {
		sendMessage: (id, text, parse_mode) => {
			calledText = text;
			calledID = id;
			calledParse = parse_mode;
		}
	};

	expect(() => convert.convertMessage(client, msg)).not.toThrow();
	expect(calledText).toEqual(text);
	expect(calledID).toEqual("123456789");
	expect(calledParse).toEqual({parse_mode: "MarkdownV2"});
});

test("can respond to inline queries", () => {
	let calledID = "";
	let expectedResults = {};
	const expectedText = "https://vxtwitter.com/Mr_Hasgaha/status/1706683674505187504?s=20";

	const client = {
		answerInlineQuery: (id, results) => {
			calledID = id;
			expectedResults = results;
		}
	};

	expect(() => convert.handleInlineQuery(client, query)).not.toThrow();
	// expect(calledText).toEqual(text);
	expect(calledID).toEqual("123456789");
	expect(expectedResults).toEqual([{
		id: "1",
		type: "article",
		title: expectedText,
		input_message_content: {
			message_text: expectedText
		}
	}]);
});