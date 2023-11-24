<template>
    <div>
        <v-row class="ma-0 pa-0">
            <v-col cols="11"></v-col>
            <v-col cols="1" class="ma-0 pa-0">
                <v-tooltip text="BACnet">
                    <template v-slot:activator="{ props }">
                        <v-btn 
                            v-bind="props"
                            :style="{ marginTop: '-100px' }" 
                            variant="outlined" 
                            color="warning"
                            @click="$router.push({name:'DigitalTwins_Site_Building_Bacnet',
                            params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid}})"
                            size="x-small"></v-btn>
                    </template>
                </v-tooltip>
            </v-col>
        </v-row>
        <v-container>
            <!--<h2 style="color: #3B5249;">Monitoring - Gebäude {{ $route.params.buildingid  }}</h2> -->
                <div v-if="monitoringStore.loadingAasTree === true">
                    <v-progress-linear
                    indeterminate
                    color="success"
                    ></v-progress-linear>
                </div>
                <v-row>
                    <v-col v-for="aasGrundfunktion in monitoringStore.aasTree" :key="aasGrundfunktion" cols = '6'>
                        <v-card max-width="70%" v-if="aasGrundfunktion.aasGrundfunktion.semanticId ==='https://th-koeln.de/gart/BaseFunctionSupplyHeatAAS/1/0'" 
                        class="mx-auto my-8" elevation="1">
                            <v-card-title class="text-center">Wärme versorgen</v-card-title>
                            <v-divider class="mx-4" :thickness="3"></v-divider>
                            <div class="d-flex flex-column align-center">
                                <v-avatar size="112" rounded="0" class="ma-6">
                                    <v-img class="mx-auto" max-width="78" href="#" contain :src="wärmePic[[Object.keys(wärmePic)[0]]]"></v-img>
                                </v-avatar>
                                <v-btn
                                    class="max-3 mb-4" 
                                    variant="outlined" 
                                    color="warning"
                                    @click="$router.push({name:'DigitalTwins_Site_Building_Grundfunktion', 
                                    params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid, grundfunktion:'Wärme versorgen'}}), 
                                    monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene"
                                >
                                    Go to
                                </v-btn>
                            </div>
                        </v-card>
                        <v-card elevation="1" max-width="70%" v-else-if="aasGrundfunktion.aasGrundfunktion.semanticId ==='https://th-koeln.de/gart/BaseFunctionSupplyAirAAS/1/0'" class="mx-auto my-8">
                            <v-card-title class="text-center">Luft versorgen</v-card-title>
                            <v-divider class="mx-4" :thickness="3"></v-divider>
                            <div class="d-flex flex-column align-center">
                                <v-avatar size="112" rounded="0" class="ma-6">
                                    <v-img class="mx-auto" max-width="78" href="#" contain :src="luftPic[[Object.keys(luftPic)[0]]]"></v-img>
                                </v-avatar>
                                <v-btn
                                    class="max-3 mb-4" 
                                    variant="outlined" 
                                    color="warning"
                                    @click="$router.push({name:'DigitalTwins_Site_Building_Grundfunktion', 
                                    params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid, grundfunktion:'Luft versorgen'}}), 
                                    monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene"
                                >
                                    Go to
                                </v-btn>
                            </div>
                        </v-card>
                        <v-card max-width="70%" v-else-if="aasGrundfunktion.aasGrundfunktion.semanticId ==='https://th-koeln.de/gart/BaseFunctionSupplyColdAAS/1/0'" class="mx-auto my-8" elevation="1">
                            <v-card-title class="text-center">Kälte versorgen</v-card-title>
                            <v-divider class="mx-4" :thickness="3"></v-divider>
                            <div class="d-flex flex-column align-center">
                                <v-avatar size="112" rounded="0" class="ma-6">
                                    <v-img class="mx-auto" max-width="78" href="#" contain :src="kältePic[[Object.keys(kältePic)[0]]]"></v-img>
                                </v-avatar>
                                <v-btn
                                    class="max-3 mb-4" 
                                    variant="outlined" 
                                    color="warning"
                                    @click="$router.push({name:'DigitalTwins_Site_Building_Grundfunktion', 
                                    params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid, grundfunktion:'Kälte versorgen'}}), 
                                    monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene"
                                >
                                    Go to
                                </v-btn>
                            </div>
                        </v-card>
                        <v-card max-width="70%" v-else-if="aasGrundfunktion.aasGrundfunktion.semanticId ==='https://th-koeln.de/gart/BaseFunctionSupplyMediaAAS/1/0'" 
                        class="mx-auto my-8" elevation="1">
                            <v-card-title class="text-center">Medien versorgen</v-card-title>
                            <v-divider class="mx-4" :thickness="3"></v-divider>
                            <div class="d-flex flex-column align-center">
                                <v-avatar size="112" rounded="0" class="ma-6">
                                    <v-img class="mx-auto" max-width="78" href="#" contain :src="medienPic[[Object.keys(medienPic)[0]]]"></v-img>
                                </v-avatar>
                                <v-btn
                                    class="max-3 mb-4" 
                                    variant="outlined" 
                                    color="warning"
                                    @click="$router.push({name:'DigitalTwins_Site_Building_Grundfunktion', 
                                    params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid, grundfunktion:'Medien versorgen'}}), 
                                    monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene"
                                >
                                    Go to
                                </v-btn>
                            </div>
                        </v-card>
                        <v-card max-width="70%" v-else-if="aasGrundfunktion.aasGrundfunktion.semanticId ==='https://th-koeln.de/gart/BaseFunctionSecureAAS/1/0'" class="mx-auto my-8" elevation="1">
                            <v-card-title class="text-center">Sichern</v-card-title>
                            <v-divider class="mx-4" :thickness="3"></v-divider>
                            <div class="d-flex flex-column align-center">
                                <v-avatar size="112" rounded="0" class="ma-6">
                                    <v-img class="mx-auto" max-width="78" href="#" contain :src="sichernPic[[Object.keys(sichernPic)[0]]]"></v-img>
                                </v-avatar>
                                <v-btn
                                    class="max-3 mb-4" 
                                    variant="outlined" 
                                    color="warning"
                                    @click="$router.push({name:'DigitalTwins_Site_Building_Grundfunktion', 
                                    params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid, grundfunktion:'Sichern'}}), 
                                    monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene"
                                >
                                    Go to
                                </v-btn>
                            </div>
                        </v-card>
                        <v-card max-width="70%" v-else-if="aasGrundfunktion.aasGrundfunktion.semanticId ==='https://th-koeln.de/gart/BaseFunctionSupplyElectricityAAS/1/0'" 
                        class="mx-auto my-8" elevation="1">
                            <v-card-title class="text-center">Strom versorgen</v-card-title>
                            <v-divider class="mx-4" :thickness="3"></v-divider>
                            <div class="d-flex flex-column align-center">
                                <v-avatar size="112" rounded="0" class="ma-6">
                                    <v-img class="mx-auto" max-width="78" href="#" contain :src="stromPic[[Object.keys(stromPic)[0]]]"></v-img>
                                </v-avatar>
                                <v-btn
                                    class="max-3 mb-4" 
                                    variant="outlined" 
                                    color="warning"
                                    @click="$router.push({name:'DigitalTwins_Site_Building_Grundfunktion', 
                                    params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid, grundfunktion:'Strom versorgen'}}), 
                                    monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene"
                                >
                                    Go to
                                </v-btn>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
        </v-container>
    </div>
    
</template> 

<script>
import { useDigitalTwinsStore } from "@/store/digitaltwins"
import { useGeneralStore } from "@/store/general"
import { useMonitoringStore } from "@/store/monitoring"

export default{
    data () {
        return {
            file: null,
            aasTree: [],
            grundfunktionen: [],
            wärmePic: {'Wärme versorgen': Object.values(import.meta.glob('@/assets/Wärmeversorgen.svg', {as:'url', eager:true}))[0]},
            luftPic: {'Luft versorgen': Object.values(import.meta.glob('@/assets/Luftversorgen.svg', {as:'url', eager:true}))[0]},
            kältePic: {'Kälte versorgen': Object.values(import.meta.glob('@/assets/Kälteversorgen.svg', {as:'url', eager:true}))[0]},
            medienPic: {'Medien versorgen': Object.values(import.meta.glob('@/assets/Medienversorgen.svg', {as:'url', eager:true}))[0]},
            sichernPic: {'Sichern': Object.values(import.meta.glob('@/assets/Sichern.svg', {as:'url', eager:true}))[0]},
            stromPic: {'Strom versorgen': Object.values(import.meta.glob('@/assets/Stromversorgen.svg', {as:'url', eager:true}))[0]},
            items: [
                {function: 'Luft versorgen', image: Object.values(import.meta.glob('@/assets/air-system.jpeg', {as:'url', eager:true}))[0], route: 'Monitoring_Site_Building_Grundfunktion'},
                {function: 'Kälte versorgen', image: Object.values(import.meta.glob('@/assets/cooling-system.jpeg', {as:'url', eager:true}))[0], route: 'Monitoring_Site_Building_Grundfunktion'},
                {function: 'Wärme versorgen', image: Object.values(import.meta.glob('@/assets/heating-system.jpeg', {as:'url', eager:true}))[0], route: 'Monitoring_Site_Building_Grundfunktion'}
            ]
        }
    },
    computed: {
        digitalTwinStore () {
        return useDigitalTwinsStore()
        },
        generalStore () {
            return useGeneralStore()
        },
        monitoringStore () {
            return useMonitoringStore()
        }
    },
    mounted() {
        this.grundfunktionen = this.generalStore.loadedBuildingWithGrundfunktion
        this.getGrundfunktionenForBulding(this.$route.params.buildingaasid)
    },
    methods: {
        /*
        navigateToRoute(routeName, siteid, buildingid) {
            this.$router.push({name:routeName, params:{siteid:siteid, buildingid: buildingid, grundfunktion:'Luft versorgen'}});
        },
        */
        async getGrundfunktionenForBulding(aasId) {
            let aasTree = await this.monitoringStore.getGrundfunktionen(aasId, this.grundfunktionen)
            this.aasTree = aasTree
        }
    }
}
</script>

<style>
.negative-margin {
  margin-top: -100px; 
}
</style>