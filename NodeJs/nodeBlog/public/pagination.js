var blogData=$('#blog-data');
var search=blogData.data('search');
var total=blogData.data('total');
var page=blogData.data('page');
var pageSize=blogData.data('pageSize');
var isFirstPage=blogData.data('isFirstPage');
var isLastPage=blogData.data('isLastPage');


var end=Math.ceil(total/pageSize);

var pagination='<nav><ul class="pagination">';

if(search) {
	if(isFirstPage){
		pagination += '<li class="disabled"> <a href="#" aria-label="Previous">'+
						'<span aria-hidden='true'>&laquo;</span></a></li>'
	}else{
		pagination += '<li><a href="?title='+search+'&page='+(page-1)+'aria-label="Previous">'
					+ '<span aria-hidden="true">&laquo;</span></a></li>'
	}
}


pagination += '</ul></nav>';
$('#pagination-box').html=pagination;