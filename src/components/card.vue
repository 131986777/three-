<template>
	<div class="empty">
		<section v-for="list in cardList">
			<div class="HongbaoMain-main_56Zi81W">
				<!---->
				<div class="left">
					<p class="HongbaoMain-amount_36f1onr"><span>¥</span> <span v-text="list['SIGN_IN_COUPON.COUPON']"></span>
						<!---->
					</p>
					<p class="HongbaoMain-sumCondition_20dmmeQ">满10元可用</p>
				</div>
				<div class="HongbaoMain-info_lsb3sru">
					<h3 class="HongbaoMain-name_15bgPAH"><span class="HongbaoMain-nameText_3fVFYtU">云厨满减卷一张</span></h3>
					<ul class="HongbaoMain-descriptions_3sCDL3l">
						<li>请在<span>{{list['SIGN_IN_COUPON.DATE'] | today}}</span>至<span>{{list['SIGN_IN_COUPON.DATE'] | endday}} </span>内领取</li>
						<!---->
					</ul>
				</div>
				<div class="HongbaoMain-action_3zWL7_W">

					<!---->
				</div>
				<!---->
			</div>
			<div class="HongbaoList-extra_jOln1_-">
				<ul class="">
					<!---->
					<li class="HongbaoList-extraItem_3NOA0G2">请在<span>{{list['SIGN_IN_COUPON.SHOPNAME']}}</span>领取，过期作废！</li>
					<!---->
				</ul>
			</div>
		</section>

	</div>

</template>
<style>
	ul,
	li,
	h1,
	h2,
	h3,
	{
		padding: 0;
	}
	
	ul,
	li {
		list-style: none;
	}
	
	body {
		background-color: #f5f5f5;
	}
	
	section {
		font-size: 14px;
		box-shadow: 0 0.006667rem 0.04rem rgba(0, 0, 0, .1);
		background: #fff;
		margin-bottom: 2px;
	}
	
	.HongbaoMain-main_56Zi81W {
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		padding: .2rem 0 .17rem;
		line-height: .08rem;
	}
	
	.HongbaoMain-info_lsb3sru {

		margin-left: 0.2rem;
	}
	
	.HongbaoMain-action_3zWL7_W {}
	
	.HongbaoMain-amount_36f1onr span:nth-child(2) {
		font-weight: 600;
		font-size: .346667rem;
	}
	
	.HongbaoMain-amount_36f1onr span:first-child {
		margin-right: .008rem;
		font-size: .2rem;
	}
	
	.HongbaoMain-descriptions_3sCDL3l {
		-webkit-text-size-adjust: none;
		-moz-text-size-adjust: none;
		-ms-text-size-adjust: none;
		text-size-adjust: none;
		padding: 0;
		font-size: 0.1rem;
		line-height: .2rem;
	}
	
	.HongbaoMain-amount_36f1onr {
		padding-left: .1rem;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-flex: 0;
		-webkit-flex: 0 0 .5rem;
		-ms-flex: 0 0 .5rem;
		flex: 0 0 .5rem;
		-webkit-box-align: baseline;
		-webkit-align-items: baseline;
		-ms-flex-align: baseline;
		align-items: baseline;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
		width: .5rem;
		color: #ff0025;
	}
	
	.HongbaoList-extra_jOln1_- {
		position: relative;
		padding: .1rem .2rem;
		border-top: .013333rem dashed #ddd;
		background: #fcfcfc;
		color: #666;
		border-bottom-left-radius: .053333rem;
		border-bottom-right-radius: .053333rem;
	}
	
	.HongbaoMain-sumCondition_20dmmeQ {
		text-align: center;
		font-size: .1rem;
		color: #666;
		line-height: .2rem;
	}
	
	.left {
		padding-left: .5rem;
	}
	
	.HongbaoList-extra_jOln1_- {
		border-top: 1px dashed #ccc;
	}
	
	.HongbaoList-extra_jOln1_- ul {
		padding: 0;
		margin: 0;
	}
</style>
<script>
	export default {

		data() {
				return {
					cardList: '',
				}
			},
			filters: {
				today(value) {
					if(!value) {
						return ''
					}
					value = value.toString()
					return value.substr(0, [10])
				},
				endday(value) {
					if(!value) {
						return ''
					}
					
					value = value.substr(0, [10])
					
					value==value.replace(/-/g,'/')
					var dd = new Date(value);

					dd.setDate(dd.getDate() + 3); //获取AddDayCount天后的日期 
					var y = dd.getFullYear();
					var m = dd.getMonth() + 1; //获取当前月份的日期 
					var d = dd.getDate();
					return y + "-" + m + "-" + d;
				
				},

			},

			mounted: function() {

				var _this = this;

				//this.getcookie('openid')
				var obj = {}
				obj['SIGN_IN_COUPON.USERID'] = this.getcookie('openid');
				this.ajaxPost('http://app.bblycyz.com/ticket/bubu/sign/signcoupon/getById', obj, function(res) {
					console.log(res.data)
					if(res.data.length==0){
						$('.empty').css('background','url(static/img/empty.png)')
						$('.empty').css('background-size','100%')
						  
					}
					else{
						_this.cardList = res.data
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
				}
				
			},

	}
</script>