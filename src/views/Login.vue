<template>
  <div class="login-page">

    <el-form :model="formData" ref="loginForm" class="login-form">
<!--      <div class="type">-->
<!--        <el-button type="text" @click="changeType" v-if="phoneType">密码登录</el-button>-->
<!--        <el-button type="text" @click="changeType" v-if="screatType">手机登录</el-button>-->
<!--&lt;!&ndash;        <el-button type="text" @click="loginQr">扫码登录</el-button>&ndash;&gt;-->
<!--      </div>-->
      <!-- 账号密码登录 -->

      <el-form-item label="用户类别">
        <el-select  v-model="formData.value" placeholder="请选择" @change="change">
          <el-option label="大区管理员" value="1" ></el-option>
          <el-option label="船只操作员" value="2" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="phone" :rules="[{ required: true, message: '请输入账号名称' }]" v-show="screatType">
        <el-input v-model="formData.phone" clearable prefix-icon="fas fa-user-alt" placeholder="请输入帐号"></el-input>
      </el-form-item>
      <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码' }]" v-show="screatType">
        <el-input v-model="formData.password" type="password" prefix-icon="fas fa-unlock-alt" clearable placeholder="请输入密码"></el-input>
      </el-form-item>

      <!-- 手机验证码登录 -->
      <el-form-item prop="phone" :rules="[{ required: true,validator:(rule, value, callback)=>{(!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])\d{8}$/.test(value))) ?callback('请输入正确的手机号'):callback();}}]" v-show="phoneType">
        <el-input v-model="formData.phone" clearable prefix-icon="fas fa-user-alt" placeholder="请输手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code" :rules="[{ required: true, message: '请输入验证码' }]" v-show="phoneType">
        <div class="type">
          <el-input v-model="formData.code" clearable prefix-icon="fas fa-user-alt" placeholder="请输入验证码" maxlength="6" style="width:65%"></el-input>
          <el-button plain @click="handleSend" :disabled="msgKey" style="width:30%" size="mini">{{msgText}}</el-button>
        </div>
      </el-form-item>
      <div class="forget">
        <el-button type="text" v-show="screatType" @click="reSet">忘记密码？</el-button>
      </div>
      <el-form-item>
        <el-button type="primary" class="login-submit-btn" @click="handleSubmit">登 录</el-button>
      </el-form-item>
    </el-form>
    <!-- 二维码弹窗 -->
    <el-dialog :visible.sync="dialogVisible" width="30%" top="4%">
      <el-image :src="src"></el-image>
    </el-dialog>

    <!-- 重置密码弹窗 -->
    <el-dialog title="重置密码" style="text-align:center" :visible.sync="dialogVisible1" width="30%" top="13%">
      <el-form :model="formData" ref="loginForm" class="re-set" label-width="6em" label-position="right">
        <el-form-item prop="phone" label="手机号" :rules="[{ required: true,validator:(rule, value, callback)=>{(!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])\d{8}$/.test(value))) ?callback('请输入正确的手机号'):callback();}}]">
          <el-input v-model="formData.phone" clearable prefix-icon="fas fa-user-alt" placeholder="请输手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码" :rules="[{ required: true, message: '请输入验证码' }]">
          <div class="type">
            <el-input v-model="formData.code" clearable prefix-icon="fas fa-user-alt" placeholder="请输入验证码" maxlength="6" style="width:60%"></el-input>
            <el-button plain @click="handleSend" :disabled="msgKey" style="width:35%" size="mini">{{msgText}}</el-button>
          </div>
        </el-form-item>
        <el-form-item prop="password" label="新证码" :rules="[{ required: true, message: '请输入密码' }]">
          <el-input v-model="formData.password" type="password" prefix-icon="fas fa-unlock-alt" clearable placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePd()">确定</el-button>
          <el-button @click="dialogVisible1=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>
<!--<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>-->
<script>
import { AppRoutes } from "@/router.js";
import config from "../config/config"
// import { Select, Option} from 'element-ui'
// Vue.use(Select)
// Vue.use(Option)
export default {
  name: "Login",
  data () {
    return {

      screatType: false,
      phoneType: true,
      msgText: "发送验证码",
      msgTime: "",
      msgKey: false,
      dialogVisible: false,
      dialogVisible1: false,
      src: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      isPassword: true,
      formData: {
        phone: "",
        password: ""
      },
      seconds: "获取验证码",
      routerList: [...AppRoutes]
    };
  },
  created () {
    this.msgText = "发送验证码";
    this.msgTime = 60;
  },
  mounted () {
    window.addEventListener("keydown", this.handeleEnterDown);
  },
  methods: {
    change(){

      this.$forceUpdate()

    },
    changeType () {
      if (this.screatType) {
        this.screatType = false
      } else {
        this.screatType = true
      }
      if (this.phoneType) {
        this.phoneType = false
      } else {
        this.phoneType = true
      }
    },
    sendSmsCode () {
      let url = config.ROOT_API_URL + '/app/sms/';
      let _this = this;
      let data = {
        mobile: this.formData.phone,
        password: this.formData.password
      };
      this.$axios.post(url, data).then(function (response) {
        if (response.retCode === 0) {
          console.log("发送验证码成功，response=", response);
          _this.$message({
            message: '发送验证码成功！',
            type: 'success'
          });
        } else {
          _this.$message.error(response.retMsg)
        }
      }).catch(function (error) {
        console.log("发送验证码失败，error=", error)
      })
    },
    handleSend () {
      console.log('发送验证码接口...');
      this.sendSmsCode();
      this.msgText = this.msgTime + "秒";
      this.msgKey = true;
      const time = setInterval(() => {
        this.msgTime--;
        this.msgText = this.msgTime + "秒";
        if (this.msgTime == 0) {
          this.msgTime = 60;
          this.msgText = "发送验证码";
          this.msgKey = false;
          clearInterval(time);
        }
      }, 1000);
    },
    reSet () {
      this.dialogVisible1 = true
    },
    loginQr () {
      //请求二维码生成图片
      this.dialogVisible = true
    },
    handeleEnterDown (evt) {
      if (evt.keyCode === 13) {
        this.handleSubmit();
      }
    },
    changePd () {
      console.log(this.formData);
      let _this = this;
      let url = config.ROOT_API_URL + '/app/login/password/';
      let data = {
        mobile: this.formData.phone,
        password: this.formData.password,
        verifyCode: this.formData.code,
        // tab:this.tab
      };
      this.$axios.put(url, data).then(function (response) {
        if (response.retCode === 0) {
          _this.$message({
            message: '修改密码成功！',
            type: 'success'
          });
          _this.dialogVisible1 = false
        } else {
          _this.$message.error(response.retMsg)
        }
      }).catch(function (error) {
        console.log("修改密码失败，error=", error)
      })
    },
    handleSubmit () {
      // 手机验证码登录
      console.log('手机验证码登录');
      let url = config.ROOT_API_URL + '/pc/screen/login/';
      let _this = this;
      let data = {
        mobile: this.formData.phone,
        verifyCode: this.formData.code,
        tab:this.formData.value,
      };
      this.$axios.post(url, data).then(function (response) {
        console.log("response", response);
        if (response.retCode===0) {
          localStorage.setItem("cityId", response.data.city_id);
          localStorage.setItem("ryToken", response.data.ry_token);
          _this.$message({
            message: '登录成功！',
            type: 'success'
          });
          _this.$router.replace({
            path: "/wideScreen"
          });
        } else {
          _this.$message.error(response.retMsg)

        }
      }).catch(function (error) {
        console.log('error---------');
        console.log(error)
      })
    }
  },
  destroyed () {
    window.removeEventListener("keydown", this.handeleEnterDown);
  }
};
</script>
<style lang="scss">
.forget {
  display: flex;
  justify-content: flex-end;
}
.type {
  display: flex;
  justify-content: space-between;
}
.msg-text {
  display: block;
  width: 60px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
}
.msg-text.display {
  color: rgb(3, 2, 2);
}
.login-page {
  background: url(../assets/data/login2.png) no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  padding: 1px 0;
  min-height: 100vh;
  background-color: #f8f8f8;
  box-sizing: border-box;
  position: relative;
  // background-image: url();
}
.login-form {
  position: absolute;
  width: 400px;
  height: 220px;
  left: calc(50% - 180px);
  top: 485px;
  padding: 0 2.5em;
}
.re-set {
  width: 400px;
  height: 220px;
  // left: calc(25% - 90px);
  top: 540px;
  padding-right: 2.5em;
}
.login-submit-btn {
  width: 100%;
  font-size: 1.1em;
  border-color: #16d4d0;
  background-color: #16d4d0;
}
.login-submit-btn:hover {
  width: 100%;
  font-size: 1.1em;
  border-color: #16d4d0;
  background-color: #16d4d0;
}
</style>
