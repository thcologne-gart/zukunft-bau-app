<template >
    <v-container fill-height class="maincontents_monitoring mb-0 mx-2" >
  <v-row> <h2>Deine Häuser</h2></v-row>
  <v-row v-for="site in loadedSiteInformationWithBuildings" :key="site.id" justify="space-around">
    <v-col v-if="site[thissite]"  v-for="building in site[thissite]" :key="building.id">
      <v-card class="mx-auto"
    max-width="344"
  >
   <v-img
      src="@/assets/Haus_Lupe.svg"
      height="200px"
      class='mt-5'
    ></v-img>

    <v-card-title>
      {{ building.buildingInformation.buildingName }}
    </v-card-title>

    <v-card-subtitle >
      {{ building.buildingInformation.city }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="highlight"
        variant="text"
        @click="$router.push({name:'Monitoring_Site_Building', params:{siteid:thissite,buildingid:building.buildingInformation.buildingName}})"
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>



    </v-col>


</v-row>


        <v-row class="mt-10"></v-row>
    </v-container>
</template>

<script>
import { useGeneralStore } from "@/store/general"
import { storeToRefs } from 'pinia';
import { onMounted,computed, ref } from 'vue';
import { useRoute } from 'vue-router';

export default{

    setup(){
        const route= useRoute()
        const thissite= route.params.siteid
        const generalStore=useGeneralStore()


        const {loadedSiteInformationWithBuildings}=storeToRefs(generalStore)



        return{route,thissite,loadedSiteInformationWithBuildings}}

}
</script>

<style scoped>
@import "../../../styles/styles-zukunft-bau.css"
</style>

