const redis = require("redis");
const client = redis.createClient(6379, '127.0.0.1');

client.on("connect", () => {
    console.log(`Redis client connected to server.`);
});

/**
 * @description 设定散列值键/值对
 */
client.hmset('camping', {
    shelter: '2-person tent',
    cooking: 'capstove'
}, redis.print);
client.hget('camping', 'shelter', (err, value) => { //TODO: 获取camping.shelter的值
    if(err) throw err;
    console.log('hget camping shelter is', value);
});
client.hkeys('camping', (err, keys) => { //TODO: 获取camping中的键
    if(err) throw err;
    keys.forEach(key => {
        console.log(`key is ${key}`);
    });
});
client.hvals('camping', (err, values) => { //TODO: 获取camping中的value
    if(err) throw err;
    values.forEach(val => {
        console.log(`value is ${val}`);
    });
});


/**
 * @description 使用列表
 */
client.lpush('tasks', 'paint the bikeshed red.', redis.print);
client.lpush('tasks', 'paint the bikeshed green.', redis.print);
 /**
  * @param key 键名
  * @param start 开始索引
  * @param stop 结束索引 -1表示最后一个元素
  * @function callback
  */
client.lrange('tasks', 0, -1, (err, items) => {
    if(err) throw err;
    items.forEach( item => {
        console.log(item);
    });
});


/**
 * @description 使用集合
 */
client.sadd('admins', 'alice', redis.print);
client.sadd('admins', 'bob', redis.print);
client.sadd('admins', 'alice', redis.print);
client.smembers('admins', (err, members) => {
    if(err) throw err;
    console.log(members);
});