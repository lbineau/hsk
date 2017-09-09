<template>
  <div class="list container">
    <el-table
      :data="characters"
      stripe
      style="width: 100%">
      <el-table-column
        sortable
        prop="numero"
        width="80">
      </el-table-column>
      <el-table-column
        label="Son"
        width="80">
        <template scope="scope">
          <el-button type="text" @click.prevent="playAudio(scope.row.characters)">
            <img src="~/assets/svg/sound.svg" alt="Écouter le son" width="22" height="22" />
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        :sort-method="sortCaracters"
        prop="characters"
        label="Characters"
        width="180">
      </el-table-column>
      <el-table-column
        sortable
        :sort-method="sortPinyin"
        prop="pinyin"
        label="Pinyin"
        width="180">
      </el-table-column>
      <el-table-column
        prop="translation"
        label="traduction">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import characterArr2Object from '~/utils/characterArr2Object'
import { mapActions } from 'vuex'
export default {
  async asyncData ({ params }) {
    let characters = []
    try {
      const data = await (await fetch(`/data/characters/hsk-${params.id}.json`)).json()
      characters = data.map(characterArr2Object)
    } catch (error) {
      console.error(error)
    }
    return {
      characters
    }
  },
  methods: {
    ...mapActions({
      playAudio: 'audio/play'
    }),
    sortPinyin (a, b) {
      return a.pinyin.localeCompare(b.pinyin, 'zh-Latn', { sensitivity: 'accent' }) > 0
    },
    sortCaracters (a, b) {
      return a.characters.localeCompare(b.characters, 'zh-Hans-CN-u-co-stroke') > 0
    }
  }
}
</script>

<style scoped>
.list {
  margin: 2em auto;
}
td, img {
  vertical-align: middle;
}
</style>
