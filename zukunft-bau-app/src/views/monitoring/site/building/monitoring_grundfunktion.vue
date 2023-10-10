<template>
    <div>
        <div>Hallo</div>
        <LineChart :timeSeries="this.monitoringStore.roomTemperature" />
    </div>
</template>

<script>
import { useMonitoringStore } from "@/store/monitoring"
import LineChart from "@/components/general/charts/LineChart.vue"

export default{
    components: {
        LineChart
    },
    mounted() {
        this.loadTimeSeriesData()
    },
    methods: {
        loadTimeSeriesData() {
            this.monitoringStore.createLineChart()
        }
    },
    computed: {
        monitoringStore () {
            return useMonitoringStore()
        }
    }
}

</script>