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
        class="flex-nowrap"
      >
      <!-- HIER DYNAMISCH GENERAL KOMPONENTEN REINLADEN UND WENN KLICK AUF EINE DER KOMPONENTEN, DANN SPEZIFISCHE KOMPONENTEN EINLADEN-->
        <v-col
          cols="4"
          class="flex-column"
        >
            <Energieverbrauch />
        </v-col>
        <v-col
          cols="8"
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
import { useRoute } from 'vue-router';
export default{
 components:{ Energieverbrauch, Heizkreis },
 setup () {
        const route= useRoute();
        const building= route.params.buildingid;
     //const monitoringStore= useMonitoringStore()
     //const {totalCount,favCount,loading}=storeToRefs(buildingStore)
     //buildingStore.getBuildings()
     //const filter = ref('all')
     return { building }
 }
}
</script>


<style scoped>
@import "../../../../styles/styles-zukunft-bau.css"
</style>
