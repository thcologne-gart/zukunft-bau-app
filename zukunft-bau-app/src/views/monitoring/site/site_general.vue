<template >
    <v-container fill-height class="maincontents_monitoring mb-0 mx-2" >
        <h2>Deine Häuser</h2>
        {{ place(loadedSiteInformationWithBuildings)}}
  <v-card v-for="building,key in loadedSiteInformationWithBuildings" :key="key"
    class="mx-auto"
    max-width="344"
  >
  <!-- {{ building[site] }} -->
 
    <v-img 
      src="@/assets/Haus_Lupe.svg"
      height="200px"
      class='mt-5'
    ></v-img>

    <v-card-title>
      Top western road trips
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        variant="text"
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>


        <v-row class="mt-10"></v-row>
    </v-container>
</template>

<script>
import { useGeneralStore } from "@/store/general"
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default{
   
    setup(){
        const route= useRoute()
        var siteInfo=[]
        const site= route.params.siteid
        const generalStore=useGeneralStore()
        const {loadedSiteInformationWithBuildings}=storeToRefs(generalStore)
        const place = (Company) => {for (let key in Company) {
            console.log(key, Company[key])
            if (Company[key] = site)
                {siteInfo=Company} // wenn site=sitename aus route, dann ist das unser Zielobjekt, wo die Gebäude nun näher ausgewählt werden können

        }}
       
        
        return{place,route,site,loadedSiteInformationWithBuildings}}
   
}
</script>

<style scoped>
@import "../../../styles/styles-zukunft-bau.css"
</style>

