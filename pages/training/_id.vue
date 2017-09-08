<template>
  <div class="training">
    <el-progress :percentage="percentage" :width="80" :show-text="true" type="circle" :stroke-width="2"></el-progress>
    <h1 v-text="currentCharacter.characters"></h1>
    <div style="height: 95px">
      <transition name="el-fade-in">
        <h2 v-if="success" v-text="currentCharacter.pinyin"></h2>
      </transition>
      <transition name="el-fade-in">
        <h3 v-if="success" v-text="currentCharacter.translation"></h3>
      </transition>
    </div>
    <form @submit.prevent="onSubmit">
      <el-autocomplete
        autofocus
        ref="answerField"
        size="large"
        placeholder="Entrer le pinyin correspondant"
        @keydown.left="prev"
        @keydown.right="next"
        :fetch-suggestions="fetchSuggestions"
        :trigger-on-focus="false"
        :disabled="success"
        v-model="answer">
      </el-autocomplete>
      <transition name="el-zoom-in-center">
        <el-button autofocus native-type="submit" ref="next" v-if="success" type="success" icon="check"></el-button>
      </transition>
    </form>
  </div>
</template>

<script>
import characterArr2Object from '~/utils/characterArr2Object'
import { mapActions } from 'vuex'
export default {
  async fetch ({ store, params }) {
    try {
      const data = await (await fetch(`/data/characters/hsk-${params.id}.json`)).json()
      const characters = data.map(characterArr2Object)
      store.dispatch('training/init', characters)
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    characters () {
      return this.$store.state.training.characters
    },
    currentCharacterIdx () {
      return this.$store.state.training.currentCharacterIdx
    },
    countCharacters () {
      return this.characters.length - 1
    },
    percentage () {
      return this.$store.state.training.percentage
    },
    currentCharacter () {
      return this.$store.state.training.currentCharacter
    },
    success () {
      return this.$store.state.training.success
    },
    answer: {
      get () {
        return this.$store.state.training.answer
      },
      set (value) {
        this.submitAnswer(value)
      }
    }
  },
  methods: {
    ...mapActions({
      submitAnswer: 'training/submitAnswer',
      prev: 'training/prev',
      next: 'training/next'
    }),
    fetchSuggestions (queryString, callback) {
      return callback(this.$store.state.training.suggestions)
    },
    onSubmit () {
      if (this.success) {
        this.next()
      } else {
      }
    },
    onKeyup (e) {
      if (e.keyCode === 13) {
        e.preventDefault()
        this.onSubmit()
      }
    }
  },
  watch: {
    success (success) {
      if (success) {
        this.$message({
          message: 'Bravo ! Tu peux passer au charactère suivant en appuyant sur la touche entrée',
          type: 'success'
        })
      } else {
        // set focus on the anwserField
        this.$nextTick(() => {
          this.$refs.answerField.$el.querySelector('.el-input__inner').focus()
        })
      }
    }
  },
  mounted () {
    document.addEventListener('keyup', this.onKeyup)
  },
  destroyed () {
    document.removeEventListener('keyup', this.onKeyup)
  }
}
</script>

<style lang="scss" scoped>
.training {
  position: relative;
  text-align: center;
  padding: 2em 0;
  h1 {
    font-size: 5em;
    margin: 0.2em auto;
    font-weight: normal;
  }
  h2 {
    font-size: 3em;
    margin: 0.2em auto;
    font-weight: normal;
  }
  h3 {
    font-size: 2em;
    margin: 0.2em auto;
    font-weight: normal;
  }
  .el-progress {
    position: absolute;
    top: 2em;
    right: 2em;
  }
  .el-autocomplete {
    display: block;
    margin: 2em auto;
    max-width: 30em;
  }
  button[type="submit"] {
    margin: 1em;
  }
}
</style>
