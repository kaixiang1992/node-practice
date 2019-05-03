const connect = require("connect");
const app = connect();
const logger = require("./middleware/logger");

function hello(req,res){
    res.setHeader('Content-Type', 'text/html');
    res.end('hello world!');
}

app.use(logger(':method :url')).use(hello).listen(3000, '127.0.0.1', () => {
    console.log(`Server runing at http://127.0.0.1:3000`);
});