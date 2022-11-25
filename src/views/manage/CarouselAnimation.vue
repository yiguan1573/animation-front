<template>
	<div class="user-manage">
		<el-table
			:data="tableData"
			stripe
			border
			style="width: 100%">
			<el-table-column
					type="index"
					width="50">
			</el-table-column>
			<el-table-column
				prop="animationName"
				label="动画名"
				width="180">
				<template slot-scope="scope">
					<el-select
					    v-model="scope.row.animationName"
					    filterable
					    remote
					    reserve-keyword
					    placeholder="请输入动画名"
					    :remote-method="remoteMethod"
							@change="addCarousel(scope.row.animationName,scope.$index)"
					    :loading="loading">
					    <el-option
					      v-for="item in options"
					      :key="item.animationName"
					      :label="item.animationName"
					      :value="item.animationName">
					    </el-option>
					  </el-select>
					<!-- <span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.animationName }}</span> -->
				</template>
			</el-table-column>
			<el-table-column
				prop="animationDetail"
				label="动画简介">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.animationDetail }}</span>
				</template>
			</el-table-column>
		</el-table>
		
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	export default {
		name: '',
		components:{

		},
		created() {
			this.requestCarouselList()
		},
		data(){
			return {
				input:'',
				 tableData: [
					{
						animationName:'伤物语',
						animationDetail:'撒大声地'
					},
					{
						animationName:'伤物语',
						animationDetail:'撒大声地'
					}
				],
				options: [],
				loading: false
			}
		},
		methods: {
			requestCarouselList(){
				request({
					url: '/animation/getCarouselList',
					method: 'get'
				}).then(res =>{
					if(res.status == 200){
						this.tableData = res.data
					}
				})
			},
			remoteMethod(query) {
				if (query !== '') {
					this.loading = true;
					request({
						url: '/animation/carouselSelect',
						method: 'get',
						params: {
							pageNo:1,
							pageSize: 100,
							search: query
						}
					}).then(res =>{
						if(res.status == 200){
							this.options = res.data
							this.loading = false
						}
					})
				} else {
					this.options = [];
				}
			},
			addCarousel(animationName,index){
				console.log(animationName)
				console.log(index)
				let row = this.options.filter(f => f.animationName == animationName)[0]
				row.index = index+1
				
				request({
					url: '/animation/addCarousel',
					method: 'post',
					data: row
				}).then(res =>{
					if(res.status == 200){
						this.requestCarouselList()
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.user-manage{
	padding-left: 30px;
	padding-right: 30px;
	/deep/ .el-table{
		margin-top: 50px;
	}
	.manage-search{
		float: right;
		margin-top: 20px;
		margin-bottom: 10px;
	}
	.add-system-message{
		float: right;
		margin-top: 20px;
		margin-bottom: 10px;
		margin-right: 10px;
	}
}
</style>