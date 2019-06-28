<template>
  <div class="sewing-pattern">
    <div class="title">{{ title }}</div>
    <div class="brand">{{ brand }}</div>
    <img :src="`/assets/sewingPattern/${img}.png`">
    <div class="tags">
      <span>tags:</span>
      <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SewingPattern",
  props: ["title", "brand", "img", "tags"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.sewing-pattern {
  border-bottom: solid 5px black;
  padding: 32px 8px;

  &:first-of-type {
    padding-left: 0;
  }
  &:last-of-type {
    padding-right: 0;
  }

  img {
    width: 100%;
  }

  .tags {
    text-align: left;
  }
  .tag {
    background: #eee;
    border: solid 1px black;
    margin-left: 8px;
    padding-left: 4px;
    padding-right: 4px;
  }
}
</style>