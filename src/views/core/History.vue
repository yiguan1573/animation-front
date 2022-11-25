<template>
	<div class="history-page">
		<div style="width: 100%; height: 40px;margin-top: 30px;margin-bottom: 30px;">
			<div class="animation-svg3"></div>
			<div class="animation-title" style="font-size: 28px;">历史记录</div>
			<div class="drop-item-op">
				<p @click="clearHistory">清空</p>
			</div>
			<div class="history-search">
				<el-input
						style="margin-left: -30px;"
						size="mini"
				    placeholder="请输入内容"
						@keyup.enter.native="handleClick"
				    v-model="input">
						<i slot="prefix" class="el-input__icon el-icon-search" @click="handleClick"></i>
				</el-input>
			</div>
		</div>
		
		<div class="main-history">
			<el-timeline v-show="!isEmpty" v-infinite-scroll="load">
				<el-timeline-item  v-for="(item,key) in history" :key="item.id" :timestamp="item.time" placement="top">
					<el-card>
						<div class="history-card">
							<h3 style="cursor: pointer;" @click="toDetail(item.animationId)">{{item.animationName}}</h3>
							<p>全{{item.animationTotal}}话</p>
							<p>看到第{{item.episodeNo}}话 {{transformTime(item.specificTime)}}</p>
						</div>
						<el-image fit="fill" :src="defaultImageUrl+item.miniImageUrl" @click="toDetail(item.animationId)">
							<div slot="error" class="image-slot">
								<div class="error-image"></div>
							</div>
						</el-image>
						<span class="el-icon-delete" @click="deleteHistory(item.id,key)"></span>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-empty style="margin-top: 100px;" :image-size="200" v-show="isEmpty" description="暂无观影记录"></el-empty>
		</div>
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	export default {
		name: '',
		components:{

		},
		created() {
			this.requestHistoryList()
		},
		data(){
			return {
				input: '',
				history:[
					
				],
				pageNo:1,
				pageSize:4,
				total:1
			}
		},
		methods:{
			requestHistoryList(){
				request({
					url: '/core/getHistoryList',
					method: 'get',
					params:{
						keyword: this.input,
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						userId:window.localStorage.getItem("id")
					}
				}).then(res =>{
					if(res.status == 200){
						this.history.push(...res.data)
						this.total = res.page.total
					}
				})
			},
			toDetail(id){
				this.$router.push({
					path: '/animationDetail',
					query:{id:id}
				})
			},
			handleClick(){
				this.history = []
				this.pageNo = 1
				this.requestHistoryList()
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
						this.history = []
					}
				})
			},
			deleteHistory(id,key){
				request({
					url: '/core/deleteHistory',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data:{
						id: id,
					}
				}).then(res =>{
					if(res.status == 200){
						this.$message.success("删除成功")
						this.history.splice(key,1)
						this.total = this.total-1
					}
				})
			},
			load(){
				if(this.pageNo*this.pageSize < this.total){
					this.pageNo = this.pageNo+1
					this.requestHistoryList()
				}else{
					// this.$message.warning('已经到底了');
				}
			}
		},
		computed:{
			isEmpty(){
				if(this.history.length>0){
					return false
				}else{
					return true
				}
			},
			transformTime(){
				return function(time) {
					let minute = Math.floor(time/60)
					let second = time%60
					if(minute < 10){
						minute = "0"+minute
					}
					if(second < 10){
						second = "0"+second
					}
					return `${minute}:${second}`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.history-page{
		width: 60%;
		margin-left: 20%;
		.drop-item-op p{
			float: right;
			margin-top: 8px;
			width: 60px;
			text-align: center;
			cursor: pointer;
			display: block;
			background: white;
			padding: 0 10px;
			border: 1px solid #DCDFE6;
			line-height: 26px;
			height: 26px;
			font-size: 12px;
			border-radius: 4px;
			text-decoration: none;
			color: #282828;
			outline: none;
		}
		.drop-item-op p:hover {
		    background: #00b5e5;
				color: white;
		}
		.history-search{
			float: right;
			width: 200px;
			margin-top: 8px;
		}
		.main-history{
			margin-bottom: 30px;
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
						background-image: url('../../assets/image/example/07.png');
						background-size: 100% 100%;
					}
				}
			}
			/deep/ .el-image:hover{
				box-shadow: 0 20px 15px -10px rgba(0,0,0,0.2), 0 50px 35px -40px rgba(0, 0, 0, 0.4), 0 50px 35px -40px rgba(243, 2, 2, 0.2);
			}
			.history-card{
				position: absolute;
				margin-left: 165px;
				margin-top: 10px;
				p {
					margin-top: 34px;
					color: #99a2aa;
					font-size: 14px;
				}
			}
			span {
				float: right;
				font-size: 20px;
				color: #99a2aa;
				margin-top: 71px;
				margin-right: 20px;
				cursor: pointer;
			}
		}
		
	}
</style>