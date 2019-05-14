//

function login(req,res,next) {
	if(req.session.user){
		console.log('您已登录！');
		return res.redirect('back');
	}
	next();
}

function nologin(req,res,next) {
	if(!req.session.user){
		console.log('抱歉，您好像还没登录喔');
		return res.redirect('/login');
	}
	next();
}

exports.login = login;
exports.nologin = nologin;