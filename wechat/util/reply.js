/**
 * Created by liuxsen on 2017/5/15.
 */
//微信回复消息
let ejs = require('ejs');
let fs = require('fs');
let heredoc = require('heredoc');
let Wechat = require('./updateToken');
let config = require('../config/config');
let wechat = new Wechat(config.wechat);
let upload = require('./upload');
let path = require('path');


let tpl = heredoc(function(){/*
 <xml>
 <ToUserName><![CDATA[<%=info.ToUserName%>]]></ToUserName>
 <FromUserName><![CDATA[<%=info.FromUserName%>]]></FromUserName>
 <CreateTime><%=info.CreateTime%></CreateTime>
 <% if(info.MsgType === 'text'){ %>
     <MsgType><![CDATA[text]]></MsgType>
     <Content><![CDATA[<%=info.Content%>]]></Content>
 <% } %>
 <% if(info.MsgType === 'news'){ %>
     <ArticleCount><%= info.Content.length %></ArticleCount>
     <MsgType><![CDATA[news]]></MsgType>
     <Articles>
         <% info.Content.forEach(function(item){%>
         <item>
         <Title><![CDATA[<%= item.title %>]]></Title>
         <Description><![CDATA[<%= item.description %>]]></Description>
         <PicUrl><![CDATA[<%= item.picurl %>]]></PicUrl>
         <Url><![CDATA[<%= item.url %>]]></Url>
         </item>
         <% }) %>
     </Articles>
 <% } %>
 <% if(info.MsgType ==='music'){ %>
     <MsgType><![CDATA[music]]></MsgType>
     <Music>
     <Title><![CDATA[<%= info.title %>]]></Title>
     <Description><![CDATA[<%= info.description %>]]></Description>
     <MusicUrl><![CDATA[<%= info.musicUrl %>]]></MusicUrl>
     <HQMusicUrl><![CDATA[<%= info.hqMusicUrl %>]]></HQMusicUrl>
     <ThumbMediaId><![CDATA[<%= info.mediaId %>]]></ThumbMediaId>
     </Music>
 <% } %>
 <% if(info.MsgType ==='video'){ %>
     <MsgType><![CDATA[video]]></MsgType>
     <Video>
     <MediaId><![CDATA[<%= info.media_id %>]]></MediaId>
     <Title><![CDATA[<%= info.title %>]]></Title>
     <Description><![CDATA[<%= info.description %>]]></Description>
     </Video>
 <% } %>
 <% if(info.MsgType ==='voice'){ %>
     <MsgType><![CDATA[voice]]></MsgType>
     <Voice>
     <MediaId><![CDATA[<%= info.media_id %>]]></MediaId>
     </Voice>
 <% } %>
 <% if(info.MsgType ==='image'){ %>
     <MsgType><![CDATA[image]]></MsgType>
     <Image>
     <MediaId><![CDATA[<%= info.media_id %>]]></MediaId>
    </Image>
 <% } %>


 </xml>
*/});
let info = {
    ToUserName: 123,
    FromUserName: 123,
    now: 123,
    Content: 123
};

let compiled = ejs.compile(tpl);
// console.log(compiled({info:info}));

function reply (data){
    return new Promise((resolve,reject)=>{
        console.log('获得data');
        console.log(data);
        let now = new Date().getTime();
        let info = {
            ToUserName: data.FromUserName,
            FromUserName: data.ToUserName,
            CreateTime: now,
            MsgType: 'text',
            Content: 'hello,boy'
        };

        if(data.MsgType === 'text'){
            if(data.Content === '1'){
                info.Content = 'hello,girl';
                let xml = compiled({info:info});
                resolve(xml);
            }else if(data.Content === '2'){
                info.MsgType = 'news';
                info.Content = [
                    {
                        title:'hah',
                        description:'description',
                        picurl: 'http://pic.58pic.com/58pic/14/27/45/71r58PICmDM_1024.jpg',
                        url:'http://www.baidu.com'
                    },
                    {
                        title:'hah',
                        description:'description',
                        picurl: 'http://scimg.jb51.net/allimg/150629/14-1506291A242927.jpg',
                        url:'http://www.baidu.com'
                    }
                ];
                let xml = compiled({info:info});
                resolve(xml);
            }else if(data.Content === '3'){
                //    回复图片信息
                wechat.fetchAccessToken()
                    .then((data)=>{
                        info.accessToken = data.access_token;
                        info.formData = {
                            media: fs.createReadStream(path.join(__dirname,'./77.jpg'))
                        };
                        info.type = 'image';
                        upload(info)
                            .then((data)=>{
                                data = JSON.parse(data);
                                info.MsgType = 'image';
                                info.media_id = data.media_id;
                                let xml = compiled({info:info});
                                resolve(xml);
                            })
                    })
            }else if(data.Content === '4'){
                //    回复视频信息
                wechat.fetchAccessToken()
                    .then((data)=>{
                        info.accessToken = data.access_token;
                        info.formData = {
                            media: fs.createReadStream(path.join(__dirname,'./video.mp4'))
                        };
                        info.type = 'video';
                        upload(info)
                            .then((data)=>{
                                data = JSON.parse(data);
                                console.log('---------------data------');
                                console.log(data);
                                info.MsgType = 'video';
                                info.media_id = data.media_id;
                                info.title = '这是一个视频';
                                info.description = '这里是描述';
                                let xml = compiled({info:info});
                                resolve(xml);
                            })
                    })
            }else if(data.Content === '5'){
            //    上传永久消息
                let param = {
                    type: 'add_news'
                };
                wechat.fetchAccessToken()
                    .then((data,param)=>{
                        info.accessToken = data.access_token;
                        info.formData = {
                            media: fs.createReadStream(path.join(__dirname,'./video.mp4'))
                        };
                        info.type = 'video';
                        upload(info)
                            .then((data)=>{
                                data = JSON.parse(data);
                                console.log('---------------data------');
                                console.log(data);
                                info.MsgType = 'video';
                                info.media_id = data.media_id;
                                info.title = '这是一个视频';
                                info.description = '这里是描述';
                                let xml = compiled({info:info});
                                resolve(xml);
                            })
                    })
            }
        }
        if(data.MsgType === 'event'){
            info.Content ='欢迎关注';
            if(data.EventKey === 'V1001_GOOD'){
                info.Content = "谢谢你的赞";
            }
            let xml = compiled({info:info});
            resolve(xml);
        }
    });

}
module.exports = reply;