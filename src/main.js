import Vue from 'vue'
import App from './App.vue'

import store from './store'

Vue.config.productionTip = false


/*
Vue.config.errorHandler = function (err, vm, info) {
  // `info` est une information spécifique à Vue sur l'erreur, par exemple dans quel hook du cycle de vie  l'erreur a été trouvée. 
  // Disponible uniquement en 2.2.0+
  alert("Dans Vue.config.errorHandler => \nerr => " + err + " \nvm => " + vm + " \ninfo => " + info);
} 
*/


new Vue({
  render: h => h(App),
  store: store,
  errorCaptured(err, component, details) {
    this.$store.commit('SET_ERREUR', { err: err, details: details } ); // Pour afficher l'encart avec message d'erreur
    console.error("err => ", err, "\ncomponent => ", component, "\ndetails => ", details); 
    return false; // Pour ne pas que l'erreur remonte jusqu'à "Vue.config.errorHandler" si présent
  }
}).$mount('#app')
