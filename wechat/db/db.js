/**
 * Created by liuxsen on 2017/5/19.
 */
let pool = require('./config');
let Promise = require('bluebird');
function db (){};
//添加图片
db.prototype.addImg = function(url,name){
    return new Promise((resolve,reject)=>{
        let sql = `INSERT INTO img values (null,'${name}','${url}',0)`;
        console.log(sql);
        console.log('---------------------');
        console.log(url,name);
        pool.query(sql, function (error, results, fields) {
            if (error) reject(error);
            else{
                resolve(true);
            }
        });
    });
};

db.prototype.getImgs = function(){
    return new Promise((resolve,reject)=>{
        let sql = `SELECT * FROM img`;
        pool.query(sql, function (error, results, fields) {
            if (error) reject(err);
            else{
                resolve(results);
            }
            // console.log('The solution is: ', fields);
        });
    });
};

db.prototype.updateGroupName = function(opts){
    return new Promise((resolve,reject)=>{
        let imgid = opts.imgid;
        let groupid = opts.groupid;
        let sql = `UPDATE img set groupId=${groupid} where id=${imgid}`;
        pool.query(sql, function (error, results, fields) {
            console.log(results);
            if (error) reject(err);
            // console.log('The solution is: ', fields);
            resolve(results);
        });
    });
};

//获得所有的图片分组
db.prototype.getGroups = function(){
    return new Promise((resolve,reject)=>{
        let sql = `SELECT * FROM img_group`;
        pool.query(sql, function (error, results, fields) {
            console.log(results);
            if (error) reject(err);
            else{
                resolve(results);
            }
            // console.log('The solution is: ', fields);
        });
    });
};
//创建图片分组
db.prototype.addGroup = function(groupName){
    return new Promise((resolve,reject)=>{
        let sql = `INSERT INTO img_group (group_name) values ('${groupName}')`;
        pool.query(sql, function (error, results, fields) {
            console.log(results);
            if (error) reject(error);
            // console.log('The solution is: ', fields);
            resolve(results);
        });
    });
};
module.exports = db;
