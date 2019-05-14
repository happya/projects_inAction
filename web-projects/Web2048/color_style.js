
var colors1_dic={1:'#FCEAEE',2:'#C697A1',3:'#F6B9AB',
4:'#C2B3D1',5:'#00AC97',6:'#648C87',7:'#FFF9A9',
8:'#969145',9:'#BDDFA4',10:'#3D7019',
11:'#0EEAD0',12:'#FF3D11',13:'#F9EE48',14: '#C2B9CC', 15:'#A39C65',16:'#8EA87C'};

var colors1_dic2={2:'#FCEAEE',4:'#C697A1',8:'#81968F',
16:'#7D6B91',32:'#00AC97',64:'#B7A071',128:'#96786D',
256:'#969145',512:'#6A94A8',1024:'#3D7019',
2048:'#28666E',4096:'#99360C',8192:'#282D47'};

var box_size=100;
var space=20;

function add_colors() {
	//$('.cell').remove();
	var k=2;
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$('#container').append('<div class="cell" id="color_' + k + '"></div>');
			var color_num=$('#color_'+k);

			color_num.css('width','100px');
			color_num.css('height','100px');
			//color_num.css('grid-area','i/j/span 1/span 1');
			//color_num.css('padding','20px');
			color_num.css('background-color',colors1_dic2[k]);
			color_num.css('color',get_num_color(k));
			color_num.text(k);
			if(k>64){
				color_num.css('font-size','50px');
			}
			if(k>512){
				color_num.css('font-size','40px');
			}
			//color_num.css('top',get_top(i,j)+'px');
			//color_num.css('left',get_left(i,j)+'px');
			//console.log('add new box: '+colors1_dic[k]);
			k*=2;
			if(k>8192){break;}
		}
	}
}

/*function get_top(i,j) {
	return space+i*(space+box_size);
}

function get_left(i,j){
	return space+j*(space+box_size);
}*/

function get_num_color(k){
	if(k<=2)
		return '#776e65';
	return '#DBD9D9';
}