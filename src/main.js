import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import echarts from "echarts";
import DataV from "@jiaminghi/data-view";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/index.css"; // global css
import locale from "element-ui/lib/locale/lang/zh-CN"; // lang i18n
import VueVideoPlayer from "vue-video-player";
// import "videojs-contrib-hls/dist/videojs-contrib-hls";

import "videojs-contrib-hls";
import "video.js/dist/video-js.css";
// import 'vue-video-player/src/custom-theme.css'

Vue.use(VueVideoPlayer);
import VideoPlayer from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
Vue.use(VideoPlayer);
// Vue.prototype.$video = Video;

// process.env.VUE_APP_USE_MOCK === "true" && require("./mock");
Vue.prototype.$BASE_API = process.env.VUE_APP_BASE_API || "";
Vue.prototype.$BMAP_AK = process.env.VUE_APP_BMAP_AK || "";
Vue.config.productionTip = false;
// ElementUI 注册
Vue.use(ElementUI);
Vue.use(DataV);
Vue.prototype.$echarts = echarts;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
