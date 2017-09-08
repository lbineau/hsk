import accentMap from '~/utils/accentMap'

export const state = () => ({
  characters: [],
  currentCharacterIdx: 0,
  currentCharacter: null,
  answer: '',
  percentage: 0,
  suggestions: [],
  success: false
})

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

    if (state.answer.replace(/\s/g, '') === state.currentCharacter.pinyin.replace(/\s/g, '')) {
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
  }
}
