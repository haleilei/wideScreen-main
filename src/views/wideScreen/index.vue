<template>
  <div class="data-page">
    <div class="cell">
      <ls></ls>
    </div>
    <div class="cell">
      <cs></cs>
    </div>
    <div class="cell">
      <rs></rs>
    </div>
  </div>
</template>

<script>
import ls from "./leftScreen";
import cs from "./centerScreen";
import rs from "./rightScreen";
import config from "../../config/config";
import eventBus from "../../config/EventBus";
export default {
  components: {
    ls,
    cs,
    rs
  },
  data () {
    return {
      // 调用接口获取的船只的信息
      shipList: [],
      // 融云获取的实时信息
      shipInfoList: [],
      cityId: localStorage.getItem("cityId")
    };
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
  mounted () {
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
        console.log('融云更新会话汇总:', updatedConversationList);
        let shipInfoList = [];
        for(let i=0;i<updatedConversationList.length;i++) {
          console.log("打印融云会话状态", updatedConversationList[i].latestMessage.isOffLineMessage);
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
.data-page {
  top: 0;
  left: 0;
  height: 1440px;
  width: 7680px;
  display: flex;
  .cell {
    height: 100%;
    width: 100%;
    background: url(../../assets/data/wideScreenBg.png) center;
  }
}
</style>
