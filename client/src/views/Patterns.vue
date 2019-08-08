<template>
  <div>
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
        View:
        <button
          @click="changeDisplay('grid')"
          :class="{ 'selected-display': display === 'grid'}"
        >
          <font-awesome-icon icon="th" />
        </button>

        <button
          @click="changeDisplay('detail')"
          :class="{ 'selected-display': display === 'detail'}"
        >
          <font-awesome-icon icon="th-list" />
        </button>
      </div>
    </div>
    <div
      class="sewing-patterns"
      :class="{ 'grid-display': display === 'grid', 'detail-display': display === 'detail'}"
    >
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
import data from "../components/data.json";
import SewingPattern from "../components/SewingPattern.vue";

export default {
  name: "Patterns",
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

      this.sewingPatterns.sort((a, b) => (a[sortValue] > b[sortValue] ? 1 : -1));
    },
    changeDisplay(displayValue) {
      if (displayValue === this.display) return;
      this.display = displayValue;
    }
  },
  beforeMount() {
    this.sortBy(this.defaultSort);
  },
  computed: {
    filteredPatterns() {
      if (this.filterText === "") return this.sewingPatterns;

      const regex = new RegExp(`^(${this.filterText})`, "ig");

      return this.sewingPatterns.filter(
        p => p.tags && p.tags.find(tag => regex.exec(tag))
      );
    }
  }
};
</script>

<style lang="scss">
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
  &.grid-display {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
  &.detail-display {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
