#  NodeJs+Express+MongoDB搭建个人博客

　　代码主要来自于互联网，但修改了一些错误，以及自己稍稍做了些修改。

最终效果如下所示：

注册界面：

![login_eg](imgs\login_eg.png)

登录及查询：

![demo1](imgs\demo1.gif)

　　和原始代码不同，这里的查询是可基于“标题(title)”和“标签(tag)”进行模糊查询。代码如下所示：

```js
// js ReqExp对象，其exec方法返回匹配值
	search = new RegExp(query,'i');//'i'指ignore大小写
	page = req.query.page? parseInt(req.query.page) : 1;
	var _filter = {
		$or: [
			{title: {$regex: search}},
			{tag: {$regex: search}}
		]
	};
```



对应于mongodb的数据：

![demo2](imgs\demo2.gif)

