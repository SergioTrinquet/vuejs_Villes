<template>
<Overlay>
    <div id="encartInfosVille">
        <i class="fas fa-times" @click="closeEncart"></i>
        <div id="content">
            <div class="column">
                <div><label>Ville :</label><span>{{ ville.nom | capitalize }}</span></div>
                <div><label>Pays :</label><span>{{ ville.pays }}</span></div>
                <div><label>Code pays :</label><span>{{ ville.code_pays }}</span></div>
                <div><label>Région :</label><span>{{ ville.region }}</span></div>
            </div>
            <div class="column">
                <div><label>Fuseau horaire :</label><span>{{ ville.fuseau_horaire }}</span></div>
                <div><label>Longitude :</label><span>{{ ville.longitude }}</span></div>
                <div><label>Latitude :</label><span>{{ ville.latitude }}</span></div>
            </div>
        </div>
        <div id="map"></div>
    </div>
</Overlay>
</template>

<script>
import { mapState } from 'vuex'
import mapCreation from '@/services/MapCreation'
import capitalize from '@/filters/capitalize'

import Overlay from '@/components/Overlay'

export default {
    name: 'Modal',

    components: { Overlay },
    
    filters: {
        capitalize
    },

    data() {
        return {
            ville: {
                nom: "-",
                pays: "-",
                code_pays: "-",
                region: "-",
                fuseau_horaire: "-",
                longitude: "-",
                latitude: "-"
            }
        }
    },

    computed: {
        ...mapState(['cityId', 'json'])

        /* cityId() { return this.$store.state.cityId },
        json() { return this.$store.state.json } */
    },

    methods: {
		fillDataModal(id) { 
            const result = this.json.find(v => v.id === id);
            
            this.ville.nom = result.city;
            this.ville.pays = result.country;
            this.ville.code_pays = result.countryCode;
            this.ville.region = (result.state === null ? "-" : result.state);
            this.ville.fuseau_horaire = result.timeZone;

            const lat = result.latitude;
            const lon = result.longitude;
            this.ville.latitude = lat;
            this.ville.longitude = lon;
            
            mapCreation({lat, lon});
        },
        
        closeEncart() {
            this.$store.commit("SET_CITY_ID_MODAL", null);    
        }
    },

    mounted() {
        this.fillDataModal(this.cityId);
    }
}
</script>

<style scoped>
    #encartInfosVille {
        position: fixed;
        z-index: 11;
        top: 0;
        width: 90vw;
        height: 90%;
        max-width: 800px;
        background-color: rgba(10, 10, 10, 0.9);
        border-radius: 15px;
        color: #ffffff;
        padding: min(3vmax, 30px);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        left: 50%;
        margin: 5vh auto;
        animation: 0.5s intro ease-in-out forwards;
    }
    @keyframes intro {
        0% {
            opacity: 0;
            transform: translate(-50%, 40px);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }

    @media screen and (orientation: landscape) {
        #encartInfosVille {
            height: 80%;
            margin: 10vh auto;
        }
    }
    @media screen and (max-height: 500px) {
        #encartInfosVille {
            height: 90%;
            margin: 5vh auto;
        }
    }

    #encartInfosVille > i {
        font-size: 20px;
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
    }
    #encartInfosVille > i:hover {
        transform: scale(1.2);
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    }
    #content { 
        display: table; 
        width: 100%;
        height: 150px;
        font-size: max(14px, min(3vw, 18px));
    }
    #content .column {
        width: 50%;
        display: table-cell;
    }
    .column > div { padding: 5px; }
    #content label { color: #cecece; display: inline-block; }
    #content label + span { margin: 0 0 0 5px; }
    #map {
        height: calc(100% - 170px);
    }
</style>