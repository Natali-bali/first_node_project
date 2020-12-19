const fs = require('fs');
const http = require('http');
const url = require('url');
/////////////////////////////
//FILES

// Blocking synchronus way
// const textIn = fs.readFileSync('./txt/input.txt','utf-8')

// const textOut = `This is what we know about avocado ${textIn}.\nCreated on date ${Date.now()}`
// fs.writeFileSync('./txt/textOut.txt', textOut);
// console.log('File written!')

// Non-blocking Asynchronus
// fs.readFile('./txt/start.txt','utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`,'utf-8', (err, data2) => {
//         console.log('aaaaa', data2)
//         fs.readFile(`./txt/append.txt`,'utf-8', (err, data3) => {
//             console.log(data3)
//             fs.writeFile('./txt/result.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//              console.log('written');
//             })


//         })
//     })
// });
// console.log('reading file');
//////////////////////////
//SERVER
const server = http.createServer((req, res)=> {
    // res.end('Hello from the server!')
    // console.log(req.url);
    const pathName = req.url;
    if(pathName == '/overview' || pathName == '/') {
        res.end('this is the overview')
    }
    else if (pathName == '/product') {
        res.end('this is a product')
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