<template>
    <div>
        <v-container>
            <h2 style="color: #bc3384;">Digital Twins - Gebäude {{ $route.params.buildingid  }}</h2>
            <h3 style="color: #bc3384;">{{ title  }}</h3>
            <v-row v-for="(funktion, key) in zweiteGrundfunktion" :key="key">
                <v-col v-if="Object.values(funktion).length !== 0" cols = '12'>
                    <v-card max-width="70%" class="mx-auto my-8" elevation="2">
                        <v-card-title  class="text-center">{{ key }}</v-card-title>
                        <v-divider class="mx-4" :thickness="3"></v-divider>
                        <div v-for="komponente in Object.values(funktion)" :key="komponente[0]['KomponentenEbeneValue']">
                            <v-expansion-panels>
                                <v-expansion-panel>
                                    <v-expansion-panel-title>
                                        {{ komponente[0]['KomponentenEbeneValue'] }}
                                    </v-expansion-panel-title>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </div>
                        <!--{{ Object.values(funktion) }}-->
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { useDigitalTwinsStore } from "@/store/digitaltwins"

export default{
    data() {
        return {
            siteId: '',
            buildingId: '',
            grundfunktionId: '',
            grundfunktion: [],
            zweiteGrundfunktion: [],
            title: ''
        }
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
        this.getNlpSubmodel('TestAAS')
    },
    computed: {
        digitalTwinStore () {
        return useDigitalTwinsStore()
        }
    },
    methods: {
        async getNlpSubmodel (aas_id) {
            const ready = await this.digitalTwinStore.getBasyxNlpSubmodel(aas_id)
            console.log(ready)
            if (this.grundfunktionId == 'WaermeVersorgen') {
                this.title = 'Wärme versorgen'
                this.grundfunktion = this.digitalTwinStore.wärmeVersorgen
                this.zweiteGrundfunktion = this.digitalTwinStore.wärmeVersorgenZweite
            } else if (this.grundfunktionId == 'LuftVersorgen') {
                this.title = 'Luft versorgen'
                this.grundfunktion = this.digitalTwinStore.luftVersorgen
                this.zweiteGrundfunktion = this.digitalTwinStore.luftVersorgenZweite
                console.log(this.zweiteGrundfunktion.length)
            }
        }
    }
}
</script>