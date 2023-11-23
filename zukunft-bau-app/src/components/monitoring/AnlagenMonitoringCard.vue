<template>
    <div>
        <v-card
            class="mx-auto my-8" elevation="1" rounded="0">
            <v-toolbar density="compact" color="monitoring">
                <v-toolbar-title class="text-center" style="font-size: 18px">
                    {{ element.name }}
                </v-toolbar-title>
            </v-toolbar>
            <v-divider class="border-opacity-100" color="success"></v-divider>
            <v-card-text class="px-6 pb-0">
                <v-row align="center" no-gutters>
                  <v-col cols="3"
                    >
                    Present value:
                  </v-col>
                  <v-col cols="8">
                    <v-chip variant="outlined" color="success">
                        {{ element.presentValue['value'][0]['value'] }}{{ element.presentValue['value'][1]['value'] }}
                    </v-chip>
                  </v-col>
                </v-row>
            </v-card-text>
            <v-expansion-panels class="mt-1">
                <v-expansion-panel elevation="0" rounded="0">
                    <v-expansion-panel-title>Analyse</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <LineChart v-if="element.chartType.trim() === 'LineChart'" :aasId="element.aasId" :submodelRefIdShort="element.submodelName" :submodelElementPath="element.idShort"/>
                        <div v-else>Kein Chart vorhanden, da binärer Wert. 
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
        <div v-if='element.chartType === "LineChart"'>{{ element.chartType }}</div>
    </div>
</template>

<script>
import LineChart from "@/components/general/charts/LineChart.vue"
import { useMonitoringStore } from "@/store/monitoring"

export default {
    props: {
        element: Object
    },
    components: {
        LineChart
    },
    computed: {
        monitoringStore () {
            return useMonitoringStore()
        }
    },
}
</script>
