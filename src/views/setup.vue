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
                {{ lang === "ch" ? "餐厅控制中心" : "Controller" }}
            </div>
            <div
                style="color: white; padding: 20px 60px 20px 60px; font-size: large;"
                @click="logOutMethod()"
            >
                <img
                src="../../public/img/pic/logoutImage.svg"
                alt=""
                style="width:30px;height:30px"
                />
            </div>
        </div>
         <div style = "height: 164px'"></div>
        <div>
            <div style = "height: 164px'"></div>
            <div>
               wowo
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            activeName:0
        }
    },
    methods: {
        goBackMethod() {
        this.$router.push("/");
        },
        handleClick(){
                console.log(this.activeName)
        },
    }
}
</script>

<style lang="stylus" scoped>
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

.setup_body_right_content{
    display: flex;
    justify-content: center;
    line-height: 50px;
    border-radius: 4px;
    margin: 10px 0;
    padding: 0 20px;
}
.setup_body_right_content:hover{
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    border: 1p solid #eee;
}
.setup_body_right_content_logo{
    width: 188px;
    height: 188px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    border: 1px solid #eee;
    border-radius: 10px;
    overflow: hidden;
}
.setup_body_right_content_logo img{
    object-fit: cover;
    width: 100%;
    height: 100%;
}
.setup_body_right_content_left{
    flex-basis: 168px;
    text-align: left;
    flex-shrink: 0;
}
.setup_body_right_content_right{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-left: 20px;
    position: relative;
    width: 288px;
}
.setup_body_right_content_left2{
    flex-basis: 268px;
    text-align: left;
    flex-shrink: 0;
}
.setup_body_right_content_right2{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-left: 20px;
    position: relative;
    width: 388px;
}
</style>