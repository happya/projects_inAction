function show_num_with_animation(i,j,rand_num) {
	var number_cell=$('#number_cell_'+i+'_'+j);
	number_cell.css('background-color',get_number_background_color(rand_num));
	number_cell.css('color',get_number_color(rand_num));
	number_cell.text(rand_num);
	number_cell.animate({
		width: cell_side_length,
		height: cell_side_length,
		top: get_pos_top(i,j),
		left: get_pos_left(i,j)
	},50);

}

function update_score(score){
	$('#score').text(score);
}

//格子移动时的动画效果
function show_move_animation(from_x,from_y,to_x,to_y){
	var number_cell=$('#number_cell_'+from_x + '_' + from_y);
	number_cell.animate({
		top: get_pos_top(to_x,to_y),
		left: get_pos_left(to_x,to_y)
	},200);
}