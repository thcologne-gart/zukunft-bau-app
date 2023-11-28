<template>
    <div>
        <v-container>
            <!--<h2 style="color: #3B5249;">Monitoring - Gebäude {{ $route.params.buildingid  }}</h2>
            <h3 style="color: #3B5249;">{{ $route.params.grundfunktion }}</h3>-->
            <!--
            <v-row v-for="(funktion, key) in monitoringStore.aasZweiteGrundfunktion" :key="key">
                <v-col cols = '12'>
                    <v-card max-width="70%" class="mx-auto my-8" elevation="1" rounded="0">
                        <v-toolbar
                        color="monitoring"
                        >
                            <v-toolbar-title class="text-center" style="color: white; font-size: 20px">{{ funktion.idShort }}</v-toolbar-title>
                        </v-toolbar>
                        <v-divider class="mx-4" :thickness="3"></v-divider>
                        <div v-for="(anlage, key) in Object.values(funktion.anlagenAas)" :key="key">
                            <v-expansion-panels>
                                <v-expansion-panel elevation="0" rounded="0">
                                    <v-expansion-panel-title style="font-size: 18px;" >{{ anlage.idShort }}</v-expansion-panel-title>
                                        <v-expansion-panel-text>
                                            Hier könnten übergeordnete KPIs stehen oder so
                                        </v-expansion-panel-text>
                                        <v-expansion-panel-text>
                                            <v-btn
                                            class="max-3 mb-4" 
                                            variant="outlined" 
                                            color="warning"
                                            @click="$router.push({name:'Monitoring_Site_Building_Grundfunktion_Anlage', 
                                            params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid, grundfunktion:$route.params.grundfunktion, anlage:anlage.idShort}}), 
                                            monitoringStore.aasAnlage = anlage">Monitoring {{ anlage.idShort }}
                                            </v-btn>
                                        </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        -->
            <v-row>
                <v-col>
                    <v-card class="mx-auto" 
                    max-width="70%"
                    variant="outlined"
                    style="border-radius: 40px; background-color: whitesmoke">
                        <v-tabs
                            color="success"
                            grow
                            center-active
                        >
                            <v-tab v-for="(funktion, key) in monitoringStore.aasZweiteGrundfunktion" :key="key"
                            @click="showFunktion(funktion)"
                            >
                                <v-card-title class="text-center" style="font-size: 18px">
                                {{ funktion.idShort }}
                                </v-card-title>
                            </v-tab>
                        </v-tabs>
                        <div v-for="(anlage, key) in this.funktionZweiteEbene.anlagenAas" :key="key">
                            <v-expansion-panels>
                                <v-expansion-panel rounded="0">
                                    <v-row>
                                        <v-col cols="2">
                                        </v-col>
                                        <v-col cols="8">
                                            <v-expansion-panel-title class="ma-0 pa-0">
                                        <v-row>
                                            <v-col>
                                                <v-card-title class="ma-0 pa-0 text-center" style="font-size: 16px">
                                                {{ anlage.idShort }}
                                                </v-card-title>
                                            </v-col>
                                            <v-col>                                                
                                            </v-col>
                                            <v-col></v-col>
                                        </v-row>
                                        </v-expansion-panel-title>
                                        <v-expansion-panel-text>
                                            Hier könnten übergeordnete KPIs stehen oder so
                                        </v-expansion-panel-text>
                                        <v-expansion-panel-text>
                                            <div class="text-center">
                                                <v-btn
                                                variant="flat" color="rgba(255, 74, 28, 0.8)" 
                                                @click="$router.push({name:'Monitoring_Site_Building_Grundfunktion_Anlage', 
                                                params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid, grundfunktion:$route.params.grundfunktion, anlage:anlage.idShort}}), 
                                                monitoringStore.aasAnlage = anlage"
                                                icon="mdi-chart-line">
                                                </v-btn>
                                            </div>
                                        </v-expansion-panel-text>
                                        </v-col>
                                        <v-col cols="2">

                                        </v-col>
                                    </v-row>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { useMonitoringStore } from "@/store/monitoring"
import GaugeChart from "@/components/general/charts/GaugeChart.vue"
export default {
    data() {
        return {
            funktionZweiteEbene: {}
        }
    },
    components: {
        GaugeChart
    },
    mounted() {
        let firstFunktion = this.monitoringStore.aasZweiteGrundfunktion[0]
        this.funktionZweiteEbene = firstFunktion
        console.log(firstFunktion)
    },
    computed: {
        monitoringStore () {
            return useMonitoringStore()
        }
    },
    methods: {
        showFunktion(funktion) {
            this.funktionZweiteEbene = funktion
        }
    }
}
</script>
