<template>
    <v-container fill-height class="mb-3 mx-2" id="maincontents" >
       <h1>Monitoring Overview</h1>
   <v-row
     no-gutters
     class="flex-nowrap"
   >
     <v-col
       cols="4"
       class="flex-column"
     >
        <p>Hier jetzt erst mal das Standard-Chart für einen Heizkreis</p>
     </v-col>
     <v-col
       cols="8"
       class="flex-column"
     >
        <!-- <Heizkreis /> -->
     </v-col>
   </v-row>
    </v-container>
   
</template>

<script>
// import Heizkreis from '@/components/monitoring/HeatingCircuit.vue'
export default{
//    components:{ Heizkreis },
   setup () {
       //const monitoringStore= useMonitoringStore()
       //const {totalCount,favCount,loading}=storeToRefs(buildingStore)
       //buildingStore.getBuildings()
       //const filter = ref('all')
       //return { buildingStore, filter, totalCount,favCount,loading  }
   }
}
</script>

<style scoped>
@import "../../../../styles/styles-zukunft-bau.css"
</style>