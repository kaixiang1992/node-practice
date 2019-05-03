const express = require("express");
const app = express();

app.get('/', (req,res) => {
    res.send('Hello World!');
});

app.listen(3000, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:3000`);
});