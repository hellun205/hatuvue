<template>
  <div class="header">
    <router-link class="icon" to="/">hatuvue</router-link>
    <div class="search">
      <span class="input">
        <span
          ref="dropdown"
          class="dropdown"
          v-show="historyDropdown && searchHistories.length > 0"
          tabindex="-1"
          @blue="console.log(`blur`)"
        >
          <ul>
            <li v-for="(d, i) in Math.min(10, searchHistories.length)" :key="i">
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
            </li>
          </ul>
        </span>
        <input
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
      </span>
      <button class="button search-button" @click="search">검색</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import storage from "../util/storage";

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
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    user-select: none;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem;
    letter-spacing: 0.15rem;
    color: rgb(255, 0, 191);

    position: absolute;
    left: 2rem;
  }

  .search {
    & input {
      width: 400px;
      border-radius: 30px 0px 0px 30px;
      padding-left: 25px;
      padding-right: 25px;
    }

    .search-button {
      border: 1px solid black;
      border-left: none;
      padding-left: 1.1rem;
      padding-right: 1.5rem;
      border-radius: 0px 30px 30px 0px;
    }
  }

  .dropdown {
    background-color: $pri-light;
    position: absolute;

    top: 57px;
    width: 450px;
    border-radius: 10px;
    padding: 8px 0px 8px 0px;

    ul,
    ol,
    li {
      list-style: none;
    }

    ul {
      padding: 0;
      margin: 0;
    }

    li {
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
    .history {
      width: 95%;
      word-break: keep-all;
      overflow: hidden;
    }

    .remove-history {
      background-color: rgb(0, 0, 0, 0);
      position: absolute;
      padding: 2px 10px 2px 10px;
      right: 10px;
    }
  }
}
</style>
