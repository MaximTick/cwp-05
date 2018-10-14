const fs = require("fs");
module.exports.log = function(url, data){
    const curDate = new Date()
    fs.appendFileSync("log.txt", `\nDate: ${curDate.getDay()}.${curDate.getMonth() + 1}.${curDate.getFullYear()} 
    ${curDate.getHours()}:${curDate.getMinutes()}:${curDate.getSeconds()}
    \tUrl:${url}\tData: ${JSON.parse(data)}\n`);
};