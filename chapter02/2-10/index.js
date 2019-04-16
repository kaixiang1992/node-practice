const net = require("net");

const server = net.createServer(socket => {
    socket.once('data', (data) => {
        console.log(data.toString());
        socket.write(data);
    });
});

server.listen(3000, '127.0.0.1', () => {
    console.log(`Server running at 127.0.0.1:3000`);
});