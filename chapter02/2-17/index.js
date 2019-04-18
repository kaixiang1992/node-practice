const fs = require("fs");
const path = require("path");
const request = require("request");
const htmlparser = require("htmlparser");
const configFilename  = path.resolve(__dirname, 'url.txt');

/**
 * @description 1.确保包含RSS URL列表文件存在
 */
function checkRssFile(){
    fs.exists(configFilename, (exists) => {
        if(!exists){ //TODO: 返回false未找到该文件
            return next(new Error(`404 Not Found ${configFilename}`), null);
        }
        next(null, configFilename);
    });

}

/**
 * @description 2.读取并解析URL文件
 * @param {String} configFilename 
 */
function readRssFile(configFilename){
    fs.readFile(configFilename, (err, rssfile) => {
        if(err){
            return next(new Error(err), null);
        }
        // ["https://www.baidu.com/", "https://translate.google.cn/", "http://www.poker4d.club/#/index"]
        const feedlist = rssfile.toString().replace(/^\s+|\s+$/g, '').split('\n'); //TODO: 将URL列表转换为字符串，然后转数组
        const random = Math.floor(Math.random() * feedlist.length); //TODO: 随机获得一个0-length的URL
        next(null, feedlist[random]);
    });
}

/**
 * @description 3.向选定的URL发送HTTP请求获取数据
 * @param {String} feedUrl 
 */
function downloadRssFile(feedUrl){
    request(feedUrl, function(error, response, body){
        if(error){
            return next(error, null);
        }
        if(response.statusCode != 200){
            return next(new Error('statusCode != 200'), null);
        }
        next(null, body);
    });
}

/**
 * @description 4.将数据解析到一个条目数组中
 * @param {String} rss 
 */
function parseRssFile(rss){
    const handler = new htmlparser.RssHandler();
    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    if(!handler.dom.length){
        return next(new Error('No RSS items found'));
    }
    const item = handler.dom.shift();
    console.log('读取到的数据.....');
    console.log(item);
}


/**
 * @description 所有按顺序执行任务
 */
const tasks = [
    checkRssFile,
    readRssFile,
    downloadRssFile,
    parseRssFile
]

/**
 * @description 负责执行任务的next函数
 */
function next(err = null, result = null){
    if(err) throw new Error(err); //TODO: 任务出错，抛出错误
    const currenttask = tasks.shift();
    console.log(currenttask.name);
    if(currenttask){ //TODO: 执行当前任务
        currenttask(result);
    }
}

next();



