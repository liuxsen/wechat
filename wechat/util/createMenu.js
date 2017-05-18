/**
 * Created by liuxsen on 2017/5/16.
 */
let Promise = require('bluebird');
let request = Promise.promisify(require('request'));

let config = require('../config/config');
let Wechat = require('./updateToken');
let wechat = new Wechat(config.wechat);

let menu = {
    "button": [
        {
            "type": "click",
            "name": "今日歌曲",
            "key": "V1001_TODAY_MUSIC"
        },
        {
            "name": "菜单",
            "sub_button": [
                {
                    "type": "view",
                    "name": "搜索",
                    "url": "http://www.soso.com/"
                },
                {
                    "type": "click",
                    "name": "赞一下我们",
                    "key": "V1001_GOOD"
                }]
        }]
};


module.exports = function () {
    wechat.fetchAccessToken()
        .then((data) => {
            let url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${data.access_token}`;
            request({url: url,body: menu,method:'POST',json:true})
                .then((response)=>{
                    console.log('---------------------------');
                    console.log(response.body);
                })
        });
};


