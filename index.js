// Initialize library for using environment variables
require("dotenv").config();

// Initialize bot API library
const CLIENT = require("node-telegram-bot-api");

// Check for a token, otherwise, throw an error
if(process.env.TOKEN == null || process.env.TOKEN === ""){
	throw new Error("Could not find Telegram token");
}

// Connect the bot client to Telegram servers
const client = new CLIENT(process.env.TOKEN, { polling: true });

// Initialize the module for logging
const logging = require("./logging.js");

// Initialize the module that holds the conversion functions
const convert = require("./convert.js");

// List of commadns that the bot can take
const commands = [
	"/start",
	"/help",
	"/info"
];

// When the bot client receives a message
client.onText(/.*/, (msg) => {
	// Check if the text includes an x.com link
	if (msg.text.includes("x.com")) {
		// Call the message conversion funciton if it does
		convert.convertMessage(client, msg);
	}
	//If not, check if the message is a command
	else {
		// Check the list of commands against the message text
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
			default: 
				logging.unknownQuery(msg);
				break;
		}
	}
	// If neither, do nothing
});

// Function definition for the start command
const startCommand = (msg) => {
	logging.log(msg);
	client.sendMessage(msg.chat.id, "Welcome to the X Link Remover Bot\\!\nI remove the pesky \"x\" from `x.com` links\\! Just send the link, and it will be converted into `twitter`, `vxtwitter`, and `fxtwitter` links\\.\n For more information about `vxtwitter` and `fxtwitter` use the /info command\\.\nFor other help, use the /help command\\.", 
		{ parse_mode: "MarkdownV2" }
	);
};

// Function definition for info command
const infoCommand = (msg) => {
	logging.log(msg);
	client.sendMessage(msg.chat.id, "`vxtwitter` and `fxtwitter` are services that uses the X \\(Twitter\\) API to fix image and video embedding\\. Currently, X \\(Twitter\\) is hit or miss about when it will embed images or videos in Telegram\\. Sometimes it works, sometimes it doesn't\\, and sometimes it only kinda works\\? `vxtwitter` fixes that\\.\nMore information about them can be found on their GitHub Repositories:\n\n`vxtwitter`:\n`https://github\\.com/dylanpdx/BetterTwitFix`\n\n`fxtwitter`:\n`https://github.com/FixTweet/FixTweet`", 
		{
			parse_mode: "MarkdownV2", 
			disable_web_page_preview: true
		}
	);
};

// Function definition for help command
const helpCommand = (msg) => {
	logging.log(msg);
	client.sendMessage(msg.chat.id, "To get your new links, just copy and paste your `x\\.com` link into the chat, and it will automatically be converted into `twitter\\.com`, `vxtwitter`, and `fxtwitter` links\\. Just click on the link you would like, and it will be automatically copied to your clipboard\\!\n\n**__Inline Queries:__**\nIn any chat, just type `@noMoreXbot`, then paste your `x.com`, and you will automatically get a `vxtwitter` link that you can send to the chat\\!", 
		{ parse_mode: "MarkdownV2" }
	);
};

// Function listening for inline queries
client.on("inline_query", (query) => {
	convert.handleInlineQuery(client, query);
});