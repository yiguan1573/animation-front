<template>
	<div class="animationBasePage">
		
		<el-row>
		  <el-col :xs="3" :sm="3" :md="3" :lg="2" :xl="2" :offset="1">
				<div class="logo">
					<img src="../assets/image/logo.png" :class="logoAnimation" alt="logo" @mouseenter="addAnimation">
				</div>
			</el-col>
		  <el-col :xs="7" :sm="7" :md="6" :lg="5" :xl="5">
				<div class="mainTab">
					<div :class="{'animate__animated':animation1,'animate__bounce':animation1}" @click="addAnimation1()">首页</div>
					<div :class="{'animate__animated':animation2,'animate__bounce':animation2}" @click="addAnimation2()">动画</div>
					<div :class="{'animate__animated':animation3,'animate__bounce':animation3}" @click="addAnimation3()">剧场版</div>
				</div>
			</el-col>
		  <el-col :xs="3" :sm="3" :md="3" :lg="7" :xl="7">
				<el-input
						style="margin-left: 30px;"
				    placeholder="请输入内容"
						@keyup.enter.native="handleClick"
				    v-model="input">
						<i slot="prefix" class="el-input__icon el-icon-search" @click="handleClick"></i>
				</el-input>
			</el-col>
			<el-col :xs="1" :sm="1" :md="2" :lg="1" :xl="1" :offset="3">
				<Personal style="margin-top: 4px; max-width: 44px; margin-left: 20px;"></Personal>
			</el-col>
		  <el-col :xs="6" :sm="6" :md="6" :lg="5" :xl="5">
				<div class="userTab">
					
					<div @click="toMessage" class="user-title">
						<el-badge :is-dot="getSystemMessage" class="item">消息</el-badge>
					</div>
					
					<div @click="toCollect" class="user-title">收藏</div>
					
					<el-popover
					  placement="bottom"
					  width="300"
						@show="getHistoryList"
					  trigger="hover">
					  <div slot="reference" class="user-title" style="padding-bottom: 15px">
					  	<div @click="toHistory" >历史记录</div>
					  </div>
						<div style="padding-left: 15px; padding-right: 15px; padding-top: 10px;">
							<div class="history-popover-title el-icon-time">
								<span>观影记录</span>
							</div>
							<el-timeline>
							    <el-timeline-item
							      v-for="(history, index) in historys"
							      :key="history.id"
										:color="history.color"
							      :timestamp="history.time">
										<span  
											@mousemove="changeColorToRed(history.id)"
											@mouseleave="removeColor(history.id)"
											@click="toDetail(history.animationId)"
											style="text-overflow: ellipsis;cursor: pointer;overflow: hidden;white-space: nowrap;display: inline-block; width: 180px;">
											{{history.animationName}}
										</span>
										<span style="float: right;
											color: #a0a0a0;
											margin-top: 2px;
											overflow: hidden;
											max-width: 24%;
											min-width: 18%;
											font-size: 12px;
											text-align: right;">{{history.episodeNo}}</span>
							    </el-timeline-item>
							</el-timeline>
							<div class="drop-item-op" v-show="!isEmpty">
								<p @click="clearHistory">清空</p>
							</div>
							<el-empty :image-size="100" v-show="isEmpty" description="暂无观影记录"></el-empty>
						</div>
						
					</el-popover>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {request} from '../network/request.js'
	import Personal from './Personal'
	import websocket from '../assets/js/websocket.vue'
	export default {
		name: 'animationBasePage',
		components:{
			Personal
		},
		data(){
			return{
				input: '',
				animation1: false,
				animation2: false,
				animation3: false,
				logoAnimation: '',
				historys:[
					
				]
			}
		},
		mounted() { 
			if(window.localStorage.getItem("id")!=null){
				//初始化websocket
				websocket.initWebSocket()
			}
		},
		methods:{
			toDetail(id){
				this.$router.push({
					path: '/animationDetail',
					query:{id:id}
				})
			},
			getHistoryList(){
				if(window.localStorage.getItem("id") != null){
					request({
						url: '/core/getHistoryList',
						method: 'get',
						params:{
							pageNo:1,
							pageSize:4,
							userId:window.localStorage.getItem("id")
						}
					}).then(res =>{
						if(res.status == 200){
							this.historys=res.data
						}
					})
				}else{
					this.historys=[]
				}
			},
			handleClick(){
				const that = this
				this.$router.push({
					path: '/search',
					query:{search:that.input}
				})
			},
			addAnimation(){
				this.logoAnimation = 'animate__animated animate__flipInY'
				setTimeout(() =>{
					this.logoAnimation = ''
				},1000)
			},
			addAnimation1(){
				this.$router.push("/home")
				this.animation1 = true
				setTimeout(() =>{
					this.animation1 = false
				},1000)
			},
			addAnimation2(){
				this.$router.push("/daylong")
				this.animation2 = true
				setTimeout(() =>{
					this.animation2 = false
				},1000)
			},
			addAnimation3(){
				this.$router.push("/ova")
				this.animation3 = true
				setTimeout(() =>{
					this.animation3 = false
				},1000)
			},
			toMessage(){
				this.$router.push("/message")
				this.$store.commit('updateSystemMessage',false)
			},
			toCollect(){
				this.$router.push("/collect")
			},
			toHistory(){
				this.$router.push("/history")
			},
			changeColorToRed(id){
				let newHistory = JSON.parse(JSON.stringify(this.historys))
				newHistory.forEach(e => {
					if(e.id==id&&e.color!="#00b5e5") e.color="#00b5e5"
				})
				this.historys = newHistory
			},
			removeColor(id){
				let newHistory = JSON.parse(JSON.stringify(this.historys))
				newHistory.forEach(e => {
					if(e.id==id&&e.color=="#00b5e5") delete e.color
				})
				this.historys = newHistory
			},
			clearHistory(){
				if(window.localStorage.getItem("id") == null){
					this.$message.error("用户id为空")
					return
				}
				request({
					url: '/core/deleteHistory',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data:{
						userId: window.localStorage.getItem("id"),
					}
				}).then(res =>{
					if(res.status == 200){
						this.$message.success("清空成功")
						this.historys = []
					}
				})
			},
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
			// 	this.$store.commit('updateSystemMessage',true)
			// },
			// // 关闭连接时调用
			// websocketclose(e) {
			// 	console.log(e)
			// }
		},
		computed:{
			isEmpty(){
				if(this.historys.length>0){
					return false
				}else{
					return true
				}
			},
			getSystemMessage(){
				return this.$store.state.systemMessage
			}
		},
		destroyed(){ // 离开页面生命周期函数
			if(window.localStorage.getItem("id")!=null){
				websocket.websocketclose();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.animationBasePage{
		width: 100vw;
		/deep/ .el-row{
			margin-top: 10px;
		}
		width: 100%;
		overflow: hidden;
		.logo{
			margin-top: 9px;
			// margin-left: 35px;
			img{
				width: 152px;
				height: 24px;
			}
		}
		.mainTab{
			margin-left: 30px;
			div {
				padding-bottom: 30px;
				margin-top: 9px;
				font-weight: 600;
				cursor: pointer;
				margin-left: 35px;
				float: left;
				font-style: italic;
				transition: all .3s;
			}
			div:hover {
				padding-bottom: 30px;
				margin-top: 5px;
				font-weight: 600;
				cursor: pointer;
				margin-left: 35px;
				float: left;
				font-style: italic;
			}
		}
		.userTab{
			.user-title {
				padding-bottom: 30px;
				margin-top: 9px;
				font-weight: 600;
				cursor: pointer;
				margin-left: 35px;
				float: left;
				font-style: italic;
				transition: all .3s;
			}
			.user-title:hover {
				padding-bottom: 30px;
				margin-top: 5px;
				font-weight: 600;
				cursor: pointer;
				margin-left: 35px;
				float: left;
				font-style: italic;
			}
		}
	}
	.drop-item-op p {
    width: 93%;
    text-align: center;
    cursor: pointer;
    display: block;
		background-color: #f3f5f7;
		padding: 0 10px;
		line-height: 30px;
		height: 30px;
		font-size: 13px;
		border-radius: 8px;
		text-decoration: none;
		color: #282828;
		outline: none;
	}
	.drop-item-op p:hover {
	    background: #00b5e5;
	    color: white;
	}
	.history-popover-title{
		color: #e50914;
		font-size: 20px;
		margin-bottom: 15px;
	}
	.history-popover-title span{
		position: absolute;
		color: #282828;
		font-size: 16px;
		font-weight: 700;
		margin-left: 15px;
	}
</style>
