const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    const { method } = request;
    
    if (method === 'GET') {
        response.end('<h1>Wooo you GET it! This is GET Method !</h1>');
    }
    if (method === 'POST') {
        response.end('<h1>Woah! you just use POST Method !</h1>');
    }
    if (method === 'PUT') {
        response.end('<h1>Hi there! always PUT your hearth to Allah!</h1>');
    }
    if (method === 'DELETE') {
        response.end('<h1>don\'t forget DELETE your browser history !</h1>');
    }
        
    response.end('<h1>Hallo HTTP Server!</h1>');
};


const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server Working at http://${host}:${port}`);
});