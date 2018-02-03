const express = require('express');
const mysql = require('mysql');
const libs = require('../libs/md5');

var db=mysql.createPool({host: 'localhost', user: 'root', password: 'root', database: 'guitar'});

module.exports=function (){
  var router=express.Router();

  //检查登录状态
  router.use((req, res, next)=>{
    if(!req.session['admin_id'] && req.url!='/login' && req.url!='/register' ){ //没有登录
      res.send({state: false}).end();
    }else{
      next();
    }
  });

  // 登录
  router.post('/login', (req, res)=>{
    var username=req.body.username;
    var password=libs.md5(req.body.password+libs.MD5_SUFFIX);
    db.query(`SELECT * FROM admin_table WHERE username='${username}'`, ( err, data ) => {
      if( err ) {
        res.send({state: false, err: 500, msg: '数据库错误'}).end();
      } else {
        // console.log('啥玩意')
        if(data.length==0){
          res.send({msg:'用户名错误', state: false}).end();
        }else{
          if(data[0].password==password){
            //成功
            req.session['admin_id']=data[0].ID;
            res.send({msg:'登陆成功', state: true}).end();
          }else{
            res.send({ state: false, msg:'密码错误' }).end();
          }
        }
      }
    })
  });
  // 注册
  router.post('/register', (req, res)=>{
    var username=req.body.username;
    var password=libs.md5(req.body.password+libs.MD5_SUFFIX);
    
    db.query(`SELECT * FROM admin_table WHERE username='${username}'`, ( err, data ) => {
      if( err ) {
        res.send({err: 500, state: false, msg:'数据库错误'}).end();
      } else {
        if(data.length==0){
          const REG_DB = `INSERT INTO admin_table (username,password) VALUES('${username}','${password}')`;
          db.query(REG_DB, (err, data) => {
            if( err ) {
              res.send({err: 500, state: false, msg:'数据库错误'}).end();
            } else {
              res.send({msg: '注册成功', state: true}).end();
            }
          })
        }else{
          res.send({msg: '用户名已存在', state: false}).end();
        }
      }
    })
  });

  return router;
};
