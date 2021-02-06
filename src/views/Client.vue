<template>
<div id="client">
    <div id="headpart">

      <div class="headpart_center">
        {{ nowTime }}
      </div>
      <div class="headpart_right">
          <div style="display:flex; justify-content:space-between;">
               <div style="color:white; font-size:20px; " @click="changeLanguageMethod()">
                    {{lang ==='en'? "中文" : "English"}}
                </div>
                <div style="width:10px;">

                </div>
                <div style="color:white; font-size:20px;" @click="staffLoginmethod()">
                    {{lang === 'en' ? 'Staff Login': '员工登录'}}
                </div>
          </div>
       
      </div>
      <nut-popup
        v-model="isShowConfirmBox"
        style="color: #666; width: 30%; height: 300px; border-radius: 30px"
        :z-index="11"
      >
         <div style="background-color: #202a39; height: 25%; color:white; display:flex; align-items:center; font-size:20px;">
          <span style="margin-left:5%;">{{lang==='ch' ? '提示': 'Notification'}}</span>
        </div>
        <div
          style="
            display: flex;
            justify-content: center;
            height: 55%;
            align-items: center;
            font-size: 30px;
          "
        >
          {{ lang === "en" ? "Confirm to log out" : "确认退出" }}
        </div>
        <div>
          <div style="display: flex; justify-content: space-around">
            <div style="margin: 0 10px">
              <nut-button
                type="light"
                @click="isShowConfirmBox = false"
                style="padding: 10px 50px 10px 50px"
                >{{ lang === "en" ? "Cancel" : "取消" }}</nut-button
              >
            </div>
            <div style="margin: 0 10px">
              <nut-button
                @click="confiormMethods()"
                style="padding: 10px 50px 10px 50px"
                >{{ lang === "en" ? "Confirm" : "确定" }}</nut-button
              >
            </div>
          </div>
        </div>
      </nut-popup>
  
        <nut-popup v-model="staffLoginBox" style=" color: #666;height:260px; width:30%;border-radius:20px;" class="home_success" :close-on-click-overlay="false" :z-index="11"  >
            <div style="background-color: #202a39; height: 30%; color:white; display:flex; align-items:center; font-size:20px;">
                <span style="margin-left:5%;">{{lang==='en'? "Staff Log In":"请使用员工账号登录"}}</span>
            </div>
			
			<div style="padding: 18px;">
				<div style="padding-bottom: 10px">
					<cube-input v-model="staffInfo.userName" placeholder="STAFF NAME"></cube-input>
				</div>
				<div style="padding-bottom: 10px">
					<cube-input type="password" v-model="staffInfo.password" placeholder="PASSWORD" :eye="{visible: false, blurHidden: true}"></cube-input>
				</div>
			</div>
			<div style="display: flex;justify-content:center;">
				<div style="margin: 0 10px">
					<nut-button type="light" @click="staffLoginBox=false">{{lang==='en'? "Cancel":"取消"}}</nut-button>
				</div>
				<div style="margin: 0 10px">
					<nut-button @click="loginMethod()">{{lang==='en'? "Confirm":"确认"}}</nut-button>
				</div>
			</div>
		</nut-popup>
    
    </div>

    <!-- Body start here -->
    <div style="height: calc(7vh)"></div>
    <div class="clientBody">
        <div style="height:10%;display:flex;justify-content:center; align-items:center;font-size:30px">
            <span>{{lang === 'ch'? "欢迎光临！ 请选择用餐人数" : "Welcome！ Please select your table size"}}</span>
        </div>
        <div class="chooseTableType">
            <div class="tabletype1" @click="openInputInfoBox(2)">
                <span>1 - 2</span>
            </div>
            <div class="tabletype2"  @click="openInputInfoBox(4)">
                <span>3 - 4</span>
            </div>
        </div>
        <div class="chooseTableType" >
            <div class="tabletype3" @click="openInputInfoBox(8)">
                <span>5 - 8</span>
            </div>
            <div class="tabletype4" @click="openInputInfoBox(10)">
                <span>> 8</span>
            </div>
        </div>
    </div>

    <nut-popup
        v-model="isShowInputInfoBox"
        style="color: #666; width: 60%; height: calc(60vh); border-radius: 30px;"
        :z-index="11">
        <div style="height:100%">
            <div style="background-color: #202a39;">
                 <div style="color:white; ">
                   
                    <div v-if="tableSeat===2" style="font-size:25px; padding:10px 0px 10px 20px; font-weight:600;">
                        {{lang==='ch' ? "用餐人数： 1 - 2 人": "Table for 2 persons"}}
                    </div>
                    <div v-else-if="tableSeat===4" style="font-size:25px; padding:10px 0px 10px 20px; font-weight:600;">
                        {{lang==='ch' ? "用餐人数： 3 - 4 人": "Table for 4 persons"}}
                    </div>
                    <div v-else-if="tableSeat===8" style="font-size:25px; padding:10px 0px 10px 20px; font-weight:600;">
                        {{lang==='ch' ? "用餐人数： 5 - 8 人": "Table for 8 persons"}}
                    </div>
                    <div v-else-if="tableSeat===10" style="font-size:25px; padding:10px 0px 10px 20px; font-weight:600;">
                        {{lang==='ch' ? "用餐人数： 8 人 以 上": "Table for more than 9 persons"}}
                    </div>
                    <div style="padding:0px 0px 10px 20px;display:flex; background-color: #202a39;">
                        <span style=" font-size:25px; font-weight:600;">{{lang==='ch'? "预计需要等待时间 : ": "Estimated Waiting Time : "}}</span>
                        <span style=" font-size:25px; font-weight:600;">{{waitingTime}}</span>
                        <span style=" font-size:25px; font-weight:600;">{{lang === 'ch'? ' 分钟':' mins'}}</span>
                        
                    </div>
                    <div style="padding:0px 0px 10px 20px;display:flex; background-color:#202a39;">
                        <span style=" font-size:25px; font-weight:600;">{{lang==='ch'? "前面等待桌数 : ": "Ahead : "}}</span>
                        <span style=" font-size:25px; font-weight:600;">{{waitingTable}}</span>
                        <span style=" font-size:25px; font-weight:600;">{{lang === 'ch'? ' 桌':' Tables'}}</span>
                        
                    </div>
                </div>
            </div>
           
           
            <div style="height:4%; padding:20px; font-size:25px; font-weight:600;">
                {{lang === 'ch' ?"请输入个人信息开始排队候餐" :"Please enter your Info to start queueing"}}
            </div>
            <div style="justify-content:center;display:flex; height:50%">
                <div style="padding: 18px;">
                    <div style="display:flex; justify-content:space-around; padding-bottom:30px;">
                      
                        <div style="align-self:center;  font-size:20px; font-weight:600;">{{lang==='ch' ? "称呼: ": "Gender: "}}</div>
                       
                       <div>
                            <el-radio v-model="radio" label="Mrs." border size="small">Mrs.</el-radio>
                            <el-radio v-model="radio" label="Mr." border size="small">Mr.</el-radio>
                            <el-radio v-model="radio" label="Ms." border size="small">Ms.</el-radio>
                            <el-radio v-model="radio" label="Miss." border size="small">Miss.</el-radio>
                        </div>
                    </div>
             
                        
                    <div style="padding-bottom: 30px; display:flex;  font-size:20px; font-weight:600; ">
                        <span style="align-self:center; font-weight:600;display:flex; justify-content:flex-start;">{{lang==='ch' ? "姓氏 : ": "Last Name : "}}</span>
                        <input v-model="LastName" placeholder="Last Name" style="border:solid black 1px;  border-radius:5px; font-size:15px; width:250px;height:25px;"/>
                    </div>
                    <div style="padding-bottom: 10px; display:flex;  font-size:20px; font-weight:600;" >
                        <span  style="align-self:center; font-weight:600;display:flex; justify-content:flex-start;">{{lang==='ch' ? "电话 : ": "Phone Number : "}}</span>
                        <input v-model="phoneNumber" placeholder="Phone Number" style="border:solid black 1px;  border-radius:5px; font-size:15px; width:250px;height:25px;"/>
                    </div>
                    
                    
                    
			    </div>

            </div>
            
            <div style="display: flex;justify-content:center;">
				<div style="margin: 0 50px">
					<nut-button type="light" @click="isShowInputInfoBox=false">{{lang==='en'? "Cancel":"取消"}}</nut-button>
				</div>
				<div style="margin: 0 50px">
					<nut-button @click="addQueueMethod()">{{lang==='en'? "Confirm":"确认"}}</nut-button>
				</div>
			</div>
        </div>
    </nut-popup>
</div>
</template>

<script>
import axios from 'axios';
export default{
    created(){
        this.getQueueArray();
        this.getAllTableInfoMthod();
        this.mynowTime = new Date().getTime()
        setInterval(() => {
            this.mynowTime = new Date().getTime()
        }, 60000);
    },
    data() {
        return {
            mynowTime: null,
            nowTime: "",
            isShowConfirmBox:false,
			staffLoginBox:false,
            staffInfo: {},
            isShowInputInfoBox:false,
            tableSeat:0,
            phoneNumber:null,
            LastName:null,
            radio:null,
            qArray:[],
            havingMealArray:[],
            waitingTime:0,
            waitingTable:0,
        }
    },
    computed: {
        lang() {
        return this.$store.state.language;
        },
        memberInfo() {
        return this.$store.state.memberInfo;
        },
        isViewMode() {
        return this.$store.state.isViewMode;
        },
        tableName() {
        return localStorage.getItem("tableName");
        },
        isHomePage() {
        let tempFlag = false;
        if (this.$route.path === "/") {
            tempFlag = true;
        } else {
            tempFlag = false;
        }
        return tempFlag;
        },
    },
    mounted() {
        this.nowTimes();
    },
    methods:{
         changeLanguageMethod(){
            if(this.lang === 'en'){
                this.$store.dispatch('setLanguage', 'ch')
                localStorage.setItem('language','ch')
                this.lang = 'ch'
            }else{
                this.$store.dispatch('setLanguage', 'en')
                localStorage.setItem('language','en')
                this.lang='en'
            }
            
        },
        getAllTableInfoMthod(){
            this.activeTop = null
            axios.get(this.$sysConfig.server + '/table').then(doc =>{
                if(doc.data.code === 0){
                    this.tableArray = doc.data.doc
                }else{
                    this.tipsShowColor = 'yellow'
                    this.tipsInfo = '未找到可用餐桌'
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false
                    }, 2000);
                }
            }).catch(err => {
                console.log(err)
            })
        },

        //计算等待时间
        countWaitingTimeMethod(tableType){
            this.waitingTable=0            
            for(var i = 0; i < this.qArray.length; i++){
                if(tableType === this.qArray[i].size){
                    this.waitingTime +=90
                    this.waitingTable++;
                }
            }

            for(var i = 0; i < this.tableArray.length;i++){

                //现在把所有桌子的时间计算进去了，因为我这边控制台没有更新餐桌容量的功能，因此无法计算每种餐桌容量的桌子所需时间
                
                if(this.tableArray[i].status && i > 0){
                    this.waitingTime -=Math.floor(((this.tableArray[i].orderId.newMealTime - this.mynowTime)/60000)) 
                    this.waitingTime-=90
                    this.waitingTime.toFixed(1);
                }
                
            }
        },

        //获取队列
        getQueueArray(){
           axios.get(this.$sysConfig.server + '/queue/getQueue').then(doc => {
                if(doc.data.code === 0){
                    this.qArray = doc.data.doc
                   console.log("array success")
                }else if(doc.data.code === 2){
              
                    console.log("failed")
                }else{
                   
                }
           })
        },

        //添加等候队列
        addQueueMethod(){
            axios.post(this.$sysConfig.server + "/queue/createQueue",{
                gender:this.radio,
                name:this.LastName,
                phoneNumber:this.phoneNumber,
                size:this.tableSeat
            }).then(doc => {
                if(doc.data.code === 200){
                   console.log("success")
                }else if(doc.data.code === 400){
                    this.getTable();
                    console.log("failed")
                }else{
                   
                }
            })
            this.LastName = null;
            this.phoneNumber=null;
            this.radio = null;
            this.isShowInputInfoBox = false;
        },
        
        openSettingMethod() {
            this.$router.push("/setup");
        },
        confiormMethods() {
            this.$router.push("/login");
        },
        logOutMethod() {
            this.isShowConfirmBox = true;
        },
        trunBack() {
            this.$router.push("/login");
        },
        openLoginBox() {
            this.$store.dispatch("setLoginBox", true);
        },
        logoOut() {
            this.$store.dispatch("setStaffLoginBox", true);
        },
        timeFormate(timeStamp) {
			let year = new Date(timeStamp).getFullYear();
			let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
			let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
			let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
			let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
			let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
			this.nowTime = hh+":"+mm + "  " + date + "/" + month + "/"+ year;

		},
		nowTimes(){
		this.timeFormate(new Date());
		setInterval(this.nowTimes,60000);
		this.clear()
		},
		clear(){
		clearInterval(this.nowTimes)
		this.nowTimes = null;
        },
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
			if (checkInfo.data.code === 200) {
				this.staffLoginBox = false;
				this.$router.push("/");
			} else if (checkInfo.data.code === 404 || checkInfo.data.code === 405) {
				this.$toast.fail("用户名或密码错误");
			} else {
				this.$toast.fail("验证时发生错误");
			}
		},
		staffLoginmethod(){
			this.staffLoginBox = true
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
        openInputInfoBox(tableSeat){
            this.waitingTime = 0;
            this.countWaitingTimeMethod(tableSeat);
            this.isShowInputInfoBox = true;
            this.tableSeat  = tableSeat;
        }
    }
    
}
</script>

<style>
#headpart{
    display: flex;
    justify-content: space-between;
}
#client{
    background-color: rgb(216, 240, 247);
  
}
.clientBody{
    display: block;
  
    height: calc(100vh);
    width: 90%;
    margin-left: 5%;
}
.chooseTableType{
    display: flex;
    height: 40%;
    
}
.chooseTableType div{
    width: 50%;
    height: 100%;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    
}
.tabletype1{
    
    background-color: rgb(248, 117, 113);
}
.tabletype2{
    
    background-color: rgb(135, 210, 240);
}
.tabletype3{
    
    background-color: rgb(189, 163, 81);
}
.tabletype4{
    
    background-color: rgb(130, 131, 219);
}

</style>
