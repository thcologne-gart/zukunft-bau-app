import { defineStore } from 'pinia'
import { useRoute } from 'vue-router';

  export const useMonitoringStore = defineStore('monitoring', {

    state: () => ({
      building:'',
      function:'',
      data:[],
      vorlauftemperatur:[],
      vorlauftemperatur_value:[],
      vorlauftemperatur_timestamp:[],
      loading:false
    }),
    getters: {
      // ausreißer(){
      //     return this.vorlauftemperatur.filter(t => t.toohigh)
      filterProfile:(state) => {
        const route= useRoute();
        state.building= route.params.buildingid;
        //state.function=route.params.functionid;
        return state.building, state.function
      },
      totalCountValues:(state) => { return state.vorlauftemperatur.length}

    },
    actions: {
      async getData (){
        this.loading=true
        const res=await fetch ('http://localhost:3001/heizkreis')
        const data=await res.json()
        this.data=data;
        //dynamisches Aufbauen der Lines: Wenn timestamps übereinstimmen von allen Reihen,
        //dann für jede Reihe (json objekt) ein objekt erstellen mit namen = name datenpunkt
        //ein- & ausblendeoption chart
        this.vorlauftemperatur=this.data.filter(data => {return data.name === "Messwert Vorlauftemperatur"})
        this.vorlauftemperatur_timestamp=this.vorlauftemperatur[0].timestamp;
        this.vorlauftemperatur_value= this.vorlauftemperatur[0].value;
       // this.vorlauftemperatur_messwert= this.vorlauftemperatur.filter (vorlauftemperatur => { return this.vorlauftemperatur.value === [40,39,10,40,39,80,40]});
       // console.log(this.vorlauftemperatur_value)

        this.loading=false
      }
    }
  })


