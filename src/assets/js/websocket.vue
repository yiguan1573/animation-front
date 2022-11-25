
<script>
	import Vue from 'vue'
	import store from '@/store'
	import {Message} from 'element-ui';
	export default {
					initWebSocket() { // 建立连接
						// WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
						var userId = window.localStorage.getItem("id");
						var url = Vue.prototype.websocketUrl+userId;
						this.websock = new WebSocket(url);
						this.websock.onopen = this.websocketonopen;
						this.websock.send = this.websocketsend;
						this.websock.onerror = this.websocketonerror;
						this.websock.onmessage = this.websocketonmessage;
						this.websock.onclose = this.websocketclose;
					},
					// 连接成功后调用
					websocketonopen() {
						console.log("WebSocket连接成功");
					},
					// 发生错误时调用
					websocketonerror(e) {
						console.log("WebSocket连接发生错误");
					},
					// 给后端发消息时调用
					websocketsend(e) {
						console.log("WebSocket连接发生错误");
					},
					// 接收后端消息
					// vue 客户端根据返回的cmd类型处理不同的业务响应
					websocketonmessage(e) {
						 //处理订阅信息
						Message.success("收到系统消息:"+e.data)
						store.commit('updateSystemMessage',true)
					},
					// 关闭连接时调用
					websocketclose(e) {
						console.log("断开连接")
						this.websock.close()
					}
	}
	

</script>