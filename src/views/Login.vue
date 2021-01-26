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
					<img :src="Image | imgurl" alt="获取失败">
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
					<div style="display: flex">
						<div style="margin: 0 10px">
							<nut-button type="light" @click="cancelMethod()">{{lang==='en'? "Cancel": "取消"}}</nut-button>
						</div>
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
			tableList: [],
			toastLoading: null,
			isShowStaffBox: true,
			staffInfo: {},
			isShowOpenTable: false,
			paxNumber: 0,
			tempTableInfo: {},
			isShowTableButton: false,
			isShowEmptyTable: false,
			isShowMergeTable: false,
			mergeFromTableInfo: {},
			buffetSetArray: [],
			chooseBuffetSet: null,
			
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
		chooseBuffetSetMethod(item){
            this.chooseBuffetSet = item //选择自助套餐
        },
		async getBuffetSetArray(){
            let result = await this.$axios.get(this.$sysConfig.server + '/buffetSet')
            if(result.data.code === 200){
                this.buffetSetArray = result.data.result
            }
            console.log(result)
        },
		chooseUsedTable(table){
			let totalPrice = 0
			if(this.tempTableInfo.orderId){
				for (const content of this.tempTableInfo.orderId.orderContent) {
					for (const product of content.productList) {
						totalPrice += product.orderQty * (product.typePrice || product.unitPrice)
					}
				}
			}
			this.tempTableInfo.totalPrice = totalPrice
			let otherTotalPrice = 0
			this.mergeFromTableInfo = table
			if(this.mergeFromTableInfo.orderId){
				for (const content of this.mergeFromTableInfo.orderId.orderContent) {
					for (const product of content.productList) {
						otherTotalPrice += product.orderQty * (product.typePrice || product.unitPrice)
					}
				}
			}
			this.mergeFromTableInfo.totalPrice = otherTotalPrice
			this.isShowMergeTable = true
			this.isShowUsedTable = false
		},
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
		openStaffBox(){
			this.isShowStaffBox = true
		},
		cancelMethod(){
			this.isShowStaffBox = false
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
				this.$router.push('/')
                // this.openTablePopup()
            }else if(checkInfo.data.code === 404 || checkInfo.data.code === 405){
                this.$toast.fail('用户名或密码错误')
            }else{
                this.$toast.fail('验证时发生错误')
            }
        },
		getTableList(){
			return new Promise(async (reslove, reject) => {
				try {
					let tableList = await this.$axios.get(this.$sysConfig.server + '/table')
					if(tableList.data.code === 0)this.tableList = tableList.data.doc
					reslove(tableList)
				} catch (error) {
					console.log(error)
					this.$toast.fail('获取餐桌数据时发生错误');
					reject(error)
				}
			})
		},
		async openTablePopup(){
			await this.getTableList()
			this.isShowPopup = true
		},
		addNoAllow(){
			this.$toast.warn('请输入正确用餐人数');
		},
		reduceNoAllow(){
			this.$toast.warn('请输入用餐人数');
		},
		showTableButtone(table){
			this.tempTableInfo = table
			if(table.status){
				if(table.orderId){
					table.orderId.productNumber = 0
					table.orderId.checkedProductNumber = 0
					for (const orderContent of table.orderId.orderContent) {
						table.orderId.productNumber += orderContent.productList.length
						let checkList = orderContent.productList.filter(product => product.checked)
						if(checkList)table.orderId.checkedProductNumber += checkList.length
					}
				}else{
					this.$toast.warn('计算菜品时获取订单错误,请刷新重试');
				}
				this.isShowTableButton = true
			}else{
				this.isShowOpenTable = true
			}
		},
		async chooseTable(item){
			this.isShowTableButton = false
			console.log(this.tempTableInfo)
			if(this.tempTableInfo && this.tempTableInfo.orderId && this.tempTableInfo.orderId.status === '2'){
				this.$toast.fail('餐桌正在结账');
				return
			}
			if(this.tempTableInfo.status){
				this.startLoading()
				let orderinfo = await this.getOrderInfo(this.tempTableInfo.orderId)
				if(orderinfo.data.code === 0){
					this.checkOrder(orderinfo.data.doc)
				}else if(orderinfo.data.code === 1){
					this.$toast.fail('餐桌订单出错，请删除订单后重新创建');
				}else{
					this.$toast.fail('未知错误，请联系管理员');
				}
				this.endLoading()
			}else{
				this.openTableMethod(this.tempTableInfo)
			}
		},
		async changeTabel(){
			this.isShowEmptyTable = true
		},

		async chooseEmptyTable(table){
			let changeInfo = await this.$axios.post(this.$sysConfig.server + '/table/change',{
                fromInfo: this.tempTableInfo._id,
                toInfo: table._id
			})
			console.log(changeInfo)
			if(changeInfo.data.code === 0){
				await this.getTableList()
				this.isShowEmptyTable = false
				this.isShowTableButton = false
			}else{
				this.$toast.fail('换桌时遇到错误')
			}
		},

		async confirmOpenTable(){
			if(this.paxNumber === 0){
				this.$toast.warn('请输入正确的用餐人数');
				return
			}
			this.startLoading()
			try {
				let info = await this.$axios.post(this.$sysConfig.server + '/table/start',{
					"table_id": this.tempTableInfo._id,
					"tableName": this.tempTableInfo.tableName,
					"clientNum": this.paxNumber,
					"takeaway": this.tempTableInfo.takeaway,
					"chooseBuffetSet": this.chooseBuffetSet
				})
				console.log(info)
				if(info.data.code === 0){
					let orderinfo = await this.getOrderInfo(info.data.orderId)
					this.checkOrder(orderinfo.data.doc)
					this.$router.push('/pot')
				}else{
					this.$toast.fail('开桌时遇到错误')
				}
			} catch (error) {
				this.$toast.fail('开桌时服务器发生错误:' + error);
			}
			this.endLoading()
		},
		async closeTable(){
			let info = await this.$axios.post(this.$sysConfig.server + '/table/end',{
				tableId: this.tempTableInfo._id
			})
			if(info.data.code === 200){
				this.$toast.success('操作成功')
				await this.getTableList()
				this.isShowTableButton = false
			}else{
				if(info.data.infoCode === 401){
					this.$toast.warn('餐桌订单包含产品,请提交后关闭');
				}else{
					this.$toast.fail('关桌时出现错误:' + info.data.error);
				}
				
			}
		},
		async mergeTable(){
			console.log(111)
			console.log(this.tempTableInfo)
			this.isShowUsedTable = true
		},
		async openTableMethod(item){
			console.log(item)
			this.tempTableInfo = item
			this.isShowOpenTable = true
		},
		checkOrder(orderinfo){
			this.$cookies.set('orderId', orderinfo._id,'4h')
			localStorage.setItem('tableName', orderinfo.table)
			if(orderinfo.orderContent.length === 0){
				this.$router.push('/pot')
			}else{
				this.$router.push('/')
			}
		},
		getOrderInfo(orderId){
			return new Promise(async (reslove, reject) =>{
				try {
					let orderInfo = await this.$axios.post(this.$sysConfig.server + '/order/control_find',{
						orderId: orderId
					})
					reslove(orderInfo)
				} catch (error) {
					console.log(error)
					this.$toast.fail('获取餐桌订单时服务器错误:' + error);
					reject(error)
				}
			})
			
		},
		viewMenu(){
			this.$router.push({
				name: 'Home',
				params: {
					isViewMode: true
				}
			})
		},
		startLoading(){
			return new Promise( resolve =>{
				this.toastLoading = this.$toast.loading(this.loadingText,{
					coverColor: "rgba(0,0,0,0.5)"
				})
				resolve(this.toastLoading)
			})	
		},
		endLoading(){
			return new Promise( resolve =>{
				this.toastLoading.hide()
				resolve(true)
			})	
		}
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
.login_popup_title{
	height:38px; 
	line-height: 38px;
	background-color: rgba(195, 13, 35, 1); 
	color: #fff; 
	text-align: center;
	position: relative;
}
.login_popup_title_takeaway{
	position: absolute;
	top: 10px;
	right: 10px;
	background-color: #fff;
	border-radius: 100%;
	width: 48px;
	height: 48px;
	box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}
.login_popup_title_takeaway img{
	width: 48px;
}
.login_popup_top{
	font-size: var(--bigFont);
	padding: 20px;
}
.login_popup_top_item{
	display: flex;
	line-height: 48px;
}
.login_popup_top_item_img{
	padding-right: 10px;
}
.login_popup_top_item_other{
	justify-content: space-between;
}
.login_popup_top_item_right{
	padding-left: 18px;
	color: #666;
}
.login_popup_top_item_right_other{
	padding-left: 18px;
	width: 48px;
}
.login_popup_bottom_choose{
	text-align: center;
    background: linear-gradient(315deg, #ff4f18 0%, #f20000 100%);
    color: #fff;
    line-height: 68px;
    font-size: var(--superFont);
}
.login_popup_bottom_change{
	flex-basis: 50%; 
	text-align: center; 
	font-size: var(--superFont);
	background: linear-gradient(315deg, #539af2 0%, #539af2 100%); 
	color: #fff;
	line-height: 68px;
}
.login_popup_bottom_close{
	flex-basis: 50%; 
	text-align: center; 
	font-size: var(--superFont);
	background: linear-gradient(315deg, #72beb4 0%, #72beb4 100%); 
	line-height: 68px;
	color: #fff;
}
.login_popup_bottom_cancel{
	text-align: center; 
	font-size: var(--superFont); 
	background: linear-gradient(315deg, #fff 0%, #dedede 100%); 
	line-height: 68px;
	color: #666;
}
.login_popup_body_item{
	height: 68px;
	width: 68px;
	border-radius: 100%;
	border: 1px solid #eee;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 0 6px 2px #eee;
	margin: 8px;
}
.login_popup_body_item_actve{
	background-color: rgba(195, 13, 35, 1);
	color: #fff;
}
.login_popup_body{
	display: flex;
	flex-wrap: wrap;
	padding: 18px;
}
.login_stepper{
	width: 138px;
}
.login_stepper /deep/ span svg{
	width: 24px;
}
.login_stepper /deep/ input{
	font-size: 32px;
	font-family: initial;
}
.login_stepper /deep/ div{
	font-size: 32px;
	font-family: initial;
}
.login_merge_confirm{
	flex-basis: 50%;
	text-align: center;
    font-size: var(--superFont);
    background: linear-gradient(315deg, #f5ba41 0%, #ffba2d 100%);
    line-height: 68px;
    color: #fff;
}
.login_merge_cancel{
	flex-basis: 50%;
	background: linear-gradient(315deg, #fff 0%, #dedede 100%); 
	text-align: center; 
	font-size: var(--superFont);
	line-height: 68px; 
	color: #666;
}
.home_success{
	width: 300px;
	height: 250px;
}
</style>
