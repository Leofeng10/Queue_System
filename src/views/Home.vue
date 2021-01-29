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
            <div @click="changePage(item)" :class="item.choosed ? 'choosed' : ''">{{ item.name }}</div>
          </div>
        </div>

        <!-- Tables -->
        <div class="container">
          <div
            v-for="(item, index) in tableArray" 
            v-bind:key="index"
            v-if="item.capacity <= maxCap && item.capacity > minCap"
            class="table"
            :class="item.capacity <= 2
                      ? (item.status ? 'table1' : 'table1_2')
                      : item.capacity <= 4 ? (item.status ? 'table2' : 'table2_2')
                                      : item.capacity <= 8 ? (item.status ? 'table3' : 'table3_2')
                                                      : item.status ? 'table4' : 'table4_2'"
          >
            <div style="height: 20px; width: 100%;"></div>
            <div style="height: 40px; font-size: 28px; padding-top: 5px;">{{ item.num }}</div>
            <div style="display: flex; width: 100%; justify-content: flex-end;">
              <div style="position: relative;">{{ item.capacity }}</div>
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
      maxCap: 10,
      minCap: 0,
      capacityArray: [
        {
          index: 0,
          name: "All",
          num: 0,
          choosed: true,
        },
        {
          index: 1,
          name: "2",
          num: 2,
          choosed: false,
        },
        {
          index: 2,
          name: "4",
          num: 4,
          choosed: false,
        },
        {
          index: 3,
          name: "8",
          num: 8,
          choosed: false,
        },
        {
          index: 4,
          name: ">8",
          num: 100,
          choosed: false,
        },
      ],
      tableArray: [
        {
          num: 1,
          capacity: 4,
          status: true // true means occupied
        },
        {
          num: 2,
          capacity: 2,
          status: true
        },
        {
          num: 3,
          capacity: 6,
          status: true
        },
        {
          num: 4,
          capacity: 4,
          status: true
        },
        {
          num: 5,
          capacity: 4,
          status: true
        },
        {
          num: 6,
          capacity: 2,
          status: true
        },
        {
          num: 7,
          capacity: 4,
          status: false
        },
        {
          num: 8,
          capacity: 8,
          status: true
        },
        {
          num: 9,
          capacity: 2,
          status: true
        },
        {
          num: 10,
          capacity: 4,
          status: true
        },
        {
          num: 11,
          capacity: 6,
          status: false
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
    changePage(item) {
      this.capacityArray.forEach((el) => {
        el.choosed = false;
      })
      item.choosed = true;
      if (item.index === 0) {
        this.minCap = 0;
        this.maxCap = 100;
      } else {
        this.minCap = this.capacityArray[item.index - 1].num;
        this.maxCap = item.num;
      }
    }
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
  align-items: center;
  justify-content: center;
  border: 4px solid #dddddd;
  border-radius: 20px;
  height: 80px;
  width: 120px;
}
.table img {
  width: 25px;
  height: 20px;
}
.table1 {
  background-color: #74b9ff;
  border: 4px solid #74b9ff;
  color: #ffffff;
}
.table1_2 {
  border: 4px solid #74b9ff;
  color: #74b9ff;
}
.table2 {
  background-color: #f8c291;
  border: 4px solid #f8c291;
  color: #ffffff;
}
.table2_2 {
  border: 4px solid #f8c291;
  color: #f8c291;
}
.table3 {
  background-color: #a29bfe;
  border: 4px solid #a29bfe;
  color: #ffffff;
}
.table3_2 {
  border: 4px solid #a29bfe;
  color: #a29bfe;
}
.table4 {
  background-color: #b8e994;
  border: 4px solid #b8e994;
  color: #ffffff;
}
.table4_2 {
  border: 4px solid #b8e994;
  color: #b8e994;
}
</style>
