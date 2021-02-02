<template>
	<div id="headpart">
		<div class="headpart_left">
			<div @click="logOutMethod()">
				<img src="../../public/img/pic/logoutImage.svg" alt="" style="width:30px;height:30px">
			</div>
		</div>
		<div class="headpart_center">
			{{nowTime}}
		</div>
		<!-- <div>
			<div style="color:white; " class="headpart_right">
				{{lang === 'en' ? 'Staff Login': '员工登录'}}
			</div>
		</div> -->

		<div class="headpart_right">
			
			<!-- <div @click="openSettingMethod()">
				<img src="../../public/img/pic/setting_icon.svg" alt="" style="width:30px;height:30px">
			</div> -->
			<div style="color:white; font-size:20px;" @click="staffLoginmethod()">
				{{lang === 'en' ? 'Staff Login': '员工登录'}}
			</div>
		</div>


		<nut-popup v-model="isShowConfirmBox" style=" color: #666; width:30%;height: 350px; border-radius:30px;" :z-index="11" >
			<div style="background-color: #202a39; height:15%">

			</div>
			<div style="display:flex; justify-content:center; height:60%; align-items:center; font-size:30px;">
				{{lang === "en" ? "Confirm to log out" : "确认退出"}}
			</div>
			<div>
 			<div style="display: flex; justify-content: space-around;">
        		<div style="margin: 0 10px">
					<nut-button
						type="light"
						@click="isShowConfirmBox = false"
						style="padding:10px 50px 10px 50px;"
						>{{ lang === "en" ? "Cancel" : "取消" }}</nut-button
					>
        		</div>
				<div style="margin: 0 10px;">
				<nut-button
					@click="confiormMethods()"
					style="padding:10px 50px 10px 50px;"
					>{{ lang === "en" ? "Confirm" : "确定" }}</nut-button
				>
				</div>
      		</div>
			</div>
		</nut-popup>
		<!-- <el-dislog
		 	title='Add Table Type'
            :visible.sync="staffLoginBox"
            width="30%">
			<div style="font-size: 18px; margin-top:20px">
				{{ lang === "en" ? "Staff Log In" : "请使用员工账号登录" }}
			</div>
			<div style="padding: 18px;">
				<div style="padding-bottom: 10px">
				<cube-input
					v-model="staffInfo.userName"
					placeholder="STAFF NAME"
				></cube-input>
				</div>
				<div style="padding-bottom: 10px">
				<cube-input
					type="password"
					v-model="staffInfo.password"
					placeholder="PASSWORD"
					:eye="{ visible: false, blurHidden: true }"
				></cube-input>
				</div>
			</div>
			<div style="display: flex;justify-content:center">
				<div style="margin: 0 10px">
				<nut-button @click="loginMethod()">{{
					lang === "en" ? "Confirm" : "确认"
				}}</nut-button>
				</div>
			</div>
		</el-dislog> -->
	</div>

	
</template>
 


<script>

export default {
	mounted(){
		this.nowTimes();
	},
	
	data(){
		return {
			nowTime:'',
			isShowConfirmBox:false,
			staffLoginBox:false,
			staffInfo: {},
		}
	},


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
		async loginMethod() {
			if (!this.staffInfo.userName || !this.staffInfo.password) {
				this.$toast.fail("请输入用户名密码");
				return;
			}
			let checkInfo = await this.$axios.post(
				this.$sysConfig.server + "/user/check",
				{
				userName: this.staffInfo.userName,
				password: this.staffInfo.password,
				}
			);
			console.log(checkInfo);
			if (checkInfo.data.code === 200) {
				this.staffLoginBox = false;
				// this.$router.push("/setup");
				// this.openTablePopup()
			} else if (checkInfo.data.code === 404 || checkInfo.data.code === 405) {
				this.$toast.fail("用户名或密码错误");
			} else {
				this.$toast.fail("验证时发生错误");
			}
		},
		staffLoginmethod(){
			this.staffLoginBox = true
			// this.$router.push('/staffLogin')
		},
		openSettingMethod(){
			this.$router.push('/setup')
		},
		confiormMethods(){
			this.$router.push('/login')
		},
		logOutMethod(){
			this.isShowConfirmBox = true
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

		timeFormate(timeStamp) {
			let year = new Date(timeStamp).getFullYear();
			let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
			let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
			let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
			let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
			let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
			this.nowTime = hh+":"+mm+':'+ss + "  " + date + "/" + month + "/"+ year;

		},
		nowTimes(){
		this.timeFormate(new Date());
		setInterval(this.nowTimes,1000);
		this.clear()
		},
		clear(){
		clearInterval(this.nowTimes)
		this.nowTimes = null;
		}
		
	}

}
</script>

<style scoped>
#headpart{
	width: 100%;
	background-color: #202a39;
	display: flex;	
	height: 64px;
	align-items: center;
	justify-content: space-between;
}
.headpart_left{

	align-items: center;
	padding: 20px;

}
.headpart_center{
	
	color:white;
	width: 300px;
	font-size: 30px;
	
}
.headpart_right{
	margin-right: 10px;
	justify-items: flex-end;

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

