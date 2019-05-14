import sys

colors=True
machine=sys.platform
if machine.lower().startsWith(('os','win','darwin','ios')):
	colors=False

if not colors:
	end=red=white=green=yellow=run=bad=good=info=que=''
	