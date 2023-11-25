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
                                <v-card-text class="custom-card-text pr-0">
                                    <v-virtual-scroll id="virtualScroll" :items="funktion.anlagenAas" height="100">
                                        <template v-slot:default="{ item }">
                                            <v-btn variant="text" size="small" @click="getAnlagenData(item)">
                                                {{ item.idShort }}
                                            </v-btn>
                                        </template>
                                    </v-virtual-scroll>                                
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-container class="ma-0 pa-0">
                            <div v-if="this.loadingAnlage === true">
                            <v-progress-linear
                            indeterminate
                            color="success"
                            ></v-progress-linear>
                            </div>
                        </v-container>
                        <v-col>
                            <v-card v-if="selectedAnlage !== null"
                                variant="outlined" class="pa-4 anlagen-card">
                                <v-card-title class="title-center-two" style="font-size: 18px">
                                    {{ this.selectedAnlage }}
                                    <v-btn
                                    class="max-3 mb-4" 
                                    variant="outlined" 
                                    color="warning"
                                    @click="$router.push({name:'Monitoring_Site_Building_Grundfunktion_Anlage', 
                                    params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid, grundfunktion:$route.params.grundfunktion, anlage:anlage.idShort}}), 
                                    monitoringStore.aasAnlage = this.anlage">Monitoring
                                    </v-btn>
                                </v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="3" class="mt-3" style="font-size: 16px">
                                            Komponenten: 
                                        </v-col>
                                        <v-col cols="9">
                                            <v-btn v-for="(component, key) in this.allSes" :key="key"
                                            variant="outlined" id="component-button"
                                            rounded class="ma-2" @click="showProperties(component.elements)">
                                                {{ component.anlagenInformation.idShort }}
                                            </v-btn>
                                            <v-data-table  v-if="this.selectedComponentElements !== null"
                                            :items="this.selectedComponentElements"
                                            :headers="this.headers"
                                            ></v-data-table>
                                        </v-col>
                                    </v-row>
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
import { useGeneralStore } from "@/store/general"

export default{
    data() {
        return {
            headers: [
                {title: 'Name', value: 'name'},
            ],
            funktionZweiteEbene: {},
            siteId: '',
            buildingId: '',
            grundfunktionId: '',
            grundfunktion: [],
            zweiteGrundfunktion: [],
            title: '',
            allSes: null,
            selectedAnlage: null,
            selectedComponentElements: null,
            loadingAnlage: false,
            anlage: null
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
        },
        generalStore () {
            return useGeneralStore()
        }
    },
    methods: {
        showProperties(elements) {
            this.selectedComponentElements = elements
        },
        async getAnlagenData(anlage) {
            this.anlage = anlage
            this.selectedComponentElements = null
            this.selectedAnlage = null
            this.loadingAnlage = true
            let components = anlage.komponentenAas
            let allSE = []
            for (const komponente in components) {
                let component = components[komponente]
                const aasId =  component.aasId
                //const semanticId = anlage.semanticId
                const submodelId = 'OperatingInformation'
                const submodel = await this.generalStore.getSubmodel(aasId, submodelId)
                const submodelElements = submodel.submodelElements;

                const elementPromises = submodelElements.map(async (element) => {
                    let elementData = {
                        'aasId': aasId,
                        'submodelName': submodelId,
                        'idShort': element.idShort,
                        'name': element.descriptions[0].text,
                        'semanticId': element.semanticId.keys[0].value
                    };
                    elementData = await this.monitoringStore.getSeValueAnlagenmonitoring(aasId, submodelId, element.idShort, elementData)
                    // elementData.presentValue = supplementaryInfos.presentValue;
                    return elementData
                });

                const elements = await Promise.all(elementPromises);

                allSE.push(
                    {
                    'anlagenInformation': component,
                    'elements': elements
                    }
                )
            }
            this.allSes = allSE
            this.selectedAnlage = anlage.idShort
            this.loadingAnlage = false
        },
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
#component-button {
    background-color: #ffffff;
}
#chipErkennung {
    background-color: #ffffff;
}
.title-center {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
.title-center-two {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-card-text {
  background-color: #3B5249; 
  color: white;
}
#virtualScroll::-webkit-scrollbar {
  width: 0px; /* Adjust the width as needed */
}
.anlagen-card {
  background-color: rgba(178, 255, 169, 0.3);
}
</style>
