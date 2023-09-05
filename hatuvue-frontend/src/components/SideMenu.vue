<template>
  <div class="sidemenu-wrapper">
    <div class="black" @click="setSideMenu(false)" v-show="sideMenu"></div>
    <Transition name="menu">
      <div class="menu" v-show="sideMenu"></div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "SideMenu",
  data() {
    return {};
  },
  computed: {
    ...mapState(["sideMenu"]),
  },
  methods: {
    ...mapActions(["toggleSideMenu", "setSideMenu"]),
  },
});
</script>

<style lang="scss">
.sidemenu-wrapper {
  .menu-enter-active,
  .menu-leave-active {
    transition: margin-left 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .menu-enter-from,
  .menu-leave-to {
    margin-left: -300px;
  }

  .black {
    transition: all 1s;
    position: fixed;
    width: 100vw;
    height: calc(100vh - 5rem);
    // margin-top: 5rem;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .menu {
    width: 300px;
    position: fixed;
    // margin-top: 5rem;
    height: calc(100vh - 5rem);
    background-color: white;
  }
}
</style>
