<template>
  <div id="app">
    <h1>Your Patterns</h1>
    <div>
      <input v-model="filterText" placeholder="Search by tags">
      <button @click="clearFilter">Clear</button>
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
      filterText: ""
    };
  },
  methods: {
    clearFilter() {
      this.filterText = "";
    }
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

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100vw;
}
.sewing-patterns {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
</style>
