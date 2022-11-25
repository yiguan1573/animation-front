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
		<el-button type="primary" plain class="add-system-message" size="mini" @click="addUser">添加用户</el-button>
		<el-table
			:data="tableData"
			stripe
			border
			style="width: 100%">
			<el-table-column
				prop="userName"
				label="用户名"
				width="180">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.userName }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="password"
				label="密码"
				width="180">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.password }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="address"
				label="角色">
				<template slot-scope="scope">
					<el-tag size="medium" v-for="(item,key) in scope.row.roleInfoList" :key="key" style="margin-right: 8px;" v-if="key<4">{{ item.roleName }}</el-tag>
					<span style="margin-left: 10px;" v-if="scope.row.roleInfoList.length>=4">...</span>
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
		
		<el-dialog title="编辑用户" :visible.sync="dialogFormVisible" append-to-body width="30%" center>
		  <el-form label-position="left" label-width="80px" :model="formData">
		    <el-form-item label="姓名">
		      <el-input v-model="formData.userName"></el-input>
		    </el-form-item>
		    <el-form-item label="密码">
		      <el-input v-model="formData.password"></el-input>
		    </el-form-item>
		    <el-form-item label="角色">
		      <el-select
		          v-model="selectValue"
		          multiple
		          collapse-tags
		          style="width: 100%;"
		          placeholder="请选择">
		          <el-option
		            v-for="(item,key) in roleList"
		            :key="key"
		            :label="item.roleName"
		            :value="item.id">
		          </el-option>
					</el-select>
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
		created() {
			this.requestUserList()
		},
		components:{

		},
		data(){
			return {
				input:'',
				 tableData: [
					 {
						userName: '亿观',
						password: '12345',
						roleInfoList: [
							{id:1,roleName:'ROLE_MANAGER'},
							{id:2,roleName:'ROLE_COMMON'},
						]
					},
					{
						userName: '亿观1573',
						password: '123456',
						roleInfoList: [
							{id:1,roleName:'ROLE_MANAGER'}
						]
					},
					],
					formData:{
						userName: '亿观',
						password: '12345',
						roleInfoList: [
							{id:1,roleName:'ROLE_MANAGER'},
							{id:2,roleName:'ROLE_COMMON'},
						]
					},
					dialogFormVisible: false,
					selectValue:[],
					//记录当前弹框是哪一行数据
					index:1,
					roleList: [
						// {id:1,roleName:'ROLE_MANAGER'},
						// {id:2,roleName:'ROLE_COMMON'},
					],
					pageSize:10,
					pageNo:1,
					total:0
			}
		},
		methods: {
			requestUserList() {
				request({
					url: '/users/getUserList',
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
						request({
							url: '/users/getRoleList',
							method: 'get',
							params: {
								pageSize: 1000,
								pageNo: 1
							}
						}).then(res =>{
								if(res.status == 200){
									this.roleList = res.data
								}
						})
					}
				})
			},
			handleEdit(index, row) {
				this.dialogFormVisible = true
				this.formData = this.formData = JSON.parse(JSON.stringify(row))
				let select =  row.roleInfoList.map((item,index) =>{
					return item.id
				})
				this.selectValue = select
				this.index = index
			},
			handleDelete(index, row) {
				request({
					url: '/users/deleteUser',
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
						this.requestUserList()
					}
				})
			},
			handleClick(){
				this.requestUserList()
			},
			ensure(){
				request({
					url: '/users/changeData',
					method: 'post',
					data: {
						id:this.formData.id,
						userName: this.formData.userName,
						password: this.formData.password,
						roleList: this.selectValue.join()
					}
				}).then(res =>{
					if(res.status == 200){
						this.$message.success("操作成功")
						//刷新列表
						this.requestUserList()
						this.dialogFormVisible = false
					}
				})
				
				// this.formData.roleList = this.roleList.filter(f => this.selectValue.includes(f.id))
			},
			addUser(){
				this.dialogFormVisible = true
				this.formData = {}
				this.selectValue = []
			},
			currentChange(pageNo){
				this.requestUserList()
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