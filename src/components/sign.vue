<template>
	<div class="bg">
		<img src="../assets/bg.jpg" alt="" width="100%" />
		<div class="calendar">
			<ul>
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
				<li>6</li>
				<li>7</li>

			</ul>
			<ul>
				<li>8</li>
				<li>9</li>
				<li>10</li>
				<li>11</li>
				<li>12</li>
				<li>13</li>
				<li>14</li>

			</ul>
			<ul>
				<li>15</li>
				<li class="xz">16</li>
				<li class="xz">17</li>
				<li class="xz">18</li>
				<li class="xz">19</li>
				<li class="xz">20</li>
				<li class="xz">21</li>

			</ul>
			<ul>
				<li class="xz">22</li>
				<li class="xz">23</li>
				<li class="xz">24</li>
				<li class="xz">25</li>
				<li class="xz">26</li>
				<li class="xz">27</li>
				<li class="xz">28</li>

			</ul>
			<ul>
				<li class="xz">29</li>
				<li class="xz">30</li>
				<li class="xz">31</li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>

			</ul>
		</div>
		<div class="package" @click="package">

		</div>
		<div class="sign" @click="sign">

		</div>
		<div class="exchange" @click="exchange">

		</div>
		<div class="sc" @click="sc">

		</div>
		<div class='day'>{{days}}</div>
		<transition name="fade">

			<div class="zhe" v-if="show" @click="showS">
				<div class="signS" v-if="signS"> <img src="../assets/sucessful.png" width="100%" /></div>
				<div class="exchangeS" v-if="exchangeS">
					<img src="../assets/exchange.png" width="100%" />
					<input type="" name="" id="" value="" class="phone" />
					<select class="shop">
						<option value="1"> 请选择门店</option>
						<option v-for="shopLists in shopList" v-bind:value="shopLists['SHOP.SHOP_ID']">{{shopLists['SHOP.SHOP_NAME']}}</option>
					</select>
					<div class="submit" @click="submit"></div>
					<div class="delete" @click="deleteS">X</div>
				</div>

			</div>
		</transition>
	</div>

</template>

<style>
	body,
	html,
	{
		margin: 0;
		padding: 0;
	}
	
	.calendar ul,
	li {
		margin: 0;
		padding: 0;
	}
	
	.calendar {
		width: 2.56rem;
		position: absolute;
		top: 47.5%;
		left: 16.2%;
	}
	
	.package {
		position: absolute;
		height: .28rem;
		/*		background: yellow;*/
		top: 3%;
		width: .8rem;
		right: .02rem;
	}
	
	.sign {
		width: 2.9rem;
		position: absolute;
		height: 0.5rem;
		top: 77.5%;
		left: 12.2%;
		font-size: 20px;
		/*background: yellow;*/
	}
	
	.exchange {
		width: 2.9rem;
		position: absolute;
		height: 0.5rem;
		top: 89%;
		left: 12.2%;
		font-size: 20px;
		/*background: yellow;*/
	}
	
	.calendar ul {
		display: -webkit-flex;
		display: flex;
	}
	
	.calendar>ul>li {
		list-style: none;
		float: left;
		width: 0.5rem;
		height: 0.3rem;
		text-align: center;
		line-height: 0.3rem;
	}
	
	.bg {
		position: relative;
	}
	
	.calendar {
		font-size: 0.17rem;
	}
	
	.zhe {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.7);
		/*		display: none;*/
		z-index: 2;
	}
	
	.sc {
		width: 2.9rem;
		position: absolute;
		height: 0.5rem;
		top: 29.5%;
		left: 12.2%;
		font-size: 20px;
	}
	
	.day {
		width: 0.4rem;
		position: absolute;
		height: 0.3rem;
		top: 38.5%;
		left: 47.2%;
		font-size: .3rem;
		line-height: .3rem;
		text-align: center;
	}
	
	.signS {
		margin-top: 1rem;
		/*display: none;*/
	}
	
	.exchangeS {}
	
	.submit {
		position: absolute;
		width: 40%;
		/*background: red;*/
		top: 62.5%;
		left: 30%;
		height: 8%;
		font-size: .15rem;
	}
	
	.delete {
		/* border-radius: 50%; */
		text-align: center;
		position: absolute;
		/* line-height: 73%; */
		width: 14%;
		/* background: red; */
		top: 18.5%;
		left: 74%;
		height: 8%;
		font-size: .4rem;
	}
	
	.phone {
		border: 0;
		position: absolute;
		top: 35%;
		left: 36%;
		height: .18rem;
		width: 1.4rem;
		font-size: .2rem;
	}
	
	.shop {
		border: 0;
		position: absolute;
		top: 44.5%;
		left: 40%;
		height: 5%;
		font-size: .15rem;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}
	
	.fade-enter,
	.fade-leave-to
	/* .fade-leave-active in below version 2.1.8 */
	
	{
		opacity: 0
	}
</style>
<script>
	export default {

		data() {
				return {
					show: false,
					signS: false,
					exchangeS: false,
					shopList: '',
					days: 0
				}
			},
			mounted: function() {

				var _this = this;
				this.ajaxGet('http://app.bblycyz.com/AndSell/bubu/shop/shop/shopall', function(res) {
						console.log(_this.shopList = res.data)
					})
					//this.getcookie('openid')
				var obj = {}
				obj['SIGN_IN.USERID'] = this.getcookie('openid');
				this.ajaxPost('http://app.bblycyz.com/ticket/bubu/sign/signOff/getById', obj, function(res) {
					if(res.code == 0) {
						_this.days = res.data[0]['SIGN_IN.ACOUNT']
						for(var i = 0; i < $('.xz').length; i++) {
							if(res.extraData.map[i] == 1) {

								$('.xz').eq(i).css('background', 'yellow');
							}
						}
					}

				})

			},
			methods: {
				ajaxGet: function(url, fnSucceed, fnFail, fnLoading) {
					$.ajax({
						url: url,
						datatype: 'json',
						type: 'get',
						success: function(result) {
							fnSucceed(result);
						}
					})

				},
				ajaxPost: function(url, data, fnSucceed, fnFail, fnLoading) {
					$.ajax({
						url: url,
						datatype: 'json',
						type: 'get',
						data: data,
						success: function(result) {
							fnSucceed(result);
						}
					});

				},
				getcookie: function(name) {
					var strcookie = document.cookie;
					var arrcookie = strcookie.split("; ");
					for(var i = 0; i < arrcookie.length; i++) {
						var arr = arrcookie[i].split("=");
						if(arr[0] == name) return arr[1];
					}
					return "";
				},
				package: function() {
					this.$router.push('card')
				},
				exchange: function() {
					this.exchangeS = true,
						this.show = true

				},
				sc: function() {
					window.location.href = "http://app.bblycyz.com/AndSell/h5/pages/main/main_bak.html"
				},
				sign: function() {
					var _this = this;
					var obj = {};
					//this.getcookie('openid')
					//new Date().getDate()
					obj['SIGN_IN.USERID'] = this.getcookie('openid');
					obj['SIGN_IN.SDAY'] = new Date().getDate();
					obj['TIME'] = new Date().getTime()
					this.ajaxPost('http://app.bblycyz.com/ticket/bubu/sign/signOff/signday', obj, function(res) {
						if(res.code == 0) {
							_this.signS = true;
							_this.show = true;
							_this.days = Number(_this.days) + 1;
							$('li').eq(new Date().getDate() - 1).css('background', 'yellow');

						} else {
							alert(res.msg)
						}

					})

				},

				showS: function() {
					if(this.exchangeS == true) {

					} else {
						this.show = false,
							this.signS = false
					}

				},
				deleteS: function() {
					this.exchangeS = false,
						this.show = false
				},
				submit: function() {
					var re = /^1\d{10}$/ //正则表达式//判断字符是否是11位数字 
					if(!re.test($('.phone').val())) {
						alert('请输入11位手机号')
						return
					}
					if($('select').val()=="1"){
						alert('请选择门店')
						return
					}


					var _this = this;
					var obj = {};
					//this.getcookie('openid')
					//new Date().getDate()
					obj['SIGN_IN.USERID'] = this.getcookie('openid')
					obj['SIGN_IN.PHONE'] = $('.phone').val()
					obj['SIGN_IN.SHOPID'] = $('select').val();
					obj['SIGN_IN.SHOPNAME'] = $("select  option:selected").text();
					this.ajaxPost('http://app.bblycyz.com/ticket/bubu/sign/signcoupon/getcoupon', obj, function(res) {
						if(res.code == 0) {
							_this.exchangeS = false,
								_this.show = false
							alert('兑换成功')

						} else {
							alert(res.msg)
						}
						console.log(res)
					})

				},
 
			}

	}
</script>