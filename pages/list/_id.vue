<template>
  <div>
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
          <button @click.prevent="playAudio(scope.row.characters)">
            <img src="~/assets/svg/sound.svg" alt="Écouter le son" width="22" height="22" />
          </button>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="characters"
        label="Characters"
        width="180">
      </el-table-column>
      <el-table-column
        sortable
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
      const data = await import(`~/assets/data/characters/hsk-${params.id}.json`)
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
    })
  }
}
</script>

<style scoped>
td, img {
  vertical-align: middle;
}
</style>
