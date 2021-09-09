const fs = require('fs');
const http = require('http');
const url = require('url');

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

// reads data from json file
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');

//parse json file here
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if(pathName === 'overview' || pathName === '/') {
        res.end('This is OVERVIEW');
    } else if (pathName === '/product') {
        res.end('This is PRODUCT');
    } else if (pathName === '/api') {
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