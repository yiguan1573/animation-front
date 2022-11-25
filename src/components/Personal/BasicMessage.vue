<template>
	<div class="basicMessage">
		<router-link to="/modifyImg">
			<!-- <el-avatar fit="file" :size="size" :src="circleUrl" class="portrait headPortrait"></el-avatar> -->
			<img :src="circleUrl" class="portrait headPortrait">
		</router-link>
<!-- 		<div class="shadow" v-show="toShow">
			<span>更换头像</span>
		</div> -->
		<span class="name">{{getId}}</span>
		<el-button round size="mini" @click="linkToModifyMessage" class="modification">修改资料</el-button>
	</div>
</template>

<script>
	export default {
		name: 'basicMessage',
		data () {
			return {
				size: 60
			}
		},
		methods: {
			linkToModifyMessage() {
				this.$router.push('/modifyMessage')
			}
		},
		computed: {
			getId(){
				return this.$store.state.username
				// return "亿观"
			},
			circleUrl(){
				return this.$store.state.image
				// return require('@/assets/image/01.png')
			}
		}
	}
</script>

<style>
	.basicMessage .title1 {
		margin-top: 10px;
		margin-bottom: 10px;
		margin-left: 40px;
		font-size: 23px;
		font-weight: 700;
	}
	.basicMessage .headPortrait {
		margin-top: 20px;
		margin-left: 25px;
	}
	.basicMessage .name {
		position: relative;
		margin-left: 40px;
		bottom: 20px;
		/* margin-top: 40px; */
		color: #66CCFF;
		font-weight: 600;
		font-size: 22px;
	}
	.basicMessage .modification {
		position: relative;
		margin-left: 40px;
		bottom: 22px;
	}
	.basicMessage .shadow {
		position: absolute;
		left: 40px;
		top: 20px;
		width: 60px;
		height: 60px;
		border-radius: 30px;
		background-color: rgba(255,255,255,0.5);
	}
	.basicMessage .shadow span {
		left: 5px;
		top: 20px;
		position: absolute;
		font-size: 10px;
		color: #484848;
	}
	.basicMessage .portrait {
			width: 60px;
			height: 60px;
			border-radius: 30px;
	}
</style>
