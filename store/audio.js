export const state = () => ({
  player: new Audio()
})

export const actions = {
  play ({ commit }, characters = null) {
    commit('play', characters)
  }
}

export const mutations = {
  play (state, characters = null) {
    if (characters !== null) {
      state.player.src = `http://www.hsk.academy/static/audio/mp3/words/${characters}.mp3`
      state.player.load()
    }
    state.player.play()
  }
}
