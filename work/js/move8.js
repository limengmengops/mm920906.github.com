function getStyle(obj,name){
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];	
}
function move(obj,json,options){
	options=options||{};
	options.easing=options.easing||'ease-out';
	options.duration=options.duration||700;
	var dis={};
	var start={};	
	for(var name in json){
		start[name]=parseFloat(getStyle(obj,name));
		if(isNaN(start[name])){
			switch(name){
				case 'width':
					start[name]=obj.offsetWidth;
					break;
				case 'height':
					start[name]=obj.offsetHeight;
					break;
				case 'left':
					start[name]=obj.offsetLeft;
					break;
				case 'top':
					start[name]=obj.offsetTop;
					break;
				case 'opacity':
					start[name]=1;
					break;
				case 'border':
					start[name]=0;
					break;
			}
		}
		dis[name]=json[name]-start[name];
	}
	var count=Math.round(options.duration/30);
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var name in json){
			switch(options.easing){
				case 'linear':
					var a=n/count;
					var cur=start[name]+dis[name]*a;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*Math.pow(a,3);
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-Math.pow(a,3));
					break;
			}
			if(name=='opacity'){
				obj.style[name]=cur;
				obj.style.filter='alpha(opacity:50)';
			}else{
				obj.style[name]=cur+'px';
			}	
	   }
		if(n==count){
			clearInterval(obj.timer);
			options.complette&&options.complete();
		}
	},30);
}