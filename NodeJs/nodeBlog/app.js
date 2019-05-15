var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');
var mongoose = require('mongoose');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();



mongoose.connect('mongodb://localhost:27017/datas');
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use('logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 创建会话机制,在app.use('/',routes)前引入
app.use(session({
  key: 'session',
  secret: 'keboard cat',
  cookie: {maxAge: 1000 * 60 * 60 * 24},//1day
  store: new MongoStore({
    db: 'datas',
    mongooseConnection: mongoose.connection
  }),
  resave: false,
  saveUninitialized: true
}));



// 使用flash
app.use(flash());

//路由控制器
app.use('/', routes);
app.use('/users', users);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




// 设置监听端口
app.listen(8080,function(req,res) {
	console.log('app is running at localhost:8080');
});

module.exports = app;
