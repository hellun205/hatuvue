<template>
  <div class="home">
    <div v-for="(v, i) in videos" :key="i">
      {{ v.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { request } from "@/util/server";
import { Video } from "@/util/video";
import { defineComponent } from "vue";

interface Data {
  videos: Video[];
}

interface GetVideoRes {
  message: string;
  data: Video;
}

export default defineComponent({
  name: "HomeView",
  components: {},
  data() {
    return {
      videos: [],
    } as Data;
  },
  methods: {
    async LoadVideos() {
      request.get<GetVideoRes>(`video?id=4`).then((res) => {
        if (res?.data.data) this.videos.push(res?.data.data);
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
