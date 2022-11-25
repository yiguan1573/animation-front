<template>
	<div class="personal-center">
		<BasicMessage></BasicMessage>
		 <el-divider></el-divider>
		 
		 <div class="ova">
		 	<div style="width: 100%; height: 40px;">
		 		<div class="animation-title" style="font-size: 24px;">我的收藏</div>
		 		<span class="animation-more" @click="toCollect">更多<i class="el-icon-arrow-right"></i></span>
		 	</div>
		 	<div class="animation-list" v-show="!isEmpty">
		 		<CollectCard v-for="(item,key) in collect" :key="item.id" :collectCard="item"></CollectCard>
		 	</div>
			<el-empty style="margin-top: 100px;" :image-size="200" v-show="isEmpty" description="暂无收藏记录"></el-empty>
		 </div>
			 
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	import BasicMessage from '../../components/Personal/BasicMessage.vue'
	import CollectCard from '../../components/CollectCard.vue'
	export default {
		name: '',
		components:{
			BasicMessage,
			CollectCard
		},
		created() {
			request({
				url: '/core/getCollectList',
				method: 'get',
				params:{
					pageNo:1,
					pageSize:9,
					userId:window.localStorage.getItem("id")
				}
			}).then(res =>{
				if(res.status == 200){
					this.collect = res.data
				}
			})
		},
		data(){
			return {
				collect:[
				]
			}
		},
		methods:{
			toCollect(){
				this.$router.push("/collect")
			}
		},
		computed:{
			isEmpty(){
				if(this.collect.length>0){
					return false
				}else{
					return true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.personal-center{
	margin-top: 10px;
	width: 60%;
	margin-left: 20%;
	background: #fff;
	box-shadow: 0 0 0 1px #eee;
	border-radius: 4px;
	padding: 20px;
	height: 90vh;
}
</style>