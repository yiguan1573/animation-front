<template>
	<div class="message-card">
		<div class="top">
			<span class="title">{{title}}</span>
			<span class="time">{{time}}</span>
		</div>
		<div class="bottom">
			<span class="text">{{content}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: '',
		props:['messageCardMessage'],
		created() {
				this.title = this.messageCardMessage.title
				this.time = this.messageCardMessage.time
				this.content = this.messageCardMessage.content
		},
		components:{

		},
		data(){
			return {
				title:'B币券到账通知',
				time:'2022年10月7日 23:42',
				content:'领取任务后发布首稿即可得积分奖励！任务时间结束后，可在【我的-创作首页-新手任务】领取奖励。快来领取你的新手任务吧~'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.message-card{
		padding: 24px 16px;
		background-color: #fff;
		box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
		margin-bottom: 10px;
		border-radius: 4px;
		.top{
			font-size: 12px;
			line-height: 24px;
			color: #666;
			// width: 500px;
			.title{
				color: #333;
				font-weight: 700;
				box-sizing: border-box;
				font-size: 12px;
			}
			.time{
				color: #999;
				font-size: 12px;
				line-height: 22px;
				margin: 0 10px;
			}
		}
		.bottom{
			box-sizing: border-box;
			color: #666;
			padding-left: 8px;
			font-size: 12px;
			.text{
				line-height: 19px;
				color: #666;
			}
		}
	}
</style>