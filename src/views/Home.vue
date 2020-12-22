<template>
  <div id="home">
    <cube-page type="scroll-nav-side" title="ScrollNav">
      <div slot="content">
        <div class="view-wrapper">
          <!-- <cube-scroll-nav :side="true" :data="data" :current="current1" @change="changeHandler" @sticky-change="stickyChangeHandler"> -->
          <cube-scroll-nav
            :side="true"
            :data="categoryArray"
            :current="current"
            @change="changeHandler"
            @sticky-change="stickyChangeHandler"
          >
            <!-- <ul class="prepend-header" slot="prepend">
							轮播图
						</ul> -->
            <!-- <cube-scroll-nav-panel v-for="item in data" :key="item.name" :label="item.name" :title="item.name"> -->
            <cube-scroll-nav-panel
              v-for="item in categoryArray"
              :key="item.name"
              :label="item.name"
              :title="lang === 'en' ? item.name_eng : item.name"
            >
              <ul>
                <li v-for="(food, index) in item.foods" :key="index">
                  <nut-row type="flex" style="padding: 5px 20px">
                    <nut-col>
                      <div
                        style="width: 200px; height: 200px; border-radius: 10px; overflow: hidden;"
                      >
                        <img
                          style="object-fit: cover; width: 100%; height: 100%"
                          v-if="food.image"
                          :src="food.image | imgurl"
                          :onerror="defaultImage"
                        />
                        <img
                          style="object-fit: cover; width: 100%; height: 100%"
                          v-else
                          :src="food.image | imgurl"
                          :onerror="defaultImage"
                        />
                      </div>
                    </nut-col>
                    <nut-col>
                      <div style="padding-left: 18px;">
                        <div
                          style="height:66px; font-size: 22px; overflow: hidden;"
                        >
                          <span
                            style="color:#000000; word-break: break-word;"
                            >{{
                              lang === "en"
                                ? food.name_eng.length > 20
                                  ? ".."
                                  : food.name_eng
                                : food.name
                            }}</span
                          >
                          <!-- <p style="color:#000000">{{lang === 'en'? food.name_eng: food.name}}</p> -->
                        </div>
                        <div style="padding-bottom: 10px; font-size: 19px">
                          <b>$ {{ food.typePrice || food.price }}</b>
                        </div>
                        <div>
                          <div
                            v-if="food.type && food.type.typeArray.length != 0"
                            style="display: flex; justify-content: space-between;"
                          >
                            <nut-button
                              :type="food.typeId ? 'dashed' : null"
                              style="height: 38px; width: 58px; padding: 0; margin: 0 6px"
                              @click="chooseType(food)"
                            >
                              {{ lang === "en" ? "normal" : "普通" }}
                            </nut-button>
                            <nut-button
                              :type="food.typeId === type._id ? null : 'dashed'"
                              v-for="type in food.type.typeArray"
                              :key="type._id"
                              style="height: 38px; width: 58px; padding: 0; margin: 0 6px"
                              @click="chooseType(food, type)"
                            >
                              {{ lang === "ch" ? type.name_ch : type.name_en }}
                            </nut-button>
                          </div>
                        </div>
                        <div
                          v-if="!isViewMode"
                          style="display: flex; align-items: center;padding-top:18px"
                        >
                          <div v-if="food.isShow">
                            <nut-button
                              type="primary"
                              shape="circle"
                              icon="minus"
                              color="#fff"
                              @click="minusMethod(food)"
                            ></nut-button>
                          </div>
                          <div
                            v-else-if="systemInfo.restaurantType === 'normal'"
                          >
                            <nut-button
                              type="primary"
                              shape="circle"
                              icon="minus"
                              color="#fff"
                              @click="minusMethod(food)"
                            ></nut-button>
                          </div>
                          <div
                            style="width: 72px; text-align: center; font-size: 18px; font-weight: 700;"
                          >
                            {{ food.count || "" }}
                          </div>
                          <div v-if="food.isShow">
                            <nut-button
                              type="primary"
                              shape="circle"
                              icon="plus"
                              color="#fff"
                              @click="plusMethod(food)"
                            ></nut-button>
                          </div>
                          <div
                            v-else-if="systemInfo.restaurantType === 'normal'"
                          >
                            <nut-button
                              type="primary"
                              shape="circle"
                              icon="plus"
                              color="#fff"
                              @click="plusMethod(food)"
                            ></nut-button>
                          </div>
                        </div>
                      </div>
                    </nut-col>
                  </nut-row>
                </li>
                <li style="height: 100px"></li>
              </ul>
            </cube-scroll-nav-panel>
          </cube-scroll-nav>
        </div>
      </div>
    </cube-page>

    <div v-if="!isViewMode" class="home_bottom_bar">
      <div
        style="padding-top: 6px; display: flex; align-items: center; padding-left: 20px;"
        @click="openHistory()"
      >
        <div>
          <img src="../../public/img/icons/cart.svg" />
        </div>
        <div style="color: #fff; font-size: 24px; padding-left: 10px">
          <span style="font-size: 16px">$</span> {{ this.subTotal }}
        </div>
      </div>
      <div>
        <nut-button
          style="height:64px; width:150px; font-size: 22px;"
          :disabled="cart.length === 0"
          @click="submitPot()"
        >
          {{ lang === "en" ? "Order" : "去下单" }}
        </nut-button>
      </div>
    </div>

    <nut-popup v-model="isShowPopup" style="width: 480px" class="home_success">
      <div
        style="display: flex; justify-content: center; flex-direction: column; align-items: center;"
      >
        <div>
          <img style="width: 240px" src="../../public/img/pic/success.png" />
        </div>
        <div style="font-size: 22px; font-weight: 700; padding: 38px 0;">
          {{ lang === "en" ? "Order Success" : "下单成功" }}
        </div>
        <div style="padding-bottom: 10px">
          <nut-button @click="isShowPopup = false">{{
            lang === "en" ? "Confirm" : "确定"
          }}</nut-button>
        </div>
        <div>
          <img style="width: 120px" src="../../public/img/logo/login_row.png" />
        </div>
      </div>
    </nut-popup>

    <nut-popup
      v-model="isConfirmPopup"
      style=" color: #666;"
      class="home_success"
    >
      <div style="font-size: 22px; padding-left: 18px">
        {{ lang === "en" ? "Cart" : "购物车" }}
      </div>
      <div style="padding: 18px;">
        <div
          style="display: flex; height: 38px; align-items: center; border-bottom: 1px solid #eee;"
        >
          <div style="width: 168px">{{ lang === "en" ? "Name" : "名称" }}</div>
          <div style="width: 68px">{{ lang === "en" ? "Per" : "单价" }}</div>
          <div style="width: 68px">{{ lang === "en" ? "Qty" : "数量" }}</div>
          <div style="width: 68px">{{ lang === "en" ? "Price" : "价格" }}</div>
          <div style="width: 24px"></div>
        </div>
        <div style="height: 200px; overflow-x: hidden; overflow-y: auto;">
          <div
            v-for="item in cart"
            :key="item._id"
            style="display: flex; height: 28px; align-items: center;"
          >
            <div style="width: 168px">
              {{ lang === "en" ? item.name_eng : item.name }}
              {{
                item.typePrice &&
                  (lang === "en"
                    ? "- " + item.typeName_en
                    : "- " + item.typeName_ch)
              }}
            </div>
            <div style="width: 68px">$ {{ item.typePrice || item.price }}</div>
            <div style="width: 68px">{{ item.count }}</div>
            <div style="width: 68px">
              $
              {{
                (
                  Math.round(
                    item.count * parseFloat(item.typePrice || item.price) * 100
                  ) / 100
                ).toFixed(2)
              }}
            </div>
            <div style="width: 36px" @click="deleteProduct(item)">
              <div class="icon_delete"></div>
            </div>
          </div>
        </div>
        <div
          style="display: flex; height: 38px; align-items: center; border-top: 1px solid #eee; justify-content: space-between;"
        >
          <div style="font-weight: 700;">
            {{ lang === "en" ? "Total" : "合计" }}
          </div>
          <div style="font-weight: 700;">
            <span style="font-size: 16px;font-weight: 700;">$ </span>
            <span style="font-size: 24px;font-weight: 700; color: #f0250f">{{
              (Math.round(parseFloat(subTotal) * 100) / 100).toFixed(2)
            }}</span>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-around;">
        <div style="margin: 0 10px">
          <nut-button type="light" @click="isConfirmPopup = false">{{
            lang === "en" ? "Cancel" : "取消"
          }}</nut-button>
        </div>
        <div style="margin: 0 10px">
          <nut-button @click="ThrottleSubmitOrder()">{{
            lang === "en" ? "Confirm" : "确定"
          }}</nut-button>
        </div>
      </div>
    </nut-popup>

    <nut-popup
      position="right"
      v-model="showHistory"
      style="width: 348px; height: 100%; overflow: hidden;"
    >
      <div
        style="height： 64px; background-color: #202a39; color: #fff; font-size: 18px;line-height: 64px;padding-left: 18px"
      >
        {{ lang === "en" ? "Order History" : "历史订单" }}-{{ orderInfo.table }}
      </div>
      <div
        style="padding: 10px 0; overflow-x: hidden; overflow-y: auto"
        ref="historycenter"
      >
        <div v-for="(item, index) in orderInfo.orderContent" :key="item._id">
          <div
            style="background-color: #efeff4;; color: #666; line-height: 32px; padding-left: 10px"
          >
            {{ index + 1 }} {{ lang === "en" ? "Order Time" : "下单时间" }}
            {{ new Date(item.createDate).toLocaleTimeString() }}
          </div>
          <div style="padding: 0 10px ">
            <div
              v-for="(product, productIndex) in item.productList"
              :key="product._id"
              style="display: flex; color: #666; font-size: 14px; line-height: 32px;"
            >
              <div style="width: 48px">
                {{ index + 1 }}.{{ productIndex + 1 }}
              </div>
              <div style="width: 118px">
                {{
                  lang === "en" ? product.productName_en : product.productName
                }}
                {{
                  product.typePrice &&
                  product.typeName_ch != product.typeName_en
                    ? lang === "en"
                      ? "- " + product.typeName_en
                      : "- " + product.typeName_ch
                    : ""
                }}
              </div>
              <div style="width: 48px">
                {{ product.orderQty }}
              </div>
              <div style="width: width: 68px;">$ {{ product.subtotal }}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        style="height: 64px; background-color: #202a39; color: #fff; font-size: 18px;line-height: 64px;padding-right: 18px; text-align: right; position: abso; font-weight: 700;"
      >
        TOTAL ${{ (Math.round(orderInfo.tempTotal * 100) / 100).toFixed(2) }}
      </div>
    </nut-popup>

    <memberBox />
    <memberInfo />
    <staffLogin />
  </div>
</template>

<script type="text/ecmascript-6">
import CubePage from '../components/CubePage'
import goodsData from '../../public/example/goods-list.json'
import memberBox from '../components/Member'
import memberInfo from '../components/MemberInfo'
import staffLogin from '../components/StaffLogin'
import Throttle from  'lodash.throttle'

let goods = goodsData.goods

export default {
    components: {
	  CubePage,
	  memberBox,
	  staffLogin,
	  memberInfo
	},
	computed:{
		lang(){
			return this.$store.state.language
		},
		isViewMode(){
			return this.$store.state.isViewMode
		},
		cart(){
			let cartArray = []
			this.subTotal = 0
			if(this.categoryArray.length != 0){
				this.categoryArray.forEach(item =>{
					if(item.foods && item.foods.length != 0){
						let array = item.foods.filter(food => food.count > 0)
						if(array.length != 0){
							cartArray = cartArray.concat(array)
						}
					}
				})
				let result = []
				let obj = {}
				for (let i of cartArray) {
					if(!obj[i._id]){
						this.subTotal += i.count * parseFloat(i.typePrice || i.price)
						result.push(i)
						obj[i._id] = 1
					}
				}
				this.subTotal = this.subTotal.toFixed(2)
				cartArray = result
			}
			return cartArray
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
	mounted(){
		this.pageInitMethod()
	},
    data() {
		return {
			data: goods,
			current1: null,
			current: null,
			isShowPopup: false,
			toastLoading: null,
			categoryArray: [],
			isConfirmPopup: false,
			subTotal: 0,
			defaultImage: 'this.src="' + require('../../public/img/logo/login_row.png') + '"',
			showHistory: false,
			orderHistory: [],
			orderInfo:{}
		}
    },
    methods: {
		async pageInitMethod(){
			await this.startLoading()
			await this.checkIsViewMode()
			await this.checkCookieAndGetOrder()
			await this.countMainImgHeight()
			await this.getCategory()
			await this.getFoods()
			await this.getOnlyInBuffetSet()
			await this.endLoading()
		},
		ThrottleSubmitOrder: Throttle(function(){
            this.submitOrder()
        }, 5000, {
            leading: true,
            trailing: false
        }),
		getOnlyInBuffetSet(){
			try{
				for (const value of this.categoryArray) {
					for (const item of value.foods) {
						if(item.chooseBuffetSetList.length!=0){
							for (const ele of item.chooseBuffetSetList) {
								if(ele===this.orderInfo.buffetSetInfo._id){
									console.log(item.name_eng)
									// item.isShow = true
									this.$set(item, 'isShow', true)
								}
							}
							console.log(item)
						}
					}
				}
				console.log("here")
				console.log(this.orderInfo)
				console.log(this.categoryArray)
			}
			catch(er){
				console.log("e" + er)
			}
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
				this.toastLoading.hide();
				resolve(true)
			})
		},
		checkIsViewMode(){
			return new Promise( resolve => {
				if(this.$route.params.isViewMode){
					this.$store.dispatch('setViewMode', true)
				}
				resolve(true)
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
							console.log('orderinfo')
							console.log(orderInfo)
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
		countMainImgHeight(){
			return new Promise((reslove, reject) => {
				let sreenHeight = document.documentElement.clientHeight
				let mainImgHeight = sreenHeight - 148
				this.$refs.historycenter.style.height = mainImgHeight + 'px'
				reslove(true)
			})
		},
		getCategory(){
			return new Promise( async (resolve, reject) => {
				try {
					let categoryInfo = await this.$axios.post(this.$sysConfig.server + '/category/get')
					let categoryList = []
					if(categoryInfo.data.code === 0){
						categoryList = categoryInfo.data.doc
						this.categoryArray = categoryList.filter(item => !item.isSoupBase)
						for (const value of this.categoryArray) {
							if(value.foods){
								console.log("have")
							}
							else{
								console.log("no")
							}
						}
					}else{
						this.$toast.fail('获取产品分类失败')
					}
					resolve(categoryList)
				} catch (error) {
					console.log(error)
                	this.$toast.fail('获取产品分类时服务器错误:' + error)
				}
			})
		},
		openHistory(){
			this.orderInfo.tempTotal = 0
			if(this.orderInfo.orderContent && this.orderInfo.orderContent.length != 0){
				for (const orders of this.orderInfo.orderContent) {
					for (const product of orders.productList) {
						this.orderInfo.tempTotal += product.subtotal
					}
				}
				this.orderInfo.tempTotal.toFixed(2)
			}
			this.showHistory = true
		},
		deleteProduct(food){
			this.$createDialog({
                type: 'confirm',
                icon: 'cubeic-alert',
                title: this.lang === 'ch'? '删除产品': 'Delete Product',
				content: this.lang === 'ch'? '是否删除该产品？': 'Do you confirm delete this product?',
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
                    this.categoryArray.forEach(element => {
						let tempFood = element.foods.find(item => item._id === food._id)
						if(tempFood){
							tempFood.count = 0
						}
					});
                }
            }).show()
		},
		getFoods(){
			return new Promise( async (resolve, reject) => {
				try {
					if(this.categoryArray.length != 0){
						let foodsAction = this.categoryArray.map(cate =>{
							return new Promise( async resolve =>{
								let foods = await this.$axios.post(this.$sysConfig.server + '/product/getByCategory',{
									category: cate._id
								})
								if(foods.data.code === 0){
									foods.data.doc.forEach(item =>{
										item.count = 0
									})
								}

								this.$set(cate,'foods', foods.data.doc)
								resolve(foods)
							})
						})
						let allActions = await Promise.all(foodsAction)
						console.log(this.categoryArray)
						resolve(allActions)
					}
				} catch (error) {
					console.log(error)
                	this.$toast.fail('获取产品时服务器错误:' + error)
				}
			})
		},
		chooseType(item, type){
			console.log(item)
			console.log(type)
			if(type){
                this.$set(item, 'typeId', type._id)
                this.$set(item, 'typeName_ch', type.name_ch)
                this.$set(item, 'typeName_en', type.name_en)
                this.$set(item, 'typePrice', type.price)
            }else{
                item.typeId = null
                item.typeName_ch = null
                item.typeName_en = null
                item.typePrice = null
            }
		},
		plusMethod(food){
			if(!food.count){
				this.categoryArray.forEach(element => {
					if(element.foods){
						let tempFood = element.foods.find(item => item._id === food._id)
						if(tempFood){
							tempFood.count = 1
							this.$set(tempFood, 'count', 1)
						}
					}
				});
			}else{
				this.categoryArray.forEach(element => {
					let tempFood = element.foods.find(item => item._id === food._id)
					if(tempFood){
						console.log(tempFood)
						tempFood.count += 1
					}
				});
			}
		},
		submitPot(){
			console.log(this.categoryArray)
			this.isConfirmPopup = true
		},
		async submitOrder(){
			if(this.cart && this.cart.length === 0){
				this.isConfirmPopup = false
				return
			}
			await this.startLoading()
			try {
				let cookieId = this.$cookies.get('orderId')
				console.log(this.cart)
				let submitInfo = await this.$axios.post(this.$sysConfig.server + '/order/clientCreateOrder',{
					"cartList": this.cart,
					orderId: cookieId
				})
				if(submitInfo.data.code === 0){
					this.orderInfo.orderContent = submitInfo.data.orderHistory
					this.isShowPopup = true
					this.isConfirmPopup = false
					// remove cart number
					for (const category of this.categoryArray) {
						if(category.foods){
							for (const food of category.foods) {
								food.count = 0
							}
						}
					}
					setTimeout(() => {
						this.isShowPopup = false
					}, 4000);
				}else if(submitInfo.data.code === 5){
					this.isConfirmPopup = false
					this.$createDialog({
						type: 'alert',
						title: this.lang === 'ch'? '提示': 'Tips',
						content: this.lang === 'ch'? '订单状态变更,请重新登录': 'Order status changed, please login again',
						icon: 'cubeic-alert',
						zIndex: 3000,
						onConfirm: () => {
							this.$router.push('/login')
						},
					}).show()
				}else if(submitInfo.data.code === 10){
					this.$createDialog({
						type: 'alert',
						title: this.lang === 'ch'? '订单关闭': 'Order closed',
						content: this.lang === 'ch'?'用餐时间已过,请到吧台结账.': 'Dear Customer, your dining time has ended. Please proceed to cashier for payment.',
						icon: 'cubeic-alert',
						zIndex: 3000,
						onConfirm: () => {
							this.$router.push('/login')
						},
					}).show()
				}else{
					this.$toast.fail(this.lang === 'ch'?'订单状态错误,请重新登录': 'Order status wrong, please login again')
				}
			} catch (error) {
				console.log(error)
				let errorMessage = null
				if(this.lang === 'ch'){
					errorMessage = '提交订单时服务器错误:' + error
				}else{
					errorMessage = 'Server wrong while submit order:' + error
				}
				this.$toast.fail(errorMessage)
			}
			await this.endLoading()
		},
		minusMethod(food){
			if(food && food.count && food.count > 0){
				this.categoryArray.forEach(element => {
					let tempFood = element.foods.find(item => item._id === food._id)
					if(tempFood){
						console.log(tempFood)
						tempFood.count -= 1
					}
				});
			}
		},
		changeHandler(label) {
			console.log('changed to:', label)
			this.current = label
		},
		stickyChangeHandler(current) {
			console.log('sticky-change', current)
		}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .scroll-nav-side
    background-color: #fff
    .view-wrapper
      position: fixed
      top: 64px
      left: 0
      bottom: 0
      width: 100%
    .prepend-header
      width: 90%
      margin: 20px auto
      text-align: center
      font-size: 20px
      line-height: 1.6
      border-radius: 2px
      box-shadow: 0 0 4px rgba(0, 0, 0, .2)
    .cube-scroll-nav-main
      background-color: #2B3543
    .cube-sticky-fixed
      background-color: #2B3543
    .cube-scroll-nav-bar
      width: 200px
      background-color: transparent
      .cube-scroll-wrapper
       width: 100%
    .cube-scroll-nav-bar-item
      padding: 10px 15px
      height: 40px
      font-size: 18px
      line-height: 40px
      color: #fff
    .cube-scroll-nav-bar-item_active
      background-color: #f0250f
    .cube-scroll-nav-panels
      background-color: #fff
    .cube-scroll-nav-panel
      img
        width: 158px
        height: 158px
      ul
        overflow: hidden
        font-size: 14px
        line-height: 1.4
        color: #666
      li
        float: left
        width: 50%
        div
          p
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
    .cube-scroll-nav-panel-title
      padding: 15px
      font-size: 16px
      background-color: #f2f2f2
      color: #7f7f7f
      font-weight: 700
.home_success
 display: flex
 flex-direction:column
 padding: 18px
.home_bottom_bar
 height: 64px
 position: fixed
 bottom: 0
 right: 0
 z-index: 10
 display: flex
 background-color: #202a39cc;
 align-items: center
 width: 400px
 justify-content: space-between
</style>
