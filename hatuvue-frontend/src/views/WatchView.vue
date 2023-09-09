<template>
  <div class="watch-view" v-if="isLoaded">
    <div class="video-wrapper">
      <video-player
        class="video"
        :src="`${getServer()}/files/uploads/${video.filename}`"
        controls
        preload="auto"
      />

      <div class="info">
        <div class="title">{{ video.name }}</div>
        <div class="video-interact">
          <img class="author-profile" />
          <div class="author">{{ video.author }}</div>
          <div class="button-wrapper">
            <div class="like"><button class="button">like</button></div>
            <div class="dislike"><button class="button">dislike</button></div>
          </div>
        </div>
      </div>
      <div class="comments"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { getServer, request } from "@/util/server";
import { Video } from "@/util/video";
import { defineComponent } from "vue";
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";
// import storage from "@/util/storage";

interface Data {
  video: Video;
  isLoaded: boolean;
}

interface GetVideoRes {
  message: string;
  data: Video;
}

export default defineComponent({
  name: "WatchView",
  components: {
    VideoPlayer,
  },
  data() {
    return {
      video: {},
      isLoaded: false,
    } as Data;
  },
  methods: {
    getServer() {
      return getServer();
    },
  },
  mounted() {
    request
      .get<GetVideoRes>(`video?id=${this.$route.params.id}`)
      .then((res) => {
        if (res?.data.data) {
          this.video = res?.data.data;
          console.log(res?.data);
          this.isLoaded = true;
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  },
});
</script>
<style lang="scss">
.watch-view {
  display: flex;
  justify-content: center;
  .video-wrapper {
    width: 1000px;
    aspect-ratio: 16/9;
    .video {
      z-index: 0;
      min-height: 100%;
      min-width: 100%;
      border: 1px solid black;
      aspect-ratio: 16 / 9;
      max-width: 100%;
      max-height: 100%;
      position: relative;
    }
    .info {
      margin-top: 15px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .title {
        font-size: 1.4rem;
      }

      .video-interact {
        margin-top: 10px;
        display: flex;
        align-items: center;
        width: 100%;
        .author-profile {
          width: 40px;
          aspect-ratio: 1/1;
          border-radius: 50%;
          border: 1px solid black;
          margin-right: 10px;
        }
        .button-wrapper {
          margin-left: auto;
          display: flex;
          button {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
