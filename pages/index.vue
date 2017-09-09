<template>
  <article class="index">
    <section class="container">
      <h1>Bienvenue</h1>

      <p>Ce site est fait pour vous permettre de vous entraîner au HSK.</p>
      <p><strong>C'est un copié collé complet et assumé des fonctionalités de <a href="https://github.com/Cronos87/learn-chinese-characters">https://github.com/Cronos87/learn-chinese-characters</a></strong></p>
      <p>
          Vous allez pouvoir apprendre et vous tester simplement grâce aux différents exercices proposés.<br>
          Chaque type d'exercice est découpé en 6 niveaux correspondants aux 6 niveaux du HSK.
      </p>
      <p>
          Vous pourrez également voir la liste complète des caractères à étudier. Mais aussi de
          <router-link :to="{ name: 'search' }">rechercher</router-link> un caractère, un pinyin ou une traduction.
      </p>
      <p>
          N'hésitez pas à consulter <router-link :to="{ name: 'help' }">l'aide</router-link> pour plus
          d'informations concernant un exercice en particulier.
      </p>
      <p>Bonnes révisions :)</p>
    </section>
  </article>
</template>

<script>
  export default {
    data () {
      return {
        online: true
      }
    },
    mounted () {
      if (!window.navigator) {
        this.online = false
        return
      }
      this.online = Boolean(window.navigator.onLine)
      window.addEventListener('offline', this._toggleNetworkStatus)
      window.addEventListener('online', this._toggleNetworkStatus)
    },
    methods: {
      _toggleNetworkStatus ({ type }) {
        this.online = type === 'online'
      }
    },
    destroyed () {
      window.removeEventListener('offline', this._toggleNetworkStatus)
      window.removeEventListener('online', this._toggleNetworkStatus)
    }
  }
</script>

<style scoped>
.index {
  margin: 2em auto;
}
</style>
