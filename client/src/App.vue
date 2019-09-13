<template>
  <div id="app">
    <h1>Pattern Inventory</h1>
    <div class="filter-bar">
      <div>
        <input v-model="filterText" placeholder="Search by tags" />
        <button @click="clearFilter">Clear</button>
      </div>
      <div>
        Sort by:
        <button @click="sortBy('title')" :class="{ 'selected-sort': sort === 'title'}">Title</button>
        <button @click="sortBy('brand')" :class="{ 'selected-sort': sort === 'brand'}">Brand</button>
      </div>
    </div>
    <div class="sewing-patterns">
      <SewingPattern
        v-for="p in filteredPatterns"
        :key="p.title"
        :patt="p"
        :detailEnabled="display === 'detail'"
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
      defaultSort: "title",
      sort: "",
      display: "grid"
    };
  },
  methods: {
    clearFilter() {
      this.filterText = "";
    },
    sortBy(sortValue) {
      if (sortValue === this.sort) return;
      this.sort = sortValue;

      this.sewingPatterns.sort((a, b) =>
        a[sortValue] > b[sortValue] ? 1 : -1
      );
    }
  },
  beforeMount() {
    this.sortBy(this.defaultSort);
  },
  computed: {
    filteredPatterns() {
      if (this.filterText === "") return this.sewingPatterns;

      const regex = new RegExp("^(" + this.filterText + ")", "ig");

      return this.sewingPatterns.filter(
        p =>
          p.tags &&
          p.tags.find(tag => {
            return regex.exec(tag);
          })
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

  button.selected-sort,
  button.selected-display {
    background-color: salmon;
  }
}
.sewing-patterns {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
button {
  background-color: lightgray;
}
@media all and (max-width: 839px) {
  #app {
    margin-top: 10px;
  }
  .filter-bar {
    display: grid;
    grid-template-columns: 1fr 1fr;

    div:first-of-type {
      padding-left: inherit;
    }

    button.selected-sort,
    button.selected-display {
      background-color: salmon;
    }
  }

  .sewing-patterns {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
