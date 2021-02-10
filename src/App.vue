<template>
  <div>  
    <Error v-if="displayError"></Error>
    <Loader v-if="displayLoader"></Loader>
    <Modal v-if="cityId"></Modal>
    <AppHeader></AppHeader>
    <Pagination></Pagination>
    <AppList></AppList>
  </div>
</template>

<script>
// Chargement asynchrone
const Modal = () => import(/* webpackChunkName: "modal" */ '@/components/Modal')
const Error = () => import(/* webpackChunkName: "error" */ '@/components/AppError')
// Chargement synchrone
import Header from '@/components/AppHeader'
import Pagination from '@/components/Pagination' 
import List from '@/components/AppList'
import Loader from '@/components/Loader'


export default {
  name: 'App',
  components: {
    Loader,
    Modal,
    Error,
		'AppHeader': Header,
		Pagination,
    'AppList': List
  },

  computed: {
    // Pour afficher ou non le modal des infos d'une ville
    cityId() {
      return this.$store.state.cityId;
    },

    // Pour afficher message d'erreur
    displayError() {
        const objErr = this.$store.state.dataErreur;
        if(typeof objErr === "object") {
          return "err" in objErr ? true : false;
        } else {
          return false
        }
    },

    // Pour afficher ou non l'overlay avec le loader
    displayLoader() {
      return this.$store.state.loader;
    }
    
  }
}
</script>

<style>
	html,
	body {
		font-family: 'Quicksand', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		margin: 0;
		font-size: 15px;
	}
	body * {
		box-sizing: border-box;
	}
</style>
