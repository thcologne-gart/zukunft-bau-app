<template>
    <div v-for="img in energyUseGroup" :key="img.name">
        <div>{{ img.name }}</div>
        <img class="mx-auto" max-width="60" href="#" contain :src= img.pic>
    </div>
    <div>{{ numberOfGrundfunktionen }}</div>
</template>

<script>
import { useDigitalTwinsStore } from "@/store/digitaltwins"

export default{
    data() {
        return {
        energyUseGroup: [
            {
                name: 'Wärme versorgen',
                pic: import('@/assets/Wärmeversorgen.svg').then((image) => image.default)
            },
            {
                name: 'Kälte versorgen',
                pic: import('@/assets/Kälteversorgen.svg').then((image) => image.default)
            }
        ]
        };
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
        },
        
        numberOfGrundfunktionen () {
            // const site_id = this.$route.params.siteid
            // const building_id = this.$route.params.buildingid


            // In zukunft die beiden const site_id und building_id verwenden und an den basyx
            // aufrug übergeben. solange aber noch keine individuellen np_submodels ist das egal
            // da die ID Test AAS ist
            
            const grundfunktionen = []
            const nlpSubmodel = this.digitalTwinStore.getBasyxNlpSubmodel('TestAAS')
            // console.log(this.$store.getters.loadedBACnet)
            console.log(nlpSubmodel)
            for (const [key, data] in this.nlpSubmodel) {
                const keys = Object.keys(this.nlpSubmodel)
                keys.forEach(key => {
                    const value = this.nlpSubmodel[key]
                    console.log(key, value)
                })

                console.log(this.nlpSubmodel[key])
                let grundfunktionValue = this.nlpSubmodel[data]['GrundfunktionValue']
                if (grundfunktionen.includes(grundfunktionValue)) {
                    continue
                } else {
                    grundfunktionen.push(grundfunktionValue)
                }
            }
            return grundfunktionen
        }
    },
    methods: {
        getNlpSubmodel (aas_id) {
            const ready = this.digitalTwinStore.getBasyxNlpSubmodel(aas_id)
            return ready
        }
    },
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
}
</script>