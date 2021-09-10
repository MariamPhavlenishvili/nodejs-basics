const fs = require('fs');
const http = require('http');
const url = require('url');

const slugufy = require('slugify');


const replaceTemplate = require('./modules/replaceTemplate');
const { default: slugify } = require('slugify');

// //Blocking, synchronous way

// FILES
// //read data from file
// const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()} `;
// fs.writeFileSync('./starter/txt/output.txt', textOut);
// console.log("File written");

// Non-blocking, asynchronous way
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err,data1) => {
//     fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err,data2) => {
//         console.log(data2);
//         fs.readFile('./starter/txt/append.txt', 'utf-8', (err,data3) => {
//             console.log(data3);

//             fs.writeFile('./starter/txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('your file has been written');
//             })
//         });
//     });
// });
// console.log('Will read file');

// SERVER

// templates
const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');
// reads data from json file
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');

//parse json file here
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, {lower : true}));
console.log(slugs);

const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true);

    // Overview Page
    if(pathname === 'overview' || pathname === '/') {

        res.writeHead(200, {'Content-type' : 'text/html'});

        //gadauvlis yvela json elements da sheva replaceTemplate funqciashi, aqcevs stringad
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

        res.end(output);

    // Product Page
    } else if (pathname === '/product') {
        const product = dataObj[query.id];
        res.writeHead(200, {'Content-type' : 'text/html'});
        const output = replaceTemplate(tempProduct, product);

        res.end(output);

    // Api Page
    } else if (pathname === '/api') {
        res.writeHead(200, {'Content-type' : 'application/json'});
        res.end(data);
    } else {

        // Response Headers
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header' : 'hello-world'
        });
        res.end('<h1> Page not found!</h1>');
    }
})

server.listen(8000,'127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});