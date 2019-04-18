const async = require("async");

async.series([
    callbaclk => {
        setTimeout(() => {
            console.log(1);
            callbaclk();
        }, 1000);
    },
    callbaclk => {
        setTimeout(() => {
            console.log(2);
            callbaclk();
        }, 500);
    },
    callbaclk => {
        setTimeout(() => {
            console.log(3);
            callbaclk();
        }, 100);
    }
]);