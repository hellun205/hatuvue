<template>
  <div class="header">
    <router-link class="icon" to="/">hatuvue</router-link>
    <div class="search">
      <input />
      <button>검색</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeader",
});
</script>

<style lang="scss">
.header {
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    user-select: none;
    font-size: 1.5rem;
    font-weight: bold;
    // margin-right: auto;
    padding: 0.5rem;
    letter-spacing: 0.15rem;
    color: rgb(255, 0, 191);

    position: absolute;
    left: 2rem;
  }

  .search {
    // margin-right: auto;

    & input {
      width: 400px;
      border-radius: 30px 0px 0px 30px;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }

    & button {
      border: 1px solid black;
      border-left: none;
      padding-left: 1.1rem;
      padding-right: 1.5rem;
      border-radius: 0px 30px 30px 0px;
    }
  }
}
</style>
