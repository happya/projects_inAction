// 加载需要用到的modules
// express: express框架
// mongoose: mongodb
// connect-mongo
// body-parser: 一般和express一起用于对request进行解析
// crypto: 
// path: 
// express-sseion:

var express=require('express');
var path=require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var mongoose = require('mongoose');

// 引入简历session的模块
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//引入检测登录文件
var checkLogin = require('./checkLogin.js');


// 引入 modules.js中创建的数据模型并实例化
var models = require('./models/models');
var User = models.User;
var Note = models.Note;

// 定义server端口
mongoose.connect('mongodb://localhost:27017/notes',{
	useMongoCLient: true
});
mongoose.connection.on('error',console.error.bind(console,'连接数据库失败'));
mongoose.connection.on("open", function() {
	console.log("数据库连接成功");
});

// 新建app，一个express实例
var app=express();
app.set('views',path.join(__dirname,'views')); // view由views文件夹里的文件渲染
app.set('view engine','ejs'); // 模板引擎设置为ejs
app.use(express.static(path.join(__dirname,'public'))); // 设置存放静态文件的文件夹


// 建立session模型
app.use(session({
	key: 'session',
	secret: 'Keboard cat',
	cookie: {maxAge: 1000*60*60*24},
	store: new MongoStore({
		db: 'notes',
		mongooseConnection: mongoose.connection
	}),
	resave: false,
	saveUnintialized: true
}));

//解析urlendcoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



// route设置
// 首页 显示笔记列表
app.get('/',checkLogin.nologin);
app.get('/', function(req,res) {
	Note.find({author: req.session.user.username})
	.exec(function(err, arts) {
		if(err) {
			console.log(err);
			return res.redirect('/');
		}
		res.render('index', {
			title: '笔记列表',
			user: req.session.user,
			arts: arts
		});
	});
});

//注册
app.get('/reg',checkLogin.login);
app.get('/reg',function(req,res){
	res.render('register',{
		title: '注册',
		user: req.session.user,
		page: 'reg'
	});
});

app.post('/reg',function(req,res){
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
app.get('/login',checkLogin.login);
app.get('/login',function(req,res){
	res.render('login',{
		title: 'Login',
		user: req.session.user,
		page: 'login'
	});
});

app.post('/login',function(req,res){
	var username = req.body.username,
		password = req.body.password;

	User.findOne({username:username},function(err,user) {
		if(err){
			console.log(err);
			return next(err);
		}
		if(!user) {
			console.log("该用户不存在！");
			return res.redirect('/login');
		}

		var md5 = crypto.createHash('md5'),
			md5password = md5.update(password).digest('hex');
		if(user.password!== md5password){
			console.log('密码错误！');
			return res.redirect('/login');
		}
		console.log('欢迎！')
		user.password = null;
		delete user.password;
		req.session.user = user; // 保存会话，从而通过判断用户的登录状态来显示不同的信息
		return res.redirect('/');
	});
});





//发布笔记
app.get('/post',checkLogin.nologin);
app.get('/post',function(req,res){
	res.render('post',{
		title: 'Post a post',
		user: req.session.user
	})
});

app.post('/post',function(req,res) {
	var note = new Note({
		title: req.body.title,
		author: req.session.user.username,
		tag: req.body.tag,
		content: req.body.content
	});

	note.save(function(err,doc) {
		if(err) {
			console.log(err);
			return res.redirect('/post');
		}
		console.log("笔记发布成功！");
		return res.redirect('/'); // 回到首页；
	});
});

//笔记详情
app.get('/detail/:_id',checkLogin.nologin);
app.get('/detail/:_id',function(req,res){
	Note.findOne({_id: req.params._id})
	.exec(function(err, art) {
		if(err) {
			console.log(err);
			return res.redirect('/');
		}
		if(art) {
			res.render('detail',{
				title: '笔记',
				user: req.session.user,
				art: art
			});
		}
	});

});
//退出登录
app.get('/quit',function(req,res){
	req.session.user = null;
	console.log('Logout!');
	return res.redirect('/login');
});



app.listen(8080,function(req,res){
	console.log('app is running at localhost:8080');
});