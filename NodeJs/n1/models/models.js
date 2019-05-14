var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//定义用户数据模型
var userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	createTime: {
		type: Date,
		default: Date.now
	}
});

exports.User = mongoose.model('User',userSchema);

// 定义笔记数据模型

var noteSchema = new Schema({
	title: String,
	author: String,
	tag: String,
	content: String,
	createTime: {
		type: Date,
		default: Date.now
	}
});

exports.Note = mongoose.model('Note',noteSchema);

// Model是由Schema编译而成的假想（fancy）构造器，具有抽象属性和行为。
//Model的每一个实例（instance）就是一个document。 
//document可以保存到数据库和对数据库进行操作。
/* const db={
	User: mongoose.model("MUser",muserSchema),
};
module.exports=db;*/

