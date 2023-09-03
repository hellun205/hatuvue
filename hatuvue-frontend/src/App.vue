<template>
  <Header />
  <router-view />
</template>

<script lang="ts">
import Header from "./components/AppHeader.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import "Constance.scss";

* {
  font-family: "Apple SD Gothic Neo", "애플 SD 산돌고딕 Neo",
    "AppleSDGothicNeoM00", "맑은 고딕", "Malgun Gothic", Helvetica, Arial,
    sans-serif;
}

body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
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
</style>
