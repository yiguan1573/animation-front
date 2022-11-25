<template>
	<div class="modifyMessage">
		<span class="title1">修改资料</span>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm2">
		  <el-form-item class="inputWidth1" label="用户名" prop="userName">
		    <el-input v-model="ruleForm.userName"></el-input>
		  </el-form-item>
			
			<el-form-item class="inputWidth2" label="密码" prop="password">
			  <el-input v-model="ruleForm.password"></el-input>
			</el-form-item>
		  
		  <el-form-item>
		    <el-button class="buttonMargin" type="primary" @click="submitForm('ruleForm')" v-preventReClick>保存</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	export default {
		name: 'modifyMessage',
		data() {
			return {
				ruleForm: {
					userName: '',
					password: ''
				},
				rules: {
					userName: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 1, max: 20,pattern: /^\S+$/, message: '长度在 1 到 20且不能有空格', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 6, max: 16, pattern: /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g, message: '长度在 6 到 16 个数字和英文字母', trigger: 'blur' }
					]
				}
			}
		},
	 methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					request({
						url: '/users/changeData',
						method: 'post',
						data: {
							userName: this.ruleForm.userName,
							password: this.ruleForm.password,
							id:window.localStorage.getItem("id")
						}
					}).then(res =>{
						if(res.status == 200){
							this.$message.success("修改成功")
							window.localStorage.setItem("username",this.ruleForm.userName)
							this.$store.commit('updataUserName')
							this.$router.push("/personalCenter")
						}
					})
				} else {
					this.$message.error("修改失败,请注意格式")
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
}
</script>

<style>
	@media screen and (min-width : 768px) {
		.modifyMessage{
			position: absolute;
			top: 150px;
			left: 20%;
			width: 60%;
			height: 500px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
		}
		.modifyMessage .demo-ruleForm2 {
			position: absolute;
			left: 45%;
			top: 30%;
			-webkit-transform:translate(-50%,0%);  
			-moz-transform:translate(-50%,0%);  
			transform:translate(-50%,0%); 
		}
		.modifyMessage .title1 {
			position: absolute;
			top: 30px;
			left: 30px;
			font-size: 23px;
			font-weight: 700;
		}
		.demo-ruleForm2 .inputWidth1 {
			width: 400px;
		}
		.demo-ruleForm2 .inputWidth2 {
			width: 400px;
		}
		.demo-ruleForm2 .buttonMargin {
			margin-left: 40px;
		}
	}
	
	@media screen and (max-width : 768px) {
		.modifyMessage{
			position: absolute;
			top: 150px;
			left: 10%;
			width: 80%;
			height: 500px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
		}
		.modifyMessage .demo-ruleForm2 {
			position: absolute;
			left: 40%;
			top: 30%;
			-webkit-transform:translate(-50%,0%);  
			-moz-transform:translate(-50%,0%);  
			transform:translate(-50%,0%); 
		}
		.modifyMessage .title1 {
			position: absolute;
			top: 30px;
			left: 30px;
			font-size: 23px;
			font-weight: 700;
		}
		.demo-ruleForm2 .inputWidth1 {
			width: 400px;
		}
		.demo-ruleForm2 .inputWidth2 {
			width: 400px;
		}
		.demo-ruleForm2 .buttonMargin {
			margin-left: 30px;
		}
	}
</style>
