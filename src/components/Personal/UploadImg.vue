<template>
	<el-upload
	  class="avatar-uploader"
		:headers="myHeaders"
	  :action="uploadUrl"
		ref="upload"
		:data="param"
		:auto-upload="false"
	  :show-file-list="false"
		:on-change="changeFile"
		:on-success="handle_success"
		:on-error="handle_error"
		:on-exceed="uploadExceed" 
		:limit="1"
		name="file"
	  >
	  <img v-if="imageUrl" :src="imageUrl" class="avatar">
	  <i v-else class="el-icon-plus avatar-uploader-icon"><div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div></i>
		
	</el-upload>
</template>

<script>
	export default {
		name: 'uploadImg',
		data() {
			return {
				imageUrl: '',
				imageBaseUrl: '',
				param: {
					id: window.localStorage.getItem("id"),
					originUrl: window.localStorage.getItem("image")
				},
				myHeaders: {'authorization': "Bearer "+window.localStorage.getItem("token"),"username":window.localStorage.getItem("username")}
			}
		},
		computed:{
			uploadUrl(){
				return this.defaultUrl+"animation/uploadUserImage"
			}
		},
		methods: {
			uploadExceed(files, fileList) {
				this.$set(fileList[0], 'raw', files[0]);
				this.$set(fileList[0], 'name', files[0].name);
				this.$refs['upload'].clearFiles();//清除文件
				this.$refs['upload'].handleStart(files[0]);//选择文件后的赋值方法
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
				// setTimeout(() => {
				// 			this.$emit('file',file)
				// 		}, 500)
				// this.$emit('click',file)
				
				
				
				const This = this;
				const reader = new FileReader();
				reader.readAsDataURL(file.raw);
				reader.onload = function(e){
						this.result; //base64编码
						This.imageBaseUrl = this.result;
						This.imageUrl = this.result;
				}
				
				setTimeout(() => {
							this.$emit('showImg',this.imageUrl)
						}, 500)
			},
			//上传成功的钩子，res为后端返回的值
			handle_success(res){
				if(res.status == 200){
					window.localStorage.setItem("image",res.data)
					this.$store.commit('updataImg')
					this.$message.success("头像更换成功")
					}	
					if(res.status >= 400){
						this.$message.error(res.msg)
					}
			},
			//上传失败的钩子
			handle_error(err){
				this.$message.error("头像更换失败")	
			}
		}
	}
</script>

<style>
	@media screen and (min-width : 768px) {
		.avatar-uploader .el-upload {
		   border: 1px dashed #d9d9d9;
		   border-radius: 6px;
		   cursor: pointer;
		   position: relative;
		   overflow: hidden;
		 }
		 .avatar-uploader .el-upload:hover {
		   border-color: #409EFF;
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
		.el-upload__tip {
			position: absolute;
			top: 50px;
			left: 10px;
		}
	}
	
	@media screen and (max-width : 768px) {
		.avatar-uploader .el-upload {
		   border: 1px dashed #d9d9d9;
		   border-radius: 6px;
		   cursor: pointer;
		   position: relative;
		   overflow: hidden;
		 }
		 .avatar-uploader .el-upload:hover {
		   border-color: #409EFF;
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
		.el-upload__tip {
			position: absolute;
			top: 50px;
			left: 10px;
		}
	}
</style>
