import Vue from 'vue'
import Router from 'vue-router'
import sign from '@/components/sign.vue'
import card from '@/components/card.vue'
Vue.use(Router)

export default new Router({
	
 routes:[
	{
		path:'/sign',
		name:'sign',
		component:sign,
	},
	{
		path:'/card',
		name:'card',
		component:card,
	},
	{
		path:'',

	}
	]
})


