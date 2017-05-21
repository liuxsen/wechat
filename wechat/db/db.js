let pool = require('./config');
let Promise = require('bluebird');
let co = require('co');
let fs = require('fs');
let Db = function(){};
let wxApi = require('../util/wxapi');

/**
 * 获得所有的图片以及分组信息
 */
let getAllImgs = function(){
	return new Promise((resolve,reject)=>{
		let sql = `select a.*from material a;`
		pool.query(sql, function (err, results, fields) {
			if(err) throw err;
			else{
				console.log(results);
				resolve(results);
			}
		})
	})
}
// 获得组的id，组的名字，以及组的图片数量
let getAllGroups = function(){
	return new Promise((resolve,reject)=>{
		let sql = `select 
					b.id,group_name, count(b.group_name) as groupNum from material a 
					left join img_group b on 
					a.group_id = b.id group by group_name;`
		pool.query(sql, function (err, results, fields) {
			if(err) throw err;
			else{
				resolve(results);
			}
		})
	})
}
/**
 * 获得所有的图片
 */
Db.prototype.findAllImg =function(){
	return new Promise ((resolve,reject)=>{
		co(function*(){
			let allimgs = yield getAllImgs();
			let allGroups = yield getAllGroups();
			let result = {
				allimgs: allimgs,
				allGroups: allGroups
			}
			resolve(result)
		}).catch(onerror)
	})
};
/**
 * 删除图片
 * @param  {number}
 * @return {[type]}
 */
Db.prototype.removeImg =function(imgId){
	let sql = `delete from wechat.material where id = ${imgId};`
	return new Promise((resolve,reject)=>{
		pool.query(sql,function(err,results,fields){
			console.log(results);
			resolve(results);
		})
	})
};

/**
 * [addImg description]
 * @param {[type]} fileName    [文件的真实名字]
 * @param {[type]} newPathName [文件在磁盘上的名字]
 */
function saveImg (fileName,wxImgUrl,newPathName){
	return new Promise((resolve,reject)=>{
		// 开始保存到数据库中
		let sql = `INSERT INTO wechat.material (img_name, img_url,local_name) VALUES ('${fileName}', '${wxImgUrl}','${newPathName}');`
		pool.query(sql,function(err,results,fields){
			resolve(results);
		})
	})
}
// 
function getEndImg (){
	return new Promise((resolve,reject)=>{
		// 获得最后一个图片的信息
		let sql = `select a.* from material a where id = (select max(b.id) from material b);`
		pool.query(sql,function(err,results,fields){
			resolve(results);
		})
	})
}
Db.prototype.addImg =function(fileName,newPathName){
	/*
	return new Promise((resolve,reject)=>{
		
	})*/
	return new Promise((resolve,reject)=>{
		co(function*(){
			let result = yield wxApi.uploadImg(newPathName);
				result = JSON.parse(result);
			let wxImgUrl = result.url;
			let saveResult = yield saveImg(fileName,wxImgUrl,newPathName);
			let endImgInfo = yield getEndImg();
			resolve(endImgInfo)
		}).catch(onerror)
	})
};
/**
 * @param {String 添加分组信息}
 */
Db.prototype.addGroup =function(groupName){
	let sql = `INSERT INTO wechat.img_group (group_name) VALUES ('${groupName}');`
	return new Promise((resolve,reject)=>{
		pool.query(sql,(err,results,fields)=>{
			console.log(results);
			resolve(results);
		})
	})
};

/**
 * 移动分组信息
 * @param  {Number}
 * @param  {Number}
 * @return {[type]}
 */
Db.prototype.moveGroup =function(imgId,groupId){
	return new Promise((resolve,reject)=>{
		let sql = `UPDATE wechat.material SET group_id='${groupId}' WHERE id='${imgId}'`;
		pool.query(sql,(err,results,fields)=>{
			if(err) reject(err);
			else{
				resolve(results);
			}
		})
	})
};
/**
 * @param  {删除分组}
 * @return {[type]}
 */
let deleteImgsGroup = function(groupId){
	return new Promise((resolve,reject)=>{
		let sql = `UPDATE wechat.material SET group_id=NULL WHERE group_id=${groupId};`;
		pool.query(sql,(err,results,fields)=>{
			if(err) reject(err);
			else{
				resolve(results);
			}
		})
	})
}

Db.prototype.removeGroup =function(groupId){
	return new Promise((resolve,reject)=>{
		co(function*(){
			yield deleteImgsGroup(groupId);
			let sql = `DELETE FROM wechat.img_group WHERE id=${groupId};`;
			pool.query(sql,(err,results,fields)=>{
				if(err) reject(err);
				else{
					resolve(results);
				}
			})
		}).catch(onerror)
	})
};



function onerror(err){
	console.log(err);
}
let db = new Db();

module.exports = db;