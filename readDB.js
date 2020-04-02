const express = require('express')
const app = express()
const mysql = require("mysql")
const {formatsql} = require("./utils/mysql")
const { Client } = require('@elastic/elasticsearch')



const client = new Client({node:'http://localhost:9200'})
app.listen(3000,()=>{
    console.log(3000)
})

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'spiderurl',
    password:'password'
})
db.connect((err)=>{
    if(err) throw err
    console.log('success')
})

// 创建文档
function createDoc (body) {
//   console.log(body)
  client.index({
    index: 'suda0331',//索引名
    body:body//索引内容
  })
}

// const promise1 = new Promise((res,rej)=>{
//     let formatjson = formatsql(result[i]).json
//     let stringjson = JSON.stringify(formatjson)
// })
var list = []
// var fomartsql
function getContentList(from){
    console.log(from)
    let sql = `select * from content0329 where id<${from+100} and id>${from}`
    db.query(sql,(err,result)=>{
        if (err) {
            console.log(err)
        } else {
            // console.log(typeof(result))
            for(var i =0;i<result.length;i++) {
                // console.log(JSON.stringify(result[i]))
                // let fomartdata = formatsql(result[i])
                let formatjson = formatsql(result[i]).json
                sleep(100)
                createDoc(formatjson)
                // let formatjson
                // let stringjson
                // const promise1 = new Promise((res,rej)=>{
                //     formatjson = formatsql(result[i]).json
                //     stringjson = JSON.stringify(formatjson)
                // }).then(res=> {
                //     createDoc(stringjson)
                // }).catch(console.log(err))
                // return promise1
                // console.log(formatjson)
                // setTimeout(function(){createDoc(stringjson)},3000)
                
                // console.log(stringjson)
            }
            console.log(`${from}条数据完成`)
            return getContentList(from+100)
        }
    })
}
function sleep(time) {
    return new Promise(res=>setTimeout(res,time))
}
// var index=0
// function run(index,callback) {
//     console.log(index)
//     index= index+1000
//     return callback(index)
// }

// run(index,getContentList)
getContentList(0)




//   // 执行
//   setTimeout(function() {
    
//         createDoc(list[0])
    
//   },5000)
  
