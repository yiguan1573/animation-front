<template>
	<div class="daylong-page">
		<div class="daylong">
			<div style="width: 100%; height: 40px;">
				<div class="animation-svg1"></div>
				<div class="animation-title">动画</div>
			</div>
			<div class="animation-list">
				<AnimationCard v-for="item in daylong" :key="item.id" :animationCard="item"></AnimationCard>
			</div>
		</div>
		<div style="position: absolute; right: 9%;">
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
		
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	import AnimationCard from '../../components/AnimationCard.vue'
	export default {
		name: '',
		components:{
			AnimationCard
		},
		data(){
			return {
				daylong:[
				],
				currentPage:1,
				pageSize:14,
				total:200,
				value:true
			}
		},
		methods:{
			requestDaylong(){
				request({
					url: '/common/commonAnimationList',
					method: 'get',
					params:{
						type: 0,
						pageNo:this.currentPage,
						pageSize:this.pageSize
					}
				}).then(res =>{
					if(res.status == 200){
						this.daylong = res.data
						this.total = res.page.total
					}
				})
			},
			handleCurrentChange(){
				this.requestDaylong()
			}
		},
		created() {
			this.requestDaylong()
		}
	}
</script>

<style lang="scss" scoped>
	.daylong-page{
		width: 84%;
		margin-left: 8%;
		margin-top: 40px;
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
