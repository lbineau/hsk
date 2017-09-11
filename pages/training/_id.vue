<template>
  <div class="training container">
    <el-progress :percentage="percentage" :width="80" :show-text="true" type="circle" :stroke-width="2"></el-progress>
    <div class="toolbar">
      <el-button type="text" icon="information" @click="helpDialogVisible = true">Aide</el-button>
      <el-dialog class="el-dialog--help" :visible.sync="helpDialogVisible" size="small">
        <h1 slot="title">Trouver le pinyin</h1>
        <h2>Fonctionnement</h2>
        <p>
          Il vous faut trouver le pinyin correspondant aux caractères affichés. Une fois le pinyin trouvé, le détail
          apparaîtra et vous affichera la traduction. Pour passer au suivant, appuyez alors sur entrer.
        </p>

        <h2>Les pinyins et les accents</h2>
        <p>
          Les pinyins peuvent être écrits avec des accents, plutôt difficiles à faire sur certains claviers.
          C'est pourquoi cette application le gère pour vous. Il vous suffit de taper une lettre pouvant être écrite
          avec des accents pour que l'application vous propose le choix de l'accent. Pour faciliter la sélection,
          il suffit de presser les touches gauche et droite du clavier et d'appuyer sur entrer pour valider l'accent.
          La lettre sera alors remplacée par celle sélectionnée.
        </p>

        <h2>Je bloque !</h2>
        <p>
          Pas de panique, respirez un bon coup et appuyez rapidement deux fois de suite sur entrer. La solution
          s'affichera.
        </p>
      </el-dialog>
    </div>
    <h1 class="training__characters" v-text="currentCharacter.characters"></h1>
    <div style="height: 95px">
      <transition name="el-fade-in">
        <h2 class="training__pinyin" v-if="success" v-text="currentCharacter.pinyin"></h2>
      </transition>
      <transition name="el-fade-in">
        <h3 class="training__translation" v-if="success" v-text="currentCharacter.translation"></h3>
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
      doubleEnterKey: 0,
      helpDialogVisible: false
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
  &__characters {
    font-size: 4em;
    margin: 0.5em auto;
    margin-top: 0;
    font-weight: normal;
  }
  &__pinyin {
    font-size: 2.5em;
    margin: 0.2em auto;
    font-weight: normal;
  }
  &__translation {
    font-size: 1em;
    margin: 0.2em auto;
    font-weight: normal;
  }
  .el-progress {
    position: absolute;
    top: 2em;
    left: 2em;
  }
  .toolbar {
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
.el-dialog {
  &--help {
    text-align: left;
    h1 {
      display: inline;
      line-height: 1;
    }
  }
}
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
