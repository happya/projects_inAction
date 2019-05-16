var blogData=$('#blog-data');
var search=blogData.attr("search");
var total=blogData.attr("total");
var page=blogData.attr("page");
var pageSize=blogData.attr("pageSize");
var isFirstPage=blogData.attr("isFirstPage");
var isLastPage=blogData.attr("isLastPage");


var end=Math.ceil(total/pageSize); // 向上取整

var pagination='<nav><ul class="pagination">';

if(search) {//如果找,search
	if(isFirstPage){//如果是第一页，左箭头指向当前页面
		pagination += '<li class="disabled"><a href="#" aria-label="Previous">'+
						'<span aria-hidden="true">&laquo;</span></a></li>';
	}else{//如果不是第一页，左箭头指向前一页
		pagination += '<li><a href="?search='+search+'&page='+(page-1)+'aria-label="Previous">'
					+ '<span aria-hidden="true">&laquo;</span></a></li>';
	}

	// 大于十页的时候一共只显示10个分页小框框
	if(end>10) {
		if(page<=6) {// 当前页码不超过六页时，刚好显示1到10的页码小框框
			for(var i=1;i<=10;i++) {
				if (page==i){
					pagination += '<li class="active"><a href="#">'+i+'</a></li>';
				} else {
					pagination += '<li><a href="?search=' + search + '&page='+i +'">'+i+'</a></li>';
				}
			}
		} else if (page>= end-4) {// 当前页码在偏后段时，显示从end-9到end的页码小框框
			for (var i=end-9;i<=end;i++){
				if(page==i){
					pagination += '<li class="active"><a href="#">'+i+'</a></li>';
				}else {
					pagination += '<li><a href="?search='+search+'&page='+i+'">'+i+'</a></li>';
				}
			}
		}else {// 当前页码在中段时，显示前五页后四页的页码小框框
			for(var i=page-5;i<=page+4;i++){
				if(page==i){
					pagination += '<li class="active"><a href="#">'+i+'</a></li>';
				}else {
					pagination += '<li><a href="?search='+search+'&page='+i+'">'+i+'</a></li>';
				}
			}
		}
	} else {//小于十页
		for(var i=1;i<=end;i++) {
			if(page==i){
					pagination += '<li class="disabled"><a href="#">'+i+'</a></li>';
				}else {
					pagination += '<li><a href="?search='+search+'&page='+i+'">'+i+'</a></li>';
				}
		}
	}
	if(isLastPage) {
	pagination+='<li class="disabled"><a href="#" aria-label="Next">'+
				'<span aria-hidden="true">&raquo;</span></a></li>';
	}else {
		pagination+= '<li><a href="?search='+search+'&page='+(page+1)+'" aria-label="Next">'+
					'<span aria-hidden="true">&raquo;</span></a></li>';
	}
} else { //如果不找,index

	if(isFirstPage) {
	pagination+='<li class="disabled"><a href="#" aria-label="Previous">'+
				'<span aria-hidden="true">&laquo;</span></a></li>';
	}else {
		pagination+= '<li><a href="?search='+search+'&page='+(page-1)+'" aria-label="Next"'+
					'<span aria-hidden"true">&laquo;</span></a></li>';
	}

	if(end>10) {
		if(page<=6){
			for(var i=1;i<=10;i++) {
			if(page==i) {
				pagination += '<li class="active"><a href="#">'+i+'</a></li>';
			} else {
				pagination += '<li><a href="?page='+i+'">'+i+'</a></li>';
			}
		}
		} else if(page>=end-4){
			for(var i=end-9;i<=end;i++) {
			if(page==i) {
				pagination += '<li class="active"><a href="#">'+i+'</a></li>';
			} else {
				pagination += '<li><a href="?page='+i+'">'+i+'</a></li>';
			}
		}

		} else {
			for(var i=page-5;i<=page+4;i++) {
			if(page==i) {
				pagination += '<li class="active"><a href="#">'+i+'</a></li>';
			} else {
				pagination += '<li><a href="?page='+i+'">'+i+'</a></li>';
			}
		}
		}
	} else {
		for(var i=1;i<=end;i++) {
			if(page==i) {
				pagination += '<li class="active"><a href="#">'+i+'</a></li>';
			} else {
				pagination += '<li><a href="?page='+i+'">'+i+'</a></li>';
			}
		}
	}
	if(isLastPage){
		pagination+='<li class="disabled"><a href="#" aria-label="Next">'+
				'<span aria-hidden="true">&raquo;</span></a></li>';
	}else {
		pagination += '<li><a href="?page='+(page+1)+'" aria-label="Next">'+
					+ '<span aria-hidden="true">&raquo;</span></a></li>';
	}
}



pagination += '</ul></nav>';
$('#pagination-box').html(pagination);