import axios from 'axios'
import Vue from 'vue'
import {Message} from 'element-ui';
import router from '@/router'
import store from '@/store'

export function request(config) {
	//创建axios实例
	const instance = axios.create({
		baseURL: Vue.prototype.defaultUrl,
		timeout: 10000
	})
	
	//拦截请求
	instance.interceptors.request.use(res => {
		//为请求头添加token
		if(window.localStorage.getItem("token") != null){
			res.headers['authorization'] = "Bearer "+window.localStorage.getItem("token")
		}
		//后端用的auth2随机生成的token，没有使用jwt，所以请求头需要加入username方便使用
		if(window.localStorage.getItem("username") != null){
			res.headers['username'] = window.localStorage.getItem("username")
		}
		return res
	},err => {
		
	})
	
	instance.interceptors.response.use(res => {
		let response = res.data
		if(response.status == 555){
			Message.error(response.msg)
			window.localStorage.clear()
			store.commit('updataImg')
			store.commit('updataUserName')
			store.commit('updataRole')
			router.push("/login")
		}else if(response.status >= 400){
			Message.error(response.msg)
		}
		return response
	},err => {
		Message.error(err)
		console.log(err)
	})
	
	//真正的网络请求
	return instance(config)
}
