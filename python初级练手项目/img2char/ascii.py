# -*- coding=utf-8 -*-

from PIL import Image
import argparse

parser=argparse.ArgumentParser()

parser.add_argument('file')
parser.add_argument('-o','--output')
parser.add_argument('--w',type=int,default=80)
parser.add_argument('--h',type=int,default=80)

args=parser.parse_args()

IMG,WIDTH,HEIGHT,OUTPUT=args.file,args.w,args.h,args.output

ascii_char = list("$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'. ")

def get_char(r,g,b,alpha=256):
	if alpha==0:
		return ' '
	length = len(ascii_char)
	gray=int(0.2126*r+0.7152*g+0.0722*b)
	res=int(length*gray/(256.0+1))
	#res=gray%length
	return ascii_char[res]

if __name__=='__main__':
	img=Image.open(IMG)
	img=img.resize((WIDTH,HEIGHT),Image.NEAREST)

	txt=""

	for i in range(HEIGHT):
		for j in range(WIDTH):
			txt+=get_char(*img.getpixel((j,i)))
		txt+='\n'
	print(txt)

	filename=OUTPUT if OUTPUT else "output.txt"
	with open(filename,'w') as f:
		f.write(txt)
