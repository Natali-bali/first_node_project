const fs = require('fs');
const http = require('http');
const url = require('url');

// we read our data flile sync only one time
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((req, res)=> {
    // creating router
    const pathName = req.url;
    if(pathName == '/overview' || pathName == '/') {
        res.end('this is the overview')
    }
    else if (pathName == '/product') {
        res.end('this is a product')
    }
    else if (pathName == '/api') {
        // we need to send to brauser this header to read content
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'My-own-header': 'hello'
        })
        res.end('<h1>PAGE NOT FOUND</h1>');
    }
})
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
})