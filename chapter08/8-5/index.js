const level = require("level");
const path = require("path");

const db = level(path.resolve(__dirname, 'app.db'), {
    valueEncoding: 'json'
});

const key = 'user';
const value = {
    name: 'alice'
};

db.put(key, value, (err) => {
    if(err) throw err;
    db.get(key, (err, result) => {
        if(err) throw err;
        console.log('get value: ', result);
        db.del(key, (err) => {
            if(err) throw err;
            console.log('value was deleted');
        });
    });
});

/**
 * @description 读取不存在键时发生错误
 */
// db.get('this-key-does', (err,value) => {
//     if(err) throw err;
//     console.log('value was found:', value);
// });