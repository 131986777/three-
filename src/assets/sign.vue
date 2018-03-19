<template>
	<div>

		<div class="content">
			<div class="back">
				<div class="content-box">
					<div class="box" @click="message()">
						<div class="box-top"></div>
						<div class="box-content"></div>
					</div>
					<div class="box">
						<div class="box-top"></div>
						<div class="box-content"></div>
					</div>
					<div class="box">
						<div class="box-top"></div>
						<div class="box-content"></div>
					</div>
					<div class="box">
						<div class="box-top"></div>
						<div class="box-content"></div>
					</div>
					<div class="box">
						<div class="box-top"></div>
						<div class="box-content"></div>
					</div>
					<div class="box">
						<div class="box-top"></div>
						<div class="box-content"></div>
					</div>

				</div>
			</div>

		</div>
		<div class="chuai_box" v-if="messageBox">
			<div class="message wzc">
				<div class="titles">您还未注册，请注册领取</div>
				<input type="text" name="" id="" value="" placeholder="请输入手机号" /><br />
				<input type="password" name="" id="" value="" placeholder="请输入密码" class="password" /><br />
				<input class="bth bth-wzc" value="领取红包" readonly>

				</input>
			</div>
			<div class="message zc">
				<div class="titles">请填写手机号领取</div>
				<input type="text" name="" id="" value="" class="phone-zc" placeholder="请输入手机号" /><br />

				<input class="bth bth-zc" value="领取红包" readonly>

				</input>
			</div>
		</div>
	</div>

</template>

<style>
	body,
	html,
	{
		margin: 0;
		padding: 0;
	}
	
	.back {
		background: url(../assets/back.jpg);
		background-size: 100% 100%;
		height: 22.656rem;
		position: relative;
	}
	
	.content {
		height: auto;
		overflow: hidden;
	}
	
	.content-box {
		position: absolute;
		width: 6.8rem;
		height: 5.3rem;
		left: 4.5%;
		top: 38%;
	}
	
	.box {
		position: relative;
		width: 2.26rem;
		height: 2.65rem;
		float: left;
	}
	
	.box-content {
		width: 1.356rem;
		height: 1.1rem;
		position: absolute;
		top: 0;
		top: 31%;
		left: 17.3%;
		background: url(../assets/content.png);
		background-size: 100% 100%;
	}
	
	.box-top {
		width: 1.46rem;
		height: 0.89rem;
		position: absolute;
		z-index: 11;
		left: 15%;
		top: 13%;
		background: url(../assets/top.png);
		background-size: 100% 100%;
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
	
	@keyframes shake {
		from,
		to {
			transform: translate3d(0, -20px, 0);
		}
		10%,
		30%,
		50% {
			transform: translate3d(-10px, 0, 0);
		}
		20%,
		40%,
		60% {
			transform: translate3d(10px, 0, 0);
		}
		70% {
			transform: translate3d(0, 0, 0);
		}
	}
	
	.shake {
		animation-name: shake;
	}
	
	.start {
		animation: shake 1s;
		animation-fill-mode: forwards;
	}
	
	.message {
		opacity: 1;
		width: 5.7rem;
		background-size: cover;
		position: absolute;
		left: 50%;
		top: 50%;
		height: 3.2rem;
		margin-left: -2.85rem;
		margin-top: -1.6rem;
		border-radius: 4px;
		z-index: -1;
		background: #f5f5f5;
		border-radius: .08rem;
		text-align: center;
	}
	
	.titles {
		margin-top: .42rem;
		font-size: .38rem;
		color: #e85a41;
	}
	
	input {
		margin-top: .28rem;
		width: 4.54rem;
		font-size: .38rem;
		border-radius: .06rem;
		padding: .2rem;
		border: 0;
		background: #e1e1e1;
		color: #1a1a1a;
		height: .38rem;
		-moz-box-shadow: .38rem .38rem .38rem rgba(101, 79, 15, 0.18) inset;
		-webkit-box-shadow: .38rem .38rem .38rem rgba(101, 79, 15, 0.18) inset;
		/* For Chrome5+, Safari5+ */
		box-shadow: 0rem 0rem .38rem rgba(101, 79, 15, 0.18) inset;
		margin-bottom: .2rem;
	}
	
	.bth {
		text-align: center;
		background: #e85a41;
		color: #F5F5F5;
		font-size: .36rem;
	}
	
	.wzc {
		opacity: 0;
		display: none;
	}
	
	.zc {
		line-height: .5rem;
	}
	
	.zc>input {
		margin-top: .2rem;
	}
	
	.wzc {
		line-height: .4rem;
		height: 4.2rem;
		margin-top: -2.1rem;
	}
	
	input::-webkit-input-placeholder {
		line-height: 2em;
		color: #999;
	}
	
	.phone-zc {
		margin-top: 0;
	}
	
	.password {
		margin-top: 0rem;
	}
	
	.bth-wzc {
		margin-top: 0;
	}
	
	.bth-zc {
		margin-top: 0 !important;
	}
	
	.chuai_box {
		width: 100%;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		text-align: center;
		text-align: -webkit-center;
		z-index: 1000;
	}
</style>
<script>
	export default {

		data() {
			return {
				messageBox:false,
			}
		},
		mounted: function() {

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
			message: function() {
					this.messageBox=true
			}

		}

	}
</script>