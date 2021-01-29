<template>
    <div id="qlist" style="background-color: #e2e2e2d8; height: 100%; width: 30%">
        <div style="width: 100%;">
            <div class="title">Queuing list</div>
            <!-- The Queuing List Starts -->
            <div v-for="item in qArray" v-bind:key="item.index">
                <div class="info">
                    <div style="display: flex;">
                        <div style="font-weight: bold;">{{ item.gender ? 'Mr.' : 'Ms.' }}</div>
                        <div style="font-weight: bold;">{{ item.name }}</div>
                        <div style="margin-left: 120px;">{{ item.size }}</div>
                        <img src="../../public/img/icons/person_dark.svg" alt="people"/>
                         <!-- //TODO: add @click -->
                        <img src="../../public/img/icons/remove.svg" alt="people" style="margin-left: 20px;"/>
                    </div>
                    <div style="padding: 10px 0 0 120px;">{{ item.tel }}</div>
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
        <div class="popupline">
            <div style="margin-right: 20px;">{{ lang === 'en' ? 'Gender:' : '性别：' }}</div>
            <el-radio v-model="newCustomer.gender" label=true>{{ lang === 'en' ? 'Male' : '男'}}</el-radio>
            <el-radio v-model="newCustomer.gender" label=false>{{ lang === 'en' ? 'Female' : '女'}}</el-radio>
        </div>
        <div class="popupline">
            <div style="margin-right: 20px;">{{ lang === 'en' ? 'Name:' : '姓名：' }}</div>
            <el-input placeholder="请输入内容"></el-input>
        </div>
        <div slot="footer">
            <el-button @click="popupVisible = false">取 消</el-button>
            <el-button type="primary" @click="popupVisible = false">确 定</el-button>
        </div>
        </el-dialog>
        <!-- group box start -->
                <el-dialog class="s" :title="lang === 'ch'?'打印群组':'Print Group'" style="height:600px" :visible.sync="isShowGroupBox" width="448px">
                    <el-table :data="groupArray" style="width:100%" height="300">
                        <el-table-column prop="name" label="Group Name" width="180px"></el-table-column>
                        <el-table-column label="Actions">
                            <div slot-scope="scope">
                                <el-button icon="el-icon-edit" @click="showEditGroupBox(scope.row)" circle></el-button>
                                <el-button icon="el-icon-delete" @click="showDeleteGroupBox(scope.row)" circle></el-button>
                            </div>
                        </el-table-column>
                    </el-table>
                    <br>
                    <div style="padding-bottom:10px;text-align:right">
                        <el-button type="primary" @click="showNewGroupBox()"><i class="el-icon-plus"></i> 新增</el-button>
                    </div>
                </el-dialog>
        <!-- group box end -->
    </div>
</template>

<script>
export default {
    computed: {
        lang() {
            return this.$store.state.language;
        },
    },
    data() {
        return {
            qArray: [
                {
                    // index: 0,
                    name: "Tay",
                    gender: true, // Male is true, Female is false
                    tel: null,
                    size: 0 // Number of people
                },
                {
                    name: "Tay",
                    gender: true,
                    tel: "8888 8888",
                    size: 2
                },
                {
                    name: "Tay",
                    gender: true,
                    tel: "6666 6666",
                    size: 4
                },
                {
                    name: "Tay",
                    gender: true,
                    tel: "1111 1111",
                    size: 6
                },
                {
                    name: "Tay",
                    gender: true,
                    tel: "1111 1111",
                    size: 6
                },
                {
                    name: "Tay",
                    gender: true,
                    tel: "1111 1111",
                    size: 6
                },
                {
                    name: "Tay",
                    gender: true,
                    tel: "1111 1111",
                    size: 6
                },
                {
                    name: "Tay",
                    gender: true,
                    tel: "1111 1111",
                    size: 6
                },
                {
                    name: "Tay",
                    gender: true,
                    tel: "1111 1111",
                    size: 6
                },
                {
                    name: "Tay",
                    gender: true,
                    tel: "1111 1111",
                    size: 6
                },
                {
                    name: "Tay",
                    gender: true,
                    tel: "1111 1111",
                    size: 6
                },
                {
                    name: "Tay",
                    gender: true,
                    tel: "1111 1111",
                    size: 6
                },
                {
                    name: "Tay",
                    gender: true,
                    tel: "1111 1111",
                    size: 6
                },
                {
                    name: "Tay",
                    gender: true,
                    tel: "1111 1111",
                    size: 6
                },
            ],
            newCustomer: {
                name: null,
                gender: false,
                tel: null,
                size: 0,
            },
            popupVisible: false
        }
    }
}

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ropa+Sans:ital@1&display=swap');
.title {
    font-weight: bold;
    font-size: 26px;
    margin: 10px 0 10px 10px;
    font-family: 'Ropa Sans', sans-serif;
    color: #ff7f50;
}
.info {
    margin: 20px 0 0 30px;
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
.popupline {
    display: flex;
}
</style>