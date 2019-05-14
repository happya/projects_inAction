
// 加载公共模块
var express = require('express');
var mongoose = require('mongoose');
var crypto = require('crypto');
var moment = require('moment');

// 加载自己写的模块，数据模型和检查是否登录
var model = require('../models/model');
var checkLogin = require('./checkIsLogin')

// 实例化对象
var User = model.User;
var Article = model.Article;
var router = express.Router();



/* GET home page. */
var page=1;
var pageSize=5;
router.get('/', function(req, res, next) {
	page = req.query.page?parseInt(req.query.page):1;
	Article
	.count(function(err,total) {
		Article
		.find()
		// 跳过指定的页数
		.skip((page -1 ) * pageSize)
		//限制读取pageSize条数据
		.limit(pageSize)
		.sort('-createTime')
		.exec(function(err,arts){
			if(err) {
				req.flash('error',err);
				return res.redirect('/');
			}
			res.render('index',{
				title: 'Home',
				user: req.session.username,
				success: req.flash('success').toString(),
				error: req.flash('error').toString(),
				total: total,
				page: page,
				pageSize: pageSize,
				isFirstPage: (page - 1)==0,
				isLastPage: ((page-1) * pageSize + arts.length)==total,
				arts: arts,
				moment: moment
			});
		});
	});
});


// 注册
router.get('/reg',checkLogin.login);
router.get('/reg',function(req,res){
	res.render('register',{
		title: '注册',
		user: req.session.user,
		page: 'reg'
	});
});

router.post('/reg',function(req,res){
	var username = req.body.username,
		password = req.body.password,
		passwordRepeat = req.body.passwordRepeat;
	// 检查两次密码是否一致	
	if (passwordRepeat != password) {
		console.log('两次输入的密码不一致');
		return res.redirect('/reg');
	}

	//检查用户名是否已经存在
	User.findOne({username:username},function(err,user) {
		if(err) {
			console.log(err);
			return res.redirect('/reg');
		}
		if(user){//如果已存在
			console.log('用户名已存在');
			return res.redirect('/reg');
		}

		//如果不存在
		//对密码进行md5加密

		var md5 = crypto.createHash('md5'),
			md5password = md5.update(password).digest('hex');

		// 创建新用户
		var newUser = new User({
			username: username,
			password: md5password
		});

		//
		newUser.save(function(err,doc){
			if(err){
				console.log(err);
				return res.redirect('/reg');
			}
			console.log('恭喜！您已注册成功，请开启您的博客之旅吧！');
			newUser.password = null;
			delete newUser.password;
			req.session.user = newUser;
			return res.redirect('/');
		});
	});
});



//登录
router.get('/login',checkLogin.login);
router.get('/login',function(req,res){
	User.find(function(err,doc) {
		res.render('login',{
		title: 'Login',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString(),
		datas: doc		
		});
	});
});

router.post('/login',function(req,res,next){
	var username = req.body.username,
		password = req.body.password;

	User.findOne({username:username},function(err,user) {
		if(err){
			req.flash("err",err);
			return next(err);
		}
		if(!user) {
			req.flash('error',"该用户不存在!");
			return res.redirect('/login');
		}

		var md5 = crypto.createHash('md5'),
			md5password = md5.update(password).digest('hex');
		if(user.password!== md5password){
			req.flash('error','密码错误！');
			return res.redirect('/login');
		}
		req.flash('success','欢迎！');
		user.password = null;
		delete user.password;
		req.session.user = user; // 保存会话，从而通过判断用户的登录状态来显示不同的信息
		return res.redirect('/');
	});
});


//文章发表
router.get('/post',checkLogin.noLogin);
router.get('/post',function(req,res){
	res.render('post',{
		title: 'Post a post',
		user: req.session.user
	})
});

router.post('/post',function(req,res) {
	var data = new Article({
		title: req.body.title,
		author: req.session.user.username,
		tag: req.body.tag,
		content: req.body.content
	});

	data.save(function(err,doc) {
		if(err) {
			console.log(err);
			return res.redirect('/post');
		}
		console.log("文章发布成功！");
		return res.redirect('/'); // 回到首页；
	});
});

//删除文章
router.get('/remove/:_id',checkLogin.noLogin);
router.get('/remove/:_id',function(req,res,next) {
	// req.params 处理 /:xxx 形式的get或者Post请求
	Article.remove({_id:req.params._id},function(err){
		if(err) {
			console.log(err);
		} else {
			console.log('文章删除成功！');
		}
		return res.redirect('back');
	});
});


// 编辑文章
router.get('/edit/:_id',checkLogin.noLogin);
router.get('/edit/:_id',function(req,res,next) {
	Article.findOne({_id:req.params._id}, function(err,art) {
		if(err) {
			console.log(err);
			return res.redirect('back');
		}
		res.render('edit',{
			title: 'Editting...',
			art: art
		});
	});
});
router.post('/edit/:_id',function(req,res,next) {
	// mongoose的update()方法用过检索参数并返回修改下结果
	Article.update({_id: req.params._id},{
		title: req.body.title,
		tag: req.body.tag,
		content: req.body.content,
		createTime: Date.now()
	},function(err,art) {
		if(err){
			console.log(err);
			return res.redirect('back');
		}
		console.log("文章修改成功！");
		return res.redirect('/u/'+req.session.user.username);
	});
});

// 查询文章
router.get('/search',function(req,res,next) {
	var query = req.query.title,
	title = new RegExp(query,'i');

	Article
	.find({title:title})
	.sort('-createTime')
	.exec(function(err,arts) {
		if(err){
			console.log(err);
			return res.redirect('/');
		}
		res.render('search',{
			title: 'Search Results',
			arts: arts
		});
	});
});

module.exports = router;
