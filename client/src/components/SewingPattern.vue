<template>
  <div class="sewing-pattern" :class="{ 'detail-view': detailEnabled}">
    <div class="title">
      <span>{{ patt.title }}</span>
    </div>
    <div class="brand">
      <span>by {{ patt.brand }}</span>
    </div>
    <img :src="`/assets/sewingPattern/${file}.png`" />
    <div v-if="detailEnabled" class="detail-contents">
      <div
        v-for="(pData, pProp) in otherDatas"
        :key="pProp"
      >{{ pProp }}: {{ patternDataDisplay(pData) }}</div>
    </div>
    <div class="tags">
      <span>tags:</span>
      <span v-for="tag in patt.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SewingPattern",
  props: ["patt", "detailEnabled"],
  data() {
    return {
      title: "",
      brand: "",
      tags: "",
      file: "",
      otherDatas: {}
    };
  },
  created() {
    const { title, brand, tags, file, ...dataSelect } = this.patt;
    this.title = title;
    this.brand = brand;
    this.tags = tags;
    this.file = file;
    this.otherDatas = dataSelect;
  },
  methods: {
    patternDataDisplay(data) {
      if (typeof data === "string") {
        return data;
      }
      if (typeof data === "object") {
        return data.join(", ");
      }
      return data;
    }
  }
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
  .title {
    text-align: left;
    font-size: 24px;
    font-weight: bold;
  }
  .brand {
    text-align: left;
    font-size: 14px;
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

  &.detail-view {
    border-bottom: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto repeat(5, auto);
    grid-column-gap: 16px;
    text-align: left;

    .title {
      grid-column: 1 / 3;
      grid-row: 1 / 2;
      display: flex;
      span {
        align-self: flex-end;
      }
    }
    .brand {
      grid-column: 1 / 3;
      grid-row: 2 / 3;
      padding-bottom: 8px;
    }
    img {
      grid-column: 1 / 2;
      grid-row: 3 / 6;
    }
    .detail-contents {
      grid-column: 2 / 5;
      grid-row: 3 / 5;
    }
    .tags {
      grid-column: 2 / 5;
      grid-row: 5 / 6;
    }
  }
}
</style>