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
      <v-col
          md="6"
          class="flex-column"
        >
        <component :is ="component" />
        </v-col>

      <!-- HIER DYNAMISCH GENERAL KOMPONENTEN REINLADEN UND WENN KLICK AUF EINE DER KOMPONENTEN, DANN SPEZIFISCHE KOMPONENTEN EINLADEN-->
        <v-col
          md="6"
          class="flex-column"
        >
            <Energieverbrauch />
        </v-col>
        <v-col
          md="4"
          class="flex-column"
        >
            <Ampel />
        </v-col>


        <v-col
          md="8"
          class="flex-column"
        >
            <Heizkreis />
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
 components:{Heizkreis,Energieverbrauch, Ampel},
 setup () {
  	   // const bunch = bunchOfComp;
        //console.log(bunch)
        const route= useRoute();
        const building= route.params.buildingid;
        const component= "Heizkreis";




     //const monitoringStore= useMonitoringStore()
     //const {totalCount,favCount,loading}=storeToRefs(buildingStore)
     //buildingStore.getBuildings()
     //const filter = ref('all')
     return { building,component }
 }
}
</script>


<style scoped>
@import "../../../../styles/styles-zukunft-bau.css"
</style>
