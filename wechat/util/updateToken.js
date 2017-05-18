/**
 * Created by liuxsen on 2017/5/15.
 */

let fs = require('fs');

let Promise = require('bluebird');
let request = Promise.promisify(require('request'));

function Wechat (opts){
    this.appid = opts.AppID;
    this.AppSecret = opts.AppSecret;
    this.Token = opts.Token;
    this.wechat_file = opts.wechat_file;
    this.getAccessToken()
        .then((data)=>{
            try{
                data = JSON.parse(data);
            }catch (e){
                return this.updateAccessToken();
            }
            if(this.isValideAccessToken(data)){
                return data;
            }else{
                return this.updateAccessToken();
            }
        })
        .then((data)=>{
            this.saveAccessToken(JSON.stringify(data));
        })
}


//获得access_token
Wechat.prototype.fetchAccessToken = function(){
    return new Promise((resolve,reject)=>{
        this.getAccessToken()
            .then((data)=>{
                resolve(JSON.parse(data));
            })
    })

};

//保存token
Wechat.prototype.saveAccessToken = function(data){
    return new Promise((resolve,reject)=>{
        fs.writeFile(this.wechat_file,data,function(err,result){
            if(err) reject(err);
            else{
                resolve(result);
            }
        })
    })
};
//获得token
Wechat.prototype.getAccessToken = function(){
    return new Promise((resolve,reject)=>{
        fs.readFile(this.wechat_file,'utf8',function(err,result){
            if(err) reject(err);
            else{
                resolve(result);
            }
        })
    })
};
//更新token
Wechat.prototype.updateAccessToken = function(){
    return new Promise((resolve,reject)=> {
        let appid = this.appid;
        let AppSecret = this.AppSecret;

        let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${AppSecret}`;

        request({url:url,json:true}).then(function(response){
            console.log('request token');
            let data = response.body;
            // console.log(data);
            let now = new Date().getTime();
            let expires_in = now+ 7000*1000;
            data.expires_in = expires_in;
            resolve(data);
        });
    })
};
//是否是合法的token
Wechat.prototype.isValideAccessToken = function(data){
    if(!data || !data.expires_in || !data.access_token){
        return false;
    }

//    判断access_token 是否过期
    let now = new Date().getTime();
    let expires_in = data.expires_in;
    if(now<expires_in){
        return true;
    }else{
        return false;
    }
};


module.exports = Wechat;