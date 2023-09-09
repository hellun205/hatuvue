<template>
  <div class="home">
    <h1>안녕하세요 hello</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Data {
  videos: string[];
}

export default defineComponent({
  name: "HomeView",
  components: {},
  data() {
    return {
      videos: [],
    } as Data;
  },
  // mounted() {},
});
</script>

<style lang="scss">
.home {
  height: 200vh;
}
</style>
