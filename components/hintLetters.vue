<template>
  <ul class="hint">
    <li class="hint__item" v-for="(hint, idx) in hintLetters" :key="idx">
      <el-tag type="warning" v-text="hint.letter" v-if="hint.errorCode === 'warning'"></el-tag>
      <el-tag type="error" v-text="'_'" v-else-if="hint.errorCode === 'error'"></el-tag>
      <el-tag type="gray" v-text="'_'" v-else-if="hint.errorCode === 'inactive'"></el-tag>
      <el-tag type="primary" v-html="'&nbsp;'" v-else-if="hint.letter === ' '"></el-tag>
      <el-tag type="success" v-text="hint.letter" v-else></el-tag>
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
