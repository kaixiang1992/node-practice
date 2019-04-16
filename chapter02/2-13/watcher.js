const fs = require("fs");
const events = require("events");

class Watcher extends events.EventEmitter {
    /**
     * @param {String} wacthdir 监视目录
     * @param {String} processeddir 处理后目录
     */
    constructor(wacthdir, processeddir){
        super();
        this.wacthdir = wacthdir;
        this.processeddir = processeddir;
    }
    /**
     * @description 处理wacthdir目录中的所有文件
     */
    watch(){
        fs.readdir(this.wacthdir, (err, files) => {
            if(err) throw new Error(err);
            for (const index in files) {
                this.emit('process', files[index]);
            }
        });
    }
    /**
     * @description 启动监控wacthdir目录
     */
    start(){
        fs.watchFile(this.wacthdir, () => {
            this.watch();
        });
    }
}

module.exports = Watcher;