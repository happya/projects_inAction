var board= new Array();
var score =0;
var has_conflicted = new Array();
var start_x=0;
var start_y=0;
var end_x=0;
var end_y=0;

var success_str="Success!"
var gameover_str="GameOver"

$(document).ready(function() {
	//
	prepare_for_mobile();
	new_game();
});

function new_game() {

	init();
	generate_one_number();
	generate_one_number();
}
function init() {
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var cell=$('#cell_'+i+'_'+j);
			cell.css('top',get_pos_top(i,j))
			cell.css('left',get_pos_left(i,j))
		}
	}
	for(var i=0;i<4;i++){
		board[i]=new Array();
		has_conflicted[i]=new Array();
		for(var j=0;j<4;j++){
			board[i][j]=0;
			has_conflicted[i][j]=false;
		}
	}
	update_board_view();
	score=0;
	update_score(score);
}

function update_board_view(){
	//移除所有class="number_cell"
	$('.number_cell').remove();

	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			//插入带数字的格子的div
			//$('#grid').append('<div class="number_cell" id="number_cell_' + i + '_' + j + '"></div>');
			$('#grid').append('<div class="number_cell" id="number_cell_' + i+ '_' + j + '"></div>');
			//定义生成格子的css样式
			var number_cell=$('#number_cell_'+i+'_'+j);
			if(board[i][j]==0){//如果是空格子
				number_cell.css('width','0px');
				number_cell.css('height','0px');
				number_cell.css('top',get_pos_top(i,j)+cell_side_length/2);
				number_cell.css('left',get_pos_left(i,j)+cell_side_length/2);

			}
			else {//如果不是空格子，定义width, height, top,left,bgcolor
				number_cell.css('width',cell_side_length);
				number_cell.css('height',cell_side_length);
				number_cell.css('top',get_pos_top(i,j));
				number_cell.css('left',get_pos_left(i,j));
				number_cell.css('background-color',get_number_background_color(board[i][j]));
				number_cell.css('color',get_number_color(board[i][j]));
				number_cell.text(board[i][j]);
				if(board[i][j]<128){
					number_cell.css('font-size',0.6*cell_side_length+'px');
				}else if(board[i][j]<1024){
					number_cell.css('font-size',0.4*cell_side_length+'px');
				}else {
					number_cell.css('font-size',0.3*cell_side_length+'px');
				}
			}
			has_conflicted[i][j]=false;
		}
		$('.number_cell').css('line_height','cell_side_length'+'px');
		//$('.number_cell').css('font-size',0.6*cell_side_length+'px');


	}

}

//随机生成一个带数字的格子
function generate_one_number() {
	// 如果没有空格，返回false
	if(nospace(board)){
		return false;
	}

	//随机生成数字的格子坐标
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));

	var time=0;
	while(time<50){
		//如果找到了空格子，则跳出循环准备赋值
		if(board[randx][randy]==0){break;}
		//否则，重新生成坐标继续找
		randx=parseInt(Math.floor(Math.random()*4));
		randy=parseInt(Math.floor(Math.random()*4));
		time++;

	}
	//如果找了50次还没找到，则遍历所有格子，以找到的第一个空格子为目标
	if(time==50){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j]==0){
					randx=i;
					randy=j;
				}
			}
		}
	}

	//随机一个数字,2 or 4
	var rand_num = Math.random()<0.5?2:4;
	board[randx][randy]=rand_num;
	show_num_with_animation(randx,randy,rand_num);
	return true;
}



function prepare_for_mobile(){
	if(doc_width>500){
		grid_width=500;
		cell_side_length=100;
		cell_space=20;

	}
	$('#grid').css('width',grid_width-2*cell_space);
	$('#grid').css('height',grid_width-2*cell_space);
	$('#grid').css('padding',cell_space);
	$('#grid').css('board-radius',0.02*grid_width);
	$('.cell').css('width',cell_side_length);
	$('.cell').css('height',cell_side_length);
	$('.cell').css('board-radius',0.02*grid_width);

}


//键盘操作响应

$(document).keydown(function(event) {
	if($('#score').text()==success_str){
		new_game();
		return;
	}
	switch (event.keyCode) {
		case 37: //left arrow
			event.preventDefault();//阻止元素发生的默认行为
			if(move_left()){
				after_one_move();
			}
			break;
		case 38: //up arrow
			event.preventDefault();
			if(move_up()){
				after_one_move();
			}
			break;
		case 39: //right arrow
			event.preventDefault();
			if(move_right()){
				after_one_move();
			}
			break;
		case 40://down arrow
			event.preventDefault();
			if(move_down()){
				after_one_move();
			}
			break;
		default: break;
	}
});

//监听移动设备的触摸开始
document.addEventListener('touchstart',function(event){
	start_x=event.touch[0].pageX;
	start_y=event.touch[0].pageY;
});

document.addEventListener('touchmove',function(event){
	event.preventDefault();
});

document.addEventListener('touchend',function(event){
	end_x=event.changedTouches[0].pageX;
	end_y=event.changedTouches[0].pageY;

	var dx=end_x-start_x;
	var dy=end_y-start_y;
	if(Math.abs(dx)<0.3*doc_width && Math.abs(dy<0.3*doc_width)){
		return;
	}
	if($('#score').text()==success_str){
		new_game();
		return;
	}

	if(Math.abs(dx)>=Math.abs(dy)){
		if(dx>0){
			if(move_right()){after_one_move();}
			else{
				if(move_left()){after_one_move();}
			}
		}
		else {
			if(dy>0){
				if(move_down()){after_one_move();}
			}else{
				if(move_up()){after_one_move();}
			}
		}
	}
});


//移动一次后生成新的格子，并监听是否游戏结束
function after_one_move(){
	setTimeout('generate_one_number()',210);
	setTimeout('is_gameover()',300);
}


//向左移动

function move_left() {
	if(!can_move_left(board)){
		return false;
	}
	
	for (var i=0;i<4;i++) {
		for (var j=1;j<4;j++) {
			if(board[i][j] != 0){
				for (var k=0;k<j;k++){
					if(board[i][k]==0 && no_block_horizontal(i,k,j,board)) {			
						show_move_animation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						break;
					} else if (board[i][k]==board[i][j] && no_block_horizontal(i,k,j,board) && !has_conflicted[i][k]) {
						
						show_move_animation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j]=0;
						
						score+=board[i][k];
						update_score(score);
						has_conflicted[i][k]=true;
						break;
					}
				}
			}
		}
	}
	setTimeout('update_board_view()', 200);
	return true;

}
/*
function move_left() {
	if (!can_move_left(board)) {
		return false;
	}
	//move left
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < j; k++) {
					if (board[i][k] == 0 && no_block_horizontal(i, k, j, board)) {
						show_move_animation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						break;
					} else if (board[i][k] == board[i][j] && no_block_horizontal(i, k, j, board) && !has_conflicted[i][k]) {
						show_move_animation(i, j, i, k);
						board[i][k] += board[i][j]
						board[i][j] = 0;
						//add score
						score += board[i][k];
						update_score(score);
						has_conflicted[i][k] = true;
						break;
					}
				}
			}
		}
	}
	setTimeout('update_board_view()', 200);
	return true;
}*/

//向右移动
function move_right(){
	if(!can_move_right(board)){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0 && no_block_horizontal(i,j,k,board)){
						show_move_animation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						break;

					}else if(board[i][k]==board[i][j] && no_block_horizontal(i,j,k,board) && !has_conflicted[i][k]){
						show_move_animation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;

						score+=board[i][k];
						update_score(score);
						has_conflicted[i][k]=true;
						break;
					}
				}
			}
		}
	}
	setTimeout('update_board_view()',200);
	return true;

}



//向上移动
function move_up() {
	if(!can_move_up(board)){return false;}
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0 && no_block_vertical(j,k,i,board)){
						show_move_animation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						break;
					}else if(board[k][j]==board[i][j] && no_block_vertical(j,k,i,board) && !has_conflicted[k][j]){
						show_move_animation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;

						score+=board[k][j];
						update_score(score);
						has_conflicted[k][j]=true;
						break;
					}
				}
			}
		}
	}


	setTimeout('update_board_view()',200);
	return true;

}

//向下移动
function move_down(){
	if(!can_move_down(board)){
		return false;
	}
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
					if(board[k][j]==0 && no_block_vertical(j,i,k,board)){
						show_move_animation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						break;
					}else if(board[k][j]==board[i][j] && no_block_vertical(j,i,k,board) && !has_conflicted[k][j]){
						show_move_animation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						score+=board[k][j];
						update_score(score);
						has_conflicted[k][j]=true;
						break;
					}
				}
			}
		}
	}

	setTimeout('update_board_view()',200);
	return true;

}

function is_gameover(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==2048){
				update_score(success_str);
				return;
			}
		}
	}
	if(nospace(board) && nomove(board)){
		update_score(gameover_str);
	}
}

