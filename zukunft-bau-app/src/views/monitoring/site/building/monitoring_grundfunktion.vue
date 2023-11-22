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
                    <v-card class="mx-auto" elevation="1" rounded="0">
                        <v-tabs
                            color="success"
                            grow
                            center-active
                        >
                            <v-tab v-for="(funktion, key) in monitoringStore.aasZweiteGrundfunktion" :key="key"
                            @click="showFunktion(funktion)"
                            >
                            {{ funktion.idShort }}
                            </v-tab>
                        </v-tabs>
                        <div v-for="(anlage, key) in this.funktionZweiteEbene.anlagenAas" :key="key">
                            <v-expansion-panels>
                                <v-expansion-panel rounded="0">
                                    <v-expansion-panel-title style="font-size: 18px;" >
                                        <v-row>
                                            <v-col>
                                                {{ anlage.idShort }}
                                            </v-col>
                                            <v-col>
                                                <!--<GaugeChart />-->
                                                
                                            </v-col>
                                            <v-col></v-col>
                                        </v-row>
                                        </v-expansion-panel-title>
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
