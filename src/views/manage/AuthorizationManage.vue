<template>
	<div class="user-manage">
		<div class="manage-search">
			<el-input
					size="mini"
			    placeholder="请输入内容"
					@keyup.enter.native="handleClick"
			    v-model="input">
					<i slot="prefix" class="el-input__icon el-icon-search" @click="handleClick"></i>
			</el-input>
		</div>
		<el-button type="primary" plain class="add-system-message" size="mini" @click="addAuthrization">添加权限</el-button>
		<el-table
			:data="tableData"
			stripe
			border
			style="width: 100%">
			<el-table-column
				prop="userName"
				label="权限名"
				width="180">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.authorizationName }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="password"
				label="权限路径">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.authorizationUrl }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="144">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
		</el-table>
		
		<div style="float: right;margin-top: 20px;">
			<el-pagination
			  background
			 :hide-on-single-page="true"
			 :page-size="pageSize"
			 :current-page.sync="pageNo"
			 @current-change="currentChange"
			  layout="prev, pager, next"
			  :total="total">
			</el-pagination>
		</div>
		
		<el-dialog title="编辑权限" :visible.sync="dialogFormVisible" append-to-body width="30%" center>
		  <el-form label-position="left" label-width="80px" :model="formData">
		    <el-form-item label="权限名">
		      <el-input v-model="formData.authorizationName"></el-input>
		    </el-form-item>
		    <el-form-item label="权限路径">
		      <el-input v-model="formData.authorizationUrl"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="ensure">确 定</el-button>
		  </div>
		</el-dialog>
		
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	export default {
		name: '',
		components:{

		},
		created() {
			this.requestAuthorizationList()
		},
		data(){
			return {
				input:'',
				 tableData: [
					{
					 	authorizationName: '核心功能',
					 	authorizationUrl: '/animation/*'
					},
					{
						authorizationName: '用户管理',
						authorizationUrl: '/users/*'
					},
				],
				formData:{
					authorizationName: '用户管理',
					authorizationUrl: '/users/*'
				},
				dialogFormVisible: false,
				//记录当前弹框是哪一行数据
				index:1,
				pageSize:10,
				pageNo:1,
				total:0
			}
		},
		methods: {
			requestAuthorizationList() {
				request({
					url: '/users/getAuthorizationList',
					method: 'get',
					params: {
						pageSize: this.pageSize,
						pageNo: this.pageNo,
						search: this.input
					}
				}).then(res =>{
					if(res.status == 200){
						this.tableData = res.data
						this.total = res.page.total
					}
				})
			},
			handleEdit(index, row) {
				this.dialogFormVisible = true
				this.formData = this.formData = JSON.parse(JSON.stringify(row))
				this.index = index
			},
			handleDelete(index, row) {
				request({
					url: '/users/deleteAuthorization',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						id:row.id
					}
				}).then(res =>{
					if(res.status == 200){
						this.$message.success("删除成功")
						this.requestAuthorizationList()
					}
				})
			},
			handleClick(){
				this.requestAuthorizationList()
			},
			ensure(){
				request({
					url: '/users/changeAuthorization',
					method: 'post',
					data: {
						id:this.formData.id,
						authorizationName: this.formData.authorizationName,
						authorizationUrl: this.formData.authorizationUrl
					}
				}).then(res =>{
					if(res.status == 200){
						this.$message.success("操作成功")
						//刷新列表
						this.requestAuthorizationList()
						this.dialogFormVisible = false
					}
				})
			},
			addAuthrization(){
				this.dialogFormVisible = true
				this.formData = {}
			},
			currentChange(){
				this.requestAuthorizationList()
			}
		}
	}
</script>

<style lang="scss" scoped>
.user-manage{
	padding-left: 30px;
	padding-right: 30px;
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