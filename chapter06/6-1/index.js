const connect = require("connect");
const app = connect();

app.use((req,res,next) => {
    res.end('Hello,world!');
});

app.listen(3000, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:3000`);
});