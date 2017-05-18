/**
 * Created by liuxsen on 2017/5/16.
 */
let request = require('request');

module.exports =  function(info,param){
    let accessToken = info.accessToken;
    let type = info.type;
    //新增临时素材
    let url = `https://api.weixin.qq.com/cgi-bin/media/upload?access_token=${accessToken}&type=${type}`;
    // if(!param){
    //     url = `https://api.weixin.qq.com/cgi-bin/material/${param.type}?access_token=${accessToken}`
    // }
    console.log(url);
    formData = info.formData;
    return new Promise((resolve,reject)=>{
        request.post({url:url, formData: formData},(err, httpResponse, body)=>{
            if (err) {
                reject(err);
                return console.error('upload failed:', err);
            }
            console.log('Upload successful!  Server responded with:', body);
            resolve(body)
        });
    })
};


