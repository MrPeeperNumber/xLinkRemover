const bot = require("./package.json");

// Functions for console logging
const log = (msg) => {
	console.log({
		time: new Date(),
		command: msg.text,
		username: {
			name: msg.from.username,
			userId: msg.from.id
		},
		contents: msg.text,
		botVersion: bot.version
	});
};

const logInChat = (msg) => {
	console.log({
		time: new Date(),
		command: "In-Chat Convertion Request",
		username: {
			name: msg.from.username,
			userId: msg.from.id
		},
		contents: msg.text,
		botVersion: bot.version
	});
};

const logInline = (query) => {
	console.log({
		time: new Date(),
		command: "Inline Query",
		username: {
			name: query.from.username,
			userId: query.from.id
		},
		contents: query.query,
		botVersion: bot.version
	});
};

const unknownQuery = (message) => {
	if(message.query) {
		console.log({
			time: new Date(),
			command: "Unknown Inline Query",
			username: {
				name: message.from.username,
				userId: message.from.id
			},
			contents: message.query,
			botVersion: bot.version
		});
	}
	else if(message.text && !message.text.includes("vxtwitter.com") && !message.text.includes("vxfuraffinity.net")) {
		console.log({
			time: new Date(),
			command: "Unknown Query",
			username: {
				name: message.from.username,
				userId: message.from.id
			},
			contents: message.text,
			botVersion: bot.version
		});
	}
};

exports.log = log;
exports.logInChat = logInChat;
exports.logInline = logInline;
exports.unknownQuery = unknownQuery;