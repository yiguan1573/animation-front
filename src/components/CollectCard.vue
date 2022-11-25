<template>
	<div class="collect-card">
		<div class="collect-content">
			<div class="ainimation-name" @click="toDetail">{{name}}</div>
			<div class="ainimation-detail">{{detail}}</div>
			<div class="ainimation-other">{{type}} | {{placeOfOrigin}}</div>
			<div class="ainimation-other">全{{total}}话</div>
			<div class="drop-item-op">
				<p @click="changeStatus">{{status==1?'取消追番':'追番'}}</p>
			</div>
		</div>
		<el-image fit="fill" :src="url" @click="toDetail">
			<div slot="error" class="image-slot">
				<div class="error-image"></div>
			</div>
		</el-image>
	</div>
</template>

<script>
	import {request} from '../network/request.js'
	export default {
		name: '',
		props: ['collectCard'],
		created() {
			this.url = this.defaultImageUrl + this.collectCard.miniImageUrl
			this.name = this.collectCard.animationName
			this.detail = this.collectCard.animationDetail
			this.type = this.collectCard.animationType==0?"动画":"剧场版"
			this.placeOfOrigin = this.collectCard.originPlace
			this.total = this.collectCard.animationTotal
			this.status = this.collectCard.status
			this.id = this.collectCard.id
		},
		components:{

		},
		data(){
			return {
				url:'',
				name:'',
				detail:'',
				type:'',
				placeOfOrigin:'',
				total:'',
				status:1,
				id:0
			}
		},
		methods:{
			changeStatus(){
				if(window.localStorage.getItem("id") == null){
					this.$message.error("请先登录")
					return
				}
				this.status == 1?this.status=0:this.status=1
				request({
					url: '/core/collect',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data:{
						status: this.status,
						userId:window.localStorage.getItem("id"),
						animationId:this.id
					}
				}).then(res1 =>{
					if(res1.status == 200){
						
					}
				})
			},
			toDetail(){
				let animationId = this.id
				this.$router.push({
					path: '/animationDetail',
					query:{id:animationId}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.collect-card{
		width: 350px;
		margin-top: 10px;
		margin-bottom: 15px;
		margin-right: 21px;
		.collect-content{
			position: absolute;
			margin-left: 130px;
			.ainimation-name{
				cursor: pointer;
				margin-top: 10px;
				color: #282828;
				width: 200px;
				font-size: 18px;
				text-overflow:ellipsis;
				white-space: nowrap;
				overflow:hidden; 
			}
			.ainimation-detail{
				margin-top: 10px;
				width: 200px;
				overflow:hidden; 
				font-weight: 400;
				color: #222;
				line-height: 20px;
				max-height: 40px;
				font-size: 12px;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				text-overflow:ellipsis;
				white-space: normal;
				display: -webkit-box;
			}
			.ainimation-other{
				margin-top: 10px;
				font-size: 12px;
				color: #999;
				line-height: 14px;
			}
			.drop-item-op p{
				margin-left: 110px;
				margin-top: -25px;
				width: 60px;
				text-align: center;
				cursor: pointer;
				display: block;
				background-color: white;
				padding: 0 10px;
				border: 1px solid #DCDFE6;
				line-height: 26px;
				height: 26px;
				font-size: 12px;
				border-radius: 4px;
				text-decoration: none;
				color: #999;
				outline: none;
			}
			.drop-item-op p:hover {
			    background: #00b5e5;
					color: white;
			}
		}
		/deep/ .el-image{
			cursor: pointer;
			width: 104px;
			height: 148px;
			background-color: #DCDCDC;
			border-radius: 8px;
			transition: box-shadow .15s ease;
			.image-slot{
				.error-image{
					width: 104px;
					height: 148px;
					background-image: url('../assets/image/example/07.png');
					background-size: 100% 100%;
				}
			}
		}
		/deep/ .el-image:hover{
			box-shadow: 0 20px 15px -10px rgba(0,0,0,0.2), 0 50px 35px -40px rgba(0, 0, 0, 0.4), 0 50px 35px -40px rgba(243, 2, 2, 0.2);
		}
	}
</style>