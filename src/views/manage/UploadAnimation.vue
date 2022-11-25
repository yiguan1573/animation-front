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
		<el-button type="primary" plain class="add-system-message" size="mini" @click="addAuthrization">上传动画</el-button>
		<el-table
			:data="tableData"
			stripe
			border
			style="width: 100%">
			<el-table-column
				prop="animationName"
				label="动画名"
				width="180">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.animationName }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="animationTotal"
				label="总集数"
				width="180">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.animationTotal }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="episodeNo"
				label="当前集数"
				width="180">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.episodeNo }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="fileSize"
				label="文件大小(MB)"
				width="180">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.fileSize }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="fileName"
				label="文件名">
				<template slot-scope="scope">
					<span style="text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.fileName }}</span>
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
		
		<el-dialog title="上传动画" :visible.sync="dialogFormVisible" append-to-body width="30%" center>
		  <el-form label-position="left" label-width="80px" :model="formData">
				<el-form-item label="选择文件">
					<el-upload
						class="upload-demo"
						ref="upload"
						action="https://jsonplaceholder.typicode.com/posts/"
						:on-remove="handleRemove"
						:on-exceed="uploadExceed" 
						:on-change="changeFile"
						:limit="1"
						:file-list="fileList"
						:http-request="uploadFile"
						:auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						<div slot="tip" class="el-upload__tip">只能上传mp4文件</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="文件大小">
					<div>{{formData.fileSize}}MB</div>
				</el-form-item>
				<el-form-item label="选择动画" v-if="!formData.id">
					<el-select
				    v-model="formData.animationId"
				    filterable
				    remote
				    reserve-keyword
				    placeholder="请输入动画名"
				    :remote-method="remoteMethod"
						@change = "changeAnimation"
				    :loading="loading">
				    <el-option
				      v-for="item in options"
				      :key="item.id"
				      :label="item.animationName"
				      :value="item.id">
				    </el-option>
				  </el-select>
				</el-form-item>
		    <el-form-item label="当前集数">
					<el-select
					    v-model="formData.episodeNo"
					    collapse-tags
					    style="width: 100%;"
					    placeholder="请选择">
					    <el-option
					      v-for="item in formData.animationTotal"
					      :key="item"
					      :label="item"
					      :value="item">
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
	import md5 from '../../assets/js/md5.js'
	import {request} from '../../network/request.js'
	import axios from 'axios'
	export default {
		name: '',
		components:{

		},
		created() {
			this.requestAnimationFileList()
		},
		data(){
			return {
				input:'',
				 tableData: [

				],
				formData:{
					episodeNo:'',
					animationTotal:''
				},
				dialogFormVisible: false,
				//记录当前弹框是哪一行数据
				index:1,
				pageSize:10,
				pageNo:1,
				total:0,
			  fileList: [],
				options:[],
				loading:false,
				chunkSize:20*1024*1024,
				md5: '',
				uplaodTask:{
					
				}
			}
		},
		methods: {
			requestAnimationFileList() {
				request({
					url: '/animation/getFileList',
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
			changeAnimation(item){
				this.formData.animationTotal = this.options.filter(f => f.id == item)[0].animationTotal
			},
			handleEdit(index, row) {
				this.formData = JSON.parse(JSON.stringify(row))
				
				this.fileList = [{name:row.fileName}]
				// this.formData = {fileSize:0}
				
				this.uplaodTask.totalSize = null
				this.index = index
				this.dialogFormVisible = true
				
			},
			handleDelete(index, row) {
				request({
					url: '/animation/deleteAnimationFile',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						id:row.id,
						fileName:row.fileName
					}
				}).then(res =>{
					if(res.status == 200){
						this.$message.success("删除成功")
						this.requestAnimationFileList()
					}
				})
			},
			handleClick(){
				this.requestAnimationFileList()
			},
			ensure(){
				if(this.uplaodTask.totalSize == null){
					this.$message.error("请重新选择文件上传")
					return
				}
				if(this.formData.animationId == null||this.formData.episodeNo == null||this.formData.fileSize==null||this.formData.fileName==null){
					this.$message.error("请选择具体的动画和集数")
					console.log(this.formData)
					return
				}
				this.$refs.upload.submit();
			},
			addAuthrization(){
				this.formData = {fileSize:0}
				this.fileList = []
				this.dialogFormVisible = true
			},
			currentChange(){
				this.requestAnimationFileList()
			},
			handleRemove(file, fileList) {
				this.formData.fileSize = 0
			},
			uploadExceed(files, fileList) {
				// this.$set(fileList[0], 'raw', files[0]);
				// this.$set(fileList[0], 'name', files[0].name);
				this.$refs.upload.clearFiles();//清除文件
				this.$refs['upload'].handleStart(files[0]);//选择文件后的赋值方法
			},
			changeFile(file, fileList) {
				console.log(file)
				const isMP4 = (file.raw.type === 'video/mp4');
				if (!isMP4) {
					this.$message.error('上传的文件格式错误!');
					return;
				}else{
					this.formData.fileSize = Math.round(file.size/1024/1024*100)/100
					this.formData.fileName = file.name
					this.uplaodTask.fileName=file.name
					this.uplaodTask.totalSize=file.size
					this.uplaodTask.chunkSize=this.chunkSize
					this.uplaodTask.chunkNum=Math.ceil(file.size/this.chunkSize)
				}
			},
			async uploadFile(e){
				const file = e.file
				//计算md5
				this.uplaodTask.md5 = await md5(e.file,this.chunkSize)
				//初始化分片任务
				request({
					url: '/animation/createMultipartUpload',
					method: 'post',
					data: this.uplaodTask
				}).then(async res => {
					if(res.status == 200){
						this.formData.fileName = res.data.newFileName
						if(res.data.status == 1){//秒传
							this.changeAnimationFile()
						}else if(res.data.status == -1){//只差合并
							this.merge(res.data.newFileName,res.data.uploadId)
						}else{//断点续传或者全量上传
							let completedLength = this.uplaodTask.chunkNum - res.data.needUpdate.length
							res.data.needUpdate.forEach(item => {
								const start = this.uplaodTask.chunkSize * (item.partNum - 1)
								const end = start + this.uplaodTask.chunkSize
								const blob = file.slice(start, end)
								axios.request({
									url:item.chunkUrl,
									method: 'put',
									data: blob,
									headers: {
											'Content-Type': 'application/octet-stream'
									}
								}).then(() => {
									completedLength++
									let percent=(completedLength / this.uplaodTask.chunkNum * 100) | 0
									e.onProgress({percent:percent});//调用uploader的进度回调
									if(completedLength == this.uplaodTask.chunkNum){//合并
										this.merge(res.data.newFileName,res.data.uploadId)
									}
								}).catch(err =>
									console.log(err)
								)
							})
						}
					}
				})
				
			},
			async merge(fileName,updateId){//合并分片
				await request({
					url: '/animation/mergeMultipartUpload',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						fileName:fileName,
						uploadId:updateId
					}
				}).then(res => {
					if(res.status == 200){
						this.changeAnimationFile()
					}
				})
			},
			changeAnimationFile(){
				request({
					url: '/animation/changeAnimationFile',
					method: 'post',
					data: this.formData
				}).then(res => {
					if(res.status == 200){
						this.$message.success("上传成功")
						this.requestAnimationFileList()
						this.dialogFormVisible = false
					}else{
						this.$refs.upload.clearFiles();
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