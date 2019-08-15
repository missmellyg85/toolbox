<template>
  <div id="app">
    <ul id="nav">
      <li>
        <a href="/home">Home</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
      <li>
        <a href="/patterns">Patterns</a>
      </li>
    </ul>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
}
#nav {
  list-style-type: none;
  background: lightgrey;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  li {
    display: inline-flex;
    width: 200px;
    flex-direction: column;
  }
}
</style>
