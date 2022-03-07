# Projet 'vuejs_Villes'

### Présentation

Liste d'un échantillon de 1000 villes à travers le monde avec :
- Possibilité de filtrer la liste (par saisie et/ou par pays),
- Possibilité de classer la liste par colonne de données (Villes, pays, région),
- Affichage d'une carte situant la ville sur laquelle l'utilisateur a cliqué,

Si vous voulez voir ce que cela donne, [l'application est hébergée ici](https://listevilles-vuejs.web.app/) !

### Note personnelle

Le but de cette application était de me familiariser avec Vue.js et une partie de son écosystème (vuex).

Les données sont stockées dans un fichier .json (récupérées sur le site [mockaroo](https://www.mockaroo.com/)) : Le code pour récupérer ces données est donc simple et rapide à mettre en place.  

PS: Charger la totalité du fichier (comme je le fais à l'arrivée dans l'application) n'est pas forcément indiqué, surtout s'il y a beaucoup de données dans le fichier .json en question. Dans un projet professionnel avec beaucoup de data, ce chargement se ferait à partir d'une bdd, mais ma priorité était avant tout ici d'apprendre à maitriser Vue.js.

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

