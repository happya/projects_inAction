from flask import Flask
from flask import render_template
app = Flask(__name__)


# 用装饰器route()告诉哪个URL能触发我们的函数
# 
@app.route('/')
def get_hello():
	return render_template('hello.html')


# 如果访问/hello，返回Hello world
@app.route('/hello')

def hello_world():
    return 'Hello World!'


# 变量规则
# 把一些特定字段标记成<variable_name>，或通过规则<converter:variable_name>转换

@app.route('/user/<username>')
def show_user_profile(username):
	return 'User {}'.format(username)

@app.route('/post/<int:post_id>')
def show_post(post_id):
	# 显示提交整型的用户'id'的结果，int将输入的字符串转换为整型数据
	return 'Post {}'.format(post_id)

@app.route('/path/<path:subpath>')
def show_subpath(subpath):
	#显示/path/之后的路径名
	return 'subpath {}'.format(subpath)


# 默认情况下，路由只会响应GET请求，但可以通过给route()装饰器提供的method参数来改变

# @app.route('/login',method=['GET','POST'])
# def login():
# 	if request.method=='POST':
# 		login();
# 	else:
# 		show_login_form();


# def login():
# 	return "Please LOGIN"

# def show_login_form():
# 	return "Sorry, No Form Now"

