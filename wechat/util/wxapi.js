let Promise = require('bluebird');
let co = require('co');
let fs = require('fs');
let Token = require('../util/updateToken');
let config = require('../config/config');
let token = new Token(config.wechat);
let request = require('request');
let rq = Promise.promisify(request);

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

let wxApi ={
    uploadImg:function(path,next_openid){
        return new Promise((resolve,reject)=>{
            token.fetchAccessToken()
                .then((data)=>{
                    let formData = {
                        media: fs.createReadStream(path),
                        access_token: data.access_token
                    };
                    let url= api.material.uploadimg + data.access_token;
                    request.post({url:url, formData: formData}, function optionalCallback(err, httpResponse, body) {
                        if (err) {
                            return console.error('upload failed:', err);
                        }
                        console.log(body);
                        resolve(body);
                    });
                })
        })
    }
}


module.exports = wxApi;