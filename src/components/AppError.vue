<template>
    <Overlay :over="true">
        <div class="modalErreur">
            <i 
                class="fas fa-times close" 
                @click="close"
            ></i>
            <div>{{ erreur.err }}</div>
            <div>Info: {{ erreur.details }}</div>
        </div>
    </Overlay>
</template>

<script>
import Overlay from '@/components/Overlay'

export default {
    name: "ErrorModal",

    components: {
        Overlay
    },

    computed: {
        erreur() {
            return this.$store.state.dataErreur;
        },
    },

    methods: {
        close() {
            this.$store.commit("SET_ERREUR", {});
        }
    }
}
</script>

<style scoped>
    .modalErreur {
        position: fixed;
        z-index: 12;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #ff4646;
        color: #fff;
        padding: 30px;
        font-weight: bold;
        border-radius: 10px;
        box-shadow: 0 0 25px rgba(0,0,0,0.3);
        animation: fadeIn 0.4s ease-in-out;
    }
    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translate(-50%, -70%);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
    .close {
        position: absolute;
        font-size: 18px;
        top: 12px;
        right: 12px;
        cursor: pointer;
    }
</style>