<template>
    <div>
        <v-container>
            <h2 style="color: #285757;">Monitoring - Übersicht</h2>
            <v-row>
                <v-col cols="6" v-for="site in generalStore.loadedSiteInformationWithBuildings" :key="Object.keys(site)[0]">
                    <MonitoringOverview :site="site"/>
                </v-col>
            </v-row>
        </v-container>
        <AmCharts />
        <PieChart />
        <LineChart />
    </div>
</template> 

<script>
import { useGeneralStore } from "@/store/general"
import MonitoringOverview from "@/components/monitoring/MonitoringOverview.vue"

import AmCharts from "@/components/general/AmCharts.vue"
import PieChart from "@/components/general/charts/PieChart.vue"
import LineChart from "@/components/general/charts/LineChart.vue"


export default{
    components: {
        MonitoringOverview, AmCharts, PieChart, LineChart
    },
    computed: {
        generalStore () {
            return useGeneralStore()
        }
    }
}

</script>
