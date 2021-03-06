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
    database: "guitar",
    multipleStatements: true
});

module.exports = function() {
    var router=express.Router();

    //获取所有文章列表
    router.post( '/getAll', ( req, res ) => {
        const pageStart = req.body.pagemark - 1;
        const size = req.body.pagesize;
        db.query(`SELECT COUNT(*) FROM article_table; SELECT *  FROM article_table ORDER BY time LIMIT ${ pageStart * size }, ${ size }`,(err,results) => {
            if(err){
                res.send({state: false, err: 500, msg: '数据库错误'}).end();
                throw err;
            }
            if(results){
                res.send({state: true, msg: results[1], count: results[0] }).end();
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
                res.send({state: true, msg: '发表成功', id: results.insertId }).end();
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

    // 更新数据
    router.post( '/update', ( req, res ) => {
        const ID = req.body.id;
        const title = req.body.title;
        const content = req.body.content;
        const time = new Date().getTime();
        const REG_DB = `UPDATE article_table SET title = '${ title }',content = '${ content }',time = '${ time }', author = 'admin' WHERE id = ${ ID }`;
        db.query(REG_DB,(err,results) => {
            if(err){
                res.send({state: false, err: 500, msg: '数据库错误'}).end();
                throw err;
            }
            if(results){
                res.send({state: true, msg: '修改成功', id: ID }).end();
            }  
        })
    } );

    // 删除数据
    router.post( '/delete', ( req, res ) => {
        const ID = req.body.id;
        const pageStart = req.body.pagemark - 1;
        const size = req.body.pagesize;
        const REG_DB = `DELETE FROM article_table WHERE id = ${ ID }; SELECT *  FROM article_table ORDER BY time LIMIT ${ pageStart * size }, ${ size }`;
        db.query(REG_DB,(err,results) => {
            if(err){
                res.send({state: false, err: 500, msg: '数据库错误'}).end();
                throw err;
            }
            if(results){
                res.send({state: true, msg: '删除成功', id: ID, articles: results[1] }).end();
            }  
        })
    } );

    return router;
}

