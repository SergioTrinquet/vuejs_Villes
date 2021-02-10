<template>
    <div class="underHeader">
        <span class="nbVilles">{{ nombreVilles }} ville(s)</span>
        <select  v-model="selectPage">
            <option v-for="(page, index) in nombrePages" :key="index">{{ page }}</option>
        </select>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    computed: {
        nombreVilles() {
            return this.$store.state.nombreVilles;
        },
        nombrePages() {
            return Math.ceil(this.nombreVilles/this.$store.state.nbrLignesParPage);
        },
        selectPage: {
            set(selectedValue) { this.$store.commit('SET_SELECTED_PAGE', selectedValue); },
            get() { return this.$store.state.selectPage; }
        }
    }
}
</script>

<style scoped>
    .underHeader {
        position: fixed;
        z-index: 9;
        top: 0;
        height: 125px;
        background-color:#ffffff;
        width: 100%;
    }
    .nbVilles {
        display: inline-block;
        margin: 95px 0 0 0;
        padding: 0 0 0 25px;
        width:50%;
    }
    .underHeader select {
        background-color: rgba(212, 212, 212, 0.3);
        border: solid 1px #6d6d6d;
        width: 45px;
        text-align: center;
        font-weight: bold;
    }
</style>