<template>
  <div class="memberinfopage">
    
    <div class="title">
      <div class="gift_title_left" @click="goBackMethod()"  style="color: white; padding: 20px 60px 20px 60px;">
        {{ lang === "ch" ? "返回" : "Back" }}
      </div>
      <div style="font-size: x-large; color: white;">{{ lang === "ch" ? "个人中心" : "Member" }}</div>
      <div style="color: white; padding: 20px 60px 20px 60px; " @click = "changeLanguageMethod()">{{ lang === "ch" ? "Language" : "中文" }}</div>
    </div>
   
    
    
    <div style=" margin-top: 60px;">
        <div style="display: flex; margin-left: 30%; width: 100%;" >
            <div style="display: flex; justify-content: center; height: 38px">
                <div style="width: 128px; display: flex; align-items: center;">
                  <div class="icon_phone"></div>
                  <div style="padding-left: 12px; font-size: large;">{{ lang === "ch" ? "电话号码 " : "Phone" }}:</div>
                </div>
                <div style="width: 98px; line-height: 38px; font-size: large;">
                  {{ memberInfo.phone }}
                </div>
                
            </div>
            
            <div style="display: flex; justify-content: center; ">
                <div style="width: 128px; display: flex; align-items: center;">
                  <img
                    style="width: 28px;padding-bottom: 10px"
                    src="../../public/img/icons/my/coin.svg"
                  />
                  <div style="padding-left: 10px; padding-bottom: 10px; font-size: large;">{{ lang === "ch" ? "会员积分 " : "Integral" }}:</div>
                </div>
                <div style="width: 98px; line-height: 38px; padding-bottom: 10px; font-size: large;">
                  {{ memberInfo.integral }} 
                </div>
            </div>
            
        </div>
    
        <div style="">
            <div style="display: grid; grid-template-columns: 50% 50%; width: 600px; margin-top: 10px; margin-left: 200px; background-color: white; padding: 20px; border: black 1px solid;">
                <div
                  style="border-right: 1px solid rgba(0,0,0,0.2); text-align: center; font-size: x-large;"
                  :class="{ active: point }"
                  @click="changePageMethod('integral')"
                >
                  {{ lang === "ch" ? "我的积分" : "INTEGRAL" }}
                </div>
                <div :class="{ active: !point }" @click="changePageMethod()" style="text-align: center; font-size: x-large;">
                  {{ lang === "ch" ? "我的订单" : "HISTORY" }}
                </div>
            </div>
        </div>
            
    </div>
    
   
    
   
    
    
    
    <div style="margin-top: 20px; ">
        
        <div v-if="point">
            <div
              style="display: grid;grid-template-columns:50% 50%; width: 100%; height: 49px;align-items: center; margin-bottom: 10px;"
            >
              <div
                :style="record ? recordAndRedeemTrue : recordAndRedeemFalse"
                @click="record = true"
              >
                {{ lang === "ch" ? "积分记录" : "RECORD" }}
              </div>
              <div
                :style="record ? recordAndRedeemFalse : recordAndRedeemTrue"
                @click="record = false"
              >
                {{ lang === "ch" ? "积分兑换" : "CHANGE" }}
              </div>
            </div>
            




            <div v-if="record" style="background-color: white;min-height: 400px;border-radius: 0 0 6px 6px; ">
                    <div v-for="item in integralList"
                  :key="item._id"
                  class="gift_integral_item"
                >
                  <div style="text-align: left;">
                    <div style="font-size: 14px;">
                      {{ lang === "ch" ? "积分变更" : "Change" }}
                    </div>
                    <div style="font-size: 10px;color: #9e9e9e;">
                      {{ item.date }}
                    </div>
                  </div>
                  <div style="color: orange;font-size: 15px;">
                    +{{ item.integral }}
                  </div>
                  
                </div>
                <div class="footer" style="display: footerdisplay; text-align: center;" >----{{lang === "ch" ? "以上是全部记录" : "Nothing More"}}----</div>
              </div>
            </div>
        </div>

        <div
            class="memberinfo-orderlist"
          v-if="!point"
          style="background-color: white; margin-top: 20px; padding:20px"
        >
          
            <ul class="list">
              <li class="list-item" v-for="item in orderList" :key="item">
                <div
                  style="display: flex;justify-content: space-between;align-items: flex-start; border-bottom: black 1px solid;"
                >
                  <div style="text-align: left;">
                    <div>{{ lang === "ch" ? "订单编号" : "Order" }}: {{ item.orderStr }}</div>
                    <div
                        style="font-size: 10px;color: #8c8c8c;margin-top: 6px;"
                    >
                      {{ new Date(item.createDate).toLocaleDateString() }}
                      {{ new Date(item.createDate).toLocaleTimeString() }}
                    </div>
                  </div>
                  <div v-if="item.status === '3'" style="color: #8dc636; margin-top: 5px;">
                    {{ lang === "ch" ? "已完成" : "Closed" }}
                  </div>
                  <div v-else style="color: #f8ae4c;">
                    {{ lang === "ch" ? "用餐中" : "Eating" }}
                  </div>
                </div>
                <div style="text-align: right;">
                  {{ item.countProduct }} Products，Total${{ item.total || 0 }}
                </div>
              </li>
            </ul>
            <div v-if="this.OrderorderNum > this.pageNow * this.pageNow"style="margin-left: 45%; width:100px;padding:0px; background-color: rgb(237, 245, 245); padding:10px 5px 10px 5px" @click="getMyOrderMethod()">{{ lang === "ch" ? "下滑加载更多" : "More" }}</div>
         
        </div>

    </div>
    
      
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      point: false,
      record: true,
      point: false,
      logoUrl: null,
      orderList: [],
      integralList: [],
      orderNum: 0,
      OrderorderNum: 0,
      data: [],
      pageNow: 1,
      pageSize: 10,
      footerdisplay:'none',
      
    };
  },
  created(){
    this.pageInitMethod();
    // this.scroll();
  },
  mounted() {
    this.scroll();
    this.getMyOrderMethod();
  },
  computed: {
    lang() {
      return this.$store.state.language;
    },
    recordAndRedeemTrue() {
      return {
        color: "#da0822",
        height: "100%",
        "background-color": "white",
        "border-radius": "10px 10px 0 0 ",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      };
    },
    recordAndRedeemFalse() {
      return {
        height: "100%",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      };
    },
    memberInfo() {
      return this.$store.state.memberInfo;
    },
      
  },
  methods: {
    
    changeLanguageMethod(){
            if(this.lang === 'en'){
                this.$store.dispatch('setLanguage', 'ch')
                localStorage.setItem('language','ch')
            }else{
                this.$store.dispatch('setLanguage', 'en')
                localStorage.setItem('language','en')
            }
		},
    goBackMethod() {
      this.$router.push("/");
    },
    pageInitMethod() {
      let localMemberInfo = localStorage.getItem("memberInfo");
      
      if (localMemberInfo) {
        localMemberInfo = JSON.parse(localMemberInfo);
        this.memberInfo.integral = localMemberInfo.integral;
        this.memberInfo.name = localMemberInfo.name;
        this.memberInfo.phone = localMemberInfo.phone;
        this.memberInfo.id = localMemberInfo.id
      }
      
    },
    changePageMethod(item) {
      if (item === "integral") {
        this.point = true;
        this.getMyIntegralHistoryMethod();
      } else {
        this.point = false;
        this.getMyOrderMethod();
      }
    },


    async getMyIntegralHistoryMethod() {
      
      let integralInfo = await axios.post(
        this.$sysConfig.server + "/member/integralLog",
        {
          userId: this.memberInfo.id,
          pageNow: this.pageNow,
          pageSize: this.pageSize,
        }
      );
      if (integralInfo.data.code === 200) {
        this.integralList = integralInfo.data.result;
        
        console.log(this.integralList)
        this.orderNum = this.integralList.length;
        console.log(this.orderNum)
      }
	},

    async getMyOrderMethod() {
      
      let orderInfo = await axios.post(
        this.$sysConfig.server + "/member/order",
        {
          userId: this.memberInfo.id,
          pageNow: this.pageNow,
          pageSize: this.pageSize,
        }
	  );
      if (orderInfo.data.code === 200) {
        for(let i = 0; i < orderInfo.data.result.length; i ++){
            this.orderList.push(orderInfo.data.result[i]);
        }
        console.log(this.orderList)
        this.OrderorderNum = this.orderList.length;
        if (this.orderList.length != 0) {
          for (const order of this.orderList) {
            let countProduct = 0;
            if (order.orderContent && order.orderContent.length != 0) {
              for (const item of order.orderContent) {
                if (item.productList) countProduct += item.productList.length;
              }
            }
            this.$set(order, "countProduct", countProduct);
          }
        }
      }

      this.pageNow++;
    },

    scroll() {
      let isLoading = false
      window.onscroll = () => {
        // 距离底部200px时加载一次
        let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 200
       if (bottomOfWindow && isLoading == false) {
          isLoading = true
          
          //获取10个数据
          this.pageNow++
          console.log(this.pageNow)
          
          axios.post(this.$sysConfig.server + "/member/order" , {userId: this.memberInfo.id,pageNow:this.pageNow, pageSize:this.pageSize})
          .then(response => {
            for(let i = 0; i < response.data.result.length; i ++){
                this.orderList.push(response.data.result[i]);
                this.OrderorderNum++;
            }
			isLoading = false
		    })

          console.log(this.orderList);
          
		}
		
			console.log(this.OrderorderNum)
      }
    },
    
  },
};
</script>

<style>
.memberinfopage{
    background-color: rgba(238, 245, 248, 0.973);
}
.title {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  height: 56px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #202a39;
}
.active {
  color: #da0822;
}
.icon_phone {
  padding-left: 10px;
  mask-image: url(../../public/img/icons/my/phone.svg);
  mask-size: 16px;
  background-color: #2b3543;
  height: 16px;
  width: 16px;
  mask-repeat: no-repeat;
  mask-position: center;
}
.gift_integral_item {
  height: 60px;
  width: 92%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dfdfdf;
}
</style>
