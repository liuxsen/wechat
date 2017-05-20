// 获得所有的素材图片
let db = require('./db');
    db = new db();
let Promise = require('bluebird');

/**
 * 获得所有的图片
 * @return {[type]} [description]
 */
function getimgs(){
  return new Promise((resolve,reject)=>{
    db.getImgs()
      .then((results)=>{
        resolve(results);
      })
  })
}
/**
 * 获得所有的素材分组
 * @return {[type]} [description]
 */
function getGroups(){
  return new Promise((resolve,reject)=>{
    db.getGroups()
      .then((results)=>{
        resolve(results);
      })
  })
}
