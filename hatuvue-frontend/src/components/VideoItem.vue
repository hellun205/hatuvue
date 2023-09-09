<template>
  <div class="video-item" :style="{ width: width }">
    <img class="thumbnail" :src="thumbnail" />
    <div class="info">
      <img class="profile" :src="profile" />
      <div class="info2">
        <div class="name">{{ name }}</div>
        <div class="author">{{ author }}</div>
        <div class="view">조회수 {{ view }} · {{ date?.toDateString() }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VideoItem",
  props: {
    name: String,
    profile: String,
    author: String,
    view: Number,
    date: Date,
    thumbnail: String,
    width: String,
  },
});
</script>
<style lang="scss">
@import "../Constance.scss";
.video-item {
  cursor: pointer;
  .thumbnail {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 10px;
    border: 1px dotted black;
  }

  .profile {
    border-radius: 50%;
    border: 1px solid black;
    width: 40px;
    height: 40px;
  }

  .info {
    display: flex;
    margin-top: 0.7rem;
  }

  .name {
    font-size: 1.25rem;
    line-height: 1.5rem;
  }

  .info2 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 0.7rem;
  }

  .author,
  .view {
    color: $text-gray;
  }
}
</style>
