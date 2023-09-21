require("dotenv").config();

const CLIENT = require("node-telegram-bot-api");
const client = new CLIENT(process.env.TOKEN, { polling: true });

const commands = [
	"/start",
	"/help",
	"/info"
];
const commandsKeyboard = commands.map(command => [command]);

const links = [
	"https://twitter.com",
	"https://vxtwitter.com",
	"https://fxtwitter.com"
];

client.onText(/.*/, (msg) => {
	if (msg.text.includes("x.com")) {
		convertMessage(msg);
	}
	else {
		switch(msg.text) {
			case commands[0]:
				startCommand(msg);
				break;
			case commands[1]:
				helpCommand(msg);
				break;
			case commands[2]:
				infoCommand(msg);
				break;
		}
	}
});

const startCommand = (msg) => {
	console.log(`Start command from ${msg.from.username}: ${msg.from.id}`);
	client.sendMessage(msg.chat.id, "Welcome to the X Link Remover Bot\\!\nI remove the pesky \"x\" from `x.com` links\\! Just send the link, and it will be converted into `twitter`, `vxtwitter`, and `fxtwitter` links\\.\n For more information about `vxtwitter` and `fxtwitter` use the /info command\\.\nFor other help, use the /help command\\.", 
		{ parse_mode: 'MarkdownV2' }
	);
};

const infoCommand = (msg) => {
	console.log(`Info command from ${msg.from.username}: ${msg.from.id}`);
	client.sendMessage(msg.chat.id, "`vxtwitter` and `fxtwitter` are services that uses the X \\(Twitter\\) API to fix image and video embedding\\. Currently, X \\(Twitter\\) is hit or miss about when it will embed images or videos in Telegram\\. Sometimes it works, sometimes it doesn't\\, and sometimes it only kinda works\\? `vxtwitter` fixes that\\.\nMore information about them can be found on their GitHub Repositories:\n\n`vxtwitter`:\n`https://github\\.com/dylanpdx/BetterTwitFix`\n\n`fxtwitter`:\n`https://github.com/FixTweet/FixTweet`", 
		{
			parse_mode: 'MarkdownV2', 
			disable_web_page_preview: true
		}
	);
}

const helpCommand = (msg) => {
	console.log(`Help command from ${msg.from.username}: ${msg.from.id}`);
	client.sendMessage(msg.chat.id, "To get your new links, just copy and paste your `x\\.com` link into the chat, and it will automatically be converted into `twitter\\.com`, `vxtwitter`, and `fxtwitter` links\\. Just click on the link you would like, and it will be automatically copied to your clipboard\\!\n\n**__Inline Queries:__**\nIn any chat, just type `@noMoreXbot`, then paste your `x.com`, and you will automatically get a `vxtwitter` link that you can send to the chat\\!", 
		{ parse_mode: 'MarkdownV2' }
	);
};

const convertMessage = (msg) => {
	console.log(`Convert command from ${msg.from.username}: ${msg.from.id}`);

	client.sendMessage(msg.chat.id, `Here are your new and improved links\\! Click the link text to have it automatically copied to your clipboard\\.\n\n\`twitter\`:\n\`${links[0].concat(msg.text.slice(msg.text.indexOf("x.com")+5))}\`\n\n\`vxtwitter\`:\`${links[1].concat(msg.text.slice(msg.text.indexOf("x.com")+5))}\`\n\n\`fxtwitter\`:\`${links[2].concat(msg.text.slice(msg.text.indexOf("x.com")+5))}\``, 
		{ parse_mode: 'MarkdownV2' }
	);
};

client.on('inline_query', (query) => {
	if(query.query.includes("x.com")) {
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
});