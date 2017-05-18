let express = require('express');
let router = express.Router();
let getRawBody = require('raw-body');
let reply = require('../util/reply');
let createMenu = require('../util/createMenu');

let formatMessage = require('../util/formatMessage')

let path = require('path');
let sha1 = require('sha1');

let Wechat = require('../util/updateToken');

let config = require('../config/config')
new Wechat(config.wechat);

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    console.log(req.query);
    let token = config.wechat.Token;
    let signature = req.query.signature;
    let timestamp = req.query.timestamp;
    let echostr = req.query.echostr;
    let nonce = req.query.nonce;
    let str = [token,timestamp,nonce].sort().join('');
    console.log(sha1(str),signature);
    if(sha1(str) === signature){
        res.send(echostr);
    }else{
        res.send('wrong');
    }
});

router.post('/',(req,res,next)=>{
    console.log('post');
    createMenu();
    getRawBody(req)
        .then(function (buf) {
            let xml = buf.toString();
            // console.log('获得xml')
            return xml;
        })
        .then((xml)=>{
            formatMessage(xml)
                .then((data)=>{
                    console.log('解析成功');
                    console.log(data);
                    reply(data)
                        .then((replyXml)=>{
                            console.log(replyXml);
                            res.send(replyXml);
                        })
                });
        })
        .catch(function (err) {
            console.log('解析失败')
        })
});


module.exports = router;
