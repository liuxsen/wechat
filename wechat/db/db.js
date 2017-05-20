/**
 * Created by liuxsen on 2017/5/19.
 */
let pool = require('./config');
let Promise = require('bluebird');
let co = require('co');
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

/**
 * 获得所有的图片信息
 * @return {[type]} [description]
 */
function getImgs (){
  return new Promise((resolve,reject)=>{
    let sql = `select img.id as img_id,img_name,img_url,img_group.id as group_id from img,img_group where
                img.id = img_group.img_id;`;
    pool.query(sql, function (error, results, fields) {
        if (error) reject(err);
        else{
          console.log('-----------imgs--------------')
            resolve(results);
        }
    });
  })
}
/**
 * 获得所有的分组信息
 * @return {[type]} [description]
 */
function getGroups (){
  return new Promise((resolve,reject)=>{
    let sql = `select group_name, count(img_id) as imgCount  from img_group t group by group_name;`;
    pool.query(sql, function (error, results, fields) {
        if (error) reject(err);
        else{
            resolve(results);
        }
    });
  })
}
/**
 * 获得图片，以及图片分组信息
 * @return {[type]} [description]
 */
db.prototype.getImgs = function(){
    return new Promise((resolve,reject)=>{
        co(function*(){
          let imgs = yield getImgs();
          let groups = yield getGroups();
          let result = {
            imgs:imgs,
            groups: groups
          };
          console.log(result);
          resolve(result)
        }).catch(onerror);
    });
};
db.prototype.renameImg = function(imgId,newName){
    return new Promise((resolve,reject)=>{
      console.log(imgId,newName);
        let sql = `UPDATE img set img_name='${newName}' where id=${imgId}`;
        pool.query(sql, function (error, results, fields) {
            if (error) reject(error);
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
        let sql = `select groupName ,id from wechat.img_group;`;
        pool.query(sql, function (error, results, fields) {
            console.log(results);
            if (error) reject(error);
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
/**
 * 修改分组
 * @param {[type]} groupName [description]
 */
db.prototype.updateGroup = function(groupId,groupName){
    return new Promise((resolve,reject)=>{
        let sql = `UPDATE img_group set group_name='${groupName}' where id=${groupId}`;
        pool.query(sql, function (error, results, fields) {
            console.log(results);
            if (error) reject(error);
            // console.log('The solution is: ', fields);
            resolve(results);
        });
    });
};
/**
 * 删除分组
 * @param {[type]} groupName [description]
 */
db.prototype.updateGroup = function(groupId){
    return new Promise((resolve,reject)=>{
        let sql = `delete from img_group where id=${groupId}`;
        pool.query(sql, function (error, results, fields) {
            console.log(results);
            if (error) reject(error);
            // console.log('The solution is: ', fields);
            resolve(results);
        });
    });
};

function onerror(err) {
    // log any uncaught errors
    // co will not throw any errors you do not handle!!!
    // HANDLE ALL YOUR ERRORS!!!
    console.error(err.stack);
}


module.exports = db;
