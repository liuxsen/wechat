+ echo "# wechat" >> README.md
+ git init
+ git add README.md
+ git commit -m "first commit"
+ git remote add origin https://github.com/liuxsen/wechat.git
+ git push -u origin master


+ 微信防盗链破解
+ 在html中加入
```html
<meta name="referrer" content="always">
```


### 删除数组指定的某个元素

```js
Array.prototype.indexOf = function(val){
    for(var i=0;i<this.length;i++){
        if(this[i] === val) return i;
    }
    return -1;
}
Array.prototype.remove = function(val){
    var index = this.indexOf(val);
    if(index>-1){
        this.splice(index,1);
    }
}
```