<template>
		<!-- :trigger="triggerMethods" -->
		<div class="personal">
		  <el-popover 
		    placement="bottom"
		    width="140"
		    :trigger="triggerMethods"
				:close-delay="closedelay">
		    <div class="demo-basic--circle" slot="reference" style="outline: 0 !important;">
		    	<div class="block" @click="toLogin">
						<!-- <el-avatar :size="size" :src="circleUrl" class="portrait"></el-avatar> -->
						<img :src="circleUrl" class="portrait">
					</div>
		    </div>
				<Message></Message>
		  </el-popover>
	</div>
</template>

<script>
	import Message from "./Message.vue"
	export default {
		name: 'personal',
		data () {
			return {
				closedelay:70,
				size: 35
			}
		},
		components: {
			Message
		},
		computed: {
			triggerMethods() {
				if(window.screen.availWidth >= 768){
					// src绑定图片地址时需要require
					return "hover"
				}else{
					return "click"
				}
			},
			circleUrl(){
				return this.$store.state.image
			}
		},
		methods:{
			toLogin(){
				if(window.localStorage.getItem("username")==null){
					this.$router.push("/login")
				}
			}
		}
	}
</script>

<style>
	.el-popover{
		  border-radius: 7px;
			padding: 9px 0px;
	}
	.portrait{
		transition: all .5s;
	}
	.block .portrait {
			cursor: pointer;
			width: 36px;
			height: 36px;
			border-radius: 18px;
	}
	.block .portrait:hover {
			width: 44px;
			height: 44px;
			border-radius: 22px;
	}
</style>
