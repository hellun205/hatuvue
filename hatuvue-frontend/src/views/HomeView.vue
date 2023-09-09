<template>
  <div class="home">
    <VideoItem
      v-for="(v, i) in videos"
      :key="i"
      :name="v.name"
      :author="v.author"
      profile=""
      :date="new Date(v.uploadat)"
      :view="v.view"
      thumbnail=""
      width="400px"
    >
    </VideoItem>
  </div>
</template>

<script lang="ts">
import VideoItem from "@/components/VideoItem.vue";
import { request } from "@/util/server";
import { Video } from "@/util/video";
import { defineComponent } from "vue";

interface Data {
  videos: Video[];
}

interface GetVideoRes {
  message: string;
  data: Video[];
}

export default defineComponent({
  name: "HomeView",
  components: { VideoItem },
  data() {
    return {
      videos: [],
    } as Data;
  },
  methods: {
    async LoadVideos() {
      request.get<GetVideoRes>(`video`).then((res) => {
        if (res?.data.data) this.videos = res?.data.data;
      });
    },
  },
  mounted() {
    this.LoadVideos();
  },
});
</script>

<style lang="scss">
.home {
  height: 200vh;
}
</style>
