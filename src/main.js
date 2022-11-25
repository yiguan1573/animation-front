import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import animated from 'animate.css'
Vue.use(animated)
import App from './App.vue'
import router from './router'
import store from './store'

//全局css
import '@/assets/css/base.css'
//VueCoreVideoPlayer
import VueCoreVideoPlayer from 'vue-core-video-player'
Vue.use(VueCoreVideoPlayer,{
		lang: 'zh-CN'
})

//防抖
import preventReClick from './assets/js/preventReClick.js'

//引入网络请求
import {request} from './network/request.js'


Vue.config.productionTip = false

//前端拦截器
router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
	  if (window.localStorage.getItem("token") != null) {
			next()
		}else{
			next("/login")
		}
	}else{
		next()
	}
})

Vue.prototype.defaultUrl = 'http://localhost:8502/'
//图片预览地址
Vue.prototype.defaultImageUrl = 'http://192.168.10.102:9010/animation/'
//websocket地址
Vue.prototype.websocketUrl = 'ws://localhost:8502/websocket/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


