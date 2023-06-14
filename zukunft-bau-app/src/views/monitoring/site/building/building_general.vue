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
          <h2 class="mb-3"> Funktioniert mein Gebäude? </h2>

<v-btn v-for="element in grundfunktionen" :key="element" class="my-3 mx-2">
  <v-avatar size="36px" rounded="0" >
    <v-img height="100%" :src="element[[Object.keys(element)[0]]]"></v-img>
  </v-avatar>
  <span class="ml-5">{{ Object.keys(element)[0] }}</span>
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
import { ref,computed } from 'vue';
export default{
 components:{Ampel, Heizkreis,Energieverbrauch },
 setup () {
        const listofgeneralcomponents=['Energieverbrauch', 'Ampel'];
        //Grundfunktionen sind später auch User-abhängig/Gebäudespezifisch --> Pinia

        // const images = import.meta.glob('@/assets/*.svg', {as:'url', eager:true})
        // const values= Object.values(images);
        // const firstElement=values[0];
        // console.log(firstElement)
        const grundfunktionen=[
          {'Wärmeversorgen': Object.values(import.meta.glob('@/assets/Wärmeversorgen.svg', {as:'url', eager:true}))[0]},
          {'Kälteversorgen': Object.values(import.meta.glob('@/assets/Kälteversorgen.svg', {as:'url', eager:true}))[0]},
          {'Luftversorgen': Object.values(import.meta.glob('@/assets/Luftversorgen.svg', {as:'url', eager:true}))[0]},
          {'Medienversorgen': Object.values(import.meta.glob('@/assets/Medienversorgen.svg', {as:'url', eager:true}))[0]},
          {'Sichern': Object.values(import.meta.glob('@/assets/Sichern.svg', {as:'url', eager:true}))[0]},
          {'Stromversorgen': Object.values(import.meta.glob('@/assets/Stromversorgen.svg', {as:'url', eager:true}))[0]},
      ]




        const route= useRoute();

        const building= route.params.buildingid;

     return { listofgeneralcomponents, grundfunktionen,building}
 }
}
</script>


<style>
@import  "../../../../styles/styles-zukunft-bau.css"

</style>
