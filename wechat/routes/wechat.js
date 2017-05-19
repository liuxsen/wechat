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
    db = new db();
console.log(db);

let formidable = require('formidable');

console.log(path.join(__dirname,'../uploads/'));
let co = require('co');

let Token = require('../util/updateToken');

let token = new Token(config.wechat);

let prefix = 'https://api.weixin.qq.com/cgi-bin/';

let api = {
    user: {
        getlist: prefix+'user/get?access_token=',
        info: prefix+ 'user/info?access_token=',
        infoList: prefix+'user/info/batchget?access_token='
    },
    tag:{
        create:prefix + 'tags/create?access_token=',
        get:prefix + 'tags/get?access_token='
    },
    material:{
        addMaterial: prefix + 'material/add_material?access_token=', //新增图文素材
        uploadimg: prefix + 'media/uploadimg?access_token=' //新增图片
    },
    group:{
        get: prefix+'user/get?access_token=',//获得用户列表

    }
};


function Wechat (){}

/**
 *
 * 获得所有的用户openid
 * @param next_openid
 * @returns {bluebird|*}
 */
Wechat.prototype.fetchUserList = function(next_openid){
    return new Promise((resolve,reject)=>{
        token.fetchAccessToken()
            .then((data)=>{
                next_openid = next_openid || '';
                url = `${api.user.getlist}${data.access_token}&next_openid=${next_openid}`;
                rq({url:url,json:true,method: 'GET'}).then(function(response){
                    resolve(response.body);
                })
            })
    })
};
/**
 *  selfopenid   o2gkvuBvc_il-f0As0GjBzlqknJo
 * @param opendid 用户id
 * @param lang 语言   zh_CN 简体，zh_TW 繁体，en 英语
 */
Wechat.prototype.userinfo = function(opendid,lang){
    return new Promise((resolve,reject)=>{
        token.fetchAccessToken()
            .then((data)=>{
                lang = lang || 'zh_CH';
                let access_token = data.access_token;
                url = api.user.info+access_token+'&openid='+opendid+'&lang='+lang;
                rq({url:url,json:true,method: 'GET'})
                    .then((response)=>{
                        // console.log(response.body);
                        resolve(response.body);
                    })
            })
    })
};
//获得所有的用户
Wechat.prototype.infoList = function(openidList){
    return new Promise((resolve,reject)=>{
        token.fetchAccessToken()
            .then((data)=>{
                let body = {
                    user_list:openidList
                };
                let access_token = data.access_token;
                url = api.user.infoList + access_token;
                rq({method:'POST',url:url,json:true,body: body})
                    .then((response)=>{
                        resolve(response.body);
                    })
            })
    })
};
/**
 * 创建用户标签
 * @param openidList
 */
Wechat.prototype.createTag = function(tagName){
    return new Promise((resolve,reject)=>{
        token.fetchAccessToken()
            .then((data)=>{
                let body = {
                    tag: {
                        name: tagName
                    }
                };
                let url = api.tag.create+data.access_token;
                rq({method:'POST',url:url,json:true,body: body})
                    .then((response)=>{
                        resolve(response.body);
                    })
            })
    })
};
/**
 * 获得已经创建的tags
 */
Wechat.prototype.getTags = function(){
    return new Promise((resolve,reject)=>{
        token.fetchAccessToken()
            .then((data)=>{
                let url = api.tag.get+data.access_token;
                rq({method:'GET',url:url,json:true})
                    .then((response)=>{
                        resolve(response.body);
                    })
            })
    })
};

/**
 * 新增图片
 * @param type
 */
Wechat.prototype.uploadimg = function(newPath){
    return new Promise((resolve,reject)=>{
        token.fetchAccessToken()
            .then((data)=>{
                let formData = {
                    media: fs.createReadStream(newPath),
                    access_token: data.access_token
                };
                let url= api.material.uploadimg + data.access_token;
                request.post({url:url, formData: formData}, function optionalCallback(err, httpResponse, body) {
                    if (err) {
                        return console.error('upload failed:', err);
                    }
                    resolve(body);
                });
            })
    })
};
/**
 * 重命名图片
 * @param path
 * @param newPath
 */
Wechat.prototype.renameImg = function(path,newPath){
    return new Promise((resolve,reject)=>{
        fs.rename(path,newPath,(err)=>{
            if(err){
                throw err;
            }else{
                resolve(newPath)
            }
        })
    })
};
//获得分组信息；
Wechat.prototype.getGroups = function(){
    return new Promise((resolve,reject)=>{

    })
};

let wechat = new Wechat();

router.post('/', function(req, res, next) {
    co(function *(){
        let alluserlist = yield wechat.fetchUserList();
        let userinfo = yield wechat.userinfo('o2gkvuBvc_il-f0As0GjBzlqknJo');

        let tag = yield wechat.createTag('厉害组');
        let tags = yield wechat.getTags();
        let openidList = [
            {
                openid: 'o2gkvuBvc_il-f0As0GjBzlqknJo',
                lang: 'zh_CN'
            }
        ];
        let userinfolist = yield wechat.infoList(openidList);
        console.log(tag);
        res.send('hello');
    }).catch(onerror);
});
router.post('/img', function(req, res, next) {
        let form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname,"../uploads");
        form.parse(req, function(err, fields, files) {
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
            let oldPath = files.file.path;
            let name = files.file.name;
            console.log(name);
            let newPath = oldPath+type;
            console.log(type,oldPath,name,newPath);
            co(function *(){
               let newpath =  yield wechat.renameImg(oldPath,newPath);
               // let addMaterial = yield wechat.uploadimg(newpath);
               //  console.log(addMaterial);
                let imgData = yield wechat.uploadimg(newpath);
                console.log(imgData);
                    imgData = JSON.parse(imgData);
                    imgData.imgName = name;
                let isSaved = db.addImg(imgData.url,name);
                if(isSaved){
                    res.send(imgData);
                }else{
                    res.send({msg:'数据库保存出错'})
                }

            }).catch(onerror);

            // console.log(media);
        });
});
router.post('/get',(req,res,next)=>{
    co(function *(){
        let imgs = yield db.getImgs();
        let groups = yield db.getGroups();
        console.log(groups);
        console.log(groups);
        console.log(imgs);
        let result = {
            imgs: imgs,
            groups: groups
        };
        res.send(result);
    }).catch(onerror);
});

router.post('/group',(req,res,next)=>{
    let groupName = req;
        console.log(groupName);
    db.addGroup(groupName)
        .then((data)=>{
            res.send('success')
        })
})



function onerror(err) {
    // log any uncaught errors
    // co will not throw any errors you do not handle!!!
    // HANDLE ALL YOUR ERRORS!!!
    console.error(err.stack);
}

module.exports = router;