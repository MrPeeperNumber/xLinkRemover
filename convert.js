// Initialize array of links that will be used
const links = [
	"https://twitter.com",
	"https://vxtwitter.com",
	"https://fxtwitter.com",
	"https://vxfuraffinity.net"
];

// Function definition for converting messages to 
const convertMessage = (client, msg) => {
	// Log the function used, username, user id, and the contents
	console.log(`Convert command from ${msg.from.username}: ${msg.from.id}\n\tMessage content: ${msg.text}`);

	// Convert the provided x.com link into 3 different links
	// twitter, vxtwitter, and fxtwitter links
	// Concatenates the post information onto the end of the links in the link array
	// Sends a message to the user with the 3 new links
	client.sendMessage(msg.chat.id, `Here are your new and improved links\\! Click the link text to have it automatically copied to your clipboard\\.\n\n\`twitter\`:\n\`${links[0].concat(msg.text.slice(msg.text.indexOf("x.com")+5))}\`\n\n\`vxtwitter\`:\`${links[1].concat(msg.text.slice(msg.text.indexOf("x.com")+5))}\`\n\n\`fxtwitter\`:\`${links[2].concat(msg.text.slice(msg.text.indexOf("x.com")+5))}\``, 
		{ parse_mode: "MarkdownV2" }
	);
};

// Function definition for handling inline queries
const handleInlineQuery = (client, query) => {
	// Conditional for handling x.com or furaffinity.net links
	// Bot will only listen for a query when it receives either of those two links
	if(query.query.includes("x.com") || query.query.includes("furaffinity.net")) {
		if(query.query.includes("x.com")) {
			// Log inline query request, who it is from, and their user ID
			console.log(`Inline query from ${query.from.username}: ${query.from.id}\n\tQuery Contents: ${query.query}`);

			// Set results array to be an article object that holds the converted link for vxtwitter only
			const results = [{
				id: "1",
				type: "article",
				title: `${links[1].concat(query.query.slice(query.query.indexOf("x.com")+5))}`,
				input_message_content: {
					message_text: `${links[1].concat(query.query.slice(query.query.indexOf("x.com")+5))}`
				}
			}];

			// Send the query results back to the user
			client.answerInlineQuery(query.id, results);
		}
		else if(query.query.includes("furaffinity.net")) {
			// Log inline query request, who it is from, and their user ID
			console.log(`Inline query from ${query.from.username}: ${query.from.id}\n\tQuery contents:${query.query}`);

			//Set results array to be an article object that holds the converted link for vxfuraffinity
			const results = [{
				id: "1",
				type: "article",
				title: `${links[3].concat(query.query.slice(query.query.indexOf("furaffinity.net")+5))}`,
				input_message_content: {
					message_text: `${links[3].concat(query.query.slice(query.query.indexOf("furaffinity.net")+5))}`
				}
			}];

			//Send the query results back to the user
			client.answerInlineQuery(query.id, results);
		}
	}
};

exports.convertMessage = convertMessage;
exports.handleInlineQuery = handleInlineQuery;
exports.links = links;