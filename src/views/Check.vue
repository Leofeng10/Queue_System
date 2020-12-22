<template>
    <div id="check">
        <div class="check_title">
            <div class="icon_quit" @click="quitThisTable()"></div>
            <div>{{tableName}}</div>
            <div class="icon_delete" @click="closeCheckPage()"></div>
        </div>
        <div style="height: 64px"></div>
        <div class="check_body">
            <div class="check_body_item" :class="{check_body_item_active: isCheckProduct && item.checked,
            check_body_item_call: callProduct && item.checked}" 
            v-for="item in historyList" :key="item._id" @click="touchMethod(item)">
                <div style="flex-basis: 10%;"><div v-if="item.checked" class="icon_check"></div></div>
                <div style="flex-basis: 35%;">{{item.productName}}{{item.typeName_ch}}</div>
                <div style="flex-basis: 35%;">{{item.productName_en}}{{item.typeName_en}}</div>
                <div style="flex-basis: 10%;">{{item.orderQty}}</div>
                <div style="flex-basis: 10%;">$ {{item.subtotal}}</div>
            </div>
             <div style="height: 64px"></div>
        </div>
       
        <div class="check_button_frame">
            <nut-button class="check_button" :type="reduceProduct? 'light': null" @click="reduceProductMethod()">
                {{lang==='en'?'Reduce':'-1'}}
            </nut-button>
            <nut-button class="check_button" :type="callProduct? 'light': null" @click="callProductMethod()">
                {{lang==='en'?'Call':'催菜'}}
            </nut-button>
            <nut-button class="check_button" :type="isCheckProduct? 'light': null" @click="startEndCheckProduct()">
                {{lang==='en'?'Check':'对菜'}}
            </nut-button>
        </div>
    </div>
</template>

<script>
import headPage from '../components/HeadPart'

export default {
    components:{
        headPage
    },
    computed:{
		lang(){
			return this.$store.state.language
        },
        staffInfo(){
            return this.$store.state.staffInfo
        },
        tableName(){
            return localStorage.getItem('tableName')
        }
    },
    mounted(){
        this.pageInitMethod()
    },
    data(){
        return{
            orderInfo: null,
            toastLoading: null,
            historyList: [],
            isCheckProduct: false,
            callProduct: false,
            reduceProduct: false
        }
    },
    methods:{
        async pageInitMethod(){
            await this.startLoading()
            await this.checkCookieAndGetOrder()
            await this.sortHistory()
            await this.endLoading()
        },
        startLoading(){
			return new Promise( resolve =>{
				this.toastLoading = this.$toast.loading(this.loadingText,{
					coverColor: "rgba(0,0,0,0.5)"
				})
				resolve(this.toastLoading)
			})	
		},
        checkCookieAndGetOrder(){
			return new Promise(async resolve => {
				if(!this.isViewMode){
					let cookieId = this.$cookies.get('orderId')
					if(!cookieId){
						await this.endLoading()
						this.$router.push('/login')
					}else{
						try {
							let orderInfo = await this.$axios.post(this.$sysConfig.server + '/order/',{
								orderId: cookieId
							})
							if(orderInfo.data.code === 0){
								this.orderInfo = orderInfo.data.doc
							}else{
								this.$toast.fail('获取订单失败')
							}
						} catch (error) {
							console.log(error)
							this.$toast.fail('获取订单时服务器错误:' + error)
						}
					}
				}
				resolve(true)
			})
        },
        sortHistory(){
            return new Promise(async resolve => {
                this.historyList = []
                if(this.orderInfo.orderContent.length != 0){
                    for (let i of this.orderInfo.orderContent) {
                        for (let product of i.productList) {
                            product.contentId = i._id
                            this.historyList.push(product)
                        }
                    }
                }
                console.log(this.historyList)
                resolve(true)
            })
        },
		endLoading(){
			return new Promise( resolve =>{
				this.toastLoading.hide();
				resolve(true)
			})	
        },
        startEndCheckProduct(){
            this.callProduct = false
            this.reduceProduct = false
            this.isCheckProduct = !this.isCheckProduct
        },
        touchMethod(item){
            if(this.isCheckProduct){
                this.checkUncheckProduct(item)
            }else if(this.callProduct){
                this.callThisProduct(item)
            }else if(this.reduceProduct){
                this.reduceThisProduct(item)
            }
        },
        async checkUncheckProduct(item){
            if(!this.isCheckProduct){
                return
            }
            if(!this.orderInfo){
                this.$toast.fail('获取订单信息失败,请刷新重试')
                return
            }
            try {
                item.checked = !item.checked
                let checkInfo = await this.$axios.post(this.$sysConfig.server + '/order/check',{
                    orderId: this.orderInfo._id,
                    productId: item._id,
                    checked: item.checked
                })
                if(checkInfo.data.code === 200){
                    console.log('done')
                }else{
                    this.$toast.fail('划单时出现错误')
                }
            } catch (error) {
                this.$toast.fail('划单时服务器错误:' + error)
            }
        },
        callProductMethod(){
            this.isCheckProduct = false
            this.reduceProduct = false
            this.callProduct = !this.callProduct
        },
        async callThisProduct(item){
            console.log(item)
            if(item.checked){
                return
            }
            this.$createDialog({
                type: 'confirm',
                icon: 'cubeic-alert',
                title: this.lang === 'ch'? '催菜': 'Call',
				content: this.lang === 'ch'? '是否催菜？': 'Do you confirm to call?',
				zIndex: 3900,
                confirmBtn: {
                    text: this.lang === 'ch'? '确定': 'Confirm',
                    active: true
                },
                cancelBtn: {
                    text: this.lang === 'ch'? '取消': 'Cancel',
                    active: false
                },
                onConfirm: async () => {
                    let productList = [item]
                    console.log(this.orderInfo)
                    let callInfo = await this.$axios.post(this.$sysConfig.server + '/order/call',{
                        "cartList": productList,
                        table: this.orderInfo.table
                    })
                    console.log(callInfo)
                    if(callInfo.data.code === 200){
                        this.$toast.success('催菜成功')
                    }
                }
            }).show()
        },
        closeCheckPage(){
            this.$router.push('/')
        },
        quitThisTable(){
            this.$createDialog({
                type: 'confirm',
                icon: 'cubeic-alert',
                title: this.lang === 'ch'? '退出餐桌': 'Quit table',
				content: this.lang === 'ch'? '是否退出餐桌？': 'Do you confirm quit this table?',
				zIndex: 3900,
                confirmBtn: {
                    text: this.lang === 'ch'? '确定': 'Confirm',
                    active: true
                },
                cancelBtn: {
                    text: this.lang === 'ch'? '取消': 'Cancel',
                    active: false
                },
                onConfirm: () => {
                    localStorage.removeItem('memberInfo')
                    this.$store.dispatch('setMember', {})
                    this.$router.push('/login')
                }
            }).show()
        },
        reduceProductMethod(item){
            this.callProduct = false
            this.isCheckProduct = false
            this.reduceProduct = !this.reduceProduct
        },
        async reduceThisProduct(item){
            if(item.checked)return
            if(item.orderQty -1 < 0) return
            if(!this.staffInfo || !this.staffInfo.userName){
                this.$toast.fail('员工登录信息错误')
                this.$router.push('/login')
            }
            this.$createDialog({
                type: 'confirm',
                icon: 'cubeic-alert',
                title: this.lang === 'ch'? '产品减一': 'Reduce product',
				content: this.lang === 'ch'? '是确定减少产品？': 'Do you confirm reduce this product?',
				zIndex: 3900,
                confirmBtn: {
                    text: this.lang === 'ch'? '确定': 'Confirm',
                    active: true
                },
                cancelBtn: {
                    text: this.lang === 'ch'? '取消': 'Cancel',
                    active: false
                },
                onConfirm: async () => {
                    item.orderQty -= 1
                    console.log(this.staffInfo)
                    try {
                        let reduceInfo = await this.$axios.post(this.$sysConfig.server + '/order/control_del',{
                            "orderId": this.orderInfo._id,
                            "userName": this.staffInfo.userName,
                            "product_id": item._id,
                            "list_id": item.contentId
                        })
                        console.log(reduceInfo)
                        if(reduceInfo.data.code === 0){
                            this.$toast.success('删减产品成功')
                        }else{
                            this.$toast.fail('删减产品失败')
                        }
                    } catch (error) {
                        this.$toast.fail('删减产品时服务器错误:' + error)
                    }
                }
            }).show()
        }
    }
}
</script>

<style scoped>
.check_title{
	background-color: #202a39;
	display: flex;
	justify-content: space-between;
	height: 64px;
	align-items: center;
    color: #fff;
    padding: 0 20px;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    font-size: var(--superFont);
}
.check_body{
    padding: 10px 0;
}
.check_body_item{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 42px;
    padding: 0 10px;
}
.check_button{
    height:48px; 
    width:108px; 
    font-size: 18px; 
    padding: 0
}
.check_button_frame{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    background-color: rgba(32,42,57,0.8);
    height: 64px;
    align-items: center;
}
.check_body_item_active{
    background: linear-gradient(315deg, #ecef47 0%, #f1d5d5 100%);
}
.check_body_item_call{
    background-color: #ccc;
    color: #f7f7f7;
}
</style>