// 创建一个Angular对象，选择的scope为popup.html中ng-app="todoapp"的作用域
// 用todoapp.controller('controlname',function($scope){};)添加控制器
// 可添加属性：如$scope.name = "Todo";
// 也可添加方法，如$scope.sayHello=function(){$scope.greeting='Hello '+$scope.name+'!';}
// 其中greeting在html文件，形如{{greeting}},而在js文件中可以修改这个变量，而对应的视图文件则会即时更新这个变量
// 同样，在scope中定义的属性，也可以在html中直接调用,如{{name}}
// ng-model把元素值，如输入框的值<input ng-model="haha"，绑定到应用程序，通过{{haha}}形式调用



var todoapp = window.angular.module("todoapp",[]) // angular.module("moduleName")创建模块

// view中，通过ng-controller添加应用的控制器，比如在html中创建了"todolistcontroller"
// 在这里定义控制器操作
todoapp.controller('todolistcontroller',['$scope',function($scope){

	$scope.text = '';
	//默认清单列表
	$scope.todolist = [{
		text: 'hello world',
		done: false
	},{
		text: 'I use Python',
		done: false
	}];

	// 实现增添任务功能
	$scope.add = function(){
		var text = $scope.text.trim();
		if(text){
			$scope.todolist.push({
				text: text,
				done: false
			});
			$scope.text = '';
		}
	}

	// 删除任务函数
	$scope.delete = function(todo){
		var index = $scope.todolist.indexOf(todo);
		$scope.todolist.splice(index,1);
	}

	// 统计任务总量
	// filter： angular过滤器，从数组项中选择一个子集
	$scope.doneCount = function(){
		var temp = $scope.todolist.filter(function(item){
			return item.done;
		});
		return temp.length;
	}

}]);