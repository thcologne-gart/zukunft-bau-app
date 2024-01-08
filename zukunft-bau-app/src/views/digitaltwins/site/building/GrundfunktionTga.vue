<template>
    <div>
        <v-container class="ma-0">
            <v-row>
                <v-col cols="4">
                    <BuildingCardVisualization :grundfunktionId="this.$route.params.grundfunktion"/>
                </v-col>
                <v-col cols="8">
                    <!--
                    <v-chip variant="outlined" id="chipErkennung" size="large">
                        Wir haben folgendes erkannt:
                    </v-chip>
                -->
                    <v-row>
                        <v-col cols="4" v-for="(funktion, key) in monitoringStore.aasZweiteGrundfunktion" :key="key">
                            <v-card style="border-radius: 20px;" variant="outlined">
                                <v-card-title class="title-center" style="font-size: 18px">
                                    {{ funktion.idShort }}
                                </v-card-title>
                                <!--Hier muss noch was gemacht werden, damit die Anlagen den richtigen zweiten Funktionen zigeordnet werden-->
                                <v-card-text class="custom-card-text">
                                    <v-virtual-scroll id="virtualScroll" :items="funktion.anlagenAas" height="100">
                                        <template v-slot:default="{ item }">
                                            <div class="text-center">
                                                <v-btn variant="text" size="small" @click="getAnlagenData(item)">
                                                    {{ item.idShort }}
                                                </v-btn>
                                            </div>
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
                            style="border-radius: 20px;"
                                variant="outlined" class="pa-4 anlagen-card">
                                <v-row>
                                    <v-col cols="2"></v-col>
                                    <v-col cols="8">
                                        <v-card-title class="title-center-two" style="font-size: 18px">
                                            {{ this.selectedAnlage }}
                                        </v-card-title>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-btn
                                            class="max-3 mb-4" 
                                            rounded="xl"
                                            style="background-color: whitesmoke;"
                                            variant="outlined" 
                                            color="highlight"
                                            size="x-small"
                                            @click="$router.push({name:'Monitoring_Site_Building_Grundfunktion_Anlage', 
                                            params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid, grundfunktion:$route.params.grundfunktion, anlage:anlage.idShort}}), 
                                            monitoringStore.aasAnlage = this.anlage">Monitoring
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="3" class="mt-3" style="font-size: 16px">
                                            Komponenten: 
                                        </v-col>
                                        <v-col cols="9">
                                            <v-btn v-for="(component, index) in this.allSes" :key="index"
                                            :variant="activeButtonIndex === index ? 'outlined' : 'flat'"
                                            id="component-button" size="small"
                                            rounded class="ma-2" @click="showProperties(component.elements, component.anlagenInformation.idShort, index)">
                                                {{ component.anlagenInformation.idShort }}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-data-table v-if="this.selectedComponentElements !== null"
                                                v-model:page="page"
                                                :headers="headers"
                                                :items="this.selectedComponentElements"
                                                hover
                                                :items-per-page="itemsPerPage"
                                            >
                                            <template v-slot:headers="{ columns }">
                                                <tr style="background-color: rgba(232, 232, 232, 1)">
                                                    <template v-for="column in columns" :key="column.key">
                                                        <td>
                                                            <span>{{ column.title }}</span>
                                                        </td>
                                                    </template>
                                                </tr>
                                            </template>
                                            <template v-slot:item.actions="{ item }">
                                                <EditBacnetPropertiesNew :datenpunkt="item"/>
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
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { useMonitoringStore } from "@/store/monitoring"
import { useDigitalTwinsStore } from "@/store/digitaltwins"
import EditBacnetPropertiesNew from "@/components/digitalTwin/EditBacnetPropertiesNew.vue"
import BuildingCardVisualization from "@/components/digitalTwin/BuildingCardVisualization.vue"
import { useGeneralStore } from "@/store/general"

export default{
    data() {
        return {
            expanded: [],
            page: 1,
            itemsPerPage: 10,
            dialog: false,
            headers: [
                {title: 'Name', key: 'datenpunktLabel'},
                {title: 'Object Name', key: 'objectName'},
                {title: 'Description', key: 'description'},
                //{title: 'Object Type', key: 'objectType'},
                {title: 'Edit', align: 'center', key: 'actions', sortable: false }
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
            selectedComponentIdShort: null,
            activeButtonIndex: null,
            loadingAnlage: false,
            anlage: null
        }
    },
    components: {
        EditBacnetPropertiesNew, BuildingCardVisualization
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
        },
        pageCount () {
            return Math.ceil(this.selectedComponentElements.length / this.itemsPerPage)
        },
    },
    methods: {
        showProperties(elements, componentIdShort, index) {
            this.selectedComponentElements = elements
            this.selectedComponentIdShort = componentIdShort
            this.activeButtonIndex = index
        },
        async getAnlagenData(anlage) {
            this.activeButtonIndex = null
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
                    elementData = await this.digitalTwinStore.getSeElement(aasId, submodelId, element.idShort, elementData)
                    elementData['objectName'] = elementData['bacnetData'][7]['value']
                    elementData['objectType'] = elementData['bacnetData'][8]['value']
                    elementData['description'] = elementData['bacnetData'][9]['value']
                    elementData['grundfunktionLabel'] = elementData['grundfunktionLabel'][0]['value']
                    elementData['grundfunktionScore'] = elementData['grundfunktionLabel'][1]['value']
                    elementData['zweiteEbeneLabel'] = elementData['zweiteEbene'][0]['value']
                    elementData['zweiteEbeneScore'] = elementData['zweiteEbene'][1]['value']
                    elementData['komponenteLabel'] = elementData['komponenten'][0]['value']
                    elementData['komponenteScore'] = elementData['komponenten'][1]['value']
                    elementData['datenpunktLabel'] = elementData['datenpunkt'][0]['value']
                    elementData['datenpunktScore'] = elementData['datenpunkt'][1]['value']
                    elementData['anlageLabel'] = elementData['anlage'][0]['value']
                    elementData['anlageScore'] = elementData['anlage'][1]['value']
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
    background-color: whitesmoke;
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
