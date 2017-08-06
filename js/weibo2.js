window.onload = function(){

//每条评论的时间
	var viewtime = document.getElementById("time")
	var now = new Date();
	var month = now.getMonth()+1;
	var day = now.getDay()-1;
	var hour = now.getHours();
	var min = now.getMinutes();
	
	viewtime.innerHTML = month + '月' + day + '日' + hour + ':' + min;
	
	console.log(viewtime)
	
//封装一个可以获取各类id，class，tagname的对象，并且写入各类函数用于重复调用
var get = {
			byId: function(id) {//如果传入的是字符串，那么获取之
				return typeof id === "string" ? document.getElementById(id) : id
			},
			byClass: function(sClass, oParent) {
				var aClass = [];//
				
				var reClass = new RegExp("(^| )" + sClass + "( |$)");
				var aElem = this.byTagName("*", oParent);
				
				for(var i = 0; i < aElem.length; i++)reClass.test(aElem[i].className) && aClass.push(aElem[i]);
				return aClass
			},
			byTagName: function(elem, obj) {//
				return(obj || document).getElementsByTagName(elem)
			}
		};
}

//再封装一个绑定事件的对象 用于
var EventUtil = {
				addHandler: function(oElement, sEvent, fnHandler) {
					oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : (oElement["_" + sEvent + fnHandler] = fnHandler, oElement[sEvent + fnHandler] = function() {
						oElement["_" + sEvent + fnHandler]()
					}, oElement.attachEvent("on" + sEvent, oElement[sEvent + fnHandler]))
				},
				removeHandler: function(oElement, sEvent, fnHandler) {
					oElement.removeEventListener ? oElement.removeEventListener(sEvent, fnHandler, false) : oElement.detachEvent("on" + sEvent, oElement[sEvent + fnHandler])
				},
				addLoadHandler: function(fnHandler) {
					this.addHandler(window, "load", fnHandler)
				}
};

