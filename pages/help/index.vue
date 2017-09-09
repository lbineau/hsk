<template>
  <article>
    <section class="container">
      <h1>Aide</h1>

      <h2>Trouver le pinyin</h2>
      <h3>Fonctionnement</h3>
      <p>
        Il vous faut trouver le pinyin correspondant aux caractères affichés. Une fois le pinyin trouvé, le détail
        apparaîtra et vous affichera la traduction. Pour passer au suivant, appuyez alors sur entrer.
      </p>

      <h3>Les pinyins et les accents</h3>
      <p>
        Les pinyins peuvent être écrits avec des accents, plutôt difficiles à faire sur certains claviers.
        C'est pourquoi cette application le gère pour vous. Il vous suffit de taper une lettre pouvant être écrite
        avec des accents pour que l'application vous propose le choix de l'accent. Pour faciliter la sélection,
        il suffit de presser les touches gauche et droite du clavier et d'appuyer sur entrer pour valider l'accent.
        La lettre sera alors remplacée par celle sélectionnée.
      </p>

      <h3>Je bloque !</h3>
      <p>
        Pas de panique, respirez un bon coup et appuyez rapidement deux fois de suite sur entrer. La solution
        s'affichera.
      </p>

      <h2>Choix multiple</h2>
      <p>
        Dans cet exercice, vous devrez trouver le ou les caractères correspondant à la traduction / pinyin correspondant
        parmi 4 choix. Pour valider votre réponse, cliquez simplement sur la case de votre choix. Celle-ci deviendra
        verte en cas de bonne réponse ou rouge dans le cas contraire. La bonne réponse vous sera dévoilée en devenant
        elle aussi verte.
      </p>
      <p>
        Pour ne pas rendre l'exercice trop simple, chaque réponse aura le même nombre de caractère que la bonne réponse.
        Cela vous forcera à réfléchir et de vous appuyer sur les pinyins.
      </p>

      <h2>La progression</h2>
      <p>
        La progression est enregistrée automatique sur le navigateur que vous utilisez, et ce par niveau.
        Cela signifie que si vous êtes au numéro 4 du niveau 1 et 10 du niveau 2, lors de votre prochaine visite,
        vous serez alors aux mêmes numéros par niveau.
      </p>
      <p>
        Il est possible de réinitialiser la progression. Un lien s'affichera automatiquement par niveau lorsque
        vous serez au second caractère. Cliquez dessus et validez alors la confirmation de réinitialisation.
        Vous reviendrez automatiquement au premier caractère.
      </p>

      <h3>Statistiques</h3>
      <p>
        Des statistiques de vos réponses sont consérvées par niveau. Il vous est possible de voir les bonnes
        et les mauvaises réponses apportées.
      </p>

      <h2>Le mode aléatoire</h2>
      <p>
        Le mode aléatoire active une session complètement aléatoire des caractères du niveau.
        Par session, cela signifie qu'une fois le navigateur fermé, l'ordre des caractères sera de nouveau
        normal.
      </p>
      <p>
        Il est possible de revenir au mode normal. Il vous suffit de cliquer sur le lien "normal".
        Pas d'inquiétude à avoir, votre progression dans le mode normal <strong>n'est pas</strong> réinitialisée.
        Vous reviendrez automatiquement à l'index où vous étiez avant de changer de mode.
      </p>
      <p>
        Ce mode est là pour vous tester une fois que vous pensez avoir atteint un bon niveau. N'hésitez donc
        pas à vous confronter à lui.
      </p>

      <h2>Recherche</h2>
      <p>
        La recherche a été pensée pour être le plus simple et intuitive possible. Recherchez simplement quelque chose.
        Un caractère, un pinyin ou même un mot faisant partie de la traduction d'un/de caractère(s).<br>
        <strong>Astuce :</strong> Les pinyins peuvent être écrits avec ou sans accents. La recherche les traitera
        de la même façon.
      </p>
    </section>
  </article>
</template>

<script>
  export default {

  }
</script>

<style scoped>
.article {
  margin: 2em auto;
}
</style>
