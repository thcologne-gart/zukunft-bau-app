<template>
    <div>
        <v-container>
            <h2 style="color: #3B5249;">Monitoring - Gebäude {{ $route.params.buildingid  }}</h2>
            <h3 style="color: #3B5249;">{{ $route.params.grundfunktion }} - {{ monitoringStore.aasAnlage.idShort }}</h3>
            <div v-for="komponente in monitoringStore.aasAnlage.komponentenAas" :key="komponente">
                {{ komponente.idShort }}
            </div>
            <!--
            <v-img class="mx-auto" max-width="400" href="#" contain src="@/assets/heizkreis.svg">
            </v-img>

        -->
            <HeizkreisMonitoring />
            
        </v-container>
    </div>
</template>

<script>
import { useMonitoringStore } from "@/store/monitoring"
import HeizkreisMonitoring from "@/components/monitoring/HeizkreisMonitoring.vue"
export default {
    components: {
        HeizkreisMonitoring
    },
    computed: {
        monitoringStore () {
            return useMonitoringStore()
        }
    },
}
</script>