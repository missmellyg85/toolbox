<template>
  <div id="app">
    <h1>Your Patterns</h1>
    <div class="filter-bar">
      <div>
        <input v-model="filterText" placeholder="Search by tags" />
        <button @click="clearFilter">Clear</button>
      </div>
      <div>
        Sort by:
        <button
          @click="sort('title')"
          :class="{ 'selected-sort': sortValue === 'title'}"
        >Title</button>
        <button @click="sort('brand')" :class="{ 'selected-sort': sortValue === 'brand'}">Brand</button>
      </div>
    </div>
    <div class="sewing-patterns">
      <SewingPattern
        v-for="p in filteredPatterns"
        :key="p.title"
        :title="p.title"
        :brand="p.brand"
        :img="p.file"
        :tags="p.tags"
      />
    </div>
  </div>
</template>

<script>
import data from "./data.json";
import SewingPattern from "./components/SewingPattern.vue";

export default {
  name: "app",
  components: {
    SewingPattern
  },
  data() {
    return {
      sewingPatterns: [...data],
      filterText: "",
      defaultSortValue: "title",
      sortValue: ""
    };
  },
  methods: {
    clearFilter() {
      this.filterText = "";
    },
    sort(sortValue) {
      if (sortValue === this.sortValue) return;
      this.sortValue = sortValue && sortValue !== "" ? sortValue : "title";

      this.sewingPatterns.sort((a, b) =>
        a[sortValue] > b[sortValue] ? 1 : -1
      );
    }
  },
  beforeMount() {
    this.sort(this.defaultSortValue);
  },
  computed: {
    filteredPatterns() {
      if (this.filterText === "") return this.sewingPatterns;

      return this.sewingPatterns.filter(
        p => p.tags && p.tags.includes(this.filterText.toLowerCase())
      );
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100vw;
}
.filter-bar {
  display: grid;
  grid-template-columns: 2fr 1fr;

  div:first-of-type {
    padding-left: 50%;
  }

  button.selected-sort {
    background-color: salmon;
  }
}
.sewing-patterns {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
</style>
