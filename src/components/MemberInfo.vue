<template>
  <div id="memberinfo">
    <nut-popup
      v-model="isShow"
      style=" color: #666;"
      :close-on-click-overlay="false"
      :z-index="11"
      get-container="#home"
    >
      <div class="member_top">
        <div class="member_top_logo">
          <img src="../../public/img/logo/login_row.png" />
        </div>
        <div style="display: flex; flex-direction:column; justify-content: space-between;" >
          <div  style="font-size: var(--bigFont); color: #fff; cursor: pointer;  display: flex; justify-content: flex-end;">
            <span @click="logOutMethod">{{ lang === "en" ? "Log Out" : "退出登录" }}</span>
          </div>
          <div
          style="font-size: var(--bigFont); color: #fff; cursor: pointer; "
          @click="openMemberInfo"
        >
          {{ lang === "en" ? "Member Info" : "查看详细会员信息" }}
        </div>
        </div>
        
      </div>
      <div style="padding: 20px; display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: center; height: 38px">
          <div style="width: 128px; display: flex; align-items: center;">
            <div class="icon_phone"></div>
            <div style="padding-left: 12px">电话号码</div>
          </div>
          <div style="width: 98px; line-height: 38px">
            {{ memberInfo.phone }}
          </div>
        </div>
        <div style="display: flex; justify-content: center; ">
          <div style="width: 128px; display: flex; align-items: center;">
            <img
              style="width: 28px;"
              src="../../public/img/icons/my/coin.svg"
            />
            <div style="padding-left: 10px">会员积分</div>
          </div>
          <div style="width: 98px; line-height: 38px">
            {{ memberInfo.integral }}
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: center; padding: 20px">
        <nut-button type="light" @click="cancelMethod()">{{
          lang === "en" ? "Cancel" : "取消"
        }}</nut-button>
      </div>
    </nut-popup>
  </div>
</template>

<script>
export default {
  computed: {
    lang() {
      return this.$store.state.language;
    },
    isShowMemberInfoBox() {
      return this.$store.state.isShowMemberInfoBox;
    },
    isShow: {
      //异步更新状态 不然会整出一个错
      get() {
        return this.isShowMemberInfoBox;
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  created() {
    this.pageInitMethod();
  },
  data() {
    return {
      memberInfo: {},
    };
  },
  methods: {
    logOutMethod(){
      window.localStorage.removeItem('memberInfo');
      this.$store.dispatch("setShowMemberboxMode", false);
      this.$router.push("")
    },
    cancelMethod() {
      this.$store.dispatch("setShowMemberboxMode", false);
    },
    pageInitMethod() {
      let localMemberInfo = localStorage.getItem("memberInfo");
      if (localMemberInfo) {
        localMemberInfo = JSON.parse(localMemberInfo);
        this.memberInfo.integral = localMemberInfo.integral;
        this.memberInfo.name = localMemberInfo.name;
        this.memberInfo.phone = localMemberInfo.phone;
      }
    },
    openMemberInfo() {
      this.$router.push("Memberinfopage");
    },
  },
};
</script>

<style scoped>
.member_top {
  background: #2b3543 url(../../public/img/pic/bg-page.png);
  height: 140px;
  width: 308px;
  display: flex;
  
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 20px;
}
.member_top_logo {
  align-self: flex-end;
  width: 120px;
  height: 120px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
}
.member_top_logo img {
  object-fit: contain;
  width: 100%;
  height: 100%;
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
</style>
