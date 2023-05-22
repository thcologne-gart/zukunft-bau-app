<template>
    <v-container fill-height class="mb-3 mx-2" id="maincontents">
        <v-row no-gutters class="flex-nowrap">Monitoring... Welche Gebäude möchtest du sehen?</v-row>
        
        <v-row no-gutters class="flex-nowrap">
            <v-col class="flex-column mx-2" v-for="site in sites" :key="site.id" >
                <v-btn class='mt-2' @click="$router.push({name:'Monitoring_Site', params:{siteid:site.name}})">
                    <h2> Standort  {{ site.name }}</h2>
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
    
    const sites=[ {name:"Köln",id:"1"},{name:"Hamburg",id:"2"}]
    return{sites}}
}
</script>

<style>
@import '../../styles/styles-zukunft-bau.css'
</style>


export default{
    components:{ BuildingDetails, TestForm2},
    setup () {
        const buildingStore= useBuildingStore()
        const {totalCount,favCount,loading}=storeToRefs(buildingStore)
        buildingStore.getBuildings()
        const filter = ref('all')
        return { buildingStore, filter, totalCount,favCount,loading  }
    }
}