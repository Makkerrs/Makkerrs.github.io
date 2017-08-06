/*
 	author:me	date:2017-04-05,Wed
 * */

//ajax
	function ajax(obj){
	//1.接收实参对象；
	var opation = {
		url:obj.url,
		success:obj.success,
		method:obj.method || 'get',
		name:obj.name || null,
		bool:obj.bool || true,
		type:obj.type || null
	};
	//2.创建一个ajax对象；
	var ajax = new XMLHttpRequest();
	//3.传输方式兼容；
	if(opation.method == 'get'){
		ajax.open('get',opation.url+'?'+opation.name,opation.bool);
		ajax.send();
	};
	if(opation.method == 'post'){
		ajax.open('post',opation.url,opation.bool);
		ajax.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');
		ajax.send(opation.name);
	};
	//4.ajax流程状态值判断；
	if(ajax.onreadystatechange){
		ajax.onreadystatechange = fn;
	}else{
		ajax.onload = fn;
	};
	//5.判断所接收的数据类型然后处理数据；
	function fn(){
		if(ajax.readyState == 4){
			if(ajax.status>=200&&ajax.status<=207){
				var str = null;
				if(opation.type == 'xml'){
					str = ajax.responseXML;
				}else if(opation.type == 'json'){
					str = (new Function('','return'+ajax.responseText))();
				}else{
					str = ajax.responseText;
				};
				opation.success&&opation.success(str);
			}else{//出错了
				opation.fail&&opation.fail(ajax.status);
			};
		};
	};
};


//获取元素表现出来的属性值；
function getStyle(obj,attr){
	var res=0;
	if(obj.currentStyle){
		res=obj.currentStyle(attr);
	}else{
		res=getComputedStyle(obj)[attr];
	};
	if(attr=="opacity"){
		return Math.floor(res*100);
	};
	return parseInt(res);
};

//鼠标滚轮兼容；
function addWheelEvent(obj,down,up){
	var browser=window.navigator.userAgent.toLowerCase();
	//firefox;
	if(browser.indexOf("firefox")!=-1){
		obj.addEventListener("DOMMouseScroll",fn);
	}else if(browser.indexOf("chrome")!=-1){
		//chrome;
		obj.addEventListener("mousewheel",fn);
	}else{
		//ie;
		obj.attachEvent("mousewheel",fn);
	};
	function fn(ev){
		var bool=true;
		if(ev.wheelDelta){
			//ie和chrome鼠标往前是正值；
			bool=ev.wheelDelta>0?true:false;
		}else{
			//firefox鼠标往前是负值；
			bool=ev.wheelDelta>0?false:true;
		};
		if(bool){
			up&&up();
		}else{
			down&&down();
		};
		/*
		 	阻止浏览器默认行为；
		 	当在绑定的元素上使用滚轮时，会作用到浏览器的滚动条，如果有的话；
		 */
		ev.preventDefault();
	};
};

//添加事件监听；
function addEvent(obj,event,fn,bool){
	if(obj.addEventListener){
		obj.addEventListener(event,fn,bool);
	}else{
		obj.attachEvent("on"+event,fn);
	};
};

//移除事件监听；
function removeEvent(obj,event,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(event,fn);
	}else{
		obj.detachEvent("on"+event,fn);
	};
};

//id、class、标签名；
function $(name,parent){
	//截取第一个字符，判断是哪种选择器；
	var pre=name.substr(0,1);
	//判断在哪个父级下获取元素，没有的话就默认是document；
	parent=parent||document;
	//先用通配符获取到父级下的所有元素以及它们的个数；
	var all=parent.getElementsByTagName("*");
	var allL=all.length;
	//定义空数组存放遍历完所有元素之后带有“name”class名的元素；
	var newClassArr=[];
	
	if(pre=="#"){
		//是id选择器的话，就截取"#"号后面的id名，再return获取即可。
		var id=name.substring(1);
		return parent.getElementById(id);
	}else if(pre=="."){
		/*
		 	如果是class选择器，因为获取的时候不仅仅涉及获取一个集合的问题，
		 	而且还涉及到ie不兼容用className获取元素的问题，所以用一个数组来返回获取元素，
		 	这样不仅能达到获取，而且能解决兼容ie的问题。
		 */
		var o=name.substring(1);
		for(var i=0;i<allL;i++){
			if(all[i].className){
				//classname存在的话还得判断一个元素多个用空格隔开的class名；
				var arr=all[i].className.split(" ");
				//得到class名的数组之后就进行遍历；
				for(var j=0;j<arr.length;j++){
					if(arr[j]==o){
						//如果有自己想要获取的class名，就放到新数组里面；
						newClassArr.push(all[i]);
					};
				};
			};
		};
		//最后返回这个新数组；
		return newClassArr;
	}else{
		//如果不是，就返回用标签名获取；
		return parent.getElementsByTagName(name);
	};
};


//设置cookie;
function setCookie(key,value,myDay){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+myDay);
	document.cookie=key+"="+value+";expires="+oDate;
};
//获取cookie;
function getCookie(key){
	var arr=document.cookie.split("=");
	for(var i=0;i<arr.length;i++){
		if(arr[0]==key){
			return arr[1];
		};
	};
	return "";
};
//删除cookie；
function removeCookie(key){
	setCookie(key,"",-1);
};


//阻止冒泡；
function cancelBubble(ev){
	var ev=ev||event;
	if(ev.stopPropagation){
		ev.stopPropagation();
	}else{
		window.event.cancelBubble = true;
	};
};

//阻止浏览器默认事件；
function preventDefault(ev){
	var ev=ev||event;
	if(ev.preventDefault){
		ev.preventDefault();
	}else{
		ev.returnValue=false;//ie8以下；
	};
};

//数组去重；
function arrNoRepeat(arr){
	var obj={};
	for(var i=0;i<arr.length;i++){
		if(obj[typeof arr[i]+arr[i]]){
			arr.splice(i,1);
			//数组长度减少，因此让i--，避免错过去重；
			i--;
		}else{
			obj[typeof arr[i]+arr[i]]=1;
		};
	};
	return arr;
};

//删除字符串前后的空格；
function delSpace(str){
	return str.replace(/^\s+|\s+$/g,"");
};

//删除字符串前后的空格；
function myDelSpace(str){
	var arr=str.split("");
	var newArr=[];
	for(var i=0;i<arr.length;i++){
		if(arr[i]!=" "){
			var o=arr.indexOf(arr[i]);
			newArr.push(o);
		};
	};
	var l=newArr.length;
	return arr.slice(newArr[0],(newArr[l-1])+1).join("");
};

//单个属性变化的move函数；
function move(obj,attr,target,time,type,fn,callback){
	//变化次数；
	var t=0;
	//初始值；
	var c=parseInt(css(obj,attr));
	//目标值减去初始值的差，得到变化区间；
	var b=target-c;
	//临界值；
	var d=time/50;
	
	timer=setInterval(function(){
		t++;
		//调用Tween下面方法随着t++返回变化的值；
		var changeNum=Tween[type](t,c,b,d);
		//把变化的值赋给需要产生变化的属性；
		if(attr="opacity"){
			obj.style[attr]=changeNum/100;
		}else{
			obj.style[attr]=changeNum+"px";
		};
		//同时进行的函数；
		(typeof fn=="function")&&fn();
		//当达到临界值时执行回调函数；
		if(t>=d){
			(typeof callback=="function")&&callback();
			clearInterval(timer);
		};
	},30);
};

//多个属性变化的move函数；
function Mmove(int){
	//接收实参对象；
	var obj=int.element;
	var time=int.time;
	var type=int.type;
	var callback=int.callback||null;
	var fn=int.fn||null;
	var target=int.target;
	//初始化；
	var t=0;
	var d=time/50;
	var timer=0;
	var b={};
	var c={};
	//算出差值；
	for(var attr in target){
		//初始值；
		c[attr]=css(obj,attr);
		//变化区间；
		b[attr]=target[attr]-c[attr];
	};
	timer=setInterval(function(){
		t++;
		for(var x in c){
			var changeNum=Tween[type](t,c[x],b[x],d);
			if(x=="opacity"){
				obj.style[x]=changeNum/100;
			}else{
				obj.style[x]=changeNum+"px";
			};
		};
		if(t>=d){
			clearInterval(timer);
		}
	},50);
};


//拖拽；
function drafting(obj){
	obj.onmousedown=function(ev){
		var disX=ev.pageX-this.offsetLeft;
		var disY=ev.pageY-this.offsetTop;
		document.onmousemove=function(ev){
			obj.style.left=ev.pageX-disX+"px";
			obj.style.top=ev.pageY-disY+"px";
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		};
	};
	return obj;
};


//碰撞(检测是否两个块是否接触)；
function touch(obj,obj1){
	var all = obj.getBoundingClientRect();
	var all1 = obj1.getBoundingClientRect();

	var top = all.top;
	var right = all.right;
	var left = all.left;
	var bot = all.bottom;
	
	var top1 = all1.top;
	var right1 = all1.right;
	var left1 = all1.left;
	var bot1 = all1.bottom;
	
	if(right>=left1&&bot>=top1&&right1>=left&&bot1>=top){
		return true;
	}else{
		return false;
	};
};

//冒泡排序法：让数字从小到大排序，返回数组；
function sSortedArr(arr){
	for(var i=0;i<arr.length-1;i++){
		for(var j=0;j<arr.length-1-i;j++){
			if(arr[j]>arr[j+1]){
				var a=arr[j+1];
				arr[j+1]=arr[j];
				arr[j]=a;
			};
		};
	};
	return arr;
};

//冒泡排序法：让数字从大到小排序，返回数组；
function lSortedArr(arr){
	for(var i=0;i<arr.length-1;i++){
		for(var j=0;j<arr.length-1-i;j++){
			if(arr[j]<arr[j+1]){
				var a=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=a;
			};
		};
	};
	return arr;
};

//冒泡排序法：找最小值；
function findMin(arr){
	for(var i=0;i<arr.length-1;i++){
		for(var j=0;j<arr.length-1-i;j++){
			if(arr[j]>arr[j+1]){
				var a=arr[j+1];
				arr[j+1]=arr[j];
				arr[j]=a;
			};
		};
	};
	return arr[0];
};

//冒泡排序法：找最大值；
function findMax(arr){
	for(var i=0;i<arr.length-1;i++){
		for(var j=0;j<arr.length-1-i;j++){
			if(arr[j]<arr[j+1]){
				var a=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=a;
			};
		};
	};
	return arr[0];
};

//找最小值；
function arrMin(arr){
	var p=-Infinity;//定义一个无穷小的数；
	for(var i=0;i<arr.length;i++){
		if(arr[i]>p){
			p=arr[i];
		};
	};
	return arr[0];
};

//找最大值；
function arrMax(arr){
	var p=-Infinity;//定义一个无穷小的数；
	for(var i=0;i<arr.length;i++){
		if(arr[i]>p){
			p=arr[i];
		};
	};
	return arr[arr.length-1];
};

//删除字符串前后空格；
function delSpace(str){
	var arr=str.split("");
	var arr1=[];
	for(var i=0;i<arr.length;i++){
		if(arr[i]!=" "){
			var a=arr.indexOf(arr[i]);
			arr1.push(a);
			//indexOf()方法在数组里面审查元素也适用？
		};
	};
	return arr.slice(arr1[0],arr1[arr1.length-1]+1).join("");
};

//查找匹配字符串的个数和位置；
function matchStr(str,strMatch){
	var first=str.indexOf(strMatch);
	var arr=[];
	var obj={};
	arr[0]=first;
	while(first!=-1){
		first=str.indexOf(strMatch,first+1);
		if(first!=-1){
			arr.push(first);
		};
	};
	obj.length=arr.length;
	obj.arr=arr;
	return obj;
};

//放大镜
function magnifier(sPicBox,bPicBox,move,largePic){
	sPicBox.onmousemove=function(ev){
		var ev=ev||event;
		var slmgLeft=sPicBox.offsetLeft;
		var slmgTop=sPicBox.offsetTop;
		var halfWidth=(move.offsetWidth/2);
		var halfHeight=(move.offsetHeight/2);
		var x=ev.pageX-slmgLeft-halfWidth;
		var y=ev.pageY-slmgTop-halfHeight;
		var chaX=sPicBox.offsetWidth-move.offsetWidth;
		var chaY=sPicBox.offsetHeight-move.offsetHeight;
		if(x<0){
			x=0;
		}else if(x>chaX){
			x=chaX;
		};
		if(y<0){
			y=0;
		}else if(y>chaY){
			y=chaY;
		};
		move.style.left=x+"px";
		move.style.top=y+"px";
		var scaleX=x/chaX;
		var scaleY=y/chaY;
		largePic.style.left=-(largePic.offsetWidth-bPicBox.offsetWidth)*scaleX+"px";
		largePic.style.top=-(largePic.offsetHeight-bPicBox.offsetHeight)*scaleY+"px";
	};
};
