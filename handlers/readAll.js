const log = require("../log.js");
let articles = require("../articles.json");

module.exports.readAll = function (req, res, payload, cb) {
    log.log(req.url, JSON.stringify(payload));
};