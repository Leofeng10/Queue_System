<template>
  <div id="home">
    <!-- Header starts -->
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
        <div @click="openSettingMethod()">
          <img
            src="../../public/img/pic/setting_icon.svg"
            alt=""
            style="width: 30px; height: 30px"
          />
        </div>
      </div>
      <nut-popup
        v-model="isShowConfirmBox"
        style="color: #666; width: 30%; height: 350px; border-radius: 30px"
        :z-index="11"
      >
        <div style="background-color: #202a39; height: 15%"></div>
        <div
          style="
            display: flex;
            justify-content: center;
            height: 60%;
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
    </div>

    <!-- Body starts -->
    <div>
      <!-- Left part -->
      <div style="width: 70%">
        <!-- Navbar -->
        <div class="navbar">
          <div
            v-for="(item, index) in capacityArray"
            v-bind:key="index"
            class="capacity"
          >
            <div v-if="item.choosed" class="choosed">{{ item.name }}</div>
            <div v-else>{{ item.name }}</div>
          </div>
        </div>

        <!-- Tables -->
        <div class="container">
          <div v-for="(item, index) in tableArray" v-bind:key="index" class="table">
            <div style="">{{ item.num }}</div>
            <div style="display: flex; justify-content: flex-end;">
              <div style="position: relative;">{{ item.cap }}</div>
              <img src="../../public/img/icons/person.svg" alt="people">
            </div>
          </div>
        </div>
      </div>
      <!-- right part -->
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import CubePage from "../components/CubePage";

export default {
  components: {
    CubePage,
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
  data() {
    return {
      nowTime: "",
      isShowConfirmBox: false,
      capacityArray: [
        {
          name: "All",
          choosed: true,
        },
        {
          name: "2",
          choosed: false,
        },
        {
          name: "4",
          choosed: false,
        },
        {
          name: "8",
          choosed: false,
        },
        {
          name: ">8",
          choosed: false,
        },
      ],
      tableArray: [
        {
          num: 1,
          cap: 4
        },
        {
          num: 2,
          cap: 2
        },
        {
          num: 3,
          cap: 6
        },
        {
          num: 4,
          cap: 4
        },
        {
          num: 5,
          cap: 4
        },
        {
          num: 6,
          cap: 2
        },
        {
          num: 7,
          cap: 4
        },
        {
          num: 8,
          cap: 8
        },
        {
          num: 9,
          cap: 2
        },
        {
          num: 10,
          cap: 4
        },
        {
          num: 11,
          cap: 6
        },
      ]
    };
  },
  methods: {
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
    changeLanguageMethod() {
      if (this.lang === "en") {
        this.$store.dispatch("setLanguage", "ch");
        localStorage.setItem("language", "ch");
      } else {
        this.$store.dispatch("setLanguage", "en");
        localStorage.setItem("language", "en");
      }
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      this.nowTime =
        hh + ":" + mm + ":" + ss + "  " + date + "/" + month + "/" + year;
    },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes);
      this.nowTimes = null;
    },
  },
};
</script>

<style scpoed>
#headpart {
  width: 100%;
  background-color: #202a39;
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: space-between;
}
.headpart_left {
  align-items: center;
  padding: 20px;
}
.headpart_center {
  color: white;
  width: 300px;
  font-size: 30px;
}
.headpart_right {
  margin-right: 10px;
  justify-items: flex-end;
}
.override {
  width: 262px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  height: 44px;
}
.navbar {
  display: flex;
  justify-content: left;
  align-items: center;
  height: 80px;
  margin-left: 20px;
}
.capacity {
  border: 2px solid #dddddd;
  border-radius: 7px;
  height: 34px;
  width: 60px;
  margin: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.choosed {
  background-color: #dddddd;
  width: 100%;
  line-height: 34px;
  text-align: center;
}
.container {
  display: grid;
  margin-left: 30px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px 0;
}
.table {
  display: flex;
  flex-direction: column;
  border: 4px solid #dddddd;
  border-radius: 20px;
  height: 80px;
  width: 120px;
}
.table img {
  width: 25px;
  height: 20px;
}
</style>
