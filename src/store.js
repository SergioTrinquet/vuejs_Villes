import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        titre: 'Echantillon de 1000 villes à travers le monde',
        colonnes: [
            { titre: 'Ville', order: 'asc', champ: 'city' },
            { titre: 'Pays', order: '', champ: 'country' },
            { titre: 'Region', order: '', champ: 'state' }
        ],
        nbrLignesParPage: 250,
        nombreVilles: 0,
        selectFilter: '',
        inputFilter: '',
        selectPage: 1,
        cityId: null,
        json: [],
        dataErreur: {},
        loader: false
    },

    mutations: {
        SET_SELECT_FILTER(state, payload) {
            state.selectFilter = payload
        },
        SET_INPUT_FILTER(state, payload) {
            state.inputFilter = payload
        },
        SET_SELECTED_PAGE(state, payload) {
            state.selectPage = parseInt(payload);
        },
        SET_DISPLAY_LOADER(state, payload) { 
            state.loader = payload 
        },
        SET_ERREUR(state, payload) { 
            state.dataErreur = payload 
        },
        SET_NOMBRE_VILLES(state, payload) { 
            state.nombreVilles = payload 
        },
        SET_CITY_ID_MODAL(state, payload) {
            state.cityId = payload
        },
        SET_JSON(state, payload) {
            state.json = payload
        },
        SET_COLONNES(state, payload) {
            state.colonnes = payload;
        }
    },

    actions: {
        async readJsonFile({ commit }) {
            commit('SET_DISPLAY_LOADER', true); // Apparition overlay
			
			await axios.get("/data/MOCK_DATA_WORLD.json")
			.then(json => {
                commit('SET_JSON', json.data);
                commit('SET_NOMBRE_VILLES', json.data.length);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des évènements\n", error);
                //for(var prop in error) { console.log("Propriété de error", prop, "\n", error[prop]); } //TEST
                commit("SET_ERREUR", {
                    err: "Vuex store.js => " + error.message,
                    details: "URL: " + error.config.url 
                });
            })
            .finally(() => {
                commit('SET_DISPLAY_LOADER', false) // Disparition overlay 
            });
        }

    },

    getters: {
        // Constitution liste des pays pour la liste déroulante dans le composant 'header'
        getPays(state) {
            // On classe alphabétiquement par pays
            state.json.sort( (a, b) =>  (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0) );
            
            let pays = "";
            let listePays = [];
             state.json.forEach(x => { 
                if(pays !== x.country) { 
                    pays = x.country;
                    listePays.push(pays); 
                }
            });
            return listePays;
        },

        // Colonne de données (nom ville, pays, région) sur laquelle ets fait le tri
        getSortingParams(state) {
            return state.colonnes.filter(c => c.order != '')[0]
        }
    }
});