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

// 插入文档
async function insertDoc (data) {
    let body = formatsql(data).json
    return client.index({
            index:'search',
            body:body
        })
}
var list = []
// var fomartsql
async function Start(from){
    // console.log(from)
    let sql = `select * from content0329 where id<${from+1000} and id>${from}`
    db.query(sql,async (err,result)=>{
        if (err) {
            console.log(err)
        } else {
            // console.log(typeof(result))
            for(var i =0;i<result.length;i++) {
                // console.log(i)
                await insertDoc(result[i])
            }
        }
    })
}
async function auto() {
    for(var i=0;i<60;i++) {
        await Start(i*1000)
    }
}
auto()

