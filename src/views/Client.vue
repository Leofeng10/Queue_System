<template>
<div id="client">
        <div id="headpart">
      <div class="headpart_left">
        <div @click="logOutMethod()">
          <img
            src="../../public/img/pic/logoutImage.svg"
            alt=""
            style="width: 30px; height: 30px"
          />
        </div>
      </div>
      <div class="headpart_center">
        {{ nowTime }}
      </div>
      <div class="headpart_right">
        <div style="color:white; font-size:20px;" @click="staffLoginmethod()">
			{{lang === 'en' ? 'Staff Login': '员工登录'}}
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
  
        <nut-popup v-model="staffLoginBox" style=" color: #666;height:260px; width:30%;border-radius:20px" class="home_success" :close-on-click-overlay="false" :z-index="11"  >
            <div style="background-color: #202a39; height: 20%; color:white; display:flex; align-items:center; font-size:20px;">
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
    <div class="clientBody">
        <div style="height:10%;display:flex;justify-content:center; align-items:center;font-size:30px">
            <span>{{lang === 'ch'? "欢迎光临！ 请选择用餐人数" : "Welcome！ Please select the table size"}}</span>
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
            <div class="tabletype4" @click="openInputInfoBox(9)">
                <span>> 8</span>
            </div>
        </div>
    </div>

    <nut-popup
        v-model="isShowInputInfoBox"
        style="color: #666; width: 60%; height: calc(60vh); border-radius: 30px"
        :z-index="11">
        <div style="height:100%">
            <div style="height:15% ">
                <div style="height:30%"></div>
                <div v-if="tableSeat===2" style="font-size:25px; padding:20px; font-weight:600;">
                    {{lang==='ch' ? "用餐人数： 1 - 2 人": "Table for 2 persons"}}
                </div>
                <div v-else-if="tableSeat===4" style="font-size:25px; padding:20px; font-weight:600;">
                    {{lang==='ch' ? "用餐人数： 3 - 4 人": "Table for 4 persons"}}
                </div>
                <div v-else-if="tableSeat===8" style="font-size:25px; padding:20px; font-weight:600;">
                    {{lang==='ch' ? "用餐人数： 5 - 8 人": "Table for 8 persons"}}
                </div>
                <div v-else-if="tableSeat===9" style="font-size:25px; padding:25px; font-weight:600;">
                    {{lang==='ch' ? "用餐人数： 8 人 以 上": "Table for more than 9 persons"}}
                </div>
                <div style="padding:20px; font-size:25px; font-weight:600;">
                    {{lang==='ch'? "预计需要等待时间 : ": "Waiting Time : "}}
                </div>
            </div>
            <div style="height:13%">

            </div>
          
            <div style="height:4%; padding:20px; font-size:25px; font-weight:600;">
                {{lang === 'ch' ?"请输入个人信息开始排队候餐" :"Please enter your Info to start queueing"}}
            </div>
            <div style="justify-content:center;display:flex; height:40%">
                <div style="padding: 18px;">
                    <div style="display:flex; justify-content:space-around; padding-bottom:30px;">
                      
                        <div style="align-self:center;  font-size:20px; font-weight:600;">{{lang==='ch' ? "姓别: ": "Gender: "}}</div>
                       
                       <div>
                            <el-radio v-model="radio" label="1" border size="small">Mrs.</el-radio>
                            <el-radio v-model="radio" label="2" border size="small">Mr.</el-radio>
                            <el-radio v-model="radio" label="3" border size="small">Ms.</el-radio>
                            <el-radio v-model="radio" label="4" border size="small">Miss.</el-radio>
                        </div>
                    </div>
                        
                    <div style="padding-bottom: 30px; display:flex;  font-size:20px; font-weight:600; ">
                        <span style="align-self:center; font-weight:600;display:flex; justify-content:flex-start;">{{lang==='ch' ? "姓氏 : ": "Last Name : "}}</span>
                        <cube-input v-model="newCustomer.name" placeholder="Last Name" style="border:solid black 1px; border-radius:10px;"></cube-input>
                    </div>
                    <div style="padding-bottom: 10px; display:flex;  font-size:20px; font-weight:600;" >
                        <span  style="align-self:center; font-weight:600;display:flex; justify-content:flex-start;">{{lang==='ch' ? "电话 : ": "Phone Number : "}}</span>
                        <cube-input v-model="newCustomer.tel" placeholder="Phone NUmber" style="border:solid black 1px;  border-radius:10px;"></cube-input>
                    </div>
		
			    </div>

            </div>
            

            
            <div style="display: flex;justify-content:center; height:20%">
				<div style="margin: 0 10px">
					<nut-button type="light" @click="isShowInputInfoBox=false">{{lang==='en'? "Cancel":"取消"}}</nut-button>
				</div>
				<div style="margin: 0 10px">
					<nut-button @click="startQ()">{{lang==='en'? "Confirm":"确认"}}</nut-button>
				</div>
			</div>
        </div>
    </nut-popup>

     <!-- start table bill start -->
        <div style="display: none">
            <div id="qrcode_bill">
                <div style="display: flex;flex-direction: column;align-items: center;">
                    <div style="display:flex;width:300px;padding-left:30px">
                    </div>
                    <div style="font-size: 20px;height: 40px;line-height: 40px;">
                        <span>{{restaurantName}}</span>
                    </div>
                    <div style="padding: 10px 0">
                        <span>{{lang === 'en'? 'Scan QRcode to start': '扫描二维码开始点餐'}}</span>
                    </div>
                    <!-- <div style="padding: 10px 0">
                        <img id="imgSrc">
                    </div> -->
                    <div style="padding: 10px 0 20px 0">
                        <span>{{QRMessage}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- start table bill end -->
</div>
</template>

<script>
import qrcode from 'qrcode'
import getLodop from "../../public/js/lodop";

export default{
    mounted() {
        this.printerList = JSON.parse(localStorage.getItem("printerList"))
    },
    data() {
        return {
            nowTime: "",
            isShowConfirmBox:false,
			staffLoginBox:false,
            staffInfo: {},
            isShowInputInfoBox:false,
            tableSeat:0,
            newCustomer: {
                name: null,
                gender: false,
                tel: null,
                size: 0,
            },
            radio:null,
            printerWithPrintQrCode: [],
            printerList: null,
            selectedPrinter: null,
            isShowSelectPrinterForQrCode: false,
            whichTable: null
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
        restaurantName(){
            let name = null
            if(localStorage.getItem('restaurantName')) name = localStorage.getItem('restaurantName') 
            return name
        },
        QRMessage(){
            return localStorage.getItem('QRmessage')
        }
    },
    mounted() {
        this.nowTimes();
    },
    methods:{
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
			console.log(checkInfo);
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
			// this.$router.push('/')
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
            this.isShowInputInfoBox = true;
            if(tableSeat===9){
                this.tableSeat=9;
            }else{
                this.tableSeat  = tableSeat;
 
            }
            console.log(this.tableSeat)
        },
        startQ() {
            this.addQueueMethod();
            this.openSelectPrinterForQrCode();
        },
        async addQueueMethod(){
            await axios.post(this.$sysConfig.server + "/queue/createQueue",{
                gender:this.newCustomer.gender,
                name:this.newCustomer.name,
                phoneNumber:this.newCustomer.tel,
                size:this.newCustomer.size
            }).then(doc => {
                console.log(doc)
                if(doc.data.code === 200){
                   console.log("success")
                }else if(doc.data.code === 400){
                    this.getTable();
                    console.log("failed")
                }else{ 
                }
            })
            this.getQueueArray();
            this.popupVisible = false
        },
        async getQueueId() {
            await axios.post(this.$sysConfig.server + "/queue/getQueue", {

            }).then(doc => {
                console.log(doc)
                if(doc.data.code === 200){
                   console.log("success")
                   this.tempId = doc._id
                }else if(doc.data.code === 400){
                    this.getTable();
                    console.log("failed")
                }else{ 
                }
            })
        },
        openSelectPrinterForQrCode(){
            this.printerWithPrintQrCode = []
            this.printerList.forEach(printerInfo =>{
                if(printerInfo.isPrintQRcode){
                    this.printerWithPrintQrCode.push(printerInfo)
                }
            })
            if(this.printerWithPrintQrCode.length>1){
                this.isShowSelectPrinterForQrCode = true
            }
            else{
                this.selectedPrinter = this.printerWithPrintQrCode[0]
                this.printQrCodeMethod(this.selectedPrinter)
            }
        },
        printQrCodeMethod(item){
            console.log(item)
            let LODOP = getLodop()
            let options ={
                margin:0,
                version:4
            }
            qrcode.toDataURL(this.$sysConfig.client + "/?id="+ this.tempId,options)
            .then(url => {
                // document.getElementById("imgSrc").src = url;
                if (LODOP) {
                    let hasPrint = false
                        if(item.isPrintQRcode){
                            hasPrint = true
                            let strFormHtml ='<body>' + document.getElementById('qrcode_bill').innerHTML + '</body>'   //获取打印内容
                            LODOP.PRINT_INIT('QRcode' + new Date())  //初始化
                            LODOP.SET_PRINT_STYLE("FontName","隶书")
                            LODOP.SET_PRINT_STYLE("FontSize",11)
                            LODOP.SET_PRINT_PAGESIZE(3, 800, 0)  //设置横向 1 纵向 2 横向 3高度自适应
                            LODOP.ADD_PRINT_HTM(0, 0, '100%', '100%', strFormHtml)    //设置打印内容 
                            LODOP.SET_PREVIEW_WINDOW(2, 0, 0, 800, 600, '')  //设置预览窗口模式和大小
                            // LODOP.PREVIEW()//打印前预览
                            LODOP.SET_PRINTER_INDEXA(item.printerName)
                            LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
                            async function getJobCodeMethod(){
                                return new Promise(async resolve =>{
                                    LODOP.On_Return=function(TaskID,Value){
                                        resolve(Value)
                                    }
                                })
                            }
                            getJobCodeMethod()
                            .then(async tempJobCode =>{
                                let a = await this.checkPrintError(tempJobCode,strFormHtml,item.printerName)
                            })
                            LODOP.PRINT()//直接打印
                        }
                    if(!hasPrint){
                        LODOP.PRINT_INIT('QRcode'+ new Date())  //初始化
                        LODOP.SET_PRINT_STYLE("FontName","隶书")
                        LODOP.SET_PRINT_STYLE("FontSize",11)
                        LODOP.SET_PRINT_PAGESIZE(3, 800, 0)  //设置横向 1 纵向 2 横向 3高度自适应
                        LODOP.ADD_PRINT_HTM(0, 0, '100%', '100%', strFormHtml)    //设置打印内容 
                        LODOP.SET_PREVIEW_WINDOW(2, 0, 0, 800, 600, '')  //设置预览窗口模式和大小
                        // LODOP.PREVIEW()//打印前预览
                        LODOP.SET_PRINTER_INDEXA(-1)
                        LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
                        async function getJobCodeMethod(){
                            return new Promise(async resolve =>{
                                LODOP.On_Return=function(TaskID,Value){
                                    resolve(Value)
                                }
                            })
                        }
                        getJobCodeMethod()
                        .then(async tempJobCode =>{
                            let a = await this.checkPrintError(tempJobCode,strFormHtml,item.printerName)
                        })
                        LODOP.PRINT()//直接打印
                    }
                }else{
                    this.$notify({
                        title: '提示',
                        message: '未找到打印机服务器，请确认连接地址正确或打印机服务是否正常'
                    });
                }
            })
            .catch(err => {
                console.error(err);
            });
            this.isShowSelectPrinterForQrCode = false
          }
    }
    
}
</script>

<style>
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