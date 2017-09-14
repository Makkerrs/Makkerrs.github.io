var vm = new Vue({
	el: '#app',
	data: { //
		totalMoney: 0,
		productList: [],
		checkAllFlag:false
	},
	filters: { //
		formatMoney: function(value) {
			return "$" + value.toFixed(2);
		}
	},
	mounted: function() { //执行函数
		this.cartView();
	},
	methods: {
		cartView: function() {
			let _this = this; //存储实例化的对象指向vm
			this.$http.get("data/cartData.json",{"id":123}).then(res => {
					console.log(res.data.result.list)
					this.productList = res.data.result.list;
					this.totalMoney = res.data.result.totalMoney;
				}) //用let和箭头函数可以将this指向控制在该作用域
		},

		changeMoney: function(product, way) {
			if(way > 0) {
				product.productQuantity++;
			} else {
				product.productQuantity--;
				if(product.productQuantity < 1) {
					product.productQuantity = 1;
				}
			}
		},

		selectedProduct: function(item) {
			if(typeof item.checked == 'undefined') {
			  //    设置    目标         要添加的变量   变量中 要添加的值
			  //Vue.set(item, "checked", true);
				this.$set(item, "checked", true);
			} else {
				item.checked = !item.checked;
			}
		},
		checkAll:function(flag){
			this.checkAllFlag = flag;//每次点击取反
			var _this = this;
			this.productList.forEach(function(item,index){
				if(typeof item.check == 'undefined'){
					_this.$set(item,"checked",_this.checkAllFlag);
				}else{
					item.checked = _this.checkAllFlag;
				}
			});
		}
	}
})

//为总金额添加一个过滤函数
Vue.filter("money", function(value, type) {
	return "$" + value.toFixed(2) + type;
})