window.onload = function() {
	//滚动的数字   贯穿整个
	
	//载入
	var loading_img = document.getElementById("loading_img");
	
	loading_img.onclick = function(){
		this.style.opacity = 0;
		setInterval(function(){
			loading_img.style.zIndex = -9;
		},1000)
	}
	
	
	//滚动条以及动画
	var  vertical_scroll = document.getElementById("vertical_scroll");/*整个画面*/
	var  scroll_area_1 = document.getElementById("scroll_area_1");/*第一段画面*/
	var  scroll_area_2 = document.getElementById("scroll_area_2");/*第二段画面*/
	var  scroll_area_3 = document.getElementById("scroll_area_3");/*第三段画面*/
	//////
	var scroll = 0;//全局函数
	////
	var drag = document.getElementById("scroll_crack");/*滚动滑块*/
	var bar = document.getElementById("scroll_bar");/*滚动条*/
	var iH = bar.clientHeight - drag.offsetHeight;/*滑块与顶部距离*/
	
	//////////////////////////////////
	var nav_menu = document.getElementsByClassName('nav_menu')[0];/*头部菜单*/
	var content_scroll = document.getElementById("content_scroll");/*scroll文字*/
	var content_arrow = document.getElementById("content_arrow");/*scroll下箭头*/
	var content_tip = document.getElementById("content_tip");/*scroll下的tip*/
	
	
	////////////////////////////////
	var comic2_girl = document.getElementById("comic2_girl");//逃跑的girl
	var glass = document.getElementById("glass")//破碎的玻璃
	var comic18_girl = document.getElementById("comic18_girl")//滑坡
	//////////////////////////////
	
	
	var h = vertical_scroll.clientHeight - bar.clientHeight;/*整个画面的高度和滑块高度的比例*/
	
	drag.onmousedown = function(ev){
				var start = ev.pageY;
				var diy = drag.offsetTop;			
				document.onmousemove = function(ev){
					var disy = ev.pageY - start;
					drag.style.top = diy+ disy + "px";
					if(drag.offsetTop<0){
						drag.style.top = 0 + 'px';
					}				
					if(drag.offsetTop >= iH){
						drag.style.top = iH + 'px';
					}
					////////////////
					scroll = drag.offsetTop*5/iH;
					var scrollnum = -scroll*h;
					////////////////图片移动
					comic2_girl.style.transform = 'translateX('+scroll*1000+'px)'
					glass.style.transform = 'translateX('+ scroll*1000+'px)'
					////////中部文本
					content_scroll.style.transform = 'translateY('+scrollnum*0.3+'px)';
					content_scroll.style.opacity = 1-Math.abs(scrollnum*0.003);
					
					content_arrow.style.transform = 'translateY('+scrollnum*0.3+'px)';
					content_arrow.style.opacity = 1-Math.abs(scrollnum*0.009);
					
					content_tip.style.opacity = 1-Math.abs(scrollnum*0.009);
					
					////////
					
					vertical_scroll.style.top = scrollnum + 'px';
					////////////////
					
					if(scroll < 0.99){
						
						vertical_scroll.style.display = 'block';
						scroll_area_2.style.display = 'none';
					}else if (scroll => 1) {
						vertical_scroll.style.display = 'none';
						scroll_area_2.style.display = 'block';
						scroll_area2(scroll);
					}
					
					//////////////////
					
					
				}
				
				document.onmouseup = function(){
					document.onmousemove = null;
					document.onmouseup = null;
				}
				ev.preventDefault();
			}
	
		var num2 = 10;
		function scroll_area2(num){
			///////
			var current = num*5000-5000;
			///////
			var allwidth = document.getElementById("comic7").clientWidth;//公共宽度
			var comic8 = document.getElementById("comic8");//爬墙
			var comic9 = document.getElementById("comic9");//跑路
			var comic10= document.getElementById("comic10")//转化模式
			var comic11= document.getElementById("comic11")//接10图的跳转
			var comic12= document.getElementById("comic12")//信仰之跃
			var comic13= document.getElementById("comic13")//顺风车跑路
			var comic14= document.getElementById("comic14")//路遇追兵
			var gun_14 = document.getElementById("gun");//枪战
			//var comic15= document.getElementById("comic15");//准备跳车
			var comic16= document.getElementById("comic16");//模式转化
			var comic17 = document.getElementById("comic17");//接着上面转化
			var comic18 = document.getElementById("comic18");//跳车逃脱
			var comic19 = document.getElementById("comic19");//跳桥跑路
			var comic20 = document.getElementById("comic20");//天桥隐藏
			var comic21 = document.getElementById("comic21");//回家
			var comic22 = document.getElementById("comic22");//模式转化
			///////////
			var comic23 = document.getElementById("comic23")//接上面的模式转化
			var comic24 =document.getElementById("comic24")//电梯报告
			
			//////////////部分图样式
			
			//////////////////////
			
			/////////////
			var num3 = allwidth*2;
			////////////
			
			
			//////////左右距离层级判定
			
			current += 10;
			if (num2 >= allwidth) {
				num2 = allwidth
			}
			
			if(current >= allwidth){
				comic9.style.zIndex = 6;//准备跑路
				comic10.style.zIndex = -5;
				comic11.style.zIndex = -5;
				comic12.style.zIndex = -5;
				console.log(current);
				
				
				
			}else if(current < allwidth){
				comic9.style.zIndex = -6;//准备跑路
			};
			
			if(current >= allwidth*2){//comic10 模式转化后的判断
				comic9.style.transform = 'translateX('+(allwidth*2-current)+'px)';
			}
			
			if(current >= allwidth*2.8){//comic10 模式转化后的判断
				comic10.style.transform = 'translateX('+(allwidth*3-current)+'px)';
				comic11.style.zIndex = -5;
			}
			if(current >= allwidth*3){//comic10跳转到11
				comic11.style.zIndex = 5;
				comic11.style.transform = 'translateX('+(allwidth*3-current)+'px)';
				
				comic12.style.zIndex = 4;//   信仰之跃    放在模式转化图的下面-层
				
				comic13.style.zIndex = -6;
			}
			if(current >= allwidth*4){//顺风车跑路
				comic13.style.zIndex = 6;
				comic13.style.transform = 'translateX('+(allwidth*5-current)+'px)';
				comic14.style.zIndex = -7;
			}
			if(current >= allwidth*5){//路遇追兵
				comic14.style.zIndex = 7;
				comic14.style.transform = 'translateX('+(allwidth*6-current)+'px)';
				comic12.style.zIndex = -4;//   信仰之跃    放在模式转化图的下面-层
			}
			if(current >= allwidth*6){//开枪动画
				comic14.style.zIndex = 7;
				comic14.style.transform = 'translateX('+0+'px)';
				//comic15.style.zIndex = -4;
				comic16.style.zIndex = -4;
				if (current >= allwidth*6.05) {
					gun_14.src = "HyreType/10/2.jpg";
				}
				if (current >= allwidth*6.1) {
					gun_14.src = "HyreType/10/3.jpg";
				}
				if (current >= allwidth*6.15) {
					gun_14.src = "HyreType/10/4.jpg";
				}
				if (current >= allwidth*6.2) {
					gun_14.src = "HyreType/10/4.jpg";
				}
				if (current >= allwidth*6.25) {
					gun_14.src = "HyreType/10/5.jpg";
				}
				if (current >= allwidth*6.3) {
					gun_14.src = "HyreType/10/6.jpg";
				}
				if (current >= allwidth*6.35) {
					gun_14.src = "HyreType/10/7.jpg";
				}
				if (current >= allwidth*6.4) {
					gun_14.src = "HyreType/10/8.jpg";
				}
				if (current >= allwidth*6.45) {
					gun_14.src = "HyreType/10/9.jpg";
				}
				if (current >= allwidth*6.5) {
					gun_14.src = "HyreType/10/10.jpg";
				}
				if (current >= allwidth*6.55) {
					gun_14.src = "HyreType/10/11.jpg";
				}
				if (current >= allwidth*6.6) {
					gun_14.src = "HyreType/10/12.jpg";
				}
				if (current >= allwidth*6.65) {
					gun_14.src = "HyreType/10/13.jpg";
				}
				if (current >= allwidth*6.7) {
					gun_14.src = "HyreType/10/14.jpg";
				}
				if (current >= allwidth*6.75) {
					gun_14.src = "HyreType/10/15.jpg";
				}
				if (current >= allwidth*6.8) {
					gun_14.src = "HyreType/10/16.jpg";
				}
				if (current >= allwidth*6.85) {
					gun_14.src = "HyreType/10/17.jpg";
				}
				if (current >= allwidth*6.9) {
					gun_14.src = "HyreType/10/18.jpg";
				}
				if (current >= allwidth*6.95) {
					gun_14.src = "HyreType/10/19.jpg";
				}
			}
			
//			if(current >= allwidth*7){//准备跑路
//				comic15.style.zIndex = 8;
//				comic15.style.transform = 'translateX('+(allwidth*7-current)+'px)';
//				comic16.style.zIndex = -4;//
//			}
			
			
			if(current >= allwidth*7){//模式转化
				comic16.style.zIndex = 8;
				comic16.style.transform = 'translateX('+(allwidth*8-current)+'px)';
				comic17.style.zIndex = -8;
				comic18.style.zIndex = -9;//跳车逃脱
				
				
			}
			
			if(current >= allwidth*8){//模式转化
				comic17.style.zIndex = 8;
				comic17.style.transform = 'translateX('+(allwidth*8-current)+'px)';
				
				comic18.style.zIndex = 9;//跳车逃脱
				comic18.style.transform = 'translateX('+(allwidth*9-current)+'px)';
				comic19.style.zIndex = -9;
				
				var adjust = (current-10427)/5;
				comic18_girl.style.transform = 'translate3d('+adjust+'px,'+adjust*0.6+'px,0px)';
				
			}
			
			if(current >= allwidth*9){//跳桥跑路
				comic19.style.zIndex = 9;
				comic19.style.transform = 'translateX('+(allwidth*10-current)+'px)';
				comic20.style.zIndex = -10;
			}
			if(current >= allwidth*10){
				comic20.style.zIndex = 10;
				comic20.style.transform = 'translateX('+(allwidth*11-current)+'px)';
				comic21.style.zIndex = -10;
				var hide = document.getElementById("hide");
				var numm = (current-13125)/3;
				hide.style.transform = 'translateX('+numm+'px)'
			}
			if(current >= allwidth*11){
				comic21.style.zIndex = 10;
				comic21.style.transform = 'translateX('+(allwidth*12-current)+'px)';
				comic22.style.zIndex = -10;
				comic14.style.zIndex = -7;//被人射击
			}
			if(current >= allwidth*12){
				comic22.style.zIndex = 11;
				comic22.style.transform = 'translateX('+(allwidth*13-current)+'px)';
				scroll_area_3.style.display = 'none';
			}
			
			//////////////////////第三场动画
			
			var current2 = 0;
//			console.log(current2)
			if(current > allwidth*13.05){
				scroll_area_2.style.display = 'none';
				scroll_area_3.style.display = 'block';
				scroll_area_3.style.transform = 'translateY('+ -(allwidth*13-current)+'px)';
			}
			
//			if(current > allheight*23.15){
//				
//			}
			/////////////////////
			
			comic8.style.transform = 'translateX('+(allwidth-current)+'px)';
			
		}
		
	////////////////////////////////
		
//	
//	var r = function(t) {var e = t || window.event;
//			return document.body.doScroll ? document.body.doScroll(e.wheelDelta > 0 ? "left" : "right") : (e.wheelDelta || e.detail) > 0 ? document.body.scrollLeft -= 25 : document.body.scrollLeft += 25, !1
//					};
//		"onmousewheel" in document.body ? document.body.onmousewheel = r : document.body.addEventListener("DOMMouseScroll", r)
	
	//////////////////////////////
	
	addWheelEvent(scroll_area_1,fndown,fnup);
	
	function fnup(){
		var vertical_scroll_h = vertical_scroll.offsetTop + 100;
		var scroll = drag.offsetTop - 2;
		drag.style.top = scroll + 'px';
		vertical_scroll.style.top = vertical_scroll_h + 'px';
		console.log(scroll)
		console.log(vertical_scroll_h)
		console.log(drag.style.top)
	}
	
	function fndown(){
		//var dragH = drag.offsetHeight;
		var vertical_scroll_h = vertical_scroll.offsetTop - 100;
		var scroll = drag.offsetTop + 2;
		drag.style.top = scroll + 'px';
		vertical_scroll.style.top = vertical_scroll_h + 'px';
		console.log(scroll)
		console.log(vertical_scroll_h)
		console.log(drag.style.top)
	}


	//////////////////////////////////////////////////
	
	
	
	//按钮
//	var auto_play = document.getElementById("autoplay_buttom");
//	auto_play.onclick = function(){
//		scroll+10;
//		console.log(scroll)
//		drag.style.top = scroll + 'px';
//		}
//	
//	var allheight = vertical_scroll.clientHeight;
//	console.log(allheight)
}