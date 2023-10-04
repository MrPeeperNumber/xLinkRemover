const links = [
	"https://twitter.com",
	"https://vxtwitter.com",
	"https://fxtwitter.com",
	"https://vxfuraffinity.net"
];

const convertMessage = (client, msg) => {
	console.log(`Convert command from ${msg.from.username}: ${msg.from.id}`);

	client.sendMessage(msg.chat.id, `Here are your new and improved links\\! Click the link text to have it automatically copied to your clipboard\\.\n\n\`twitter\`:\n\`${links[0].concat(msg.text.slice(msg.text.indexOf("x.com")+5))}\`\n\n\`vxtwitter\`:\`${links[1].concat(msg.text.slice(msg.text.indexOf("x.com")+5))}\`\n\n\`fxtwitter\`:\`${links[2].concat(msg.text.slice(msg.text.indexOf("x.com")+5))}\``, 
		{ parse_mode: "MarkdownV2" }
	);
};

const handleInlineQuery = (client, query) => {
	let results = [];

	switch (query.query) {
		case query.query.includes("x.com"):
			console.log(`Inline query from ${query.from.username}: ${query.from.id}`);
			results = [{
				id: "1",
				type: "article",
				title: `${links[1].concat(query.query.slice(query.query.indexOf("x.com")+5))}`,
				input_message_content: {
					message_text: `${links[1].concat(query.query.slice(query.query.indexOf("x.com")+5))}`
				}
			}];		
			client.answerInlineQuery(query.id, results);
			break;
		case query.query.includes("furaffinity.net"):
			console.log(`Inline query from ${query.from.username}: ${query.from.id}`);
			results = [{
				id: "1",
				type: "article",
				title: `${links[3].concat(query.query.slice(query.query.indexOf("furaffinity.net")+5))}`,
				input_message_content: {
					message_text: `${links[3].concat(query.query.slice(query.query.indexOf("furaffinity.net")+5))}`
				}
			}];
			client.answerInlineQuery(query.id, results);
			break;
	}

	if(query.query.includes("x.com") || query.query.includes("furaffinity.com")) {
		console.log(`Inline query from ${query.from.username}: ${query.from.id}`);
		const results = [{
			id: "1",
			type: "article",
			title: `${links[1].concat(query.query.slice(query.query.indexOf("x.com")+5))}`,
			input_message_content: {
				message_text: `${links[1].concat(query.query.slice(query.query.indexOf("x.com")+5))}`
			}
		}];
	
		client.answerInlineQuery(query.id, results);
	}
};

exports.convertMessage = convertMessage;
exports.handleInlineQuery = handleInlineQuery;
exports.links = links;