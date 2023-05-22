<template>
    <v-container fill-height class="mb-3 mx-2" id="maincontents">
        <v-row no-gutters class="flex-nowrap flex-column flex-grow-1">Monitoring... Welche Gebäude möchtest du sehen?</v-row>
        
        <v-row no-gutters class="flex-nowrap"><v-btn class='mt-5' @click="$router.push({name:'Monitoring_Site', params:{siteid:sites.name}})">
    <h2> Standort {{ sites.name }}</h2>
</v-btn></v-row>


    </v-container>
   
</template>

<script>
export default{
setup(){
        // das hier dann aus deinem store laden:
        const sites={name:"Köln",id:"1"}
    return{sites}}
}
</script>

<style>
@import '../../styles/styles-zukunft-bau.css'
</style>