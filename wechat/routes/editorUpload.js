let express = require('express');
let router = express.Router();
let config = require('../config/config');
let Promise = require('bluebird');
let request = require('request');
let rq = Promise.promisify(request);
var ueditor = require("ueditor")
let path = require('path');
let fs = require('fs');
let db = require('../db/db');
let updateToken = require('../util/updateToken');
let wechat = new updateToken(config.wechat);


router.get('',(req,res,next)=>{
	// ueditor 客户发起上传图片请求 
 
	/*if(req.query.action === 'uploadimage'){
	 
	    // 这里你可以获得上传图片的信息 
	    var foo = req.ueditor;
	    console.log(foo.filename); // exp.png 
	    console.log(foo.encoding); // 7bit 
	    console.log(foo.mimetype); // image/png 
	 	console.log(foo);

	    // 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径） 
	    var img_url = path.join(__dirname,'./uploads');
	    // res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做 
	}
	  //  客户端发起图片列表请求 
	else if (req.query.action === 'listimage'){
	    var dir_url = path.join(__dirname,'./uploads'); // 要展示给客户端的文件夹路径 
	    // res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片 
	}
	  // 客户端发起其它请求 
	else {
	    res.setHeader('Content-Type', 'application/json');
	    // 这里填写 ueditor.config.json 这个文件的路径 
	    console.log(path.join(__dirname,'./public/config.json'));
	    console.log('---------------------------------')
	    let ueditorConfig = require(path.join(__dirname,'./config/ueditor_config.js'));
	    res.send(ueditorConfig);
	}*/
	
	res.setHeader('Content-Type', 'application/json');
	    // 这里填写 ueditor.config.json 这个文件的路径 
	    console.log('---------------------------------')
	    let ueditorConfig = require(path.join(__dirname,'../config/ueditor_config.js'));
	    res.jsonp(ueditorConfig);
})


function wxuploadImg (stream,filename){
	return new Promise((resolve,reject)=>{
		// https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=ACCESS_TOKEN
		wechat.fetchAccessToken()
			.then((token)=>{
				console.log(token)
			})
	})
}

let img_url = path.join(__dirname,'../uploads');

var multer  = require('multer')
var upload = multer({ dest: img_url })

function renameFile(oldName,newName){
	return new Promise((resolve,reject)=>{
		fs.rename(oldName,newName,(err)=>{
			if(err) reject(err);
			else{
				resolve(true);
			}
		})
	})
}

router.post('',upload.single('upfile'),(req,res,next)=>{
	console.log(req.query)
	// 文件原始名字
	let originalname = req.file.originalname;
	// 文件mime类型
	let mimetype = req.file.mimetype;
	let path = req.file.path;
	let fix = 'jpg'
	switch(mimetype){
		case 'image/png':
			fix = '.png';
			break;
		case 'image/jpeg':
			fix = '.jpg'
			break;
		default:
			fix = '.jpg'
			break;
	}
	let newPath = path+fix;
	renameFile(path,newPath)
		.then((data)=>{
			console.log('重命名-----'+data);
			let obj = {
			    state: "SUCCESS",
			    url: 'http://127.0.0.1:3000/'+req.file.filename+fix,
			    title: originalname,
			    original: originalname
			}
			console.log(obj);
			res.setHeader('Content-Type', 'text/html');
			res.send(obj);
		})
})

module.exports = router;