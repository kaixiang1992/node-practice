const redis = require("redis");
const client = redis.createClient(6379, '127.0.0.1');

client.on("connect", () => {
    console.log(`Redis client connected to server.`);
});

client.on("ready", () => {
    console.log(`Redis server is ready.`);
});

client.on("error", (err) => {
    console.log("Redis error", err);
});

/**
 * @description 普通键/值存储
 */
client.set('color', 'red', (err) => {
    if(err) throw err;
});
client.get('color', (err, value) => {
    if(err) throw err;
    console.log(`Get: `, value);
});
client.set('greeting', '你好', redis.print);
client.get('greeting', redis.print);
client.set('icon', '?', redis.print);
client.get('icon', redis.print);
/**
 * @description 默认将键和值强制转换成字符串
 */
client.set('colors', 1, redis.print);
client.get('colors', (err, value) => {
    if(err) throw err;
    console.log('Got: %s as %s', value, typeof value); //TODO: 值得类型为字符串
});

/**
 * @description 检查某个键是否存在
 * 存在返回：1
 * 不存在返回：0
 */
client.exists('color', (err, doesExists) => {
    if(err) throw err;
    console.log('color exists:', doesExists);
});

/**
 * @description 设置对象、数组、正则表达式
 * 客户端发出警告
 */
client.set('users', {}, redis.print);