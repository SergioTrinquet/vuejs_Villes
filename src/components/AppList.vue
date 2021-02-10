<template>
    <div class="list">
        <div class="headerList">
            <span v-for="(colonne, index) in colonnes" 
                :class="{ sorted: colonne.order !== '' }" 
                :key="index"
            >
                {{ colonne.titre }}
                <i class="iconHeader" :class="colonne.order === 'desc' ? 'fas fa-sort-alpha-up' : 'fas fa-sort-alpha-down'" 
                    @click="sortByColumn(index)"
                    ></i> {{ colonne.order }}
            </span>
        </div>
        <div class="contentList">
            <div v-for="(ville, index) in villesFiltre" :key="index">
                <span>
                    <span class="lien" 
                        data-surlign
                        v-html="$options.filters.highlight($options.filters.capitalize(ville.city), inputFilter, $options._scopeId)"  
                        @click="displayDataVille(ville.id)"
                    ></span>
                </span>
                <span data-surlign v-html="$options.filters.highlight(ville.country, selectFilter, $options._scopeId)"></span>
                <span>{{ ville.state | majuscules }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import capitalize from '@/filters/capitalize'
import sort from '@/sort'

export default {
    name: "AppList",

    filters: {
        capitalize,

        majuscules(value) {
            return (!value) ? '-' : value.toUpperCase();
        },
        highlight(value, saisie, scopedId) {
            if(saisie === '') {
                return value;       
            } else {    
                var rgx_saisie = new RegExp(saisie,"gi");
                return value.replace(rgx_saisie, function(match) { return "<i " + scopedId + "=''>" + match + "</i>" });
            }
        }
    },

    data() {
        return {
            dataVilles: []
        }
    },
    
    computed: {
        ...mapGetters({ 
            pays: 'getPays', 
            sortingParams:'getSortingParams'
        }),
        /* 
        pays() { return this.$store.getters.getPays },
        sortingParams() { return this.$store.getters.getSortingParams }, 
        */

        ...mapState([
            'colonnes', 
            'inputFilter', 
            'selectFilter',
            'json', 
            'nbrLignesParPage', 
            'selectPage'
        ]),
        /* 
        colonnes() {  return this.$store.state.colonnes },
        inputFilter() { return this.$store.state.inputFilter },
        selectFilter() { return this.$store.state.selectFilter },
        json() { return this.$store.state.json },
        nbrLignesParPage() { return this.$store.state.nbrLignesParPage }, 
        selectPage() { return this.$store.state.selectPage },
        */
       
        villesFiltre() {
			const saisie = this.inputFilter.toLowerCase(); // Input saisie    
			const selection = this.selectFilter; // Select saisie

			const indexSelection = this.pays.indexOf(this.selectFilter);
			
            const filtered_villes = this.dataVilles.filter((ville) => {
                if(ville.city.toLowerCase().indexOf(saisie) > -1 && (ville.country == selection || indexSelection == -1)) {
                    return ville;
                }
            });
            
            this.$store.commit('SET_NOMBRE_VILLES', filtered_villes.length); // Pour calcul nb de pages, et affichage nb de villes ds composant 'Pagination'
            
            const numPage = this.selectPage; // N° de la page sélectionnée
			const sliceFrom = (numPage - 1) * this.nbrLignesParPage;
			const sliceTo = numPage * this.nbrLignesParPage;
			
			return filtered_villes.slice(sliceFrom, sliceTo);
        }
    },

    watch: {
        // Classement des données à chaque modif sur colonnes
        sortingParams(val) { 
            this.dataVilles = sort(this.json, val.champ, val.order);
        },

        // Pour afficher début de la liste des villes, sinon pb si par ex. on est sur la 10eme page,
        // que l'on filtre et qu'il n'y a pas 10 pages de résultats
        inputFilter(val) {
            if(val != '') { this.$store.commit('SET_SELECTED_PAGE', 1) }
        },
        selectFilter(val) {
            if(val != '') { this.$store.commit('SET_SELECTED_PAGE', 1) }
        }
    },

    methods: {
        // Click sur colonne de la liste pour modification du classement
        sortByColumn(idc) {
            this.$store.commit('SET_DISPLAY_LOADER', true); // Apparition overlay

            // Copie de 'this.colonnes' pour le manipuler avant de modifier l'original via un commit
            let clns = JSON.parse(JSON.stringify(this.colonnes)); // Pour faire une deep copy du tableau d'objets (spread operator ne fait pas de deep copy par ex.)
            
            let selectedColonne = clns[idc];

            // Récupération de la valeur de la propriété 'order' de la copie de 'colonnes'
            const order = selectedColonne.order;
            const neworder = (order === "asc" ? "desc" : ((order === "desc" || order === "") ? "asc" : ""));
    
            // Réinitialisation des valeurs de ttes les colonnes...
            clns.forEach(cl => cl.order = '' );
            // ...Puis affectation nouvelle valeur pour cln à ordonner
            selectedColonne.order = neworder;

            this.$store.commit('SET_COLONNES', clns); // Modif valeur de 'colonnes' ds le state du Vuex

            this.$store.commit('SET_DISPLAY_LOADER', false); // Disparition overlay 
        },

        // Click sur nom de ville : Pour faire apparaitre modal avec infos de la ville + carte
        displayDataVille(idv) {
            this.$store.commit("SET_CITY_ID_MODAL", idv);
        }

    },

    // Affichage liste des villes à l'arrivée sur le composant
     mounted() {    
         //console.log("this.$el", this.$el); //TEST
        this.$store.dispatch('readJsonFile')
        .then(() => { 
            // On attend la fin de la requete asynchrone dans Vuex pour charger le json, qui alimente ensuite la data 'json' que l'on récupère via un computed
            // Si dans Vuex on n'utilise pas async/await puis ici le then de la promesse, le computed 'json' n'a pas le temps d'être alimenté, donc il est vide 
            // quand on le récupère ici.
            this.dataVilles = sort(this.json, this.sortingParams.champ, this.sortingParams.order);
        });
    }

}
</script>

<style scoped>
    .iconHeader {
        cursor: pointer;
        margin-left: 6px;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        color: #6279bd;
        padding: 6px;
        font-size: 15px;
        width: 1em;
        height: 1em;
        box-sizing: content-box;
    }
    .sorted .iconHeader {
        background-color: rgba(255,255,255,1);
    }

    /* Contenu de la liste */
    #filterResult {
        background-color: rgba(212, 212, 212, 0.5);
    }
    #filterResult > div { 
        padding: 5px 10px; 
        border-bottom: dashed 1px #cecece; 
    }


.list { 
    margin: 122px 25px 25px 25px; 
    box-shadow: 0 3px 4px rgba(50,50,50,.3);
}

.contentList {
    background-color: rgba(212, 212, 212, 0.3);
}
.contentList > div { padding: 5px 10px; }
.contentList > div:first-child { padding: 50px 10px 5px 10px; }

.headerList {
    padding: 7px 10px;
    background-color: #6279bd;
    color: #fff;
    font-weight: bold;
    position: fixed;
    z-index: 9;
    width: calc(100% - 50px);
}
.contentList > div { border-bottom: dashed 1px #c7c7c7; }
.contentList > div:hover { background-color: #ececec; }
.contentList > div > span,
.headerList > span { display: inline-block; }
.contentList > div > span:nth-child(1),
.headerList > span:nth-child(1) { width:25%; min-width: 200px; }
.contentList > div > span:nth-child(2),
.headerList > span:nth-child(2) { width:25%; min-width: 200px; }
.contentList > div > span:nth-child(3),
.headerList > span:nth-child(3) { width:30%; min-width: 350px; }

.contentList [data-surlign] i {  
    font-style: normal;
    background-color: yellow; 
}

.lien { 
    cursor: pointer; 
}
.lien::after {
    font-family: "Font Awesome 5 Free";
    font-weight: 900; 
    content: "\f054";
    font-size: 13px;
    color: #f34d00;
    margin: 0 0 0 5px;
    transition: margin 0.1s ease-in-out;
}
.lien:hover { 
    color: #f34d00; 
}
.lien:hover::after {
    margin: 0 0 0 8px;
}
</style>