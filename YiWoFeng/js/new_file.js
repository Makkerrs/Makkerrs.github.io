window.onload=window.onresize=function(){
	var num =0
	var arr = ["img/banner1.png","img/banner2.png"];
	var timer = null;
	var w = $(".img1").width();	
	var inpt = $(".djzx-1 input");
	var  iImg =  $(".img1 img");
	var wrap = $("#wrap");
	var nav = $(".nav li");
	var arrscroll = [0,775,1700,3565,4500];
	var scrollY = 	$(window).scrollTop();
	iw = window.innerWidth;
	$("#banner").css({width:iw});
	$("#banner1").css({width:iw});
	$("#header1").css({width:iw});
	
	$(window).on("scroll",function(){  //滚动条滚动事件 
		scrollY = 	$(window).scrollTop();
//		$("#header1").css({opacity:0.9})
		for(var i =0;i<arrscroll.length;i++){
			if(scrollY>=arrscroll[i]){
				nav.eq(i).addClass("nav-bot").siblings("li").removeClass("nav-bot");
			}
		}
		
	})
	
	
	
	clickNav(); //点击nav
	function clickNav(){ //点击nav
		
		nav.each(function(i,ele){
			$(ele).on("click",function(){
				var a= $(this).index();
				console.log(a)
				$(this).addClass("nav-bot").siblings("li").removeClass("nav-bot");
				console.log(arrscroll[a])
				$(window).scrollTop(arrscroll[a]);
			})
			
		})
	}
	
	
	
	inpt.on("click",function(){ //点击input跳转链接
		window.open("https://jinshuju.net/f/ZF6qpw","_blank")
	})
	up(iImg); //
	timer =  setInterval(function(){
		up(iImg);
	},5000)
	
	function up(obj){ //轮播图
		num++;
		obj.eq(0).attr("src",arr[num-1]);
		obj.eq(1).attr("src",arr[num]);
		if(num>arr.length-1){
			obj.eq(0).attr("src",arr[arr.length-1]);
			obj.eq(1).attr("src",arr[0]);
			num=0
		}
		
			$(".img1").css("top","0px");
			$(".img1").stop().animate({
				top:-708
			},2000)
	}
	
}
	
		
		
		
		

