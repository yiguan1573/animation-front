<template>
	<div class="login">
		<div class="message11 animate__animated animate__zoomInRight">
			<div class="loginForm">	
				<div class="login_tit">
						<h4>
								<img src="../../assets/image/login2.png" alt="">
						</h4>
				</div>
				
				<label :style="inputStyle1">
						<input type="text" maxlength="20" minlength="1" placeholder="请输入用户名" v-model="account1" @blur="checkAccount1(account1)" @focus="checkAccount11"/>
				</label>
				<span class="error1">{{error1}}</span>
				<label :style="inputStyle2">
						<input type="password" placeholder="请输入密码" v-model="password1" @blur="checkPassword1(password1)" @focus="checkPassword11"/>
				</label>
				<span class="error2">{{error2}}</span>
				<label :style="inputStyle3">
						<input type="password" placeholder="再次输入密码" v-model="password2" @blur="checkPassword2(password1,password2)" @focus="checkPassword21"/>
				</label>
				<span class="error3">{{error3}}</span>
			</div>
			
			<button class="loginBtn3" @click="linkToLogin" v-preventReClick>
					注册
			</button>
		</div>
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	export default {
		name: 'register',
		data() {
				return {
						account1:"",
						password1: "",
						password2: "",
						inputErrorStyle: {border: '1px solid #F00000'},
						inputSuccessStyle: {border: '1px solid #00FF33'},
						inputStyle1:{},
						inputStyle2:{},
						inputStyle3:{},
						error1:"",
						error2:"",
						error3:"",
						receptionCheck1: false,
						receptionCheck2: false,
						receptionCheck3: false,
						backstageCheck: true
				}
		},
		methods: {
			checkAccount1(n) {
				let l = n.replace(/\s*/g,"")
				if(l == ""){
					this.inputStyle1 = this.inputErrorStyle
					this.error1 = "用户名不能为空"
					this.receptionCheck1 = false
				}else if(n.indexOf(" ") != -1){
					this.inputStyle1 = this.inputErrorStyle
					this.error1 = "用户名不能包含空格"
					this.receptionCheck1 = false
				}else{
					this.receptionCheck1 = true
				}
			},
			checkAccount11() {
				this.inputStyle1 = {}
				this.error1 = ""
			},
			checkPassword1(n) {
				// 6-16个英文字母和数字的字符串
				let reg=/^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g;
				if(reg.test(n)){
					this.inputStyle2 = this.inputSuccessStyle
					this.receptionCheck2 = true
				}else{
					this.inputStyle2 = this.inputErrorStyle
					this.receptionCheck2 = false
					this.error2 = "密码必须由6-16个英文字母和数字的字符串组成！"
				}
			},
			checkPassword11() {
				this.inputStyle2 = {}
				this.error2 = ""
			},
			checkPassword2(n,m) {
				let reg=/^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g;
				if(reg.test(m) && n === m){
					this.inputStyle3 = this.inputSuccessStyle
					this.receptionCheck3 = true
				}else if(m != n){
					this.inputStyle3 = this.inputErrorStyle
					this.receptionCheck3 = false
					this.error3 = "密码不一致！"
				}else{
					this.inputStyle3 = this.inputErrorStyle
					this.receptionCheck3 = false
					this.error3 = "密码必须由6-16个英文字母和数字的字符串组成！"
				}
			},
			checkPassword21(){
				this.inputStyle3 = {}
				this.error3 = ""
			},
			linkToLogin() {
				if(this.receptionCheck1&&this.receptionCheck2&&this.receptionCheck3&&this.backstageCheck){
					request({
						url: '/users/register',
						method: 'post',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						data: {
							username: this.account1,
							password: this.password1
						}
					}).then(res =>{
						if(res.status == 200){
							this.$router.push("login")
							this.$message.success("注册成功")
						}
					})
				}else{
					this.$message.success("注册失败，密码或用户名错误")
				}
			}
		}
	}
</script>

<style scoped>
	@media screen and (min-width : 768px) {
		.login{
			position: absolute;
			width: 100%;
			height: 100%;
			background-image:url('../../assets/image/bg/07.png');
			background-size: cover;
		}
		.message11 {
			position: fixed;
			left: 50%;
			top:22%;
			width: 350px;
			height: 550px;
			margin-left: -175px;
			line-height: 1.7;
			border-radius: 8px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
			background-color: white;
			
		}
		h4 {
		    text-align: center;
		    font-size: 20px;
		    color: #8BC34A;
		    font-weight: 500;    
		}
		h4 img {
				height: 105px;
				display: block;
				margin: 30px auto;
				margin-bottom: 0;
		            
		}
		.loginForm label {
			margin: 0 auto;
			display: table;
			width: 90%;
			margin-bottom: 40px;
			border: 1px solid #fff;
			transition: all .8s;
			border-radius: 300px;
		}
		.loginForm label:hover {
			border: 1px solid #000;
		}
		.loginForm input {
			border: 0;
			-webkit-box-shadow: 0 0 15px #ccc;
			box-shadow: 0 0 15px #ccc;
			padding: 15px 0;
			width: 100%;
			float: left;
			text-indent: 20px;
			border-radius: 50px;
			outline: none;
		}
		.loginForm {
		    display: block;
		}
		.loginBtn3 {
		    padding: 14px 0;
		    border: 0;
		    background: #000;
		    color: #fff;
		    border-radius: 50px;
		    width: 90%;
		    margin: auto;
		    display: block;
				position: relative;
		    outline: none;
				transition: all .5s;
				cursor: pointer;
		}
		.loginBtn3:hover{
			box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.6);
		}
		.error1 {
			position: absolute;
			left: 30px;
			/* top: -40px; */
			bottom: 345px;
			color: #F00000;
			font-size: 12px;
		}
		.error2 {
			position: absolute;
			left: 30px;
			/* top: -40px; */
			bottom: 255px;
			color: #F00000;
			font-size: 12px;
		}
		.error3 {
			position: absolute;
			left: 30px;
			/* top: -40px; */
			bottom: 170px;
			color: #F00000;
			font-size: 12px;
		}
	}
	
	@media screen and (max-width : 768px) {
		.login{
			width: 100%;
			height: 100%;
			background-image:url('../../assets/image/bg/07.png');
		}
		.message11 {
			position: fixed;
			left: 50%;
			top:16%;
			width: 350px;
			height: 550px;
			margin-left: -175px;
			line-height: 1.7;
			/* border-radius: 4px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3); */
		}
		h4 {
		    text-align: center;
		    font-size: 20px;
		    color: #8BC34A;
		    font-weight: 500;    
		}
		h4 img {
				height: 105px;
				display: block;
				margin: 30px auto;
				margin-bottom: 0;
		            
		}
		.loginForm label {
			margin: 0 auto;
			display: table;
			width: 90%;
			margin-bottom: 40px;
			border: 1px solid #fff;
			transition: all .8s;
			border-radius: 300px;
		}
		.loginForm label:hover {
			border: 1px solid #000;
		}
		.loginForm input {
			border: 0;
			-webkit-box-shadow: 0 0 15px #ccc;
			box-shadow: 0 0 15px #ccc;
			padding: 15px 0;
			width: 100%;
			float: left;
			text-indent: 20px;
			border-radius: 50px;
			outline: none;
		}
		.loginForm {
		    display: block;
		}
		.loginBtn3 {
		    padding: 14px 0;
		    border: 0;
		    background: #000;
		    color: #fff;
		    border-radius: 50px;
		    width: 90%;
		    margin: auto;
		    display: block;
				position: relative;
		    outline: none;
				transition: all .5s;
				cursor: pointer;
		}
		.loginBtn3:hover{
			box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.6);
		}
		.error1 {
			position: absolute;
			left: 30px;
			/* top: -40px; */
			bottom: 345px;
			color: #F00000;
			font-size: 12px;
		}
		.error2 {
			position: absolute;
			left: 30px;
			/* top: -40px; */
			bottom: 255px;
			color: #F00000;
			font-size: 12px;
		}
		.error3 {
			position: absolute;
			left: 30px;
			/* top: -40px; */
			bottom: 170px;
			color: #F00000;
			font-size: 12px;
		}
	}
</style>
