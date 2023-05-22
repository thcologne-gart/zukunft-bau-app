<template>
    <div>
        <h1>Digital Twins - General</h1>
        <p> Wähle einen Standort aus, den du sehen möchtest</p>
        <div v-for="site in sites" :key="site.id" >
        <router-link :to="{name:'DigitalTwins_Site', params:{siteid:site.name}}">
            <h2>{{ site.name }}</h2>
        </router-link>  
        </div>
        <v-card class="mx-auto my-16"
        max-width="85%">
            <v-toolbar
                color="white"
                >
                <v-toolbar-title style="color: #bc3384">
                    <span>Digital Twins - Übersicht</span>
                </v-toolbar-title>
            </v-toolbar>
            <v-divider :thickness="4"></v-divider>
            <div v-for="site in generalStore.loadedSiteInformation" :key="site.siteName">
                <DigitalTwinOverview :site="site"/>
            </div>
        </v-card>
    </div>
</template> 

<script>
import { useGeneralStore } from "@/store/general"
import DigitalTwinOverview from "@/components/digitalTwin/DigitalTwinOverview.vue"

export default{
    setup(){
        // das hier dann aus deinem store laden:
        const sites=[ {name:"Köln",id:"1"},{name:"Hamburg",id:"2"} ]
    return{sites}},
    components: {
        DigitalTwinOverview
    },
    computed: {
        generalStore () {
            return useGeneralStore()
        }
    }
}

</script>