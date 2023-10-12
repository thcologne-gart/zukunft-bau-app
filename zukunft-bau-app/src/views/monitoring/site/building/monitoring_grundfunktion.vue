<template>
    <div>
        <v-dialog v-for = "(element, index) in this.chartType" :key="index"
            v-model="dialog"
            width="60%">
            <template v-slot:activator="{ props }">
                <!--<v-btn class="ma-3" @click="getData()">Get Data</v-btn>-->
                <v-container class="d-flex justify-center align-center">
                <v-btn
                    class="ma-1"
                    v-bind="props"
                    variant="outlined"
                    color = "monitoring"
                    @click= "monitoringStore.getTimeSeriesValues(Object.values(element)[0], submodelRefIdShort, aasId)"
                >{{ Object.values(element)[0] }}</v-btn>
                </v-container>
            </template>
                <v-card>
                    <v-toolbar
                    color="monitoring"
                    >
                        <v-toolbar-title style="color: white;">{{ submodelElementPath }}</v-toolbar-title>
                    </v-toolbar>
                    <!--<LineChart :timeSeries="this.monitoringStore.roomTemperature" />-->

                    <v-container>
                        <div v-if="monitoringStore.loadingLineChart == true">
                            <v-progress-linear
                                indeterminate
                                color="monitoring"
                            ></v-progress-linear>
                        </div>
                        <div v-else>
                            <LineChart v-if = "Object.keys(element)[0] == 'lineChart'" />
                            <ColumnChart v-if = "Object.keys(element)[0] == 'columnChart'" />
                        </div>
                    </v-container>
                    <v-card-actions>
                        <v-btn
                            variant="outlined"
                            color = "monitoring"
                            @click="dialog = false"
                        >
                            Close
                        </v-btn>
                    </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { useMonitoringStore } from "@/store/monitoring"
import LineChart from "@/components/general/charts/LineChart.vue"
import ColumnChart from "@/components/general/charts/ColumnChart.vue"

export default{
    data () {
        return {
            chartType: [],
            timeSeriesSubmodel: '',
            aasId: 'th-koeln.de/gart/aas/1688387828691',
            submodelRefIdShort:"Measurements",
            //submodelElementPath:"RoomTemperature",
            //submodelElementPath: 'OnOff',
            dialog: false,
        }
    },
    components: {
        LineChart, ColumnChart
    },
    
    mounted() {
        this.getTimeSeries()
    },
    methods: {
        async getTimeSeries() {
            await this.monitoringStore.getTimeSeriesSubmodelElements(this.aasId)
            this.timeSeriesSubmodel = this.monitoringStore.timeSeriesSubmodel
            
            let chartType = []
            for (let element in this.monitoringStore.timeSeriesSubmodelElementsIdShorts) {
                let se = this.monitoringStore.timeSeriesSubmodelElementsIdShorts[element]

                if (se == 'OnOff') {
                    chartType.push({'columnChart': se})
                } else if (se == 'RoomTemperature' || se == 'Speed') {
                    chartType.push({'lineChart': se})
                }
            }
            this.chartType = chartType
        }
    },
    computed: {
        monitoringStore () {
            return useMonitoringStore()
        }
    }
}

</script>