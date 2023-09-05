<template>
  <Header />
  <SideMenu />
  <div class="content">
    <div class="router-view"><router-view /></div>
  </div>
</template>

<script lang="ts">
import Header from "./components/AppHeader.vue";
import SideMenu from "./components/SideMenu.vue";

export default {
  name: "App",
  components: {
    Header,
    SideMenu,
  },
};
</script>

<style lang="scss">
@import "Constance.scss";

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Apple SD Gothic Neo", "애플 SD 산돌고딕 Neo",
    "AppleSDGothicNeoM00", "맑은 고딕", "Malgun Gothic", Helvetica, Arial,
    sans-serif;
}

body {
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.router-link-active {
  color: black;
}

a {
  color: black;
  text-decoration-line: none;
}

input {
  transition: border-color 0.2s;
  padding: 0.6rem;
  border-radius: 5px;
  border: 1px solid black;
  outline: none;

  &:focus {
    border-color: $pri;
  }
}

button {
  padding: 0.6rem 1rem 0.6rem 1rem;
  border-radius: 7px;
  border: none;
  outline: none;
  background-color: $pri-light;
  user-select: none;
  cursor: pointer;
}

.button {
  transition: background-color 0.2s;

  &:hover {
    background-color: $pri-light-hover;
  }

  &:active {
    background-color: $pri-light-active;
  }
}

.content {
  display: flex;
  width: 100vw;

  height: calc(100vh - 5rem);
  // height: 500px;
  margin-top: 5rem;
  overflow: scroll;
}

.router-view {
  // overflow: visible;
  width: 100%;
  // height: 100%;
  // margin-top: 5rem;
}
</style>
