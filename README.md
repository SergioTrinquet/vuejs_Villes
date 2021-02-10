# vue-cli_villes

### Présentation

Liste d'un échantillon de 1000 villes à travers le monde avec
affichage d'une carte situant la ville sur laquelle l'utilisateur a cliqué, et
possibilité de filtrer et/ou classer cette liste.

### Note personnelle

Le but de cette application était de me familiariser avec Vue.js et son écosystème (vuex).

J'ai fait le choix de stocker les données dans un fichier .json (récupérées sur le site [mockaroo](https://www.mockaroo.com/)) car il s'agit du moyen le plus rapide en comparaison avec l'instauration d'une base de données (SQL ou no SQL).

Il est évident que charger la totalité du fichier (comme je le fais à l'arrivée dans l'application) n'est pas indiqué: Les résultats en terme de performance sont inversement proportionnels à la quantité de données stockée dans le fichier en question. Cela peut vite être problématique lorsqu'il s'agit de charger des milliers de lignes, mais ma priorité était avant tout ici d'apprendre à maitriser Vue.js et de comprendre son fonctionnement, comment les différents fichiers s'articulent, comment et quand faire un composant, comment partager des données entre eux,...Bref, la pertinence d'un chargement initial des données n'était pour moi dans le cas présent que secondaire, ce qui ne doit pas être le cas en production bien sûr :-)

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

