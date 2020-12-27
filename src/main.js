import Vue from "vue";
import App from "./App.vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";
import store from "./store";
import VueParticles from "vue-particles";
import VCharts from "v-charts";
import Vcomp from "./components/index";
import Axios from "@/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/iconfont/iconfont.css";
import "./assets/css/global.scss";
import i18n from "./lang";
import VueI18n from "vue-i18n";
import BaiduMap from 'vue-baidu-map';
import VideoPlayer from 'vue-video-player'
import qs from 'qs';
import 'videojs-flash';

require('vue-video-player/src/custom-theme.css');
require('video.js/dist/video-js.css');

Vue.use(VideoPlayer);
Vue.use(VueParticles);
Vue.use(VCharts);
Vue.use(Vcomp);
Vue.use(VueI18n, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(BaiduMap, {
  ak: 'GqVk1GMrZutVQayBLtYhXyd4NTD1j21k'
})
Vue.use(ElementUI, {
  size: 'small'
});


Vue.prototype.$axios = Axios;
Vue.prototype.$qs = qs;
Vue.config.productionTip = "/api";
// Vue.prototype.baseUrl = process.env.NODE_ENV === "production"?"http://192.168.1.107:8080/api/v1":"http://localhost:8080/api/v1"

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
