/**
 * Created by liuxsen on 2017/5/15.
 */
let fs = require('fs');

let readFile = function(fpath){
    return new Promise(function(resolve,reject){
        fs.readFile(fpath,'utf8',function(err,result){
            if(err) reject(err);
            else{
                resolve(result);
            }
        })
    })
};


let test = function*(){
    yield 'hello';
    yield 'world';
    yield '!';
    return 'func end';
};

let helloword = test();
console.log(helloword);
console.log(helloword.next())
console.log(helloword.next())
console.log(helloword.next())
console.log(helloword.next())

let gen = function*(){
    console.log('func start');
    let i = 0;
    while(i<6){
        console.log('yeild start');
        yield i;
        console.log('yield end');
        i++;
    }
    console.log('func end');
}

let genEx = gen();
console.log(genEx.next())
console.log(genEx.next())
console.log(genEx.next())
console.log(genEx.next())
console.log(genEx.next())
console.log(genEx.next())
console.log(genEx.next())
console.log(genEx.next())
console.log(genEx.next())



readFile('./index.js')
.then(function(data){
    // console.log(data);
    // return Promise.resolve(data)
    console.log('可以了');
    return data;
})
.then(function(data){
    console.log('在来一次');
    return data;
}).then((data)=>{
    console.log('hah');
    // console.log(data);
});
