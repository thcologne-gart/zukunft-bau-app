import { defineStore } from 'pinia'

  export const useMonitoringStore = defineStore('monitoring', {
    state: () => ({
      data:[],
      vorlauftemperatur:[],
      loading:false
    }),
    getters: {
      // ausreißer(){
      //     return this.vorlauftemperatur.filter(t => t.toohigh)
      totalCountValues:(state) => { return state.vorlauftemperatur.value.length}
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
        console.log(this.vorlauftemperatur)

        this.loading=false
      }
    }
  })


