const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');

    const { method, url } = request;

    if (url === '/') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(`<h1>Welcome to HOMEPAGE !</h1>`)
        }else {
            response.statusCode = 400;
            response.end(`<h1>This page cannot be accessed with ${method} request!</h1>`)
        }
    }else if (url === '/about') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(`<h1>This is page about</h1>`)
        }else if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                
                response.statusCode = 200;
                response.end(`<h1>Halo, ${name} this is page about</h1>`);
            });
        }else {
            response.statusCode = 400;
            response.end(`<h1>This page cannot be accessed with ${method} request</h1>`);
        }
    }else {
        response.statusCode = 400;
        response.end(`<h1>This page cannot be access</h1>`);
    }
};


const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server Working at http://${host}:${port}`);
});