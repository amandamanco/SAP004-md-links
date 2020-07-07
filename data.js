const mdLinks = (path) => {
    const fs = require('fs');
    let str = fs.readFile(`${path}`, "utf8");
    let regex = /\[(.*?)\]/g;
    const result = str.match(regex);
    result.map((link) => {
        // const result = link.replace('[', '');
        // const result2 = result.replace(']', '');
        console.log('LINK => ', link);
    })
}
module.exports = mdLinks
