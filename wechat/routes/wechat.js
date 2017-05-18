/**
 * Created by liuxsen on 2017/5/17.
 */
let express = require('express');
let router = express.Router();
let config = require('../config/config');
let Promise = require('bluebird');
let request = Promise.promisify(require('request'));

let co = require('co');

let Token = require('../util/updateToken');

let token = new Token(config.wechat);

let db = require('../db/config');

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
                request({url:url,json:true,method: 'GET'}).then(function(response){
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
                request({url:url,json:true,method: 'GET'})
                    .then((response)=>{
                        // console.log(response.body);
                        resolve(response.body);
                    })
            })
    })
};
Wechat.prototype.infoList = function(openidList){
    return new Promise((resolve,reject)=>{
        token.fetchAccessToken()
            .then((data)=>{
                let body = {
                    user_list:openidList
                };
                let access_token = data.access_token;
                url = api.user.infoList + access_token;
                request({method:'POST',url:url,json:true,body: body})
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
                request({method:'POST',url:url,json:true,body: body})
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
                request({method:'GET',url:url,json:true})
                    .then((response)=>{
                        resolve(response.body);
                    })
            })
    })
}


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
        res.send(tags);
    }).catch(onerror);

});

function onerror(err) {
    // log any uncaught errors
    // co will not throw any errors you do not handle!!!
    // HANDLE ALL YOUR ERRORS!!!
    console.error(err.stack);
}

module.exports = router;