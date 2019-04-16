const path = require("path");
const http = require("http");
const fs = require("fs");

const server =  http.createServer((req,res) => {
    if(req.url == "/"){
        new Promise((resolve, reject) => { //TODO: step 1：读取json文件
            fs.readFile(path.resolve(__dirname, 'titles.json'), (err, data) => {
                if(err){
                    throw new Error(err);
                }
                const titles = JSON.parse(data.toString());
                resolve(titles);
            })
        }).then((data) => { //TODO: step 2：读取渲染模板
            fs.readFile(path.resolve(__dirname, 'template.html'), (err, template) => {
                if(err){
                    throw new Error(err);
                }
                const tmpl = template.toString();
                const html = tmpl.replace('%', data.join('</li><li>'));
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(html);
            });
        }).catch((err) => {
            console.log(err);
        });
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:3000`);
});
