<template>
  <div>
    <form
      name="new-pattern"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="new-pattern" />
      <input type="hidden" name="stagedForPrint" value="false" />
      <input type="hidden" name="stagedForPrint" value="" />

      <div>
        <label>Title:<input type="text" name="title"/></label>
      </div>
      <div>
        <label>Brand:<input type="text" name="brand"/></label>
      </div>
      <div>
        <label v-for="(formatType, index) in formatTypes" :key="index">
          <input
            type="radio"
            name="format"
            :value="formatType"
            @input="(ev) => updateFormat"
            :checked="formatType === currentFormatType"
          />
          <span>{{ formatType }}</span>
        </label>
      </div>
      <div>
        <label v-for="(isPrinted, index) in [true, false]" :key="index">
          <input
            type="radio"
            name="isPrinted"
            :value="isPrinted"
            @input="(ev) => updateIsPrinted"
            :checked="isPrinted === currentIsPrinted"
          />
          <span>{{ isPrinted ? "Yes" : "No" }}</span>
        </label>
      </div>
      <div><label>Filename:</label><input type="text" name="file" /></div>

      <div>
        <label>Message: <textarea name="tags"></textarea></label>
      </div>

      <button>Submit</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "NewPatternForm",
  methods: {
    updateFormat(ev) {
      this.updateFormat = ev.target.value;
    },
    updateIsPrinted(ev) {
      this.updateFormat = ev.target.value;
    },
  },
  data() {
    return {
      formatTypes: ["A0", "Standard"],
      currentFormatType: "A0",
      currentIsPrinted: false,
    };
  },
};
</script>

<style lang="scss" scoped>
form {
  text-align: left;
}
</style>
