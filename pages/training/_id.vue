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
      <hintLetters :hintLetters="hintLettersArr"></hintLetters>
      <el-autocomplete
        class="el-autocomplete--training"
        @keyup.enter.native="onEnterKeyUp"
        autofocus
        ref="answerField"
        size="large"
        placeholder="Entrer le pinyin correspondant"
        :fetch-suggestions="fetchSuggestions"
        :trigger-on-focus="false"
        :disabled="success"
        popper-class="el-autocomplete-suggestion--training"
        v-model="answer">
      </el-autocomplete>
      <transition name="el-zoom-in-center">
        <el-button autofocus native-type="submit" ref="next" v-show="success" type="success" icon="check"></el-button>
      </transition>
    </form>
  </div>
</template>

<script>
import characterArr2Object from '~/utils/characterArr2Object'
import { mapActions } from 'vuex'
import hintLetters from '~/components/hintLetters'
import getCaret from 'caret-position2/get'

export default {
  components: {
    hintLetters
  },
  data () {
    return {
      doubleEnterKey: 0
    }
  },
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
        // manually limit text maxlength due to lack of support of maxlength attribute for 'el-autocomplete'
        // https://github.com/ElemeFE/element/issues/6170
        if (value.length <= this.currentCharacter.pinyin.length) {
          this.submitAnswer(value)
        } else {
          this.$refs.answerField.$refs.input.currentValue = this.answer
        }
      }
    },
    hintLettersArr () {
      return this.$store.state.training.hintLetters
    }
  },
  methods: {
    ...mapActions({
      submitAnswer: 'training/submitAnswer',
      forceCorrectAnswer: 'training/forceCorrectAnswer',
      updateSuggestion: 'training/updateSuggestion',
      prev: 'training/prev',
      next: 'training/next'
    }),
    fetchSuggestions (queryString, callback) {
      this.updateSuggestion(getCaret(this.$refs.answerField.$el.querySelector('.el-input__inner')).caret - 1)
      return callback(this.$store.state.training.suggestions)
    },
    onSubmit () {
      if (this.success) {
        this.next()
      }
    },
    onEnterKeyUp (e) {
      if (this.doubleEnterKey != 0) {
        this.forceCorrectAnswer()
      } else {
        this.doubleEnterKey = setTimeout(() => this.doubleEnterKey = 0, 300)
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
        // set focus on the submit button so the user can type enter key to go next
        this.$nextTick(() => {
          this.$refs.next.$el.focus()
        })
      } else {
        // set focus on the anwserField so the user can immediatly type the answer
        this.$nextTick(() => {
          this.$refs.answerField.$el.querySelector('.el-input__inner').focus()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.training {
  position: relative;
  text-align: center;
  padding: 2em 0;
  h1 {
    font-size: 4em;
    margin: 0.5em auto;
    margin-top: 0;
    font-weight: normal;
  }
  h2 {
    font-size: 2.5em;
    margin: 0.2em auto;
    font-weight: normal;
  }
  h3 {
    font-size: 1em;
    margin: 0.2em auto;
    font-weight: normal;
  }
  .el-progress {
    position: absolute;
    top: 2em;
    right: 2em;
  }
  form {
    margin: 2em auto;
  }
  .el-autocomplete {
    display: block;
    margin: 1em auto;
    max-width: 30em;
  }
  button[type="submit"] {
    margin: 1em;
  }
}
</style>
<style lang="scss">
.el-autocomplete--training {
  .el-input__inner {
    text-align: center;
    font-size: 1.5em;
  }
}
.el-autocomplete-suggestion--training {
  text-align: center;
  li {
    font-size: 1.5em;
  }
}
</style>
