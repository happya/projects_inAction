import argparse
import warnings

warnings.filterwarnings('ignore')
parser=argparse.ArgumentParser()

parser.add_argument('-u','--url',help='root url')
parser.add_argument('-c','--cookie')
parser.add_argument('-r','--regex')
parser.add_argument('-e','--export')
parser.add_argument('-o','--output')
parser.add_argument('-l','--level',type=int)
parser.add_argument('-t','--threads',type=int,default=2)



keys=set()
files=set()
intel=set()
robots=set()
custom=set()
failed=set()
scripts=set()
external=set()
fuzzable=set()
endpoints=set()
processed=set()
internal=set([s for s in args.seeds])

bad_intel=set()
bad_scripts=set()
