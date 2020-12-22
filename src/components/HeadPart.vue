<template>
	<div id="headpart">
		<div class="headpart_left">
			<i v-if="isViewMode" class="cubeic-back" @click="trunBack()">{{lang==='en'?'Back':'返回'}}</i>
			<div v-else  class="headpart_right_item" @click="logoOut()">
				{{tableName || lang==='en'?tableName :tableName}}
			</div>
		</div>
		<div class="headpart_center">
			<div class="override">
				<nut-buttongroup style="width: 260px">
					<nut-button style="border-radius: 2px; font-size: 16px; padding: 0" :type="isHomePage? 'light' : ''" @click="changePage('pot')">{{lang === 'en'? 'POT SOUP': '锅底'}}</nut-button>
					<nut-button style="border-radius: 2px; font-size: 16px; padding: 0" :type="isHomePage? '': 'light'" @click="changePage('product')">{{lang === 'en'? 'PRODUCT' : '菜品'}}</nut-button>
				</nut-buttongroup>
			</div>
		</div>
		<div class="headpart_right">
			<div v-if="!isViewMode" >
				<div v-if="memberInfo.phone" class="headpart_right_item" @click="openMemberInfoBox()">
					{{ memberInfo.phone }}
				</div>
				<div v-else style="width:150px; text-align: right;" class="headpart_right_item" @click="openLoginBox()">
					{{lang==='en'?'Member Login' :'会员登录'}}
				</div>
			</div>
			<div style="padding-right:50px" class="headpart_right_item">
				<nut-button style="width:88px; height: 38px; font-size: var(--mainFont); border-radius: 2px;" @click="changeLanguageMethod()" type="light" color="#000000" small>{{lang==='en'?'中文':'English'}}</nut-button>
			</div>
			
		</div>
	</div>
</template>
 
<script>
export default {
	computed:{
        lang(){
            return this.$store.state.language
		},
		memberInfo(){
			return this.$store.state.memberInfo
		},
		isViewMode(){
			return this.$store.state.isViewMode
		},
		tableName(){
			return localStorage.getItem('tableName')
		},
		isHomePage(){
			let tempFlag = false
			if(this.$route.path === '/'){
				tempFlag = true
			}else{
				tempFlag = false
			}
			return tempFlag
		}
	},
	methods:{
		openMemberInfoBox(){
			console.log(111)
			this.$store.dispatch('setShowMemberboxMode', true)
		},
		changePage(path){
			this.isHomePage && path === 'pot' && this.$router.push('/pot')
			!this.isHomePage && path === 'product' && this.$router.push('/')
		},
		trunBack(){
			this.$router.push('/login')
		},
		openLoginBox(){
			this.$store.dispatch('setLoginBox', true)
		},
		logoOut(){
			this.$store.dispatch('setStaffLoginBox', true)
		},
		changeLanguageMethod(){
            if(this.lang === 'en'){
                this.$store.dispatch('setLanguage', 'ch')
                localStorage.setItem('language','ch')
            }else{
                this.$store.dispatch('setLanguage', 'en')
                localStorage.setItem('language','en')
            }
		}
	}
}
</script>

<style scoped>
#headpart{
	width: 100%;
	background-color: #202a39;
	display: flex;
	justify-content: space-around;
	height: 64px;
	align-items: center;
}
.headpart_left{
	display: flex;
	color: #fff;
	font-size: 18px;
	font-weight: 700;
	align-items: center;
	flex-basis: 33%;
	padding-left: 10px;
}
.headpart_center{
	flex-basis: 33%;
	display: flex;
    justify-content: center;
}
.headpart_right{
	display: flex;
	color: #fff;
	font-size: 18px;
	font-weight: 700;
	align-items: center;
	flex-basis: 33%;
	justify-content: flex-end;
}
.headpart_right_item{
	width: 78px;
	text-align: center;
	margin: 0 8px;
}
.override{
	width: 262px;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 2px;
	height: 44px;
}
</style>