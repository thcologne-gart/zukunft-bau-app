<template>
    <div>
        <v-container class="ma-0">
            <v-row>
                <v-col cols="4">
                    <BuildingCardVisualization />
                </v-col>
                <v-col cols="8">
                    <!--
                    <v-chip variant="outlined" id="chipErkennung" size="large">
                        Wir haben folgendes erkannt:
                    </v-chip>
                -->
                    <v-row>
                        <v-col cols="4" v-for="(funktion, key) in monitoringStore.aasZweiteGrundfunktion" :key="key">
                            <v-card style="border-radius: 60px;" variant="outlined">
                                <v-card-title class="title-center" style="font-size: 18px">
                                    {{ funktion.idShort }}
                                </v-card-title>
                                <!--Hier muss noch was gemacht werden, damit die Anlagen den richtigen zweiten Funktionen zigeordnet werden-->
                                <v-card-text class="custom-card-text" style="font-size: 16px">
                                    <v-container class="justify-center align-center">
                                        <v-btn class="center-btn" variant="text" v-for="(anlage, key) in funktion.anlagenAas" :key="key">
                                            {{ anlage.idShort }}
                                        </v-btn>
                                    </v-container>                                    
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <!--
            <v-row v-for="(funktion, key) in zweiteGrundfunktion" :key="key">
                <v-col v-if="Object.values(funktion).length !== 0" cols = '4'>
                    <v-card max-width="70%" class="mx-auto my-8" elevation="1" rounded="0">
                        <v-toolbar
                        color="success"
                        >
                            <v-toolbar-title class="text-center" style="color: white; font-size: 20px">{{ key }}</v-toolbar-title>
                        </v-toolbar>
                        <v-divider class="mx-4" :thickness="3"></v-divider>
                        <div v-for="(komponente, key) in Object.values(funktion)" :key="key">
                            <v-expansion-panels v-if="komponente.length !== 0">
                                <v-expansion-panel elevation="0" rounded="0">
                                    <v-expansion-panel-title style="font-size: 18px;" >{{ Object.keys(funktion)[key] }}</v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <div v-for="datenpunkt in komponente" :key="datenpunkt['DatenpunktEbeneValue']">
                                            <v-expansion-panels>
                                                <v-expansion-panel elevation="0" rounded="0">
                                                    <v-row>
                                                        <v-col>
                                                            <v-expansion-panel-title style="font-size: 16px;" color="#fcf0f7">
                                                                {{ datenpunkt['DatenpunktEbeneValue'] }}
                                                            </v-expansion-panel-title>
                                                            <v-expansion-panel-text>
                                                                <v-row>
                                                                    <v-col cols="8">
                                                                        <p class="my-4">Score Datenpunkt: {{ datenpunkt['DatenpunktEbeneScore'] }}</p>
                                                                    </v-col>
                                                                    <v-col cols="4">
                                                                        <EditBacnetProperties @editNlp="getNlpSubmodel('TestAAS')" :datenpunkt="datenpunkt"/>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-divider></v-divider>
                                                                <p class="my-4">BACnet Object Name: {{ datenpunkt['ObjectName'] }}</p>
                                                                <v-divider></v-divider>
                                                                <p class="my-4">BACnet Description: {{ datenpunkt['Description'] }}</p>
                                                                <v-divider></v-divider>
                                                                <p class="my-4">BACnet Object Type: {{ datenpunkt['ObjectType'] }}</p>
                                                                <v-divider class="border-opacity-75"></v-divider>
                                                            </v-expansion-panel-text>
                                                        </v-col>
                                                    </v-row>
                                                </v-expansion-panel>
                                            </v-expansion-panels>
                                        </div>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        -->
        </v-container>
    </div>
</template>

<script>
import { useMonitoringStore } from "@/store/monitoring"
import { useDigitalTwinsStore } from "@/store/digitaltwins"
import EditBacnetProperties from "@/components/digitalTwin/EditBacnetProperties.vue"
import BuildingCardVisualization from "@/components/digitalTwin/BuildingCardVisualization.vue"

export default{
    data() {
        return {
            funktionZweiteEbene: {},
            siteId: '',
            buildingId: '',
            grundfunktionId: '',
            grundfunktion: [],
            zweiteGrundfunktion: [],
            title: '',
        }
    },
    components: {
        EditBacnetProperties, BuildingCardVisualization
    },
    created() {
        const site_id = this.$route.params.siteid
        this.siteId = site_id
        const building_id = this.$route.params.buildingid
        this.buildingId = building_id
        const grundfunktion_id = this.$route.params.grundfunktion
        this.grundfunktionId = grundfunktion_id

        // In zukunft die beiden const site_id und building_id verwenden und an den basyx
        // aufrug übergeben. solange aber noch keine individuellen np_submodels ist das egal
        // da die ID Test AAS ist
        //this.getNlpSubmodel('TestAAS')
        this.getZweiteGrundfunktion()
    },
    mounted() {
        let firstFunktion = this.monitoringStore.aasZweiteGrundfunktion[0]
        this.funktionZweiteEbene = firstFunktion
    },
    computed: {
        digitalTwinStore () {
            return useDigitalTwinsStore()
        },
        monitoringStore () {
            return useMonitoringStore()
        }
    },
    methods: {
        async getNlpSubmodel (aas_id) {
            const ready = await this.digitalTwinStore.getBasyxNlpSubmodel(aas_id)
            console.log(ready)
            /*
            if (this.grundfunktionId == 'WaermeVersorgen') {
                this.title = 'Wärme versorgen'
                this.grundfunktion = this.digitalTwinStore.wärmeVersorgen
                this.zweiteGrundfunktion = this.digitalTwinStore.wärmeVersorgenZweite
            } else if (this.grundfunktionId == 'LuftVersorgen') {
                this.title = 'Luft versorgen'
                this.grundfunktion = this.digitalTwinStore.luftVersorgen
                this.zweiteGrundfunktion = this.digitalTwinStore.luftVersorgenZweite
                // console.log(this.zweiteGrundfunktion.length)
            }
            */
        },
        getZweiteGrundfunktion () {
            if (this.grundfunktionId == 'WaermeVersorgen') {
                this.title = 'Wärme versorgen'
                this.grundfunktion = this.digitalTwinStore.wärmeVersorgen
                this.zweiteGrundfunktion = this.digitalTwinStore.wärmeVersorgenZweite
            } else if (this.grundfunktionId == 'LuftVersorgen') {
                this.title = 'Luft versorgen'
                this.grundfunktion = this.digitalTwinStore.luftVersorgen
                this.zweiteGrundfunktion = this.digitalTwinStore.luftVersorgenZweite
            }
        }
    }
}
</script>

<style scoped>
#chipErkennung {
    background-color: #ffffff;
}
.title-center {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.custom-card-text {
  background-color: #3B5249; 
  color: white;
}
</style>
