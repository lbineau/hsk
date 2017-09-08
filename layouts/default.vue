<template>
  <div>
    <VMenu/>
    <nuxt/>
  </div>
</template>

<script>
  import VMenu from '~/components/menu'
  export default {
    components: {
      VMenu
    }
  }
</script>

<style>
html
{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*, *:before, *:after
{
  box-sizing: border-box;
}
</style>
