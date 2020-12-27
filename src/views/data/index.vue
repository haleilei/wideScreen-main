<template>
  <div class="main-data-page">
    <dheader></dheader>
    <div class="data-content">
      <div class="data-time">
        <!-- {{ $t("data.index") }} -->
      </div>
      <div class="data-main">
        <div class="main-left">
          <dleft :personalData="personalData" :username="username"></dleft>
        </div>
        <div class="main-center">
          <dcontent :numberData="numberData" :username="username"></dcontent>
        </div>
        <div class="main-right">
          <dright :testprops="testprops"></dright>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dheader from "./dheader";
import dleft from "./dleft";
import dcontent from "./dcontent";
import dright from "./dright";
// import RongIMLib from "../../config/RongIMLib-3.0.2-dev"
import config from "../../config/config"
import eventBus from "../../config/EventBus"
export default {
  components: {
    dheader,
    dleft,
    dcontent,
    dright
  },
  data () {
    return {
      isShow: false,
      pageShow: true,
      personalData: {},
      testprops: 0,
      numberData: {},
      username: "",
      im: '',
      ryToken: "",
      shipInfoList: [],
    };
  },
  created () {
  },
  methods: {
    shipDynamic () {
      console.log('组件加载，获取船的实时信息');
      let url = config.ROOT_API_URL + '/pc/ship/dynamic/';
      let _this = this;
      let data = {
        cityId: localStorage.getItem("cityId"),
      };
      this.$axios.post(url, data).then(function (response) {
        console.log("response", response);
        if (response.retCode===0) {
          console.log("向后台发送获取船的实时数据成功.....")
        } else {
          _this.$message.error(response.retMsg)
        }
      }).catch(function (error) {
        console.log('error---------');
        console.log(error)
      })
    },
    deleteShipDynamic () {
      console.log("监听浏览器关闭");
      let url = config.ROOT_API_URL + '/pc/delete/ship/dynamic/';
      // let url = 'http://127.0.0.1:8000/qingdaofu/listenPageShutdown';
      let _this = this;
      let data = {
        cityId: localStorage.getItem("cityId"),
      };
      this.$axios.get(url, {
          params: data
      }).then(function (response) {
        console.log("response", response);
        if (response.retCode===0) {
          console.log("监听浏览器关闭，向后台发送请求，告诉后台别再给我发数据.....")
        } else {
          _this.$message.error(response.retMsg)
        }
      }).catch(function (error) {
        console.log('error---------');
        console.log(error)
      })
    }
  },
  mounted() {
    this.shipInfoList = [];
    this.im = null;
    // 启动前，发post请求，获取船的实时数据
    this.shipDynamic();
    // 获取融云token
    this.ryToken = localStorage.getItem("ryToken");
    console.log("获取融云token，", this.ryToken);
    if(this.ryToken===null) {
      this.$router.replace({
        path: "/login"
      });
    }
    // 初始化
    // eslint-disable-next-line no-undef
    let im = RongIMLib.init({
      appkey: "c9kqb3rdc23xj"
    });
    this.im = im;
    let conversationList = []; // 当前已存在的会话列表
    im.watch({
      conversation: function(event){
        let updatedConversationList = event.updatedConversationList; // 更新的会话列表
        // console.log('融云更新会话汇总:', updatedConversationList);
        let shipInfoList = [];
        for(let i=0;i<updatedConversationList.length;i++) {
          // console.log("打印融云会话状态", updatedConversationList[i].latestMessage.isOffLineMessage);
          if(!updatedConversationList[i].latestMessage.isOffLineMessage) {
            let content = JSON.parse(updatedConversationList[i].latestMessage.content.content);
            // console.log("content=",content);
            for (let j=0;j<content.length;j++){
              shipInfoList.push(content[j])
            }
          }
        }
        // 总线发送船实时数据
        eventBus.$emit("shipInfoList", shipInfoList);
        im.Conversation.merge({
          conversationList,
          updatedConversationList
        });
      },
      // message: function(event){
      //   let message = event.message;
      //   console.log('收到新消息:', message);
      // },
      status: function(event){
        let status = event.status;
        console.log('连接状态码:', status);
      }
    });
    /* 开发者后台获取或 Server API */
    let user = {
      token: this.ryToken
    };
    this.im.connect(user).then(function(user) {
      console.log('链接成功, 链接用户 id 为: ', user.id);
    }).catch(function(error) {
      console.log('链接失败: ', error.code, error.msg);
    });
    // 监听浏览器关闭
    window.addEventListener('beforeunload', e => {
      this.deleteShipDynamic();
      console.log("监听浏览器关闭,向服务器发送请求", e);
    });
  },
  beforeDestroy() {
    console.log("浏览器关闭");
    this.im.disconnect().then(function() {
      console.log('断开链接成功');
    });
  },
  destroyed() {
    window.addEventListener('beforeunload', e => {
      this.deleteShipDynamic();
      console.log("监听浏览器关闭,向服务器发送请求", e);
    });
  }
};
</script>

<style lang="scss">
.main-data-page {
  background: url(../../assets/data/bg.jpg) center;
  top: 0;
  left: 0;
  width: 2880px;
  height: 1620px;
  .data-content {
    padding-bottom: 20px;
    .data-time {
      width: 100%;
      height: 25px;
      color: #fff;
      font-size: 12.8px;
      text-align: center;
    }
    .data-main {
      width: calc(100% - 40px);
      margin-bottom: 40px;
      margin-left: 20px;
      height: 720px;

      .main-left {
        width: 23%;
        float: left;
      }
      .main-center {
        float: left;
        width: 48%;
        padding: 0 20px 0 20px;
      }
      .main-right {
        float: left;
        width: 29%;
        height: 615px;
      }
    }
  }
}
</style>
