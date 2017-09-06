<template>
  <div>

    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1"><router-link :to="{ name: 'index' }">HSK</router-link></el-menu-item>
      <el-submenu index="2">
        <template slot="title">Listes</template>
        <el-menu-item :index="`2-${level}`"  v-for="level in 6" :key="`2-${level}`">
          <router-link :to="{ name: 'list-id', params: { id: level } }">HSK {{ level }}</router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="scss" scoped>
.el-menu-item {
  a {
    display: block;
    text-decoration: none;
  }
}
</style>
