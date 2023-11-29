<template>
    <div>
        <v-card
        style="border-radius: 40px; background-color: whitesmoke;"
        variant="outlined" class="pa-4 mt-6">
        <v-data-table
            style="background-color: whitesmoke;"
            v-model:page="page"
            :headers="headers"
            :items="this.elements"
            density="comfortable"
            hover
            :items-per-page="itemsPerPage"
        >

            <template v-slot:item.actions="{ item }">
                <ShowChart :datenpunkt="item"/>
            </template>
            <template v-slot:bottom>
                <div class="text-center pt-2">
                    <v-pagination
                        v-model="page"
                        :length="pageCount"
                    ></v-pagination>
                </div>
            </template>
        </v-data-table>
        <!--
            <div v-for="element in this.elements" :key="element.idShort">
                <v-card 
                    variant="outlined"
                    style="border-radius: 40px; background-color: whitesmoke"
                    class="mx-auto my-8" >


                    <v-toolbar density="compact" color="monitoring">
                        <v-toolbar-title class="text-center" style="font-size: 18px">
                            {{ element.name }}
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-divider class="border-opacity-100" color="success"></v-divider>
                    <v-card-text class="px-6 pb-0"
                        style="background-color: whitesmoke;">
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
        -->
        </v-card>
    </div>
</template>

<script>
import LineChart from "@/components/general/charts/LineChart.vue"
import { useMonitoringStore } from "@/store/monitoring"
import ShowChart from "@/components/monitoring/ShowChart.vue"

export default {
    data() {
        return {
            headers: [
                {title: 'Name', key: 'name'},
                {title: 'Present Value', key: 'presentValue.value[0].value'},
                {title: 'Chart', align: 'center', key: 'actions', sortable: false }
            ], 
        }
    },
    props: {
        elements: Object
    },
    components: {
        LineChart, ShowChart
    },
    computed: {
        monitoringStore () {
            return useMonitoringStore()
        }
    },
}
</script>
