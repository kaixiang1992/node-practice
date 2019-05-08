const redis = require("redis");
const client = redis.createClient(6379, '127.0.0.1');

client.on("connect", () => {
    console.log(`Redis client connect to server.`);
});

/**
 * @description 单值和多值数组
 */
// client.set('users', ['Alice', 'Bob'], redis.print); //TODO: ReplyError: ERR syntax error
client.set('users', ['kaixiang'], redis.print);
client.get('users', redis.print);