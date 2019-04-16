const events = require("events");
const net = require("net");
const channel = new events.EventEmitter();
channel.clients = {}; //TODO: 存储用户客服端信息
channel.subscription = {}; //TODO: 针对当前用户进行订阅

/**
 * @description 添加用户加入事件监听器
 */
channel.on('join', function(id, client) {
    this.clients[id] = client; //TODO: 保存用户ID的client对象，以便程序将数据发给用户
    client.write(`Welcome! Current online ${this.listeners('broadcast').length} users`);
    this.clients[id].write(`${id} joined succeed.....\n`.trim()); //TODO: 加入成功，提示
    this.subscription[id] = (senderID, message) => {
        if(id != senderID){ //TODO: 忽略同一个用户推送消息
            this.clients[id].write(`System push id is ${id} msg: ${message}\n`);
        }
        // this.clients[id].write(`\nSystem push msg: ${message}`.trim())
    }
    channel.on('broadcast', this.subscription[id]); //TODO: 添加针对当前用户的广播事件监听器
});

/**
 * @description 用户断开连接移出添加的broadcast监听器
 */
channel.on('leave', function(id){ 
    // TODO: 移除指定ID的客户端的broadcast监听器
    channel.removeListener('broadcast', this.subscription[id]);
    channel.emit('broadcast', id, `${id} has left the chatroom.\n`);
});

/**
 * @description 停止提供聊天服务
 */
channel.on('shutdown', () => {
    channel.emit('broadcast', '', 'The server has shut down.\n');
    channel.removeAllListeners('broadcast');
});

const server = net.createServer(client => {
    const id = `${client.remotePort}`; //TODO: 示例127.0.0.1:56501
    // const id = `${client.remoteAddress}:${client.remotePort}`; //TODO: 示例127.0.0.1:56501
    channel.emit('join', id, client); //TODO: 用户访问时，触发加入事件监听器
    client.on('data', (data) => { //TODO: 用户发送数据时，触发广播事件监听器，指明用户ID和广播内容
        const msg = data.toString();
        if(msg == 1){
            channel.emit('shutdown');
        }
        channel.emit('broadcast', id, msg); 
    });
    client.on('close', (data) => { //TODO: 用户关闭连接
        // console.log(data); false
        channel.emit('leave', id);
    });
    client.on('error', (err) => { //TODO: 错误处理
        channel.emit('broadcast', id, err.message);
    });
});

server.listen(3000, '127.0.0.1', () => {
    console.log(`Server running at 127.0.0.1:3000`);
});