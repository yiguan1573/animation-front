<template>
	<div class="manang-page">
		<div class="aside">
			<el-menu
			      default-active="userManage"
						router
			      class="el-menu-vertical-demo">
			      <el-submenu index="1">
			        <template slot="title">
			          <span>用户管理</span>
			        </template>
			          <el-menu-item index="userManage" route="userManage">用户管理</el-menu-item>
			          <el-menu-item index="roleManage" route="roleManage">角色管理</el-menu-item>
			          <el-menu-item index="authorizationManage" route="authorizationManage">权限管理</el-menu-item>
			      </el-submenu>
			      <el-submenu index="2">
							<template slot="title">
							  <span>动画管理</span>
							</template>
							<el-menu-item index="animationManage">动画管理</el-menu-item>
							<el-menu-item index="carouselAnimation">首页走马灯</el-menu-item>
							<el-menu-item index="uploadAnimation">上传动画</el-menu-item>
			      </el-submenu>
						<el-submenu index="3">
							<template slot="title">
							  <span>系统管理</span>
							</template>
							<el-menu-item index="systemMessage">系统消息</el-menu-item>
						</el-submenu>
			    </el-menu>
		</div>
		<div class="main">
			<router-view></router-view>
			
		</div>
	</div>
</template>

<script>
	export default {
		name: '',
		components:{

		},
		data(){
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
.manang-page{
	position: absolute;
	width: 80%;
	height: calc(100% - 70px);
	margin-top: 10px;
	margin-left: 10%;
	background-color: white;
	border-radius: 8px;
	.aside{
		position: absolute;
		width: 20%;
		height: 100%;
	}
	.main{
		position: absolute;
		display: inline-block;
		margin-left: 20%;
		height: 100%;
		width: 80%;
	}
}
</style>