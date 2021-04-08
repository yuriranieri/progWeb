const http = require('http');

const hostname = 'ec2-54-196-186-91.compute-1.amazonaws.com';
const port = 80;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html')
	res.end('<h1>Hello World</h1>');
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
