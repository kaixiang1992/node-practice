const net = require("net");

const server = net.createServer(socket => {
    socket.on('data', data => { //TODO: 当读取到新数据时处理data事件
        console.log(data.toString());
        socket.write(data);
    });
});

server.listen(3000, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:3000`)
});