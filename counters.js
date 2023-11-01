const prom = require("prom-client");

const validQueries = new prom.Counter({
	name: "valid_queries",
	help: "A measurement of the number of valid queries"
});

const unknownQueries = new prom.Counter({
	name: "unknown_queries",
	help: "A measurement of the number of unknown queries. Queries that are not valid x.com/furaffinity links, or a command."
});

validQueries.defaultValue = 0;
unknownQueries.defaultValue = 0;

exports.validQueries = validQueries;
exports.unknownQueries = unknownQueries;
