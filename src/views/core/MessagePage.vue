<template>
	<div class="message">
		<div class="main-message" v-infinite-scroll="load">
			<div class="title">
				系统通知
			</div>
			<MessageCard v-for="item in messageCard" :key="item.id" :messageCardMessage="item"></MessageCard>
			<div style="margin-top: 60px;"></div>
		</div>
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	import MessageCard from '../../components/MessageCard.vue'
	export default {
		name: '',
		components:{
			MessageCard
		},
		created() {
			this.requestGlobalMessage()
		},
		data(){
			return {
				messageCard:[
					
				],
				pageSize:9,
				pageNo:1,
				total:0
			}
		},
		methods:{
			requestGlobalMessage(){
				request({
					url: '/core/getGlobalMessage',
					method: 'get',
					params:{
						keyword:this.input,
						pageNo:this.pageNo,
						pageSize:this.pageSize
					}
				}).then(res =>{
					if(res.status == 200){
						this.messageCard.push(...res.data)
						this.total = res.page.total
					}
				})
			},
			load(){
				if(this.pageNo*this.pageSize < this.total){
					this.pageNo = this.pageNo+1
					this.requestGlobalMessage()
				}else{
					// this.$message.warning('已经到底了');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.message{
		position: flex;
		width: 100%;
		height: 100vh;
		background:url('../../assets/image/bg/06.jpg') top/cover no-repeat fixed;
		.main-message{
			width: 60%;
			margin-left: 20%;
			padding-left: 10px;
			padding-right: 10px;
			-webkit-box-flex: 1;
			flex: 1;
			display: -webkit-box;
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			flex-direction: column;
			background-color: rgba(255,255,255,0.5);
			overflow-y: scroll;
			height: 100%;
			.title{
				height: 42px;
				background-color: #fff;
				box-shadow: 0 2px 4px 0 rgba(121, 146, 185,0.54);
				-ms-flex-negative: 0;
				flex-shrink: 0;
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: center;
				-ms-flex-align: center;
				align-items: center;
				-webkit-box-pack: justify;
				-ms-flex-pack: justify;
				justify-content: space-between;
				padding: 0 16px;
				font-size: 15px;
				// color: #666;
				color: black;
				border-radius: 4px;
				margin-top: 10px;
				margin-bottom: 10px;
				font-weight: 800;
			}
		}
	}
</style>