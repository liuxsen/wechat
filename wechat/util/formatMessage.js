/**
 * Created by liuxsen on 2017/5/15.
 */
let parseString = require('xml2js').parseString;

module.exports = function(xml){
    return new Promise((resolve,reject)=>{
        parseString(xml, function (err, result) {
            result = format(result.xml);
            resolve(result);
        });
    })
};

function format(result){
    let message = {};
    if (typeof result === 'object') {
        let keys = Object.keys(result);
        for (let i = 0; i < keys.length; i++) {
            let item = result[keys[i]];
            let key = keys[i];

            if (!(item instanceof Array) || item.length === 0) {
                continue;
            }
            if (item.length === 1) {
                let val = item[0];
                if (typeof val === 'object') {
                    message[key] = format(val);
                } else {
                    message[key] = (val || '').trim();
                }
            } else {
                message[key] = [];
                for (let j = 0; j < item.length; j++) {
                    message[key].push(format(item[j]));
                }
            }
        }
    }
    return message;
}