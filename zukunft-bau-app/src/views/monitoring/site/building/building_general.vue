<template>
  <v-container fill-height class="mb-3 mx-2" >
     <!-- HIER ÜBERSCHRIFT ALS NAVIGATOR NUTZEN WENN KLICK AUF HEIZUNG; DANN ADD HEIZUNG DAHINTER ETC.; ALLES ALS LINKS!-->
     <v-row><h2>Monitoring {{ building }}</h2></v-row>

     <v-row style="height: 20vh" >
        <v-img :width="300"
            aspect-ratio="16/9"
            cover
            src="@/assets/BIM.jpeg">
        </v-img>
     </v-row>

      <v-row
      >
      <!-- WENN KLICK AUF EINE DER KOMPONENTEN, DANN SPEZIFISCHE KOMPONENTEN EINLADEN-->
      <v-col
          md="4"
          class="flex-column" v-for="component in listofgeneralcomponents"
        >
        <component :is ="component" />
      </v-col
      >
      <v-col md="4"
          class="flex-column"
          >
        <button class="image-button">
          <v-img src="@/assets/Luftversorgen.svg"></v-img>
          <span> Monitoring Luftversorgen</span>
        </button>



        <v-btn>
          <v-img cover src="@/assets/Wärmeversorgen.svg"></v-img>
          Monitoring Wärmeversorgung
        </v-btn>
        <v-btn>
          <v-img cover src="@/assets/Kälteversorgen.svg"></v-img>
          Monitoring Kälteversorgung
        </v-btn>
        <v-btn>
          <v-img cover src="@/assets/Sichern.svg"></v-img>
          Monitoring Sichern
        </v-btn>
        <v-btn>
          <v-img cover src="@/assets/Medienversorgen.svg"></v-img>
          Monitoring Medienversorgung
        </v-btn>
      </v-col>

      </v-row>
  </v-container>

</template>

<script>
import Heizkreis from '@/components/monitoring/heating/HeatingCircuit.vue'
import Energieverbrauch from '@/components/monitoring/general/Energy.vue'
import Ampel from '@/components/monitoring/general/TrafficLight.vue'

import { useRoute } from 'vue-router';
export default{
 components:{Ampel, Heizkreis,Energieverbrauch },
 setup () {
        const listofgeneralcomponents=['Energieverbrauch', 'Ampel'];

        const route= useRoute();
        const building= route.params.buildingid;

        // for (let i=0; i=)


     //const monitoringStore= useMonitoringStore()
     //const {totalCount,favCount,loading}=storeToRefs(buildingStore)
     //buildingStore.getBuildings()
     //const filter = ref('all')
     return { building,listofgeneralcomponents }
 }
}
</script>


<style>
@import  "../../../../styles/styles-zukunft-bau.css"

</style>
