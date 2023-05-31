<template>
    <v-container fill-height class="maincontents_monitoring mb-0 mx-2" >
        <v-row no-gutters class="flex-nowrap mb-0 pb-0" justify="space-around" ><h2>Welche Liegenschaft möchtest du betrachten?</h2>  </v-row>
        <v-row class="mt-0" justify="space-between">
            <v-card class="mx-auto" :width="400" :height="350" v-for="site,key in loadedSiteInformation" :key="key" >
                
                    <v-row color="#a3a0a0" justify="center">
                        <v-img :height='200' class='mt-10 ' src="@/assets/Hauser_Lupe.svg"></v-img>
                </v-row>
                <v-row>
                    <v-btn color="highlight" class='mt-15 mx-5' @click="$router.push({name:'Monitoring_Site', params:{siteid:site.siteName}})">
                    <h3 >  Standort {{ site.city }} - {{ site.siteName }}</h3>
                </v-btn>
                </v-row>
                  
            </v-card>   
        </v-row>

        <v-row class="mt-10"></v-row>
      


    </v-container>
   
</template>

<script>
import { useGeneralStore } from "@/store/general"
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export default{
   
    setup(){
        const generalStore=useGeneralStore()
        const {loadedSiteInformation}=storeToRefs(generalStore)
       
        return{loadedSiteInformation}}
   
}
</script>

<style>
@import '../../styles/styles-zukunft-bau.css'
</style>


