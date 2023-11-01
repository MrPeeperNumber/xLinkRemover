// Initialize library for using environment variables
require("dotenv").config();


const CLIENT = require("node-telegram-bot-api");
// Check for a token, otherwise, throw an error
if(process.env.TEST_TOKEN == null || process.env.TEST_TOKEN === ""){
	throw new Error("Could not find Telegram token");
}
const client = new CLIENT(process.env.TEST_TOKEN, { polling: true });
const logging = require("./logging.js");
const convert = require("./convert.js");
const commands = [
	"/start",
	"/help",
	"/info"
];

/* Initialize a Koa server for metric tracking with Prometheus */
const koa = require("koa");
const server = new koa();
const parser = require("koa-bodyparser");
const Router = require("koa-router");
const route = new Router();
const prom = require("prom-client");
const collectDefaultMetrics = prom.collectDefaultMetrics;
const Registry = prom.Registry;
const register = new Registry;
const counters = require("./counters.js");


//Middleware
server.use(parser());
server.use(route.routes());

// When the bot client receives a message
client.onText(/.*/, (msg) => {
	// Check if the text includes an x.com link
	if (msg.text.includes("x.com")) {
		countValid();
		console.log(counters.validQueries.hashMap[""].value);
		// Call the message conversion funciton if it does
		convert.convertMessage(client, msg);
	}
	//If not, check if the message is a command
	else {
		// Check the list of commands against the message text
		switch(msg.text) {
			case commands[0]:
				countValid();
				startCommand(msg);
				break;
			case commands[1]:
				countValid();
				helpCommand(msg);
				break;
			case commands[2]:
				countValid();
				infoCommand(msg);
				break;
			default: 
				countInvalid();
				logging.unknownQuery(msg);
				break;
		}
	}
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

/* Metrics Handling */
route.get("/metrics", async (ctx) => {
	ctx.body = counters.validQueries;
});

const countValid = () => {
	counters.validQueries.inc();
};

const countInvalid = () => {
	counters.unknownQueries.inc();
};

// server.on(eventAccess, (ctx) => meters.automark(ctx));
// server.on(eventError, () => meters.errorRate.mark(1));

// Expose port
server.listen(4001, "localhost", () => console.log("Listening on port 4001"));