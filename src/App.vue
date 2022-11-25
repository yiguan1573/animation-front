<template>
	<div class="app">
		<Animation></Animation>
		<div class="video-box" v-if="loading">
		   <video class="video-background" preload="auto" playsinline autoplay src="./assets/movie/02.mp4" tabindex="-1" muted="muted"></video>
		</div>
	</div>
</template>

<script>
	import Animation from "./views/core/AnimationBasePage.vue"
	import {request} from './network/request.js'
	export default {
		name: 'App',
		created() {
			// window.localStorage.clear()
			this.$store.commit('updataUserName')
			this.$store.commit('updataImg')
			this.$store.commit('updataRole')
		// 	let _this = this
		// 	_this.loading = true
		// 	setTimeout(() =>{
		// 		_this.loading = false
		// 	},4100)
		},
		components:{
			Animation
		},
		data() {
			return {
				loading:false
			}
		},
		// mounted() {
		// 	if(window.localStorage.getItem("id")!=null){
		// 		//初始化websocket
		// 		this.initWebSocket()
		// 	}
		// },
		methods:{
			// initWebSocket() { // 建立连接
			// 	// WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
			// 	var userId = window.localStorage.getItem("id");
			// 	var url = this.websocketUrl+userId;
			// 	this.websock = new WebSocket(url);
			// 	this.websock.onopen = this.websocketonopen;
			// 	this.websock.send = this.websocketsend;
			// 	this.websock.onerror = this.websocketonerror;
			// 	this.websock.onmessage = this.websocketonmessage;
			// 	this.websock.onclose = this.websocketclose;
			// },
			// // 连接成功后调用
			// websocketonopen() {
			// 	console.log("WebSocket连接成功");
			// },
			// // 发生错误时调用
			// websocketonerror(e) {
			// 	console.log("WebSocket连接发生错误");
			// },
			// // 给后端发消息时调用
			// websocketsend(e) {
			// 	console.log("WebSocket连接发生错误");
			// },
			// // 接收后端消息
			// // vue 客户端根据返回的cmd类型处理不同的业务响应
			// websocketonmessage(e) {
			// 	 //处理订阅信息
			// 	this.$message.success("收到系统消息:"+e.data)
			// 	console.log(e.data)
			// },
			// // 关闭连接时调用
			// websocketclose(e) {
			// 	console.log("connection closed (" + e.code + ")");
			// }
		},
		// destroyed(){ // 离开页面生命周期函数
		// 	if(window.localStorage.getItem("id")!=null){
		// 		this.websocketclose();
		// 	}
		// }
	}
</script>

<style lang="scss" scoped>
	.app{
		width: 100vw;
	}
	.video-box .video-background {
	    position: fixed;
			display: block;
	    // left: 50%;
	    // top: 50%;
	    // /*保证视频内容始终居中*/
	    // transform: translate(-50%, -50%);
	    width:100vw;
	    height: 100vh;
			object-fit: fill;
	    // object-fill:cover;
	    min-height: 800px;
			z-index: 99999;
	}
</style>
