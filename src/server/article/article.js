const express = require('express');
const mysql = require('mysql');

// 服务器
// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: ''
// });

// 本地
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: "guitar"
});

module.exports = function() {
    var router=express.Router();

    //获取所有文章列表
    router.post( '/getAll', ( req, res ) => {
        
        db.query("SELECT *  FROM article_table ORDER BY time LIMIT 0, 20",(err,results) => {
            if(err){
                res.send({state: false, err: 500, msg: '数据库错误'}).end();
                throw err;
            }
            if(results){
                res.send({state: true, msg: results}).end();
            }  
        })
    } );
    // 提交文章
    router.post( '/addArticle', ( req, res ) => {
        const title = req.body.title;
        const content = req.body.content;
        const time = new Date().getTime();
        const REG_DB = `INSERT INTO article_table (title,content,time,author) VALUES('${title}','${content}','${time}','admin')`;
        db.query(REG_DB,(err,results) => {
            if(err){
                res.send({state: false, err: 500, msg: '数据库错误'}).end();
                throw err;
            }
            if(results){
                res.send({state: true, msg: '发表成功'}).end();
            }  
        })
    } );

    // 获取具体文章
    router.post( '/getArticle', ( req, res ) => {
        const ID = req.body.id;
        const REG_DB = `SELECT * FROM article_table WHERE id='${ ID }'`;

        db.query( REG_DB, ( err, results ) => {
            if(err){
                res.send({state: false, err: 500, msg: '数据库错误'}).end();
                throw err;
            }
            if( results ){
                res.send( { state: true, msg: results[0] } ).end();
            }  
        } );
    } );

    return router;
}

