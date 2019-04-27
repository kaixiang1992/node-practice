const fs = require("fs");
const path = require("path");
const tasks = [];
const wordCounts = {};
const filesDir = path.resolve(__dirname, 'text');
let completedTasks = 0;

/**
 * @description 统计读取任务次数
 */
function checkIfComplete(){
    completedTasks++;
    if(completedTasks == tasks.length){
        for (const key in wordCounts) {
            console.log(`${key} times: ${wordCounts[key]}`);
        }
    }
}

/**
 * @description 统计每个单词出现次数
 */
function addwordcount(word){
    wordCounts[word] = (wordCounts[word] ? wordCounts[word] + 1 : 1);
}

function countwordsintext(text){
    const words = text.toString().toLowerCase().split(" ").sort();
    words.filter(word => word).forEach(word => addwordcount(word));
}
/**
 * @description 读取指定文件夹下txt文件
 */
fs.readdir(filesDir, (err, files) => {
    if(err) throw new Error(err);
    files.forEach(file => {
        const task = (subfile => {
            return () => {
                fs.readFile(subfile, (err, data) => {
                    if(err) throw new Error(err);
                    countwordsintext(data);
                    checkIfComplete();
                });
            }
        })(`${filesDir}/${file}`);
        tasks.push(task); //TODO: 所有任务都添加到函数调用数组中
    });
    tasks.forEach(task => task());
});