const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if(!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;
}

// we read our data flile sync because only one time
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
let tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');


// ------CREATING SERVER
const server = http.createServer((req, res)=> {
    // parsing our url to get pathname and id
    const {search, query, pathname} = url.parse(req.url, true);

    // creating router
    //-------- OVERVIEW
    if(pathName == '/overview' || pathName == '/') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el))
        // console.log(cardsHtml);
        const output = tempOverview.replace(/{%PRODUCT_CARD%}/g, cardsHtml);
        // console.log(tempOverview);
        res.end(output);
    }
    // --------PRODUCT PAGE
    else if (pathName == `/product${search}`) {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const productHtml = replaceTemplate(tempProduct, product);
        res.end(productHtml);
    }
    // --------API
    else if (pathName == '/api') {
        // we need to send to brauser this header to read content
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    }
    // ---------ERROR NOT FOUND
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