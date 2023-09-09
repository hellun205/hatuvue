<template>
  <router-link class="video-item" :to="`/watch/${id}`">
    <!-- <div class="video-item"> -->
    <img class="thumbnail" :src="thumbnail" :alt="`thumbnail of ${name}`" />
    <div class="info">
      <img class="profile" :src="profile" :alt="`author profile of ${name}`" />
      <div class="info2">
        <div class="name">{{ name }}</div>
        <div class="author">{{ author }}</div>
        <div class="view">조회수 {{ view }} · {{ date?.toDateString() }}</div>
      </div>
    </div>
    <!-- </div> -->
  </router-link>
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
    id: Number,
  },
});
</script>
<style lang="scss">
@import "../Constance.scss";
@media (min-width: 0px) {
  .video-item {
    width: 200px;
  }
}
@media (min-width: 300px) {
  .video-item {
    width: 100%;
  }
}

@media (min-width: 580px) {
  .video-item {
    width: calc(50% - 20px);
  }
}

@media (min-width: 1080px) {
  .video-item {
    width: calc(33% - 20px);
  }
}

@media (min-width: 1580px) {
  .video-item {
    width: calc(25% - 20px);
  }
}

@media (min-width: 2080px) {
  .video-item {
    width: calc(20% - 20px);
  }
}

.video-item {
  cursor: pointer;
  max-width: 500px;
  .thumbnail {
    min-width: 100%;
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
