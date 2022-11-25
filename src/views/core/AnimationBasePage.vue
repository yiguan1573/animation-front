<template>
	<div class="animationBasePage">
		<AnimationHeader class="animationHeader"></AnimationHeader>
		<div class="mianPage">
			<div class="scroll">
				<router-view></router-view>
			</div>
			
		</div>
	</div>
</template>

<script>
	import AnimationHeader from '../../components/AnimationHeader'
	export default {
		name: 'AnimationBasePage',
		components:{
			AnimationHeader
		}
	}
</script>

<style lang="scss" scoped>
	.animationBasePage {
		.mianPage{
			position: fixed;
			margin-top: 60px;
			width: 100vw;
			min-width: 950px;
			height: 100%;
			overflow-y: auto;
		}
		.animationHeader {
			position: fixed;
			top: 0;
			z-index: 100;
			width: 100vw;
			min-width: 950px;
			height: 60px;
			background-color: white;
			border-bottom: 1px solid #EAEAEA;
			box-shadow: 0 2px 6px rgba(0, 0, 0, .06);
		}
	}
</style>
