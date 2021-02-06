<template>
  	<div id="login">
		<div class="login_bar">
			<div class="langbtn">
				<nut-button @click="changeLanguageMethod()" type="light" shape="circle" color="#000000" small>{{lang==='ch'? 'English': '中文'}}</nut-button>
			</div>
		</div>
		<div class="login_center" ref="maincenter">
			<div class="login_center_img">
				<img :src="BackgroundImage | imgurl" alt="获取失败">
			</div>
			<div class="login_center_body">
				<div class="login_center_body_top">
					<img src="../../public/img/icons/apple-touch-icon-60x60.png" alt="获取失败">
				</div>
				<div style=" color: #666; background-color:white; border-radius:10px;" class="home_success" :close-on-click-overlay="false" :z-index="11" get-container="#home">
				
					<div style="font-size: 18px; margin-top:20px">
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
					<div style="display: flex;justify-content:center">
					
						<div style="margin: 0 10px">
							<nut-button @click="loginMethod()">{{lang==='en'? "Confirm": "确认"}}</nut-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="login_bar"></div>



	</div>
</template>

<script>
import Throttle from  'lodash.throttle'
import axios from "axios";

export default {
	created(){
		this.getSetupInfoMethod()
	},
	mounted(){
		this.pageInitMethod()
		this.getBuffetSetArray()
		
	},
	computed:{
        lang(){
            return this.$store.state.language
        },
		systemInfo(){
			if(this.$store.state.systemInfo){
				return this.$store.state.systemInfo
			}else if(localStorage.getItem('setSystemInfo')){
				return JSON.parse(localStorage.getItem( 'setSystemInfo'))
			}else{
				let defaul = {
					doc:{
						restaurantType: normal
					}
				}
				return defaul
			}
		}
    },
	data(){
		return{
			Image:null,
			BackgroundImage:null,
			isShowPopup: false,
			number: 0,
			
			isShowStaffBox: true,
			staffInfo: {},
			
			
			
			
		}
	},
	methods:{
		getSetupInfoMethod(){
            let localPrinterUrl = null
            if(localStorage.getItem('emenuSetting')){
                JSON.parse(localStorage.getItem('emenuSetting'))
                this.printerAddress = localPrinterUrl && localPrinterUrl.printerServer || null
            }
            axios.post(this.$sysConfig.server + "/setup/get").then(doc =>{
                if(doc.data.code === 0){
                    this.Image = doc.data.doc.image
                    this.BackgroundImage = doc.data.doc.backgroundimage
					
                    console.log("7777777")
                    console.log(doc.data.doc)
					
                }
				
            }).catch(err =>{
                console.log(err)
            })
        },
		ThrottleConfirmOpenTable: Throttle(function(){
            this.confirmOpenTable()
        }, 5000, {
            leading: true,
            trailing: false
        }),
		
		changeLanguageMethod(){
            if(this.lang === 'en'){
                this.$store.dispatch('setLanguage', 'ch')
                localStorage.setItem('language','ch')
            }else{
                this.$store.dispatch('setLanguage', 'en')
                localStorage.setItem('language','en')
            }
        },
		async pageInitMethod(){
			await this.countMainImgHeight()
			this.$store.dispatch('setViewMode', false)
		},
		countMainImgHeight(){
			return new Promise((reslove, reject) => {
				let sreenHeight = document.documentElement.clientHeight
				let mainImgHeight = sreenHeight - 120
				this.$refs.maincenter.style.height = mainImgHeight + 'px'
				reslove(true)
			})
		},
	
		async loginMethod(){
            if(!this.staffInfo.userName || !this.staffInfo.password){
                this.$toast.fail('请输入用户名密码')
                return
            }
            let checkInfo = await this.$axios.post(this.$sysConfig.server + '/user/check',{
                userName: this.staffInfo.userName,
                password: this.staffInfo.password
            })
            console.log(checkInfo)
            if(checkInfo.data.code === 200){
                this.isShowStaffBox = false
				this.$router.push('/client')
                // this.openTablePopup()
            }else if(checkInfo.data.code === 404 || checkInfo.data.code === 405){
                this.$toast.fail('用户名或密码错误')
            }else{
                this.$toast.fail('验证时发生错误')
            }
        },
		
	}
}
</script>
<style scoped>
.control_dialog_item_active{
    background-color: #ADD8E6;
    color: #fff;
}
.control_dialog_item{
    width: 118px;
    height: 48px;
    line-height: 48px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    color: #666;
    cursor: pointer;
	text-align: center;
}
.langbtn{
	padding-top:15px;
	padding-right:15px;
	float: right;
}
.login_bar{
	height: 60px;
	width: 100%;
	background-color: rgba(195, 13, 35, 1);
}
.login_center{
	position: relative;
}
.login_center_img{
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	opacity:.5;
}
.login_center_img img{
	object-fit: cover;
	width: 100%;
	height: 100%;
}
.login_center_body{
	position: absolute;
	
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.login_center_body_top{
	padding: 10px 0	;
}
.login_center_body_top img{
	height: 248px;
}

.home_success{
	width: 300px;
	height: 250px;
}
</style>
