<template>

    <div>

        <div class="title" style="height: 64px;">
            <div
                class=""
                @click="goBackMethod()"
                style="color: white; padding: 20px 60px 20px 60px; font-size: 20px;"
            >
                {{ lang === "ch" ? "返回" : "Back" }}
            </div>
            <div style="font-size: x-large; color: white;">
                {{ lang === "ch" ? "餐桌控制中心" : "Table Controller" }}
            </div>
            <div



                style="color: white; padding: 20px 60px 20px 60px; font-size: large;"
                @click="logOutMethod()"
            >
                <span style="color: white; padding: 20px 0px 20px 60px; font-size: 20px; ">{{lang === 'ch' ? '退出' : 'Log out'}}</span>
                <img
                src="../../public/img/pic/logoutImage.svg"
                alt=""
                style="width:30px;height:30px"
                />
            </div>
        </div>
      
        <div>
            <div style = "height:80px;"></div>
            <div  class="setting_tabs">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane name = 'first'>
                        <div slot="label" style="display: flex; font-size:20px">
                            {{lang === 'en'?'Table': '餐桌信息'}}
                        </div>
                        <div  style="display:flex;">
                            <!-- <button  class="tableButton" @click="openAddNewTableType()"> {{lang === 'en'?'Add Table Type': '添加餐桌类型'}}</button> -->
                            <div v-for="item in tableTypeList"  :key="item.index">
                                <button  class="tableButton" @click="changeTableType(item.capacity)">{{lang === 'en'?item.name_en: item.name}}</button>                               
                            </div>
                        </div>
                        <div style="height:30px"></div>
                        <div>
                            <div class="tableinfo">
                                <span @click="openAddTableBox()"><img src="../../public/img/pic/addTableIcon.svg" alt="" style="width:40px; height:40px"></span>
                                <span>{{lang === 'en' ? "Table Number" : "餐桌编号"}}</span>
                                <span>{{lang === 'en' ? "Table Seats" : "餐桌容量"}}</span>
                                <span>{{lang === 'en' ? "Edit" : "编辑"}}</span>
                                <span>{{lang === 'en' ? "Delete" : "删除"}}</span>
                            </div>
                            <div style="height:20px"></div>
                            <div v-for="item in tableList" :key="item._id">
                                <div v-if="capacity === 0 || (item.tableSeat <= capacity && item.tableSeat > capacity - 2)"   class="tableinfoDetail">
                                    <span></span>
                                    <span>{{item.tableName}}</span>
                                    <span>{{item.tableSeat}}</span>
                                    <img src="../../public/img/pic/editLogo.svg" alt="wu" style="width:30px; height:30px" @click="openEditmethod()">
                                    <img src="../../public/img/pic/deleteLogo.svg" alt="" style="width:30px; height:30px" @click="openDeletemethod()"> 
                                </div>
                            </div>
                        </div>
                     
                    </el-tab-pane>
                    <el-tab-pane name="second">
                        <div slot="label" style="display: flex; font-size:20px">
                      
                            {{lang === 'en'?'Language': '语言设置'}}
                        </div>
                        <div class="setup_body_right_content">
                            <div class="setup_body_right_content_left">
                                <span v-if="lang === 'en'">Display Language</span>
                                <span v-else>显示语言</span>
                            </div>
                            <div class="setup_body_right_content_right">
                               
                                <button v-if="lang==='ch'" class="changeLangButton1" @click="changeLanguageMethod()">{{lang === 'en' ? 'Chinese' : '中文'}}</button>
                                <button v-else class="changeLangButton" @click="changeLanguageMethod()">{{lang === 'en' ? 'Chinese' : '中文'}}</button>
                                <span style="width:20px"></span>
                                <button v-if="lang==='en'" class="changeLangButton1" @click="changeLanguageMethod()">{{lang === 'en' ? '英文' : 'English'}}</button>
                                <button v-else class="changeLangButton" @click="changeLanguageMethod()">{{lang === 'en' ? '英文' : 'English'}}</button>
                               
                            </div>
                        </div>
                  

                    </el-tab-pane>
                </el-tabs>`
            </div>
           

        </div>

        <el-dialog
            title='Add Table'
            :visible.sync="dialogVisible"
            width="40%">
            <div>
                <div class="control_dialog_box_body_item">
                    <div class="control_dialog_box_body_item_left">
                        <span class="addtabletext" v-if="lang === 'en'">Table Name</span>
                        <span class="addtabletext" v-else >餐桌名称</span>
                    </div>
                   
                    <div class="control_dialog_box_body_item_right" style="padding-left:65px">
                        <el-input class="addtabledialog" type="text" v-model="tableName"  placeholder="Table name"></el-input>
                    </div>
                </div>
                <div class="control_dialog_box_body_item">
                    <div class="control_dialog_box_body_item_left">
                        <span class="addtabletext" v-if="lang === 'en'">Table Note</span>
                        <span class="addtabletext" v-else >餐桌备注</span>
                    </div>
                    <div class="control_dialog_box_body_item_right" style="padding-left:65px">
                        <el-input class="addtabledialog" type="text" v-model="tableNote"  placeholder="Table note"></el-input>
                    </div>
                </div>
                <div class="control_dialog_box_body_item">
                    <div class="control_dialog_box_body_item_left">
                        <span class="addtabletext" v-if="lang === 'en'">Table Capacity</span>
                        <span class="addtabletext" v-else>餐桌人数</span>
                    </div>
                    <div v-if="lang ==='ch'" class="control_dialog_box_body_item_right" style="padding-left:65px">
                         <el-select v-model="tableSeat" placeholder="请选择">
                            <el-option
                            v-for="item in tableTypeList"
                            :key="item.index"
                            :label="item.name"
                            :value="item.capacity">
                            </el-option>
                        </el-select>
                    </div>
                    <div v-else class="control_dialog_box_body_item_right" style="padding-left:65px">
                         <el-select v-model="tableSeat" placeholder="Please select">
                            <el-option
                            v-for="item in tableTypeList"
                            :key="item.index"
                            :label="item.name_en"
                            :value="item.capacity">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="() => {dialogVisible = false;  addTableMethod();}">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title='Notification'
            :visible.sync="editbox"
            width="30%">
            <div>
                {{lang === 'ch' ? "请前往控制台修改" : "Please edit at the controller"}}
            </div>
        </el-dialog>
         <el-dialog
            title='Notification'
            :visible.sync="deletebox"
            width="30%">
            <div>
                {{lang === 'ch' ? "请前往控制台删除" : "Please delete at the controller"}}
            </div>
        </el-dialog>
        <!-- <el-dialog
            title='Add Table Type'
            :visible.sync="tableTypebox"
            width="30%">
            <div>
                <div class="control_dialog_box_body_item">
                    <div class="control_dialog_box_body_item_left">
                        <span class="addtabletext" v-if="lang === 'en'">Table Capacity</span>
                        <span class="addtabletext" v-else>餐桌容量</span>
                    </div>
                    <div class="control_dialog_box_body_item_right" style="padding-left:65px">
                        <el-input class="addtabledialog" type="text" v-model="tableCapacity"></el-input>
                    </div>
                </div>
                <div>
                    {{lang === 'ch' ? "请输入数字或数字范围 (例如：5 - 8)" : "Please enter a number or a range (eg. 5 - 8)"}}
                </div>
            
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false; addTableTypeMethod(); ">确 定</el-button>
            </span>
        </el-dialog> -->
       
        
    </div>
</template>

<script>
import axios from 'axios';
export default {
    mounted(){
        this.getTable();
    },
    data(){
        return{
            tableTypebox:false,
            activeName:'first',
            capacity: 0,
            radio: '1',
            lang: 'ch',
            radio1:'Add Table',
            dialogVisible:false,
            deletebox:false,
            editbox:false,
            tableName:null,
            tableNote:null,
            tableSeat:0,
            tableCapacity:0,
            options: [{
            value: 'type1',
            label: '1 - 2'
            }, {
            value: 'type2',
            label: '3- 4'
            }, {
            value: 'type3',
            label: '5 - 8'
            }, {
            value: 'type4',
            label: 'others'
            }],
            value: '',
            tableTypeList:[{name:"所有餐桌", name_en: "All", index:1, capacity:0}, {name:" 1 - 2 人桌", name_en: " 1 - 2 Persons", index:2, capacity:2},{name:"3 - 4 人桌", name_en: " 3 - 4 Persons", index:3, capacity:4},{name:" 5 - 8 人桌", name_en: " 8 Persons", index:4, capacity:8}],
            tableList:[{index: 1, capacity:2},{index: 2, capacity:4},{index: 3, capacity:8},{index: 4, capacity:10},{index: 5, capacity:2},{index: 6, capacity:2},{index: 7, capacity:8}]
          
        }
    },
    methods: {
        openEditmethod(){
            this.editbox=true
        },
        openDeletemethod(){
            this.deletebox = true;
        },
        openAddTableBox(){
            this.dialogVisible=true;

        },
        getTable(){
           axios.get(this.$sysConfig.server + "/table").then(doc=>{
                if(doc.data.code==0){
                    this.tableList = doc.data.doc
                    console.log(doc.data.doc);
                }else{

                }
            })
        },
        
        addTableMethod(){
            console.log(this.tableName + "   " + this.tableSeat);
            axios.post(this.$sysConfig.server + '/table',{
                tableName: this.tableName,
                tableNote: this.tableNote,    
                tableZone: null,
                capacity:this.tableSeat
            }).then(doc => {
                console.log(doc)
                if(doc.data.code === 2){
                   console.log("failed")
                }else if(doc.data.code === 0){
                    this.getTable();
                    console.log("success")
                }else{
                   
                }
            }).catch(err => {
                console.log(err)
            })
            this.tableName=null;
            this.tableNote=null;

           
            
        },
        logOutMethod(){
            this.$router.push('/login')
        },
        changeTableType(capacity){
            this.capacity = capacity;
            console.log(capacity);
        },
        addTableTypeMethod(){
            this.tableTypeList.push({name: this.tableCapacity + '  人桌', name_en: this.tableCapacity + "  Persons",  capacity:this.tableCapacity})
           this.tableTypebox = false
        },
        openAddNewTableType(){  
            this.tableTypebox =true;
        },
        goBackMethod() {
        this.$router.push("/");
        },
        handleClick(){
        },
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
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        }
       
    }
}
</script>

<style>
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
.setting_tabs{
    margin-left: 5%;
    margin-right: 5%;
}
.setup_body_right_content{
    display:flex;

}
.setup_body_right_content{
    display:flex;
    justify-content: space-around;
}
.setup_body_right_content_right{
    font-size: 20px;
    display: flex;
    
}
.setup_body_right_content_left{
   font-size: 18px;
}
.tableButton{
    border: 1px black solid;
    padding: 10px;
    background-color: white;
    font-size: 20px;
    border-radius: 10px;
    background-color: rgb(86, 143, 228);
    color: white;
    width: 160px;
    

}
.control_dialog_box_body_item{
    display: flex;
    margin: 10px 0;
}
.control_dialog_box_body_item_left{
    line-height: 34px;
    width: 100px;
    text-align: left;
}
.control_dialog_box_body_item_right{
    width: 158px;
}
.control_dialog_box_body_item_right input{
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    border: 1px solid #ccc;
    text-align: center;
    width: 100%;
    color: #555;
    font-size:var(--mainsize)
}
.control_dialog_box_body_item_right_text{
    line-height: 32px;
    height: 32px;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    font-size:var(--mainsize);
    padding-left: 100px;
}
.tableinfo{
    display: grid;
    grid-template-columns:1fr 6fr 6fr 6fr 6fr;
    justify-items: center;
    font-size: 20px;
    border-bottom: 1px black solid;
}
.tableinfoDetail{
    display: grid;
    grid-template-columns:1fr 6fr 6fr 6fr 6fr;
    justify-items: center; 
    font-size: 20px;
    padding: 10px;


}
.tableOperation1{
    padding: 5px 20px 5px 20px;
    background-color: rgb(60, 121, 235);
    color: white;
    border-radius: 5px;
}
.tableOperation2{
    padding: 5px 20px 5px 20px;
    background-color: rgb(218, 32, 32);
    color: white;
    border-radius: 5px;
}
.changeLangButton{
    padding: 10px 20px 10px 20px;
    border-radius: 10px;
    background-color: white;
    width: 100px;
}
.changeLangButton1{
    padding: 10px 20px 10px 20px;
    border-radius: 10px;
    background-color: rgb(131, 173, 221);
    width: 100px;
    
}
</style>