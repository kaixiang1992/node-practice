const net = require("net");
const redis = require("redis");
const client = redis.createClient(6379, '127.0.0.1');

client.on("connect", () => {
    console.log(`Redis client connected server`);
});

/**
 * @description 为每个连接到聊天服务器的用户定义的配置逻辑
 */
const server = net.createServer(socket => {
    const subscriber = redis.createClient(); //TODO: 为每个用户创建订阅客户端
    subscriber.subscribe('main'); //TODO: 频道订阅
    subscriber.on('message', (channel, message) => { //TODO: 频道收到消息后显示给用户
        socket.write(`channel ${channel}：${message}`);
        const publisher = redis.createClient(); //TODO: 为每个用户创建发布客户端
        socket.on('data', data => {
            publisher.publish('main', data); //TODO: 用户输入消息后发布它
        });
        socket.on('end', () => {
            subscriber.unsubscribe('main'); //TODO: 用户断开连接，结束订阅客户端
            subscriber.end(true);
            publisher.end(true);
        });
    });
}); 

server.listen(3000);