<template>
  <div id="login">
    <nut-popup
      v-model="isShow"
      style=" color: #666;"
      class="home_success"
      :close-on-click-overlay="false"
      :z-index="11"
      get-container="#home"
    >
      <div style="font-size: var(--bigFont); padding-bottom: 12px;">
        {{ lang === "en" ? "Member Login" : "会员登录" }}
      </div>
      <div style="padding-top: 20px">
        <nut-tab class="login-tab" @tab-switch="tabSwitch">
          <nut-tab-panel tab-title="短信登录" style="font-size:22px;">
            <div class="login-first">
              <cube-input
                style="background-color: white; border: solid 1px gray;"
                type="number"
                v-model="loginInfo.phone"
                :placeholder="lang === 'ch' ? '电话号码' : 'PHONE'"
              ></cube-input>
            </div>
            <div class="login-second">
              <div>
                <cube-input
                  style="background-color: white; border: solid 1px gray;"
                  v-model="loginInfo.otpcode"
                  :placeholder="lang === 'ch' ? '验证码' : 'OTP'"
                  :eye="{ visible: false, blurHidden: true }"
                ></cube-input>
              </div>
              <div style="margin-left: 8px; ">
                <nut-button
                  :disabled="isHaveOtp"
                  style="padding: 0; width: 98px;"
                  type="light"
                  @click="getOTP()"
                >
                  <span v-if="isHaveOtp">{{ countSecond }}</span>
                  <span v-else>{{
                    lang === "ch" ? "获取验证码" : "Get OTP"
                  }}</span>
                </nut-button>
              </div>
            </div>
          </nut-tab-panel>
          <nut-tab-panel tab-title="密码登录"  style="font-size:22px">
            <div class="login-first">
              <cube-input
                style="background-color: white; width: 296px; border:1px solid gray;"
                type="number"
                v-model="loginInfo.phone"
                :placeholder="lang === 'ch' ? '电话号码' : 'PHONE'"
              ></cube-input>
            </div>
            <div class="login-second">
              <cube-input
                style="background-color: white; width: 296px; border: solid 1px gray;"
                type="password"
                v-model="loginInfo.password"
                :placeholder="lang === 'ch' ? '用户密码' : 'Password'"
                :eye="{ visible: false, blurHidden: true }"
              ></cube-input>
            </div>
          </nut-tab-panel>
        </nut-tab>
      </div>
      <div style="display: flex; justify-content: center;">
        <div style="margin: 0 10px">
          <nut-button type="light" @click="cancelMethod()">{{
            lang === "en" ? "Cancel" : "取消"
          }}</nut-button>
        </div>
        <div style="margin: 0 10px">
          <nut-button v-if="isLogin" @click="loginMethod()">{{
            lang === "en" ? "Login" : "登录"
          }}</nut-button>
        </div>
      </div>
    </nut-popup>
  </div>
</template>

<script>
export default {
  mounted() {
    this.pageInitMethod();
  },
  computed: {
    lang() {
      return this.$store.state.language;
    },
    isShowLoginBox() {
      return this.$store.state.isShowLoginBox;
    },
    isShow: {
      //异步更新状态 不然会整出一个错
      get() {
        return this.isShowLoginBox;
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  data() {
    return {
      isLogin: true,
      loginInfo: {},
      newUser: {},
      isHaveOtp: false,
      countSecond: 0,
      isOtpLogin: 0,
    };
  },
  methods: {
    tabSwitch(item) {
      this.isOtpLogin = item;
    },
    async getOTP() {
      if (
        !this.loginInfo.phone ||
        this.loginInfo.phone.toString().length != 8
      ) {
        this.$toast.warn(
          this.lang === "ch" ? "请输入电话号码" : "Please phone number"
        );
        return;
      }
      let otpInfo = await this.$axios.post(
        this.$sysConfig.server + "/member/getOtp",
        {
          phoneNum: this.loginInfo.phone,
        }
      );
      console.log(otpInfo);
      if (otpInfo.data.code === 200) {
        this.isHaveOtp = true;
        this.countSecond = 60;
        let otpInterval = setInterval(() => {
          this.countSecond--;
          if (this.countSecond <= 0) {
            this.isHaveOtp = false;
            clearInterval(otpInterval);
          }
        }, 1000);
      } else {
        this.$toast.warn(
          this.lang === "ch"
            ? "服务器正忙,请稍后重试"
            : "Server busy, Please try again."
        );
      }
    },
    pageInitMethod() {
      this.loginInfo = {};
    },
    changeMode() {
      this.isLogin = !this.isLogin;
      console.log(this.isLogin);
    },
    cancelMethod() {
      this.$store.dispatch("setLoginBox", false);
    },
    async loginMethod() {
      if (
        !this.loginInfo.phone ||
        this.loginInfo.phone.toString().length != 8
      ) {
        this.$toast.warn("请输入电话和密码");
        return;
      }
      if (this.isOtpLogin) {
        this.passwordLoginMethod();
      } else {
        this.otpLoginMethod();
      }
    },
    async otpLoginMethod() {
      let cookieId = this.$cookies.get("orderId");
      let loginInfo = await this.$axios.post(
        this.$sysConfig.server + "/member/login_otp",
        {
          phoneNum: this.loginInfo.phone,
          otpcode: this.loginInfo.otpcode,
          orderId: cookieId,
        }
	  );
	  
      console.log(loginInfo);
      if (loginInfo.data.code === 200) {
        console.log("done");
        let saveInfo = {
          integral: loginInfo.data.integral,
          name: loginInfo.data.name,
          phone: loginInfo.data.phone,
        };
        localStorage.setItem("memberInfo", JSON.stringify(saveInfo));
        this.$store.dispatch("setMember", saveInfo);
        this.$toast.success("登录成功！");
        this.cancelMethod();
      } else if (loginInfo.data.code === 402) {
        this.$toast.fail(this.lang === "ch" ? "验证码超时" : "OTP timeout");
      } else {
        this.$toast.fail(this.lang === "ch" ? "验证码错误" : "OTP wrong");
      }
    },
    async passwordLoginMethod() {
      try {
        let cookieId = this.$cookies.get("orderId");
        let loginInfo = await this.$axios.post(
          this.$sysConfig.server + "/member/login",
          {
            phoneNum: this.loginInfo.phone,
            password: this.loginInfo.password,
            orderId: cookieId,
          }
        );
        if (loginInfo.data.code === 0) {
          console.log("done");
          let saveInfo = {
            integral: loginInfo.data.integral,
            name: loginInfo.data.name,
            phone: loginInfo.data.phone,
            id: loginInfo.data.id,
          };

          localStorage.setItem("memberInfo", JSON.stringify(saveInfo));
          this.$store.dispatch("setMember", saveInfo);
          this.$toast.success("登录成功！");
          this.cancelMethod();
        } else if (loginInfo.data.code === 1) {
          this.$toast.fail("用户名或密码错误");
        } else if (loginInfo.data.code === 402) {
          this.$toast.fail(
            this.lang === "ch" ? "请使用验证码登录" : "Please use OTP login"
          );
        } else {
          this.$toast.fail("登录时发生错误");
        }
        console.log(loginInfo);
      } catch (error) {
        console.log(error);
        this.$toast.fail("用户登录时服务器发生错误:" + error);
      }
    },
  },
};
</script>

<style scoped>
.login-first {
  padding-top: 20px;
}
.login-second {
  padding-top: 20px;
  display: flex;
  align-items: center;
}
.login-tab /deep/ .nut-tab {
  padding: 0;
 
}
.login-tab /deep/ .nut-tab .nut-tab-title .nut-title-nav-list .nut-tab-link {
  font-size: var(--mainFont);
}
</style>
