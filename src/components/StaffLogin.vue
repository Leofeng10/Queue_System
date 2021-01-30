<template>
    <div id="stafflogin">
        <nut-popup v-model="isShow" style=" color: #666;" class="home_success" :close-on-click-overlay="false" :z-index="11" get-container="#home">
			<div style="font-size: 18px">
				{{lang==='en'? "Staff Log In":"请使用员工账号登录"}}
			</div>
			<div style="padding: 18px;">
				<div style="padding-bottom: 10px">
					<cube-input v-model="staffInfo.userName" placeholder="STAFF NAME"></cube-input>
				</div>
				<div style="padding-bottom: 10px">
					<cube-input type="password" v-model="staffInfo.password" placeholder="PASSWORD" :eye="{visible: false, blurHidden: true}"></cube-input>
				</div>
			</div>
			<div style="display: flex">
			
				<div style="margin: 0 10px">
					<nut-button @click="loginMethod()">{{lang==='en'? "Confirm":"确认"}}</nut-button>
				</div>
			</div>
		</nut-popup>
    </div>
</template>

<script>
export default {
    computed:{
		lang(){
			return this.$store.state.language
		},
		isShowStaffBox(){
			return this.$store.state.isShowStaffBox
		},
		isShow: { //异步更新状态 不然会整出一个错
			get(){
				return this.isShowStaffBox
			},
			set(newValue){
				return newValue
			}
		}
    },
    // data(){
    //     return{
    //         test: true,
    //         staffInfo: {}
    //     }
    // },
    // methods:{
    //     async loginMethod(){
    //         if(!this.staffInfo.userName || !this.staffInfo.password){
    //             this.$toast.fail('请输入用户名密码')
    //             return
    //         }
    //         let checkInfo = await this.$axios.post(this.$sysConfig.server + '/user/check',{
    //             userName: this.staffInfo.userName,
    //             password: this.staffInfo.password
    //         })
    //         console.log(checkInfo)
    //         if(checkInfo.data.code === 200){
    //             this.$store.dispatch('setStaffInfo', {userName: this.staffInfo.userName})
    //             this.$store.dispatch('setStaffLoginBox', false)
    //             this.$router.push('/check')
    //         }else if(checkInfo.data.code === 404 || checkInfo.data.code === 405){
    //             this.$toast.fail('用户名或密码错误')
    //         }else{
    //             this.$toast.fail('验证时发生错误')
    //         }
    //     },
    //     cancelMethod(){
    //         this.$store.dispatch('setStaffLoginBox', false)
    //     }
    // }
}
</script>