function through(obj){
	var oSpan=obj.children[1];
	
	//弧度转角度
	function a2d(n){
		return n*180/Math.PI;	
	}
	function getDir(obj,ev){
		var X=obj.offsetLeft+obj.offsetWidth/2-ev.pageX;
		var Y=obj.offsetTop+obj.offsetHeight/2-ev.pageY;
		return Math.round((a2d(Math.atan2(Y,X))+180)/90)%4;
	}
	obj.onmouseover=function(ev){
		var oEvent=ev||event;
		var oFrom=oEvent.fromElement||oEvent.relatedTarget;
		if(obj.contains(oFrom)){
			return ;
		}
		var dir=getDir(obj,oEvent);
		//obj.innerHTML=dir;
		switch(dir){
			case 0:
				oSpan.style.left=obj.offsetWidth+'px';
				oSpan.style.top='0px';
			break;
			case 1:
				oSpan.style.left='0px';
				oSpan.style.top=obj.offsetHeight+'px';
			break;
			case 2:
				oSpan.style.left='-'+obj.offsetWidth+'px';
				oSpan.style.top='0px';
			break;
			case 3:
				oSpan.style.left='0px';
				oSpan.style.top='-'+obj.offsetHeight+'px';
			break;
		}
		move(oSpan,{left:0,top:0});
	};	
	obj.onmouseout=function(ev){
		var oEvent=ev||event;
		var oTo=oEvent.toElement||oEvent.relatedTarget;
		if(obj.contains(oTo)){
			return ;
		}
		var dir=getDir(obj,oEvent);
		switch(dir){
			case 0:
				move(oSpan,{left:obj.offsetWidth,top:0});
			break;
			case 1:
				move(oSpan,{left:0,top:obj.offsetHeight});
			break;
			case 2:
				move(oSpan,{left:-obj.offsetWidth,top:0});
			break;
			case 3:
				move(oSpan,{left:0,top:-obj.offsetHeight});
			break;
		}	
	};
}