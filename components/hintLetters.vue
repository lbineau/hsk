<template>
  <ul class="hint">
    <li class="hint__item" v-for="(letter, idx) in hintLetters" :key="idx">
      <el-tag type="warning" v-text="'_'" v-if="letter === false"></el-tag>
      <el-tag type="gray" v-text="'_'" v-else-if="letter === null"></el-tag>
      <el-tag type="primary" v-html="'&nbsp;'" v-else-if="letter === ' '"></el-tag>
      <el-tag type="success" v-text="letter" v-else></el-tag>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      hintLetters: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
.hint {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 1em auto;
  font-family: "Lucida Console", Monaco, monospace;
  .el-tag {
    margin: 0.1em;
  }
}
</style>
