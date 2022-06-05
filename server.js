const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');

    const { method, url } = request;

    if (url === '/') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: `Welcome to HOMEPAGE !`,
            }));
        }else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `This page cannot be accessed with ${method} request`,
            }));
        }
    }else if (url === '/about') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: `This is page about`,
            }));
        }else if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                
                response.statusCode = 200;
                response.end(JSON.stringify({
                    message: `Halo, ${name} this is page about`,
                }));
            });
        }else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `This page cannot be accessed with ${method} request`,
            }));
        }
    }else {
        response.statusCode = 400;
        response.end(JSON.stringify({
            message: 'Page Not Found!',
        }));
    }
};


const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server Working at http://${host}:${port}`);
});