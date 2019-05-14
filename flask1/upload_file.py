import os
from flask import Flask,request
from werkzeug import secure_filename

upload_folder='./'
allowed_ext = set(['txt','pdf','png','jpg'])

app=Flask(__name__)
app.config['UPLOAD_FOLDER']=upload_folder

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.',1)[1] in allowed_ext

@app.route('/',method=['GET','POST'])
def upload_file():
	if request.method=='POST':
		file=request.files['file']
		if file and allowed_file(file.filename):
			filename=secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER']),filename)
			return '{} upload succeed!'.format(filename)
	
	# 使用GET方法请求页面或者上传文件失败时返回上传文件的表单页面
	return '''
		<doctype html>
		<title>Upload a new file</title>
		<h1>Upload new file</h1>
		<form action="" method=post enctype=multipart/form-data>
			<p><input type=file name=file></p>
			<p><input type=submit value=Upload></p>
		</form>
	'''