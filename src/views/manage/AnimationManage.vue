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
		<el-button type="primary" plain class="add-system-message" size="mini" @click="addAuthrization">添加动画</el-button>
		<el-table
			:data="tableData"
			stripe
			border
			style="width: 100%">
			<el-table-column
				prop="animationName"
				label="动画名"
				width="120">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.animationName }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="miniImageUrl"
				label="动画封面"
				width="100">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.miniImageUrl }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="carouseImageUrl"
				label="走马灯封面"
				width="100">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.carouselImageUrl }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="animationType"
				label="动画类别"
				width="80">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.animationType==0?"动画":"剧场版" }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="animationTotal"
				label="总集数"
				width="70">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.animationTotal }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="animationDetail"
				label="动画简介">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.animationDetail }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="originPlace"
				label="产地"
				width="50">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.originPlace }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="deletd"
				label="状态"
				width="50">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;color: #00b5e5;font-weight: 600;">{{ scope.row.deleted==0?"上线":"下线" }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="viewCounts"
				label="播放量"
				width="70">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;color: #00b5e5;font-weight: 600;">{{ scope.row.viewCounts}}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="bulletChat"
				label="弹幕量"
				width="70">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;color: #00b5e5;font-weight: 600;">{{ scope.row.bulletChat}}</span>
				</template>
			</el-table-column>
			
			<el-table-column label="操作" width="210">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button
								size="mini"
								type="primary"
								@click="handlePopUp(scope.$index, scope.row)">上线</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">下线</el-button>
							
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
		
		<el-dialog title="编辑动画" :visible.sync="dialogFormVisible" append-to-body width="30%" center>
		  <el-form label-position="left" label-width="80px" :model="formData">
		    <el-form-item label="动画名">
		      <el-input v-model="formData.animationName"></el-input>
		    </el-form-item>
				<el-form-item label="动画封面">
				  <el-upload
				    class="avatar-uploader"
						ref="upload"
				  	:headers="myHeaders"
				    :action="uploadUrl"
				    :show-file-list="false"
				  	:on-change="changeFile"
				  	:on-success="handle_success"
				  	:on-error="handle_error"
				  	:on-exceed="uploadExceed" 
				  	:limit="1"
				  	name="file"
				    >
				    <img v-if="formData.miniImageUrl" :src="`${this.defaultImageUrl}${formData.miniImageUrl}`" class="avatar">
				    <i v-else class="el-icon-plus avatar-uploader-icon"><div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div></i>
				  </el-upload>
				</el-form-item>
				<el-form-item label="走马灯">
				  <el-upload
				    class="avatar-uploader"
						ref="upload1"
				  	:headers="myHeaders"
				    :action="uploadUrl"
				    :show-file-list="false"
				  	:on-change="changeFile"
				  	:on-success="handle_success1"
				  	:on-error="handle_error"
				  	:on-exceed="uploadExceed1" 
				  	:limit="1"
				  	name="file"
				    >
				    <img v-if="formData.carouselImageUrl" :src="`${this.defaultImageUrl}${formData.carouselImageUrl}`" class="avatar1">
				    <i v-else class="el-icon-plus avatar-uploader-icon"><div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div></i>
				  </el-upload>
				</el-form-item>
				<el-form-item label="动画类型">
				    <el-radio-group v-model="formData.animationType">
				      <el-radio :label="0">动画</el-radio>
				      <el-radio :label="1">剧场版</el-radio>
				    </el-radio-group>
				</el-form-item>
		    <el-form-item label="总集数">
		      <el-input v-model="formData.animationTotal" oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
		    </el-form-item>
				<el-form-item label="动画简介">
					<el-input
					  type="textarea"
					  :autosize="{ minRows: 2, maxRows: 6}"
					  placeholder="请输入内容"
					  v-model="formData.animationDetail">
					</el-input>
				</el-form-item>
				<el-form-item label="产地">
				  <el-input v-model="formData.originPlace"></el-input>
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
			this.requestAnimationList()
		},
		data(){
			return {
				input:'',
				 tableData: [
					{
						
					}
				],
				formData:{
					
				},
				dialogFormVisible: false,
				//记录当前弹框是哪一行数据
				index:1,
				pageSize:10,
				pageNo:1,
				total:0,
				myHeaders: {'authorization': "Bearer "+window.localStorage.getItem("token"),"username":window.localStorage.getItem("username")}
			}
		},
		computed:{
			uploadUrl(){
				return this.defaultUrl+"animation/uploadImage"
			}
		},
		methods: {
			requestAnimationList() {
				request({
					url: '/animation/getAnimationList',
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
					url: '/animation/deleteAnimation',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						id:row.id
					}
				}).then(res =>{
					if(res.status == 200){
						this.$message.success("下线成功")
						this.requestAnimationList()
					}
				})
			},
			handlePopUp(index, row) {
				request({
					url: '/animation/popUpAnimation',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						id:row.id
					}
				}).then(res =>{
					if(res.status == 200){
						this.$message.success("上线成功")
						this.requestAnimationList()
					}
				})
			},
			handleClick(){
				this.requestAnimationList()
			},
			ensure(){
				request({
					url: '/animation/changeAnimation',
					method: 'post',
					data: this.formData
				}).then(res =>{
					if(res.status == 200){
						this.$message.success("操作成功")
						//刷新列表
						this.requestAnimationList()
						this.dialogFormVisible = false
					}
				})
			},
			addAuthrization(){
				this.dialogFormVisible = true
				this.formData = {miniImageUrl:'',carouselImageUrl:''}
			},
			currentChange(){
				this.requestAnimationList()
			},
			uploadExceed(files, fileList) {
				this.$set(fileList[0], 'raw', files[0]);
				this.$set(fileList[0], 'name', files[0].name);
				this.$refs['upload'].clearFiles();//清除文件
				this.$refs['upload'].handleStart(files[0]);//选择文件后的赋值方法
				this.$refs['upload'].submit();//主动调用接口
			},
			uploadExceed1(files, fileList) {
				this.$set(fileList[0], 'raw', files[0]);
				this.$set(fileList[0], 'name', files[0].name);
				this.$refs['upload1'].clearFiles();//清除文件
				this.$refs['upload1'].handleStart(files[0]);//选择文件后的赋值方法
				this.$refs['upload1'].submit();//主动调用接口
			},
			changeFile(file, fileList) {
				const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isIMAGE) {
					this.$message.error('上传的文件格式错误!');
					return;
				}
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!');
					return;
				}
			},
			//上传成功的钩子，res为后端返回的值
			handle_success(res){
				if(res.status == 200){
					this.formData.miniImageUrl = res.data
					this.$message.success("图片上传成功")
					console.log(this.formData)
				}	
			},
			handle_success1(res){
				if(res.status == 200){
					this.formData.carouselImageUrl = res.data
					this.$message.success("图片上传成功")
				}	
			},
			//上传失败的钩子
			handle_error(err){
				this.$message.error("图片上传失败")	
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
.avatar-uploader {
	/deep/ .el-upload{
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	/deep/ .el-upload:hover{
		border-color: #409EFF;
	}
 }
 .avatar-uploader-icon {
	 font-size: 28px;
	 color: #8c939d;
	 width: 220px;
	 height: 270px;
	 line-height: 220px;
	 text-align: center;
 }
 .avatar {
	 width: 220px;
	 height: 270px;
	 display: block;
 }
 .avatar1 {
	 width: 430px;
	 height: 250px;
	 display: block;
 }
.el-upload__tip {
	position: absolute;
	top: 50px;
	left: 10px;
}
</style>