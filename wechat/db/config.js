/**
 * Created by liuxsen on 2017/5/17.
 */
let mysql      = require('mysql');

let pool = mysql.createPool({
    // host     : '192.168.2.232',
    host     : '192.168.1.102',
    connectionLimit : 3,
    user     : 'root',
    password : 'mysql',
    database : 'wechat'
});

/*pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', rows[0].solution);
});*/

module.exports = pool;
