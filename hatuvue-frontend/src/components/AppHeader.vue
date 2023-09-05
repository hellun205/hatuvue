<template>
  <div class="header">
    <div class="left">
      <div class="sidemenu-button" @click="toggleSideMenu">
        <div class="square-wrapper">
          <div class="square"></div>
          <div class="square"></div>
          <div class="square"></div>
        </div>
      </div>
      <router-link class="icon" to="/">hatuvue</router-link>
    </div>

    <div class="search">
      <div class="input">
        <input
          ref="input"
          v-model="searchValue"
          @keydown="
            (e) => {
              if (e.key === 'Enter') search();
            }
          "
          @focus="historyDropdown = true"
          @blur="(e) => {
            if (!(e.relatedTarget && ($refs.dropdown as HTMLDivElement).contains(e.relatedTarget as Node)))
              historyDropdown = false;
          }"
        />
        <div
          ref="dropdown"
          class="dropdown"
          v-show="historyDropdown && searchHistories.length > 0"
          tabindex="-1"
          @blue="console.log(`blur`)"
        >
          <div
            class="dropdown-item"
            v-for="(d, i) in Math.min(10, searchHistories.length)"
            :key="i"
          >
            <div
              class="history"
              @click="
                () => {
                  searchValue = searchHistories[i];
                  search();
                }
              "
            >
              {{ searchHistories[i] }}
            </div>
            <button
              class="remove-history"
              @click="removeHistory(searchHistories[i])"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <button class="button search-button" @click="search">검색</button>
    </div>

    <div class="right">
      <button class="button">업로드</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import storage from "../util/storage";
import { mapActions } from "vuex";

export default defineComponent({
  name: "AppHeader",
  data() {
    return {
      searchValue: "",
      historyKey: "search-history",
      searchHistories: [],
      historyDropdown: false,
    } as {
      searchValue: string;
      historyKey: string;
      searchHistories: string[];
      historyDropdown: boolean;
    };
  },
  methods: {
    ...mapActions(["toggleSideMenu"]),
    search() {
      this.historyDropdown = false;
      this.addHistory(this.searchValue);
    },
    addHistory(value: string) {
      const histories = storage.get<string[]>(this.historyKey);

      if (histories) {
        if (!histories.includes(value) && value)
          storage.set(this.historyKey, [value, ...histories]);
      } else storage.set(this.historyKey, [value]);
      this.refreshHistory();
    },
    clearHistory() {
      storage.remove(this.historyKey);
      this.refreshHistory();
    },
    removeHistory(value: string) {
      const histories = storage.get<string[]>(this.historyKey);
      if (!histories) return;

      storage.set(this.historyKey, [...histories.filter((x) => x !== value)]);
      this.refreshHistory();
    },
    refreshHistory() {
      this.searchHistories = storage.get<string[]>(this.historyKey) ?? [];
    },
  },
  mounted() {
    this.searchHistories = storage.get<string[]>(this.historyKey) ?? [];
  },
});
</script>

<style lang="scss">
@import "../Constance.scss";

.header {
  box-shadow: 0px 0px 2.2px rgba(0, 0, 0, 0.06),
    0px 0px 5.3px rgba(0, 0, 0, 0.05), 0px 0px 10px rgba(0, 0, 0, 0.039),
    0px 0px 17.9px rgba(0, 0, 0, 0.029), 0px 0px 33.4px rgba(0, 0, 0, 0.019),
    0px 0px 80px rgba(0, 0, 0, 0.009);

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: $header-height;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .left,
  .right {
    position: absolute;
    display: flex;
    align-items: center;
  }

  .left {
    left: 2rem;
  }

  .right {
    right: 2rem;
  }

  .icon {
    user-select: none;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem;
    letter-spacing: 0.15rem;
    color: rgb(255, 0, 191);
  }

  .sidemenu-button {
    transition: background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    width: 30px;
    height: 30px;

    .square-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 18px;
      height: 13px;
      .square {
        width: 100%;
        height: 1px;

        background-color: black;
      }
    }

    border-radius: 50%;

    &:hover {
      background-color: $white-hover;
      cursor: pointer;
    }

    &:active {
      background-color: $white-active;
    }
  }

  .search {
    // transition: all 0.2s;
    display: flex;
    overflow: visible;
    height: 35px;
    @media (width <= 920px) {
      width: 35vw;
    }

    @media (width <= 600px) {
      display: none;
    }
    width: 400px;

    .input {
      width: 100%;
      height: 100%;
    }

    & input {
      width: 100%;
      height: 35px;
      border-radius: 30px 0px 0px 30px;
      padding: 0 25px 0 25px;
    }

    .search-button {
      min-width: 60px;
      width: 60px;
      margin-left: auto;
      border: 1px solid black;
      border-left: none;

      padding: 0 !important;
      border-radius: 0px 30px 30px 0px;
    }
  }

  .dropdown {
    background-color: $pri-light;
    position: relative;
    width: 100%;
    margin-top: 4px;

    // @media (width <= 920px) {
    //   width: 20vw;
    // }

    // @media (width <= 500px) {
    //   display: none;
    // }

    // top: 65px;
    border-radius: 10px;
    padding: 8px 0px 8px 0px;

    .dropdown-item {
      display: flex;
      padding: 5px 25px 5px 25px;
      user-select: none;
      margin-top: 2px;
      margin-bottom: 2px;
      text-align: left;

      &:hover {
        background-color: $pri-light-hover;
      }

      &:active {
        background-color: $pri-light-active;
      }
    }

    .remove-history {
      background-color: rgb(0, 0, 0, 0);
      position: absolute;
      padding: 2px 10px 2px 10px;
      right: 10px;
    }
    .history {
      width: 95%;
      word-break: keep-all;
      font-size: 0.9rem;
      overflow: hidden;
    }
  }
}
</style>
