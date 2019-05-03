function logger(options){
    const regexp = /:(\w+)/ig;
    return (req, res, next) => {
        const str = options.replace(regexp, (match, property) => {
            return req[property];
        });
        console.log(str);
        next();
    }
}

module.exports = logger;