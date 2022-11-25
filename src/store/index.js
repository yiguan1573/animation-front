import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		username: "请登录",
		image: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
		role:'',
		isManager:false,
		systemMessage:false
  },
  getters: {
  },
  mutations: {
		updataUserName(state){
			if(window.localStorage.getItem("username") == null){
				state.username = "请登录"
			}else{
				state.username = window.localStorage.getItem("username")
			}
		},
		updataImg(state){
			if(window.localStorage.getItem("image") == null){
				state.image = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
			}else{
				state.image = Vue.prototype.defaultImageUrl + window.localStorage.getItem("image") 
			}
		},
		updataRole(state){
			if(window.localStorage.getItem("role") != null){
				state.role = window.localStorage.getItem("role")
			}else{
				state.role = ""
			}
			state.isManager = state.role.indexOf("ROLE_MANAGER")!=-1
		},
		updateSystemMessage(state,payload){
			state.systemMessage = payload
		}
  },
  actions: {
  },
  modules: {
  }
})
