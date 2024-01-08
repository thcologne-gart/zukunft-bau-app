<template>
    <div>
        <v-dialog
        v-model="dialog"
        width="80%">
            <template v-slot:activator="{ props }">
                <!--<v-btn class="ma-3" @click="getData()">Get Data</v-btn>-->
                <v-container class="d-flex justify-center align-center">
                    <v-btn
                    variant="flat" color="rgba(255, 74, 28, 0.8)" 
                        size="small"
                        v-bind="props"
                        class="ma-2"
                        icon="mdi-chart-line">
                    </v-btn>
                </v-container>
            </template>
            <v-card>
                <v-toolbar
                color="success"
                >
                <v-toolbar-title style="color: white;">{{ datenpunkt['datenpunktLabel'] }}</v-toolbar-title>
                </v-toolbar>
                <v-container>
                    <LineChart v-if="datenpunkt.chartType.trim() === 'LineChart'" :aasId="datenpunkt.aasId" :submodelRefIdShort="datenpunkt.submodelName" :submodelElementPath="datenpunkt.idShort"/>
                    <div v-else>Kein Chart vorhanden, da binärer Wert.</div>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import LineChart from "@/components/general/charts/LineChart.vue"

export default {
    data () {
      return {
        dialog: false,
      }
    },
    props: {
        datenpunkt: Object
    },
    components: {
        LineChart
    }
}
</script>