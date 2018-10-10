const http = require('http');

const hostnmae = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    parseBodyJson(req, (err, payload) => {
        const c = { c: payload.a + payload.b };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(c));
    });
});

server.listen(port, hostnmae, () => {
    console.log(`Server running at http://${hostnmae}:${port}/`)
});

function parseBodyJson(req, cb) {
    req.on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();

        let params = JSON.parse(body);

        cb(null, params);
    });
}