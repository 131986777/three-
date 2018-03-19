<template>

	<div>
		<!--<mt-button type="primary" @click.native="selectAddrPicker">单击</mt-button>
		{{showAddrPicker}}-->
		<mt-popup v-model="addrPickerVisible" position="bottom">
			<mt-picker :slots="addrPickerSlots" @change="addrPickerHandle" :showToolbar=true>
				<span class="mint-datetime-action mint-datetime-cancel" @click='cancelAddrPicker'>取消</span>
				<span class="mint-datetime-action mint-datetime-confirm" @click='confirmAddrPicker'>确定</span>
			</mt-picker>
		</mt-popup>
	</div>
</template>

<script>
	import Vue from 'vue';

	import { Picker } from 'mint-ui';
	import { Popup } from 'mint-ui';

	Vue.component(Popup.name, Popup);
	Vue.component(Picker.name, Picker);

	export default {
		data() {
			return {
				addrPickerVisible: false,
				showAddrPicker: '',
				addrJSON: '',
				shopmsg:''
			}
		},
	 	 
		computed: {},
		methods: {

			ajaxGet: function(url, fnSucceed, fnFail, fnLoading) {
				$.ajax({
					url: url,
					datatype: 'json',
					type: 'get',
					async: false,
					success: function(result) {
						fnSucceed(result);
					}
				})

			},

			cancelAddrPicker: function() {
				this.addrPickerVisible = false;
				this.showAddrPicker = this.showAddrPicker;
			},
			confirmAddrPicker: function() {
				this.addrPickerVisible = false;
				 this.$emit('shopName',this.shopmsg)
			},
			addrPickerHandle: function(picker, values) {
				//			console.log(picker)  每次更新进行检查 
				//			console.log(values)
				const that = this
				var dataArray = []; //省 下的某个市
				for(var i = 0; i < that.addrJSON.length; i++) { //  赋值
					if(picker.values[0] == that.addrJSON[i].Name) {
						that.provinceID = that.addrJSON[i].id;
						dataArray = that.addrJSON[i].Data;
						
						break;
					}
				}
				//市下
				var cityArray = []; //市列表储存
				for(var i = 0; i < dataArray.length; i++) {
					cityArray.push(dataArray[i].Name);
				}

				picker.setSlotValues(1, cityArray); //加入列表
				if(picker.values[0] != undefined && picker.values[1] != undefined) {
					if(that.addrPickerVisible != false) {
						for(var j = 0; j < cityArray.length; j++) {
							if(picker.values[1] == dataArray[j].Name) {
								that.cityID = dataArray[j].id;
								break;
							}
						}
						that.showAddrPicker = ''
					}
				}
				var shopArray = []; //省 下的某个市

				for(var i = 0; i < dataArray.length; i++) { //  赋值
					if(picker.values[1] == dataArray[i].Name) {

						shopArray = dataArray[i].child;

						break;
					}
				}


				var shoplist = []; //储存门店列表
				for(var i = 0; i < shopArray.length; i++) {
					shoplist.push(shopArray[i].Name);
					
				}

				picker.setSlotValues(2, shoplist); //加入列表
				if(picker.values[0] != undefined && picker.values[1] != undefined && picker.values[1] != undefined) {
					if(that.addrPickerVisible != false) {
						for(var j = 0; j < shopArray.length; j++) {
							if(picker.values[2] == shopArray[j].Name) {
								this.shopmsg= shopArray[j]
								break;
							}
						}
						that.showAddrPicker = picker.values[2];
					}
				}

				
			},
			selectAddrPicker: function() {
			
				this.addrPickerVisible = true;
			},
			addrPickerSlots: function() {

				const that = this
				var provinceArray = [];
				for(var i = 0; i < this.addrJSON.length; i++) {
					provinceArray.push(that.addrJSON[i].Name);
				}

				this.addrPickerSlots = [{
						flex: 1,
						values: provinceArray,
						className: 'slot1',
						textAlign: 'left',
						defaultIndex: 0
					},
					{
						flex: 1,
						values: [],
						className: 'slot2',
						textAlign: 'center',
						defaultIndex: 1
					},
					{
						flex: 1,
						values: [],
						className: 'slot3',
						textAlign: 'right'
					}
				];
			}
		},
		mounted() {

			this.$nextTick(() => {
				this.addrPickerSlots[0].defaultIndex = 1;

			});
		},
		created() {
			//数据处理
			const that = this
			this.ajaxGet('http://app.bblycyz.com/AndSell/bubu/shop/shop/queryAllByAgent', function(res) {

					var njq = []
					var czq = []
					for(var a = 0; a < res.extraData.districtList.length; a++) {
						if(res.extraData.districtList[a]['DISTRICT.CITY'] == 1) {
							njq.push(res.extraData.districtList[a]['DISTRICT.DISTRICT_NAME'])
						}
						if(res.extraData.districtList[a]['DISTRICT.CITY'] == 2) {
							czq.push(res.extraData.districtList[a]['DISTRICT.DISTRICT_NAME'])
						}
					}


					var arr = res.data
					var nj = []
					var cz = []
					for(var i = 0; i < arr.length; i++) {
						if(arr[i]['SHOP.CITY'] == 1) {
							nj.push(arr[i])
						}
						if(arr[i]['SHOP.CITY'] == 2) {
							cz.push(arr[i])
						}
					}

					const addrJSON = [{
							Name: '常州市'
						},
						{
							Name: '南京'
						}

					]

					var child = []
					for(var t = 0; t < njq.length; t++) {

						var obj = {}
						obj.Name = njq[t]
						var arrs = []
						for(var k = 0; k < nj.length; k++) {

							if(nj[k]['SHOP.SHOP_DISTRICT_NAME'] == njq[t]) {
								var objs = {}

								objs.id = nj[k]['SHOP.SHOP_ID']
								objs.Name = nj[k]['SHOP.SHOP_NAME']
								arrs.push(objs)
							}

						}
						obj.child = arrs
						child.push(obj)
					}

					var childs = []
					for(var t = 0; t < czq.length; t++) {

						var obj = {}
						obj.Name = czq[t]
						var arrs = []
						for(var k = 0; k < cz.length; k++) {

							if(cz[k]['SHOP.SHOP_DISTRICT_NAME'] == czq[t]) {
								var objs = {}

								objs.id = cz[k]['SHOP.SHOP_ID']
								objs.Name = cz[k]['SHOP.SHOP_NAME']
								arrs.push(objs)
							}

						}
						obj.child = arrs
						childs.push(obj)
					}

					addrJSON[1].Data = child;
					addrJSON[0].Data = childs;

					that.addrJSON = addrJSON


				}),

				this.addrPickerSlots();
		},
		watch: {}
	}
</script>