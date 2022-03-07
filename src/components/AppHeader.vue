<template>
    <div class="bandeau">
      <div class="titre">{{ titre }}</div>
        <div>
            <div>
                <input 
                    type="text"
                    placeholder="Filtrer sur un nom de ville"
                    v-model="inputFilter" 
                >
                <select v-model="selectFilter">
                    <option selected="selected">Tous les pays</option>
                    <option v-for="(p, index) in pays" :value="p" :key="index">{{ p }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AppHeader", 
    computed: {
        titre() { 
            return this.$store.state.titre 
        },
        pays() { 
            return this.$store.getters.getPays
        },
        selectFilter: {
            set(selectedValue) {
                this.$store.commit('SET_SELECT_FILTER', selectedValue);
            },
            get() {
                return this.$store.state.selectFilter;
            }
        },
        inputFilter: {
            set(inputValue) {
                this.$store.commit('SET_INPUT_FILTER', inputValue);
            },
            get() {
                return this.$store.state.inputFilter;
            }
        }
    }
}
</script>

<style>
  ::placeholder {
      color: #fff;
      opacity: 0.7;
  }
  :-ms-input-placeholder {
      color: #fff;
      opacity: 0.7;
  }
  ::-ms-input-placeholder {
      color: #fff;
      opacity: 0.7;
  }
  .titre {
      font-size:14px;
      font-weight: bold;
  }
  .bandeau {
      position: fixed;
      top: 0;
      z-index: 10;
      width: 100%;
      color:  #fff;
      margin: 0;
      text-align: center;
  }
  .bandeau > div:first-child {
      background-color: #002971;
      padding: 5px;
      font-size: .9em;
  }
  .bandeau > div:last-child {
      background-color: #274d8e;
  }
  .bandeau > div:last-child > div {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
  }
  .bandeau input,
  .bandeau select {
      border-radius: 4px;
      width: 50%;
      max-width: 300px;
      border: 0;
      margin: 0;
      padding: 7px 10px;
      background-color: #3f68ae;
      color: #fff;
      font-size: 14px;
      height: 31px;
  }
  .bandeau select { margin: 0 0 0 8px; }
  .bandeau input:hover,
  .bandeau select:hover {
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.8) inset;
  }
</style>