const http = require('http');
const readAll = require("./handlers/readAll.js")
const read = require("./handlers/read.js");
const createArticle = require("./handlers/articles/createArticle.js");
const deleteArticle = require("./handlers/articles/deleteArticle.js");
const updateArticle = require("./handlers/articles/updateArticle.js");
const createComment = require("./handlers/comments/createComment");
const deleteComment = require("./handlers/comments/deleteComment");
const hostnmae = '127.0.0.1';
const port = 3000;

const handlers = {
    '/sum': sum,
    '/api/articles/readall': readAll.readAll,
    '/api/articles/read': read.read,
    '/api/articles/create': createArticle.createArticle,
    '/api/articles/update': updateArticle.updateArticle,
    '/api/articles/delete': deleteArticle.deleteArticle,
    '/api/comments/create': createComment.createComment,
    '/api/comments/delete': deleteComment.deleteComment
};

const server = http.createServer((req, res) => {
    parseBodyJson(req, (err, payload) => {
        // const c = { c: payload.a + payload.b };
        const handler = getHandler(req.url);

        handler(req, res, payload, (err, result) => {
            if (err) {
                res.statusCode = err.code;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(err));

                return;
            }


            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        });
    });
});

server.listen(port, hostnmae, () => {
    console.log(`Server running at http://${hostnmae}:${port}/`)
});

function getHandler(url) {
    return handlers[url] || notFound;
}

function sum(req, res, payload, cb) {
    const result = {
        c: payload.a + payload.b
    };
    cb(null, result);
}

function notFound(req, res, payload, cb) {
    cb({
        code: 404,
        message: 'Not found'
    });
}

function parseBodyJson(req, cb) {
    let body = [];

    req.on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();

        let params = JSON.parse(body);

        cb(null, params);
    });
}