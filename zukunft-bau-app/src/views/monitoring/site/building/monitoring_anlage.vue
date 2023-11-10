<template>
    <div>
        <v-container>
            <!--
            <h2 style="color: #3B5249;">Monitoring - Gebäude {{ $route.params.buildingid  }}</h2>
            <h3 style="color: #3B5249;">{{ $route.params.grundfunktion }} - {{ monitoringStore.aasAnlage.idShort }}</h3>-->
            <!--
            <v-img class="mx-auto" max-width="400" href="#" contain src="@/assets/heizkreis.svg">
            </v-img>

        -->
            <HeizkreisMonitoring v-if='monitoringStore.aasAnlage.semanticId == "https://th-koeln.de/gart/PlantDistributionCircuitAAS/1/0"' :anlage="monitoringStore.aasAnlage.komponentenAas"/>
            <RLTAnlageMonitoring v-else-if='monitoringStore.aasAnlage.semanticId == "https://th-koeln.de/gart/PlantVentilationSystemAAS/1/0"' :anlage="monitoringStore.aasAnlage.komponentenAas"/>
        
        </v-container>
    </div>
</template>

<script>
import { useMonitoringStore } from "@/store/monitoring"
import HeizkreisMonitoring from "@/components/monitoring/HeizkreisMonitoring.vue"
import RLTAnlageMonitoring from "@/components/monitoring/RLTAnlageMonitoring.vue"
export default {
    components: {
        HeizkreisMonitoring, RLTAnlageMonitoring
    },
    computed: {
        monitoringStore () {
            return useMonitoringStore()
        }
    },
}
</script>