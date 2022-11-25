<template>
	<div class="HomePage">
		<div class="carousel">
			<el-carousel :interval="5000" arrow="hover" height="700px">
			    <el-carousel-item v-for="item in carousel" :key="item.id">
						<div class="carousel-image">
							<div class="AnimationCard">
								<AnimationCard :animationCard="item" :key="item.id"></AnimationCard>
							</div>
							<el-image fit="fill" :src="getCompleteUrl(item.carouselImageUrl)">
							      <div slot="error" class="image-slot">
							        <i class="el-icon-picture-outline"></i>
							      </div>
							</el-image>
							
						</div>
			    </el-carousel-item>
			  </el-carousel>
		</div>
		
		<div class="daylong">
			<div style="width: 100%; height: 40px;">
				<div class="animation-svg1"></div>
				<div class="animation-title">动画</div>
				<span class="animation-more" @click="toDatlong">更多<i class="el-icon-arrow-right"></i></span>
			</div>
			<div class="animation-list">
				<AnimationCard v-for="item in daylong" :key="item.id" :animationCard="item"></AnimationCard>
			</div>
		</div>
		
		<div class="ova">
			<div style="width: 100%; height: 40px;">
				<div class="animation-svg2"></div>
				<div class="animation-title">剧场版</div>
				<span class="animation-more" @click="toOva">更多<i class="el-icon-arrow-right"></i></span>
			</div>
			<div class="animation-list">
				<AnimationCard v-for="item in ova" :key="item.id" :animationCard="item"></AnimationCard>
			</div>
		</div>
		<div style="width: 100%;height: 80px;">
			
		</div>
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	import AnimationCard from '../../components/AnimationCard.vue'
	export default {
		name: '',
		components:{
			AnimationCard
		},
		data(){
			return {
				carousel:[
					
				],
				daylong:[],
				ova:[]
			}
		},
		methods:{
			toDatlong(){
				this.$router.push("/daylong")
			},
			toOva(){
				this.$router.push("/ova")
			}
		},
		computed:{
			getCompleteUrl(){
				return function (fileName) {
					return this.defaultImageUrl + fileName
				}
			}
		},
		created(){
			request({
				url: '/animation/getCarouselList',
				method: 'get'
			}).then(res =>{
				if(res.status == 200){
					this.carousel = res.data
				}
			})
			
			request({
				url: '/common/commonAnimationList',
				method: 'get',
				params:{
					type: 0,
					pageNo:1,
					pageSize:14
				}
			}).then(res =>{
				if(res.status == 200){
					this.daylong = res.data
				}
			})
			
			request({
				url: '/common/commonAnimationList',
				method: 'get',
				params:{
					type: 1,
					pageNo:1,
					pageSize:14
				}
			}).then(res =>{
				if(res.status == 200){
					this.ova = res.data
				}
			})
			
			if(window.localStorage.getItem("id")!=null){
				request({
					url: '/users/getMessage',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						id: window.localStorage.getItem("id")
					}
				}).then(res =>{
					if(res.status==200){
						window.localStorage.setItem("role",res.data.role)
						window.localStorage.setItem("username",res.data.username)
						this.$store.commit('updataUserName')
						this.$store.commit('updataRole')
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.HomePage{
		width: 84%;
		margin-left: 8%;
		margin-top: 20px;
		.carousel{
			.el-carousel__item{
				// border-radius: 10px;
				width: 100%;
				height: 100%;
				background-color: #99a9bf;
			}
			/deep/ .el-carousel{
				border-radius: 20px;
			}
			.carousel-image{
				cursor: pointer;
				width: 100%;
				height: 100%;
				.AnimationCard{
					position: absolute;
					z-index: 10;
					margin-left: 85%;
					margin-top: 120px;
					transform: translateX(-30%);
				}
				.el-image{
					width: 100%;
					height: 100%;
					.image-slot{
						i{
							margin-top: 260px;
							width: 100%;
							height: 100%;
							text-align: center;
							font-size: 34px;
							color: azure;
						}
						
					}
				}
			}
		}
		.daylong{
			margin-top: 40px;
			width: 100%;
			height: auto;
		}
	}
</style>