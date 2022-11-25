<template>
	<div class="modifyImg">
		<div class="modifyImgItem">
			<UploadImg class="uploadImg" @showImg="changeImg" ref="headerImg"></UploadImg>
			<el-divider class="el_divider" direction="vertical"></el-divider>
			<!-- <el-avatar fit="fill" :size="size" :src="circleUrl" class="portrait headPortrait"></el-avatar> -->
			<img :src="circleUrl" class="avatar portrait headPortrait">
		</div>
		<el-button type="primary" plain @click="updateImg" class="updateImg" v-preventReClick>更新</el-button>
		 <!-- <img :src="circleUrl" class="avatar"> -->
	</div>
</template>

<script>
	import UploadImg from './UploadImg.vue'
	export default {
		name: 'modifyImg',
		data() {
			return {
					circleUrl: this.$store.state.image,
					file: ''
			}
		},
		methods: {
			updateImg() {
				// http://localhost:8888/updateImg
				this.$refs.headerImg.$refs.upload.submit();//通过按钮上传图片
				setTimeout(() => {
							this.$router.push('/personalCenter')
				}, 500)

			},
			changeImg(imageUrl) {
				this.circleUrl = imageUrl
			}
		},
		components: {
			UploadImg
		}
	}
</script>

<style>
	@media screen and (min-width : 1200px) {
		.modifyImg{
			position: absolute;
			left: 20%;
			top: 150px;
			width: 60%;
			height: 500px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
		}
		.modifyImgItem {
			position: absolute;
			margin-top: 50px;
			left: 50%;
			-webkit-transform:translate(-50%,0%);  
			-moz-transform:translate(-50%,0%);  
			transform:translate(-50%,0%);  
		}
		.modifyImgItem .uploadImg{
			float: left;
			margin-bottom: 30px;
		}
		.modifyImgItem .el_divider{
			float: left;
			margin-left: 40px;
			margin-right: 40px;
			height: 270px;
		}
		.modifyImgItem .headPortrait{
			width: 220px;
			height: 220px;
			border-radius: 110px;
			margin-top: 35px;
			float: left;
		}
		.modifyImg .updateImg {
			margin-left: 50%;
			margin-top: 400px;
			width: 200px;
			-webkit-transform:translate(-50%,0%);
			-moz-transform:translate(-50%,0%);  
			transform:translate(-50%,0%);  
		}
	}
	
	@media screen and (min-width : 768px) and (max-width : 1200px){
		.modifyImg{
			position: absolute;
			left: 10%;
			top: 150px;
			width: 80%;
			height: 500px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
		}
		.modifyImgItem {
			position: absolute;
			margin-top: 50px;
			left: 15%;
		}
		.modifyImgItem .uploadImg{
			float: left;
			margin-bottom: 30px;
		}
		.modifyImgItem .el_divider{
			float: left;
			margin-left: 40px;
			margin-right: 40px;
			height: 270px;
		}
		.modifyImgItem .headPortrait{
			width: 220px;
			height: 220px;
			border-radius: 110px;
			margin-top: 35px;
			float: left;
		}
		.modifyImg .updateImg {
			margin-left: 50%;
			margin-top: 400px;
			width: 200px;
			-webkit-transform:translate(-50%,0%);
			-moz-transform:translate(-50%,0%);  
			transform:translate(-50%,0%);  
		}
	}
	
	@media screen and (max-width : 768px) {
		.modifyImg{
			position: absolute;
			left: 5%;
			top: 200px;
			width: 90%;
			height: 500px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
		}
		.modifyImgItem {
			position: absolute;
			margin-top: 50px;
			left: 10px;
/* 			left: 50%;
			-webkit-transform:translate(-50%,0%);  
			-moz-transform:translate(-50%,0%);  
			transform:translate(-50%,0%); */  
		}
		.modifyImgItem .uploadImg{
			float: left;
			margin-bottom: 30px;
		}
		.modifyImgItem .el_divider{
			float: left;
			margin-left: 10px;
			margin-right: 10px;
			height: 270px;
		}
		.modifyImgItem .headPortrait{
			width: 220px;
			height: 220px;
			border-radius: 110px;
			margin-top: 35px;
			float: left;
		}
		.modifyImg .updateImg {
			margin-left: 50%;
			margin-top: 400px;
			width: 200px;
			-webkit-transform:translate(-50%,0%);
			-moz-transform:translate(-50%,0%);  
			transform:translate(-50%,0%);  
		}
	}
</style>
