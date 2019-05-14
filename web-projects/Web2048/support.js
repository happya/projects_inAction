
doc_width = window.screen.availWidth; //屏幕宽度
cell_space = 0.04*doc_width; //格子间距,格子距离棋盘边界的距离
cell_side_length=0.18*doc_width;//格子大小
grid_width=0.92*doc_width;//棋盘宽度


//获取格子(i,j)距离棋盘顶部的距离
function get_pos_top(i,j) {
	return cell_space+i*(cell_space+cell_side_length);

}


//获取格子(i,j)距离棋盘左边界的距离
function get_pos_left(i,j){
	return cell_space+j*(cell_space+cell_side_length);
}

var colors1_dic={2:'#FCEAEE',4:'#C697A1',8:'#81968F',
16:'#7D6B91',32:'#00AC97',64:'#B7A071',128:'#96786D',
256:'#969145',512:'#6A94A8',1024:'#3D7019',
2048:'#28666E',4096:'#99360C',8192:'#282D47'};
//var colors2=['#eee4da','#ede0c8','#f2b179'];

//获取不同数字2^(1-13)的格子背景色
function get_number_background_color(number){
	if(colors1_dic[number]){return colors1_dic[number];}
	return 'black';
}

function get_number_color(number){
	if(number<=2)
		return '#776e65';
	return '#DBD9D9';
}

//判断棋盘是否还有空格子，
function nospace(board){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				return false;
			}
		}
	}
	return true;
}

//判断能否向左移动
function can_move_left(board){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				if(board[i][j-1]==0 || board[i][j]==board[i][j-1]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断能否向右移动
function can_move_right(board){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				if(board[i][j+1]==0 || board[i][j]==board[i][j+1]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断能否向上移动
function can_move_up(board){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				if(board[i-1][j]==0 || board[i-1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function can_move_down(board){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(board[i][j]!=0){
				if(board[i+1][j]==0 || board[i][j]==board[i+1][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断水平方向上是否有空格子
function no_block_horizontal(row,col1,col2,board) {
	for(var j=col1+1;j<col2;j++){
		if(board[row][j]!=0){
			return false;
		}
	}
	return true;
}

//判断垂直方向是否有空格子
function no_block_vertical(col,row1,row2,board) {
	for(var i=row1+1;i<row2;i++){
		if(board[i][col]!=0){
			return false;
		}
	}
	return true;
}
//判断是否还能移动
function nomove(board){
	if(can_move_down(board) || can_move_up(board) || can_move_left(board) || can_move_right(board)){
		return false;
	}
	return true;
}