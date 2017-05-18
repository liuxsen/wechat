/**
 * Created by liuxsen on 2017/5/16.
 */
let path = require('path');
let config = {
    wechat: {
        AppID: 'wx8d038a1d7be18a8d',
        AppSecret: '3db8cce6c69a3e873c6f13219d9f93cb',
        Token: 'wechat',
        wechat_file: path.join(__dirname,'./wechat.txt')
    }
};

module.exports = config;