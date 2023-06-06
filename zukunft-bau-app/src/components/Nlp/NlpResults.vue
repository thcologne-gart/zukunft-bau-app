<template>
    <div v-for="img in energyUseGroup" :key="img.name">
        <div>{{ img.name }}</div>
        <v-img class="mx-auto" max-width="60" href="#" contain :src= img.pic></v-img>
    </div>
    <!--<div>{{ numberOfGrundfunktionen }}</div>-->
    <div>{{ numberGrundfunktionen }}</div>
</template>

<script>
import { useDigitalTwinsStore } from "@/store/digitaltwins"

export default{
    data() {
        return {
            numberGrundfunktionen: [],        
            energyUseGroup: [
                {
                    name: 'Wärme versorgen',
                    pic: import('@/assets/Wärmeversorgen.svg').then((image) => image.default)
                },
                {
                    name: 'Luft versorgen',
                    pic: import('@/assets/Luftversorgen.svg').then((image) => image.default)
                },
                {
                    name: 'Kälte versorgen',
                    pic: import('@/assets/Kälteversorgen.svg').then((image) => image.default)
                },
                {
                    name: 'Medien versorgen',
                    pic: import('@/assets/Medienversorgen.svg').then((image) => image.default)
                },
                {
                    name: 'Strom versorgen',
                    pic: import('@/assets/Stromversorgen.svg').then((image) => image.default)
                },
                {
                    name: 'Sichern',
                    pic: import('@/assets/Sichern.svg').then((image) => image.default)
                },
            ]
        };
    },
    created() {
         // const site_id = this.$route.params.siteid
        // const building_id = this.$route.params.buildingid


        // In zukunft die beiden const site_id und building_id verwenden und an den basyx
        // aufrug übergeben. solange aber noch keine individuellen np_submodels ist das egal
        // da die ID Test AAS ist
        this.getNlpSubmodel('TestAAS')
    },
    computed: {
        digitalTwinStore () {
        return useDigitalTwinsStore()
        },
        nlpSubmodel () {
            // const site_id = this.$route.params.siteid
            // const building_id = this.$route.params.buildingid


            // In zukunft die beiden const site_id und building_id verwenden und an den basyx
            // aufrug übergeben. solange aber noch keine individuellen np_submodels ist das egal
            // da die ID Test AAS ist

            const aas_id = 'TestAAS'
            const nlpSubmodel = this.getNlpSubmodel(aas_id)
            // const nlp_submodel = this.digitalTwinStore.nlpSubmodel
            return nlpSubmodel
        }
    },
    methods: {
        async getNlpSubmodel (aas_id) {
            const ready = await this.digitalTwinStore.getBasyxNlpSubmodel(aas_id)
            console.log(ready)
            const submodelElements = this.digitalTwinStore.allNlpSubmodelElements
            
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
        }
    },
    /*
    created () {
        const imgWärme = import('@/assets/Wärmeversorgen.svg')
        const imgKälte = import('@/assets/Kälteversorgen.svg')

        this.energyUseGroup = [
            { name: 'Wärme versorgen', pic: imgWärme.default },
            { name: 'Kälte versorgen', pic: imgKälte.default },
            //{ name: 'Luft versorgen', pic: require('@/assets/Luftversorgen.svg') },
            //{ name: 'Medien versorgen', pic: require('@/assets/Medienversorgen.svg') },
            //{ name: 'Sichern', pic: require('@/assets/Sichern.svg') },
            //{ name: 'Strom versorgen', pic: require('@/assets/StromVersorgen.svg') },
            //{ name: 'Andere Anlagen', pic: require('@/assets/andere_anlagen.svg') }
        ]
    }
    */
}
</script>