<template>
  <div class="sewing-pattern">
    <div class="title">
      <span>{{ patt.title }}</span>
    </div>
    <div class="brand">
      <span>by {{ patt.brand }}</span>
    </div>
    <img :src="`/assets/sewingPattern/${file}.png`" />
    <!-- <div class="detail-contents">
      <div
        v-for="(pData, pProp) in otherDatas"
        :key="pProp"
      >{{ pProp }}: {{ patternDataDisplay(pData) }}</div>
    </div>-->
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
  .detail-contents {
    display: none;
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

@media all and (max-width: 839px) {
  .sewing-pattern {
    border-bottom: 0;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-column-gap: 16px;
    text-align: left;

    .title {
      grid-row: 1 / 2;
      display: flex;
      span {
        align-self: flex-end;
      }
    }
    .brand {
      grid-row: 2 / 3;
      padding-bottom: 8px;
    }
    img {
      grid-row: 3 / 6;
    }
    .detail-contents {
      display: inherit;
      grid-row: 6 / 7;
    }
    .tags {
      grid-row: 7 / 8;
    }
  }
}
</style>