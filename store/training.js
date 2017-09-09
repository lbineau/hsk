import accentMap, { removeAccent } from '~/utils/accentMap'

export const state = () => ({
  characters: [],
  currentCharacterIdx: 0,
  currentCharacter: null,
  answer: '',
  percentage: 0,
  suggestions: [],
  success: false,
  hintLetters: []
})

/**
 * Generate hint letters
 * - transform pinyin and anwser string into array
 * - return different { letter, errorCode } object for each letter
 */
function generateHintLetters (userAnswer, correctAnswer) {
  let correctAnswerArr = correctAnswer.split('')
  let userAnswerArr = userAnswer.split('')
  return correctAnswerArr.map((letter, i) => {
    const userLetter = userAnswerArr[i]
    // return null if user hasn't typed the letter yet
    if (userLetter === undefined) return { letter, errorCode: 'inactive' }
    // return the letter if letter is correct (can be a space)
    else if (letter === userLetter) return { letter }
    // return 'warning' if user it is the right letter but the wrong accent
    else if (removeAccent(userLetter) === removeAccent(letter)) return { letter: userLetter, errorCode: 'warning' }
    // retur 'error' if the user is not correct
    else return { letter, errorCode: 'error' }
  })
}

export const actions = {
  init ({ commit }, characters) {
    commit('setCharacters', characters)
    commit('reset')
    commit('updateCurrentCharacter')
  },
  reset ({ commit }) {
    commit('reset')
    commit('updateCurrentCharacter')
  },
  next ({ commit, state }) {
    if (state.currentCharacterIdx < state.characters.length - 1) {
      commit('next')
      commit('updateCurrentCharacter')
    }
  },
  prev ({ commit, state }) {
    if (state.currentCharacterIdx > 0) {
      commit('prev')
      commit('updateCurrentCharacter')
    }
  },
  submitAnswer ({ commit, state }, value) {
    commit('updateAnswer', value)

    commit('updateHintLetters', generateHintLetters(state.answer, state.currentCharacter.pinyin))

    if (state.answer === state.currentCharacter.pinyin) {
      commit('updateSuccess', true)
      return
    }

    /**
     * Update suggestions
     * - check if the last letter has any accent to suggest
     * - return an array with values to suggest
     */
    const lastLetter = value.slice(-1)
    const valueWithoutLastLetter = value.slice(0, -1)
    if (accentMap.hasOwnProperty(lastLetter)) {
      const suggestions = accentMap[lastLetter].map(accent => {
        return { value: valueWithoutLastLetter + accent }
      })
      commit('updateSuggestion', suggestions)
    } else {
      commit('updateSuggestion', [])
    }
  }
}

export const mutations = {
  setCharacters (state, characters) {
    state.characters = characters
  },
  updateCurrentCharacter (state) {
    state.currentCharacter = state.characters[state.currentCharacterIdx]
    state.answer = ''
    state.success = false
    state.percentage = Math.round(state.currentCharacterIdx / (state.characters.length - 1) * 100)
    state.hintLetters = generateHintLetters(state.answer, state.currentCharacter.pinyin)
    state.suggestions = []
  },
  reset (state) {
    state.currentCharacterIdx = 0
  },
  next (state) {
    state.currentCharacterIdx = state.currentCharacterIdx + 1
  },
  prev (state) {
    state.currentCharacterIdx = state.currentCharacterIdx - 1
  },
  updateAnswer (state, value) {
    state.answer = value
  },
  updateSuggestion (state, suggestions) {
    state.suggestions = suggestions
  },
  updateSuccess (state, value) {
    state.success = value
  },
  updateHintLetters (state, hintLetters) {
    state.hintLetters = hintLetters
  }
}
