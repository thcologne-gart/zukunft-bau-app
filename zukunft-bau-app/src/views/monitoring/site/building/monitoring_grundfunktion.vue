<template>
    <div>
        <div>Hallo</div>
        <v-dialog
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
                    @click= "monitoringStore.createLineChart(submodelElementPath, submodelRefIdShort, aasId)"
                >Monitor</v-btn>
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
                            <LineChart />
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

export default{
    data () {
        return {
            aasId: 'TestAAS',
            submodelRefIdShort:"Measurements",
            submodelElementPath:"RoomTemperature",
            //submodelElementPath: 'onOff',
            dialog: false,
        }
    },
    components: {
        LineChart
    },
    /*
    mounted() {
        this.loadTimeSeriesData()
    },
    methods: {
        loadTimeSeriesData() {
            this.monitoringStore.createLineChart()
        }
    },
    */
    computed: {
        monitoringStore () {
            return useMonitoringStore()
        }
    }
}

</script>