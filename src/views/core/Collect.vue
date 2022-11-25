<template>
	<div class="collect-page">
		<div style="width: 100%; height: 40px;margin-top: 10px;margin-bottom: 20px;">
			<div class="animation-svg4"></div>
			<div class="animation-title" style="font-size: 28px;">我的收藏</div>
			<div class="collect-search">
				<el-input
						size="mini"
				    placeholder="请输入内容"
						@keyup.enter.native="handleClick"
				    v-model="input">
						<i slot="prefix" class="el-input__icon el-icon-search" @click="handleClick"></i>
				</el-input>
			</div>
		</div>
		
		<div class="animation-list" v-show="!isEmpty">
			<CollectCard v-for="(item,key) in collect" :key="item.id" :collectCard="item"></CollectCard>
		</div>
		
		<div style="float: right;margin-top: -20px;margin-right: 45px;">
			<el-pagination
			      @current-change="handleCurrentChange"
			      :current-page.sync="currentPage"
			      :page-size="pageSize"
						:hide-on-single-page="value"
						:background="true"
			      layout="prev, pager, next"
			      :total="total">
			</el-pagination>
		</div>
		<el-empty style="margin-top: 200px;" :image-size="200" v-show="isEmpty" description="暂无收藏记录"></el-empty>
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	import CollectCard from '../../components/CollectCard.vue'
	export default {
		name: '',
		components:{
			CollectCard
		},
		created() {
			this.requestCollectList()
		},
		data(){
			return {
				collect:[
				],
				input:'',
				currentPage:1,
				pageSize:12,
				total:200,
				value:true
			}
		},
		methods:{
			requestCollectList(){
				request({
					url: '/core/getCollectList',
					method: 'get',
					params:{
						pageNo:this.currentPage,
						pageSize:this.pageSize,
						keyword: this.input,
						userId:window.localStorage.getItem("id")
					}
				}).then(res =>{
					if(res.status == 200){
						this.collect = res.data
						this.total = res.page.total
					}
				})
			},
			handleClick(){
				this.requestCollectList()
			},
			handleCurrentChange() {
				this.requestCollectList()
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
.collect-page{
	margin-top: 10px;
	width: 60%;
	margin-left: 20%;
	background: #fff;
	box-shadow: 0 0 0 1px #eee;
	border-radius: 4px;
	padding: 20px;
	height: 90vh;
	.collect-search{
		float: right;
		width: 200px;
		margin-top: 12px;
		margin-right: 10px;
	}
	/deep/ .el-pagination{
		.el-pager{
			li{
				background-color: rgb(233, 236, 239);
			}
			.active{
				color: #fff;
				background: linear-gradient(to right,#ff711f 0%,#e50914 100%);
				box-shadow: 0 10px 12px -4px rgba(22,9, 9, 0.25);
				font-weight: 700;
			}
		}
		.btn-next{
			background-color: rgb(233, 236, 239);
		}
		.btn-prev{
			background-color: rgb(233, 236, 239);
		}
	}
}
</style>