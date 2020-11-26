<template>
  <div></div>
</template>

<script>
// 组件内引用vue-video-player插件
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";

export default {
  name: "video",
  components: {
    videoPlayer
  },
  data() {
    return {
      playerOptions: {
        autoplay: true, //如果true,浏览器准备好时开始回放。(好像微信浏览器不太行)
        live: true,
        techOrder: ["html5"], // 需要加载的插件，如果是要兼容flash的话，必须先加载flash。顺序不能错：['flash','html5']
        flash: {
          hls: { withCredentials: false }
        },
        html5: { hls: { withCredentials: false } },
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        language: "en", // 提示的语言 中文的话是 zh-CN
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度 0.7倍...
        sources: [
          {
            // type: "video/mp4", // 类型。
            src: "rtmp://218.89.68.166:1110/camera/114" // 视频流路径
          }
        ],
        video: "rtmp://218.89.68.166:1110/camera/114",
        // poster: "/static/images/author.jpg", //你的封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controls: true, // 是否显示操作条
        controlBar: {
          // 播放的操作
          timeDivider: true, // 时间分割线
          durationDisplay: true, // 总时间
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      console.log("the player is readied", player);
      // you can use it to do something...
      // player.[methods]
    }
  }
};
</script>
<style lang="scss" scoped>
.content_video .video-js .vjs-big-play-button {
  font-size: 1.5em;
  width: 2.5em;
  border-radius: 50%;
  top: 40%;
  left: 45%;
}
.content_video {
  text-align: left;
  padding: 0 7%;
}
</style>


