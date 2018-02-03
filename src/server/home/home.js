const express = require('express');
const mysql = require('mysql');

module.exports = function() {
    var router=express.Router();

    //获取所有数据库
    router.post( '/getAll', ( req, res ) => {
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root'
        });
        const dbList = []; 
        db.connect();
        db.query("SELECT `SCHEMA_NAME` FROM `information_schema`.`SCHEMATA`",(err,results) => {
            if(err){
                res.send({state: false, err: 500, msg: '数据库错误'}).end();
                db.end();
                throw err;
            }
            if(results){
                for(var i = 0; i < results.length; i++){
                    dbList.push(results[i].SCHEMA_NAME ) ;
                }
                res.send({state: true, msg: dbList}).end();
                db.end();
            }  
        })
    } );

    return router;
}

