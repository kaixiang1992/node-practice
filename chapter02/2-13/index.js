const path = require("path");
const fs = require("fs");
const wacthdir = path.resolve(__dirname, 'lib');
const processeddir = path.resolve(__dirname, 'backuplib');

const Watcher = require("./watcher.js");
const watcher = new Watcher(wacthdir, processeddir);

watcher.on('process', (file) => {
    const wactchfile = `${wacthdir}/${file}`;
    const processedfile = `${processeddir}/${file.toLowerCase()}`;
    fs.rename(wactchfile, processedfile, (err) => {
        if(err) throw new Error(err);
    });
});

watcher.start();
