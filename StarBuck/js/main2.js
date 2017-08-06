window.onload = function() {
	$("#footer_1").click(function() {
		$("#footerbody").toggle(500)
	})
	$("#footer_2").click(function() {
		$("#footerbody2").toggle(500)
	})
	$("#footer_3").click(function() {
		$("#footerbody3").toggle(500)
	})
	$("#footer_4").click(function() {
		$("#footerbody4").toggle(500)
	})
	$("#footer_5").click(function() {
		$("#footerbody5").toggle(500)
	})
	$("#footer_6").click(function() {
		$("#footerbody6").toggle(500)
	})
	$("#footer_7").click(function() {
		$("#footerbody7").toggle(500)
	})

	//	var menu = document.getElementById("menu");
	//	document.addEventListener()
	var nav = document.getElementById("nav_top");
	
	document.addEventListener('touchstart',start)
	document.addEventListener('touchend',end)
	
	

	function start(ev) {
		ev = ev.changedTouches[0];

		touchx = ev.pageX;
		touchy = ev.pageY;
	}
	
	function end(ev){
				ev = ev.changedTouches[0];
				
				endx = ev.pageX;
				endy = ev.pageY;
				
				var x = endx - touchx;
				var y = endy - touchy;
				
				if(Math.abs(y)-Math.abs(x)>0){
					if(y>0){
						nav.style.top = 0+'rem';
					}else if(y<0){
						nav.style.top = -5 +'rem';
					}
				}
			}
	
	var login = document.getElementById("SignIn")
	var back = document.getElementById("Back")
	var first = document.getElementById("first")
	var JumpToSign = document.getElementById("login_2")
	var screen1 = document.getElementById("screen");/*蒙层*/
	var l_menu = document.getElementById("left-menu");/*左边菜单*/
	var menu = document.getElementById("menu")/*导航按钮*/

	back.addEventListener('touchend',end2)
	JumpToSign.addEventListener('touchend',end3)
	screen1.addEventListener('touchstart',end4)
	menu.addEventListener('touchend',show)
	
	function end2(ev){
		ev = ev.changedTouches[0];
		if(ev){
			first.style.display = 'block';
			login.style.display = 'none';
		}
	}
	
	function end3(ev){
		ev = ev.changedTouches[0];
		if(ev){
			first.style.display = 'none';
			login.style.display = 'block';
		}
	}
	
	function end4(ev){
		ev = ev.changedTouches[0];
		if(ev){
			screen1.style.opacity = 0;
			screen1.style.zIndex = -9;
			
			l_menu.style.transform = 'translateX(100%)'
			l_menu.style.display = 'none';
		}
	}
	
	function show(ev){
		ev = ev.changedTouches[0];
		if(ev){
			screen1.style.display = 'block';
			screen1.style.opacity = 0.3;
			screen1.style.zIndex = 98;
			
			l_menu.style.transform = 'translateX(0)'
			l_menu.style.display = 'block';
		}
	}
	
	var inter = document.getElementsByClassName("inter")[0].value;
	
	var inter2 = document.getElementById("inter2");

	var rule = /^[A-Za-z][A-Za-z1-9_-]+$/
	
	inter2.onclick = function(){
		if(rule.test(inter)){
			alert('可以注册')
		}else{
			alert('不符合注册')
		}
	}
	
	$('inter2').click(function(){
		var val = $('inter').val();
		if(!val.trim()){
			alert('亲，请留下点东西！');
			return;
		}
	});
}