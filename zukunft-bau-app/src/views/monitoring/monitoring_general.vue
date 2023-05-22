<template>
    <v-container fill-height class="mb-3 mx-2" id="maincontents">
        <v-row no-gutters class="flex-nowrap">Monitoring... Welche Gebäude möchtest du sehen?</v-row>
        <v-row>{{ loadedSiteInformation }}</v-row>
        <v-btn @click="siteName">siteName</v-btn>
        <v-row no-gutters class="flex-nowrap">
            <v-col class="flex-column mx-2" v-for="site,key in loadedSiteInformation" :key="key" >
                <v-btn class='mt-2' @click="$router.push({name:'Monitoring_Site', params:{siteid:site.siteName}})">
                    <h2> In {{ Object.values(site)[2] }} Standort {{ Object.values(site)[0] }}</h2>
                </v-btn>
            </v-col>
        </v-row>


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

        return{loadedSiteInformation}},
   
}
</script>

<style>
@import '../../styles/styles-zukunft-bau.css'
</style>


