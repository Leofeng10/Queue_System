<template>
    <div id="pot">
        <HeadPart class="pot_top"/>
        <div style="height: 48px"></div>
        <div class="pot_body" ref="mainbody">
            <div class="pot_left">
                <!-- <div class="pot_left_top">
                    <nut-button class="pot_left_top_item" :type="potType != 1? 'dashed': null" @click="chooseThisPotType(1)">
                        {{lang==='en'? 'Single Pot': '单锅'}}
                    </nut-button>
                    <nut-button class="pot_left_top_item" :type="potType != 2? 'dashed': null" @click="chooseThisPotType(2)">
                        {{lang==='en'? 'Duo Pot': '鸳鸯锅'}}
                    </nut-button>
                    <nut-button class="pot_left_top_item" :type="potType != 4? 'dashed': null" @click="chooseThisPotType(4)">
                        {{lang==='en'? 'Four In One Pot': '四宫格'}}
                    </nut-button>
                </div> -->
                <div  style="display:flex;">
                     <div  v-for="item in potList" :key="item.name">
                         <nut-button class="pot_left_top_item" @click="chooseThisPotType(item.index)">
                            {{lang==='en'? item.name_en: item.name}}
                        </nut-button>
                    </div>

                </div>
               
                <div class="pot_left_center_base">
                    <div v-if="potType === 1" style="width: 100%; height: 100%;">
                        <!-- <img v-for="item in chooseSoup.filter((item,index) => index === 0)" :key="item._id" style="object-fit: cover; width: 100%; height: 100%;" :src="item.image | imgurl"> -->
                        <div v-for="item in chooseSoup.filter((item,index) => index === 0)" :key="item._id" style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background-color: #202a39;">
                            <div style="color: #fff; font-size: 24px; padding: 8px">
                                <div>
                                    {{lang==='ch'? item.name: item.name_eng}}
                                </div>
                                <div style="padding-top: 20px">
                                    $ {{item.typePrice || item.price}}
                                </div>
                            </div>
                        </div>                      
                    </div>
                    <div v-else-if="potType === 2" style="display: flex">
                        <div style="flex-basis: 50%; height: 360px;">
                            <div style="padding: 8px; color: #fff; font-size: 24px; background-color: #202a39; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                <div v-if="chooseSoup[0]">
                                    {{lang==='ch'? chooseSoup[0].name: chooseSoup[0].name_eng}}
                                </div>
                                <div v-if="chooseSoup[0]" style="padding-top: 20px">
                                    $ {{chooseSoup[0].typePrice || chooseSoup[0].price}}
                                </div>
                            </div>
                        </div>
                        <div style="flex-basis: 50%; height: 360px;">
                            <div style=" padding: 8px; color: #fff; font-size: 24px; background-color: #3c4e69; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                <div v-if="chooseSoup[1]">
                                    {{lang==='ch'? chooseSoup[1].name: chooseSoup[1].name_eng}}
                                </div>
                                <div v-if="chooseSoup[1]" style="padding-top: 20px">
                                    $ {{chooseSoup[1].typePrice || chooseSoup[1].price}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div style="display: flex">
                            <div style="flex-basis: 50%; height: 180px">
                                <div style="color: #fff; font-size: 24px; background-color: #202a39; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                    <div v-if="chooseSoup[0]" style="padding: 8px; ">
                                        <div>
                                            {{lang==='ch'? chooseSoup[0].name: chooseSoup[0].name_eng}}
                                        </div>
                                        <div style="padding-top: 20px">
                                            $ {{chooseSoup[0].typePrice || chooseSoup[0].price}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="flex-basis: 50%; height: 180px">
                                <div style="color: #fff; font-size: 24px; background-color: #3c4e69; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                    <div v-if="chooseSoup[1]" style="padding: 8px; ">
                                        <div>
                                            {{lang==='ch'? chooseSoup[1].name: chooseSoup[1].name_eng}}
                                        </div>
                                        <div style="padding-top: 20px">
                                            $ {{chooseSoup[1].typePrice || chooseSoup[1].price}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex">
                            <div style="flex-basis: 50%; height: 180px">
                                <div style="padding: 8px;color: #fff; font-size: 24px; background-color: #3c4e69; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                    <div style="padding: 8px; ">
                                        <div v-if="chooseSoup[2]">
                                            {{lang==='ch'? chooseSoup[2].name: chooseSoup[2].name_eng}}
                                        </div>
                                        <div v-if="chooseSoup[2]" style="padding-top: 20px">
                                            $ {{chooseSoup[2].typePrice || chooseSoup[2].price}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="flex-basis: 50%; height: 180px">
                                <div style="padding: 8px;color: #fff; font-size: 24px; background-color: #202a39; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                    <div style="padding: 8px; ">
                                        <div v-if="chooseSoup[3]">
                                            {{lang==='ch'? chooseSoup[3].name: chooseSoup[3].name_eng}}
                                        </div>
                                        <div v-if="chooseSoup[3]" style="padding-top: 20px">
                                            $ {{chooseSoup[3].typePrice || chooseSoup[3].price}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <nut-button style="background-color: rgb(60, 78, 105); color: #fff;" type="default" @click="reselectPot(item)">
                        {{lang === 'ch'? '重新选择' :'Reselect'}}
                    </nut-button>
                </div>
            </div>
            <div class="pot_right">
                <div v-for="item in soupList" :key="item._id" class="pot_right_item">
                    <div class="pot_right_item_left">
                        <div style="width: 200px; height: 200px; border-radius: 10px; overflow: hidden;">
                            <img style="object-fit: cover; width: 100%; height: 100%" v-if="item.image" :src="item.image | imgurl" :onerror="defaultImage">
                            <img style="object-fit: cover; width: 100%; height: 100%" v-else src="../../public/img/logo/login_row.png">
                        </div>
                    </div>
                    <div class="pot_right_item_right">
                        <div class="pot_right_item_right_top">
                            <div style="height: 76px; padding-top: 8px">
                                {{lang==='ch'? item.name: item.name_eng}}
                            </div>
                            <div style=" padding-bottom: 12px"></div>
                            <div style=" padding-bottom: 16px">
                                ${{item.typePrice || item.price}}
                            </div>
                        </div>
                        <div v-if="!isViewMode">
                            <nut-button class="pot_soup_botton" :type="chooseSoup.find(soup => soup === item)? null: 'dashed'" @click="choosePotMethod(item)">
                                <span v-if="chooseSoup.find(soup => soup === item)">{{lang==='en'?'Selected':'已选'}}</span>
                                <span v-else>{{lang==='en'?'Select':'选择'}}</span>
                            </nut-button>
                        </div>
                    </div>
                </div>
                <div style="height: 80px"></div>
            </div>
            <div v-if="!isViewMode" class="pot_bottom_bar">
                <div style="padding-top: 6px">
                    <img src="../../public/img/icons/cart.svg">
                </div>
                <div v-if="lang==='en'">
                    {{chooseSoup.length === 0? 'Select Soup Base': '$ ' + subTotal}}
                </div>
                 <div v-else>
                    {{chooseSoup.length === 0? '请选择汤底': '$ ' + subTotal}}
                </div>
                <div>
                    <nut-button block shape="circle" :disabled="chooseSoup.length === 0" @click="submitPot()">
                        {{lang==='en'? 'Order': '定制锅底'}}
                    </nut-button>
                </div>
            </div>
        </div>

        <nut-popup v-model="isConfirmPopup" style=" color: #666;" class="home_success">
			<div style="font-size: 18px">
				{{lang==='en'?'Soup Base':'火锅汤底'}}
			</div>
			<div style="padding: 18px;">
				<div style="display: flex; height: 38px; align-items: center; border-bottom: 1px solid #eee;">
					<div style="width: 138px">{{lang==='en'?'Name':'名称'}}</div>
					<div style="width: 68px">{{lang==='en'?'Price':'价格'}}</div>
				</div>
				<div style="height: 200px; overflow-x: hidden; overflow-y: auto;">
					<div v-for="item in chooseSoup" :key="item._id" style="display: flex; height: 28px; align-items: center;">
						<div style="width: 138px">{{item.name}}{{item.remark && '(' + item.remark + ')'}}</div>
						<div style="width: 68px">$ {{item.typePrice || item.price}}</div>
					</div>
				</div>
			</div>
			<div style="display: flex">
				<div style="margin: 0 10px">
					<nut-button type="light" @click="isConfirmPopup = false">{{lang==='en'?'Cancel':'取消'}}</nut-button>
				</div>
				<div style="margin: 0 10px">
					<nut-button @click="ThrottleSubmitPot()">{{lang==='en'?'Confirm':'确定'}}</nut-button>
				</div>
			</div>
		</nut-popup>

        <nut-popup v-model="isShowTastePopup" style="color: #666; width: 488px" class="home_success">
            <div style="font-size: var(--superFont); text-align: center; line-height: 48px">
                {{lang === 'en'?'Spicy Level' :'辣度'}}
            </div>
            <div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
                <div style="margin: 10px 0" v-for="item in tempSoupInfo.tasteArray" :key="item._id">
                    <nut-button style="width: 148px; font-size: var(--mainsize); border-radius: 10px; height: 52px" @click="chooseTasteMethod(item)">{{item.name_ch}}</nut-button>
                </div>
            </div>
        </nut-popup>
        <memberBox />
        <memberInfo/>
        <staffLogin />
    </div>
</template>
<script>
import axios from "axios";
import HeadPart from '../components/HeadPart'
import memberBox from '../components/Member'
import memberInfo from '../components/MemberInfo'
import staffLogin from '../components/StaffLogin'
import Throttle from  'lodash.throttle'

export default {
    components:{
        HeadPart,
        memberBox,
        staffLogin,
        memberInfo

    },
    mounted(){
        this.pageInitMethod()
        this.getpotList();
       console.log(this.potList)
    },
    computed:{
		lang(){
			return this.$store.state.language
        },
        isViewMode(){
			return this.$store.state.isViewMode
		},
        subTotal(){
            let total = 0
            // soupList
            console.log(111)
            console.log(this.chooseSoup)
            for (const soup of this.chooseSoup) {
                total += parseFloat(soup.typePrice) || parseFloat(soup.price)
            }
            return total.toFixed(2)
        }
	},
    data(){
        return{
            potType: 1,
            chooseSoup: [],
            soupList: [],
            isConfirmPopup: false,
            potImage: require('../../public/img/pot/pot1.jpg'),
            defaultImage: 'this.src="' + require('../../public/img/logo/login_row.png') + '"',
            isShowTastePopup: false,
            tempSoupInfo: {},
            // potList:[{name:"单锅",name_en:"single", index:1},{name:"双锅",name_en:"double", index:2},{name:"三锅",name_en:"three", index:3}]
            potList:[{name:"单锅", name_en:"Single Pot", index:1},{name:"鸳鸯锅", name_en:"Double Pot", index:2},{name:"四合一锅", name_en:"Four in one Pot", index:4}],
        }
    },
    methods:{
          async getpotList(){
            await this.$axios.post(this.$sysConfig.server + '/potType/getPot').then(doc=>{
                console.log(doc)
                this.potList = doc.data.doc
            }
            )
            console.log("here is the pot list" + this.potList)
        },












        async pageInitMethod(){
            try {
                await this.startLoading()
                await this.countMainBodyHeight()
                await this.getSoutList()
                await this.endLoading()
            } catch (error) {
                console.log('Catch an error while init page:' + error)
                await this.endLoading()
            }
            
        },
        ThrottleSubmitPot: Throttle(function(){
            this.submitOrder()
        }, 5000, {
            leading: true,
            trailing: false
        }),
        countMainBodyHeight(){
            return new Promise((reslove, reject) => {
				let sreenHeight = document.documentElement.clientHeight
				let mainImgHeight = sreenHeight - 48
				this.$refs.mainbody.style.height = mainImgHeight + 'px'
				reslove(true)
			})
        },
        chooseType(item, type){
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
        chooseThisPotType(num){
            this.potType = num
            console.log(this.soupList)
            this.chooseSoup = this.chooseSoup.filter((item, index) => index+1 <= num)
            if(num === 2){
                for (const soup of this.soupList) {
                    if(soup.type && soup.type.typeArray.length != 0){
                        let type = soup.type.typeArray.find(item => item.name_ch === item.name_en && item.name_ch == num)
                        console.log(type)
                        if(type){
                            this.$set(soup, 'typeId', type._id)
                            this.$set(soup, 'typeName_ch', type.name_ch)
                            this.$set(soup, 'typeName_en', type.name_en)
                            this.$set(soup, 'typePrice', type.price)
                        }else{
                            soup.typeId = null
                            soup.typeName_ch = null
                            soup.typeName_en = null
                            soup.typePrice = null
                        }
                    }
                }
            }else if(num === 4){
                for (const soup of this.soupList) {
                    if(soup.type && soup.type.typeArray.length != 0){
                        console.log(soup)
                        let type = soup.type.typeArray.find(item => item.name_ch === item.name_en && item.name_ch == num)
                        console.log(type)
                        if(type){
                            this.$set(soup, 'typeId', type._id)
                            this.$set(soup, 'typeName_ch', type.name_ch)
                            this.$set(soup, 'typeName_en', type.name_en)
                            this.$set(soup, 'typePrice', type.price)
                        }else{
                            soup.typeId = null
                            soup.typeName_ch = null
                            soup.typeName_en = null
                            soup.typePrice = null
                        }
                    }
                }
            }else{
                for (const soup of this.soupList) {
                    soup.typeId = null
                    soup.typeName_ch = null
                    soup.typeName_en = null
                    soup.typePrice = null
                    
                }
            }
        },
        choosePotMethod(item){
            if(this.chooseSoup.find(soup => soup === item)){
                this.needDeleteSoup(item)
            }else{
                this.needAddSoup(item)
            }
        },
        needDeleteSoup(item){
            if(this.potType > this.chooseSoup.length){
                this.chooseSoup.push(item)
            }
        },
        needAddSoup(item){
            if(this.chooseSoup.length < this.potType){
                if(item.tasteArray && item.tasteArray.length != 0){
                    this.openChooseTasteBox(item)
                    return
                }
                item.count = 1
                this.chooseSoup.push(item)
            }else{
                this.$notify.warn(this.lang === 'ch'? '请先取消已选汤底': 'Please cancel soup first')
            }
        },
        reselectPot(){
            this.chooseSoup = []
        },
        openChooseTasteBox(item){
            this.tempSoupInfo = item
            this.isShowTastePopup = true
        },
        chooseTasteMethod(taste){
            this.tempSoupInfo.remark = taste.name_ch
            this.tempSoupInfo.count = 1
            this.chooseSoup.push(this.tempSoupInfo)
            this.isShowTastePopup = false
        },
        submitPot(){
            if(this.potType > this.chooseSoup.length){
                if(this.lang === 'ch')this.$toast.fail(`请再选择${this.potType - this.chooseSoup.length}种汤底`);
                else this.$toast.fail(`Please select ${this.potType - this.chooseSoup.length} more soup base`);
            }else if(this.potType < this.chooseSoup.length){
                if(this.lang === 'ch')this.$toast.fail(`请删除${ this.chooseSoup.length - this.potType}种汤底`);
                else this.$toast.fail(`Please delete ${ this.chooseSoup.length - this.potType} soup base`);
            }else{
                this.isConfirmPopup = true
            }
        },
        async submitOrder(){
			try {
                let cookieId = this.$cookies.get('orderId')
                if(!cookieId){
                    this.$router.push('/login')
                }
                this.startLoading()
				let submitInfo = await this.$axios.post(this.$sysConfig.server + '/order/clientCreateOrder',{
                    "cartList": this.chooseSoup,
                    orderId: cookieId
				})
				if(submitInfo.data.code === 0){
                    this.orderHistory = submitInfo.data.orderHistory
                    this.$router.push('/')
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
                    this.$toast.fail(this.lang === 'ch'? '提交订单时服务器错误': 'Server error while submit order')
                }
                this.endLoading()
			} catch (error) {
                this.endLoading()
                console.log(error)
                let errorMessage = null
				if(this.lang === 'ch'){
					errorMessage = '提交订单时服务器错误:' + error
				}else{
					errorMessage = 'Server wrong while submit order:' + error
				}
				this.$toast.fail(errorMessage)
            }
        },
        async editOrder(){
            let orderId = localStorage.getItem('orderId')
            try {
                let chooseInfo = await this.$axios.post(this.$sysConfig.server + '/pad/choose',{
                    orderId: orderId,
                    potType: this.potType,
                    chooseSoup: this.chooseSoup,
                })
            } catch (error) {
                console.log(error)
                this.$toast.fail('修改订单时服务器错误:' + error)
            }
        },
        getSoutList(){
            return new Promise(async (resolve, reject) =>{
                try {
                    let isSoupBaseInfo = await this.$axios.get(this.$sysConfig.server + '/soup/')
                    if(isSoupBaseInfo.data.code === 200){
                        this.soupList = isSoupBaseInfo.data.result
                    }else{
                        this.$toast.fail('获取汤底时发生错误');
                    }
                    resolve(isSoupBaseInfo)
                } catch (error) {
                    console.log(error)
                    this.$toast.fail('获取汤底时服务器错误:' + error);
                    reject(error)
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
				this.toastLoading.hide();
				resolve(true)
			})	
		}
    }
}
</script>
<style scoped>
.pot_top{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
}
.pot_body{
    display: flex;
}
.pot_left{
    flex-basis: 55%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
}
.pot_left_top{
    display: flex;
}
.pot_left_top_item{
    margin: 0 8px;
}
.pot_left_center{
    width: 366px;
    height: 366px;
    padding-bottom: 28px;
}
.pot_left_center img{
    object-fit: cover;
    width: 100%;
    height: 100%;
}
.pot_right{
    flex-basis: 45%;
    overflow-x: hidden;
    overflow-y: scroll;
}
.pot_right_item{
    display: flex;
    padding: 18px;
}
.pot_right_item_left{
    width: 248px;
    height: 168px;
}
.pot_right_item_right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.pot_right_item_right_top{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.pot_bottom_bar{
    width: 392px;
    background-color: #202a39cc;
    color: #fff;
    position: fixed;
    bottom: 0;
    right: 0;
    height: 64px;
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.pot_soup_botton{
    width: 118px;
}
.pot_left_center_base{
    /* background-image: url(../../public/img/pot/base.jpg); */
    background-color: #202a39;
    width: 360px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    border-radius: 10px;
    overflow: hidden;
}
</style>