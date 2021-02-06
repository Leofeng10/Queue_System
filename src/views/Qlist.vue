<template>
    <div id="qlist" style="background-color: #e2e2e2d8; height: 100%; width:100%">
        <div style="width:100%">
            <div class="heading">Queuing list</div>
            <!-- The Queuing List Starts -->
            <div v-for="item in qArray" v-bind:key="item.index" style="background-color: #e2e2e2d8;">
                <div class="info">
                    <div style="display: flex; justify-content: space-between;">
                        <div style="display:flex;">
                            <div style="font-weight: bold;">{{ item.gender }}</div>
                            <div style="font-weight: bold;">{{ item.name }}</div>
                        </div>
                        
                        <div style=" display:flex;">
                            <div>{{ item.size }}</div>
                            <img src="../../public/img/icons/person_dark.svg" alt="people"/>
                            <img src="../../public/img/icons/remove.svg" alt="people" style="margin-left: 20px;" @click="openDeleteQueueMethods(item)"/>
                        </div>
              
                    </div>
                    <div style="padding: 10px 0px 0px 0px;">{{ item.phoneNumber }}</div>
                </div>
            </div>
            <div style="height: 70px;"></div>
            <div id="add">
                <button @click="popupVisible = true">{{ lang === 'en' ? 'ADD' : '添加' }}</button>
            </div>
        </div>
        <!-- --------------------------------------------------------------------------------- -->
        <!-- popup box starts -->
        <el-dialog
            :title="lang === 'en' ? 'Add to queuing list' : '添加至排队列表'"
            :visible.sync="popupVisible"
            width="500px"
        >
        <div class="popupLine">
            <div style="margin-right: 20px;">{{ lang === 'en' ? 'Gender:' : '性别：' }}</div>

            <el-radio v-model="newCustomer.gender" label="Mrs." border size="small">Mrs.</el-radio>
            <el-radio v-model="newCustomer.gender" label="Mr." border size="small">Mr.</el-radio>
            <el-radio v-model="newCustomer.gender" label="Ms." border size="small">Ms.</el-radio>
            <el-radio v-model="newCustomer.gender" label="Miss." border size="small">Miss.</el-radio>
        </div>
        <div class="popupLine">
            <div style="margin-right: 20px;">{{ lang === 'en' ? 'Name:' : '姓名：' }}</div>
            <el-input v-model="newCustomer.name" class="popupInput"></el-input>
        </div>
        <div class="popupLine">
            <div style="margin-right: 20px;">{{ lang === 'en' ? 'Phone:' : '手机号：' }}</div>
            <el-input v-model="newCustomer.tel" class="popupInput"></el-input>
        </div>
        <div class="popupLine">
            <div style="margin-right: 20px;">{{ lang === 'en' ? 'Table size:' : '用餐人数：' }}</div>
            <el-radio v-model="newCustomer.size" label=2>1-2</el-radio>
            <el-radio v-model="newCustomer.size" label=4>3-4</el-radio>
            <el-radio v-model="newCustomer.size" label=8>5-8</el-radio>
            <el-radio v-model="newCustomer.size" label=10>>8</el-radio>
        </div>
        <div slot="footer">
            <el-button @click="popupVisible = false">取 消</el-button>
            <el-button type="primary" @click="addQueueMethod()">确 定</el-button>
        </div>
        </el-dialog>

        <nut-popup
        v-model="comfirmDeleteBox"
        style="color: #666; width: 30%; height: 200px; border-radius: 30px"
        :z-index="11"
      >
        <div style="background-color: #202a39; height: 25%; align-items:center; display:flex;justify-content:center;">
            <span style="color:white; font-size:25px; padding:5px;">{{lang === "ch" ? "提示" : "Notification"}}</span>
        </div>
        <div
          style="
            display: flex;
            justify-content: center;
            height: 50%;
            align-items: center;
            font-size: 30px;
          "
        >
          {{ lang === "en" ? "Confirm to delete" : "确认删除" }}
        </div>
        <div>
          <div style="display: flex; justify-content: space-around">
            <div style="margin: 0 10px">
              <nut-button
                type="light"
                @click="comfirmDeleteBox = false"
                style="padding: 10px 30px 10px 30px"
                >{{ lang === "en" ? "Cancel" : "取消" }}</nut-button
              >
            </div>
            <div style="margin: 0 10px">
              <nut-button
                @click=" deleteQueueMethods(deleteInfo);"
                style="padding: 10px 30px 10px 30px"
                >{{ lang === "en" ? "Confirm" : "确定" }}</nut-button
              >
            </div>
          </div>
        </div>
      </nut-popup>
        
    </div>
</template>

<script>
import axios from 'axios';
export default {
    mounted(){
        this.getQueueArray();
    },
    computed: {
        lang() {
            return this.$store.state.language;
        },
    },
    data() {
        return {
            qArray: [],
            newCustomer: {
                name: null,
                gender: false,
                tel: null,
                size: 0,
            },
            popupVisible: false,
            comfirmDeleteBox:false,
            deleteInfo:null,
         
        }
    },
    methods:{
        openDeleteQueueMethods(item){
            this.comfirmDeleteBox = true;
            this.deleteInfo = item;
           
            
        },
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
        async addQueueMethod(){
            await axios.post(this.$sysConfig.server + "/queue/createQueue",{
                gender:this.newCustomer.gender,
                name:this.newCustomer.name,
                phoneNumber:this.newCustomer.tel,
                size:this.newCustomer.size
            }).then(doc => {
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
        async deleteQueueMethods(item){
            await axios.post(this.$sysConfig.server + '/queue/deleteQueue',{
                id:item._id,
            }).then(doc => {
                if(doc.data.code === 200){
                   console.log("delete success")
                }else if(doc.data.code === 1){
                    console.log("delete failed")
                }else{
                   
                }
            });
            this.getQueueArray();
            this.comfirmDeleteBox = false;
        }

    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ropa+Sans:ital@1&display=swap');
.heading {
    font-weight: bold;
    font-size: 26px;
    padding: 10px 0 10px 10px;
    font-family: 'Ropa Sans', sans-serif;
    color: #ff7f50;
    max-height: 500px;

}
.info {
    padding: 20px 0 0 30px;
    height: 50px;
    font-size: 18px;
    
}
.info img {
    width: 17px;
    height: 20px;
}
#add button{
    width: 140px;
    height: 40px;
    background-color: #e17055;
    color: #ffffff;
    border-radius: 30px;
    border: none;
    margin: 20px 0 10px 70px;
}
#add {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #e2e2e2;
}
.popupLine {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.popupInput {
    width: 300px;
}
</style>
