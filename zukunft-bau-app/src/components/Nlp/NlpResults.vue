<template>
    <div>
        <v-container>
            <v-row>
                <v-col v-for="grundfunktion in numberGrundfunktionen" :key="grundfunktion" cols = '6'>
                    <v-card max-width="70%" v-if="grundfunktion ==='WaermeVersorgen'" class="mx-auto my-8" elevation="2">
                        <v-card-title class="text-center">Wärme versorgen</v-card-title>
                        <v-divider class="mx-4" :thickness="3"></v-divider>
                        <div class="d-flex flex-column align-center">
                            <v-avatar size="112" rounded="0" class="ma-6">
                                <v-img class="mx-auto" max-width="78" href="#" contain :src="wärmePic[[Object.keys(wärmePic)[0]]]"></v-img>
                            </v-avatar>
                            <v-btn
                                class="max-3 mb-4" 
                                variant="outlined" 
                                color="success"
                                @click="$router.push({name:'DigitalTwins_Site_Building_Grundfunktion', params:{siteid:siteId, buildingid: buildingId, grundfunktion:grundfunktion}})"
                            >
                                Go to
                            </v-btn>
                        </div>
                    </v-card>
                    <v-card max-width="70%" v-else-if="grundfunktion ==='LuftVersorgen'" class="mx-auto my-8" elevation="2">
                        <v-card-title class="text-center">Luft versorgen</v-card-title>
                        <v-divider class="mx-4" :thickness="3"></v-divider>
                        <div class="d-flex flex-column align-center">
                            <v-avatar size="112" rounded="0" class="ma-6">
                                <v-img class="mx-auto" max-width="78" href="#" contain :src="luftPic[[Object.keys(luftPic)[0]]]"></v-img>
                            </v-avatar>
                            <v-btn
                                class="max-3 mb-4" 
                                variant="outlined" 
                                color="success"
                                @click="$router.push({name:'DigitalTwins_Site_Building_Grundfunktion', params:{siteid:siteId, buildingid: buildingId, grundfunktion:grundfunktion}})"
                            >
                                Go to
                            </v-btn>
                        </div>
                    </v-card>
                    <v-card max-width="70%" v-else-if="grundfunktion ==='KaelteVersorgen'" class="mx-auto my-8" elevation="2">
                        <v-card-title class="text-center">Kälte versorgen</v-card-title>
                        <v-divider class="mx-4" :thickness="3"></v-divider>
                        <div class="d-flex flex-column align-center">
                            <v-avatar size="112" rounded="0" class="ma-6">
                                <v-img class="mx-auto" max-width="78" href="#" contain :src="kältePic[[Object.keys(kältePic)[0]]]"></v-img>
                            </v-avatar>
                            <v-btn
                                class="max-3 mb-4" 
                                variant="outlined" 
                                color="success"
                                @click="$router.push({name:'DigitalTwins_Site_Building_Grundfunktion', params:{siteid:siteId, buildingid: buildingId, grundfunktion:grundfunktion}})"
                            >
                                Go to
                            </v-btn>
                        </div>
                    </v-card>
                    <v-card max-width="70%" v-else-if="grundfunktion ==='MedienVersorgen'" class="mx-auto my-8" elevation="2">
                        <v-card-title class="text-center">Medien versorgen</v-card-title>
                        <v-divider class="mx-4" :thickness="3"></v-divider>
                        <div class="d-flex flex-column align-center">
                            <v-avatar size="112" rounded="0" class="ma-6">
                                <v-img class="mx-auto" max-width="78" href="#" contain :src="medienPic[[Object.keys(medienPic)[0]]]"></v-img>
                            </v-avatar>
                            <v-btn
                                class="max-3 mb-4" 
                                variant="outlined" 
                                color="success"
                                @click="$router.push({name:'DigitalTwins_Site_Building_Grundfunktion', params:{siteid:siteId, buildingid: buildingId, grundfunktion:grundfunktion}})"
                            >
                                Go to
                            </v-btn>
                        </div>
                    </v-card>
                    <v-card max-width="70%" v-else-if="grundfunktion ==='Sichern'" class="mx-auto my-8" elevation="2">
                        <v-card-title class="text-center">Sichern</v-card-title>
                        <v-divider class="mx-4" :thickness="3"></v-divider>
                        <div class="d-flex flex-column align-center">
                            <v-avatar size="112" rounded="0" class="ma-6">
                                <v-img class="mx-auto" max-width="78" href="#" contain :src="sichernPic[[Object.keys(sichernPic)[0]]]"></v-img>
                            </v-avatar>
                            <v-btn
                                class="max-3 mb-4" 
                                variant="outlined" 
                                color="success"
                                @click="$router.push({name:'DigitalTwins_Site_Building_Grundfunktion', params:{siteid:siteId, buildingid: buildingId, grundfunktion:grundfunktion}})"
                            >
                                Go to
                            </v-btn>
                        </div>
                    </v-card>
                    <v-card max-width="70%" v-else-if="grundfunktion ==='StromVersorgen'" class="mx-auto my-8" elevation="2">
                        <v-card-title class="text-center">Strom versorgen</v-card-title>
                        <v-divider class="mx-4" :thickness="3"></v-divider>
                        <div class="d-flex flex-column align-center">
                            <v-avatar size="112" rounded="0" class="ma-6">
                                <v-img class="mx-auto" max-width="78" href="#" contain :src="stromPic[[Object.keys(stromPic)[0]]]"></v-img>
                            </v-avatar>
                            <v-btn
                                class="max-3 mb-4" 
                                variant="outlined" 
                                color="success"
                                @click="$router.push({name:'DigitalTwins_Site_Building_Grundfunktion', params:{siteid:siteId, buildingid: buildingId, grundfunktion:grundfunktion}})"
                            >
                                Go to
                            </v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
    <!--
    <div v-for="img in energyUseGroup" :key="img">
        <div>{{ Object.keys(img)[0] }}</div>
        <v-avatar max-size="44px" rounded="0" >
            <v-img class="mx-auto" max-width="60" href="#" contain :src="img[[Object.keys(img)[0]]]"></v-img>
        </v-avatar>
    </div>
    <div>{{ numberGrundfunktionen }}</div>
    <div>{{ wärmeVersorgen }}</div>
-->
</template>

<script>
import { useDigitalTwinsStore } from "@/store/digitaltwins"

export default{
    data() {
        return {
            siteId: '',
            buildingId: '',
            numberGrundfunktionen: [],     
            allSubmodelElements: [],   
            wärmeVersorgen: [],
            luftVersorgen: [],
            kälteVersorgen: [],
            medienVersorgen: [],
            sichern: [],
            stromVersorgen: [],
            wärmePic: {'Wärme versorgen': Object.values(import.meta.glob('@/assets/Wärmeversorgen.svg', {as:'url', eager:true}))[0]},
            luftPic: {'Luft versorgen': Object.values(import.meta.glob('@/assets/Luftversorgen.svg', {as:'url', eager:true}))[0]},
            kältePic: {'Kälte versorgen': Object.values(import.meta.glob('@/assets/Kälteversorgen.svg', {as:'url', eager:true}))[0]},
            medienPic: {'Medien versorgen': Object.values(import.meta.glob('@/assets/Medienversorgen.svg', {as:'url', eager:true}))[0]},
            sichernPic: {'Sichern': Object.values(import.meta.glob('@/assets/Sichern.svg', {as:'url', eager:true}))[0]},
            stromPic: {'Strom versorgen': Object.values(import.meta.glob('@/assets/Stromversorgen.svg', {as:'url', eager:true}))[0]}
        };
    },
    created() {
        const site_id = this.$route.params.siteid
        this.siteId = site_id
        const building_id = this.$route.params.buildingid
        this.buildingId = building_id

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
            const submodelElements = this.digitalTwinStore.allNlpSubmodelElements
            this.allSubmodelElements = submodelElements
            console.log(this.allSubmodelElements)
            
            const grundfunktionen = []
            for (const data in submodelElements) {
                let grundfunktionValue = submodelElements[data]['GrundfunktionValue']
                if (grundfunktionen.includes(grundfunktionValue)) {
                    continue
                } else {
                    grundfunktionen.push(grundfunktionValue)
                }
            }
            this.numberGrundfunktionen = grundfunktionen
            this.wärmeVersorgen = this.digitalTwinStore.wärmeVersorgen
            this.luftVersorgen = this.digitalTwinStore.luftVersorgen
            this.medienVersorgen = this.digitalTwinStore.medienVersorgen
            this.kälteVersorgen = this.digitalTwinStore.kälteVersorgen
            this.sichern = this.digitalTwinStore.sichern
            this.stromVersorgen = this.digitalTwinStore.stromVersorgen
        }
    }
}
</script>