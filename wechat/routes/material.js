/**
 * Created by liuxsen on 2017/5/17.
 */
let express = require('express');
let router = express.Router();
let config = require('../config/config');
let Promise = require('bluebird');
let request = require('request');
let rq = Promise.promisify(request);
let path = require('path');
let fs = require('fs');
let db = require('../db/db');
let co = require('co')
let formidable = require('formidable');


// 处理图片素材相关
router.post('/img',(req,res,next)=>{
    let type = req.body.type*1;
    let imgId = req.body.imgId*1;
    let groupName = req.body.groupName;
    let groupId = req.body.groupId*1;
    let imgUrl = req.body.imgUrl;
    let imgName = req.body.imgName;
    co(function*(){
        if(type === 1){
            // 获得所有的图片以及分组信息 完成
            let allImgs = yield db.findAllImg();
            res.send(allImgs);
        }else if(type ===2){
            // 添加分组信息 完成
            let result = yield db.addGroup(groupName);
            res.send(result);
        }else if(type === 3){
            // 删除图片 完成
            let result = yield db.removeImg(imgId);
            res.send(result);
        }else if(type ===4){
            // 移动分组信息 完成
            let result = yield db.moveGroup(imgId,groupId);
            res.send(result);
        }else if(type===5){
            // 删除分组 完成
            let result = yield db.removeGroup(groupId);
            res.send(result);
        }else if(type===6){
            // 添加图片 完成
            let result = yield db.addImg(imgName,imgUrl);
            res.send(result);
        }else if(type === 7){
        //    获得相应组的图片
            let result = yield db.getImgGroupId(groupId);
            res.send(result);
        }
    }).catch(onerror)
})

// 上传图片
router.post('/uploadImg',(req,res,next)=>{
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname,"../uploads");
    form.parse(req, function(err, fields, files) {
        co(function*(){
            console.log(files);
            let fileName = files.file.name; //文件原来的名字
            let filePath = files.file.path;
            let type = files.file.type;
                switch (type){
                    case 'image/png':
                        type = '.png';
                        break;
                    case 'image/jpeg':
                        type = '.jpg';
                        break;
                    default:
                        type = '.jpg'
                }
            let newPathName = filePath+type; //在磁盘上的名字
            let isRename = yield renameImg(filePath,newPathName);
            if(isRename){
                let result = yield db.addImg(fileName,newPathName);
                res.send(result);
            }
        }).catch(onerror);
    })
})

function renameImg (oldPathName,newPathName){
    return new Promise((resolve,reject)=>{
        fs.rename(oldPathName,newPathName,(err)=>{
            if(err) reject(err);
            else{
                resolve(true);
            }
        })
    })
}

function onerror(err){
    console.log(err);
}

module.exports = router;
