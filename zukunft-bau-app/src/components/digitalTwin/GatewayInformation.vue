<template>
    <v-container>
        <v-row>
            <v-col cols="6" v-for="gateway in generalStore.loadedBacnetInformation" :key="gateway['AAS ID']">
                <div>{{ gateway['AAS ID'] }}</div>
                <v-card max-width="70%" class="mx-auto my-8" elevation="1" rounded="0">
                    <v-toolbar color="success">
                        <v-toolbar-title class="text-center" style="color: white; font-size: 20px">
                            {{ gateway['AAS ID Short'][0] }}
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-expansion-panels>
                        <v-expansion-panel elevation="0" rounded="0">
                            <v-expansion-panel-title style="font-size: 18px;" >Digital Nameplate</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <div v-for="(property, key) in gateway['Digital Nameplate']" :key="key">
                                    <v-row>
                                        <v-col cols="6">
                                            {{ key }}:
                                        </v-col>
                                        <v-col cols ="6">
                                            {{ property }}
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <v-row class="ma-1">
                        <v-col>
                            <v-select 
                            :items="buildingsList" 
                            v-model="choosedBuilding" 
                            label= 'Zugehöriges Gebäude' 
                            />
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-btn class="mt-0" variant="outlined" color="success" 
                            @click= "generalStore.addBuildingInformation(site, buildingName, country, city, street, streetNumber, lat, lng, zipcode);
                            buildingName = ''">Submit
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import { useGeneralStore } from "@/store/general"

export default{
    data () {
      return {
        choosedBuilding: ''
      }
    },    
    computed: {
        generalStore () {
            return useGeneralStore()
        },
        buildingsList () {
            let buildingsList = []
            for (let site in this.generalStore.loadedSiteInformationWithBuildings) {
                let siteInformation = this.generalStore.loadedSiteInformationWithBuildings[site]
                let siteName = siteInformation['siteName']
                console.log(siteInformation['buildings'])
                for (let building in siteInformation['buildings'][0]) {
                    let buildingInformation = siteInformation['buildings'][0][building]
                    console.log(buildingInformation)
                    let buildingName = buildingInformation['buildingName']
                    console.log(buildingName)
                    let siteBuildingName = buildingName + ', ' + siteName
                    buildingsList.push(siteBuildingName)
                }

                //buildingsList.push(buildingName)
            }
            return buildingsList
        }
    }
}

</script>