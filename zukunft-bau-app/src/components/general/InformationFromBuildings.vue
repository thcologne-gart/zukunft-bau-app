<template>
    <div>
        <div v-for="building in computedBuildings" :key="building['Name Gebäude']">
            <ShowBuildingInformation :building="building"/>
        </div>
        <AddBuilding :site="site"/>
    </div>
</template>

<script>
import AddBuilding from '@/components/general/AddBuilding.vue'
import ShowBuildingInformation from '@/components/general/ShowBuildingInformation.vue'
import { useGeneralStore } from "@/store/general"

export default {
  data: () => ({
    show: false
  }),
  components: { AddBuilding, ShowBuildingInformation }, 
  props: {
    site: Array
  },
  computed: {
    generalStore () {
      return useGeneralStore()
    },
    computedBuildings () {
        const buildings = []
        // const site = Object.values(this.site)[0]
        // console.log(site)
        for (let building in this.site['buildings']) {
          // console.log(site[building])
            let buildingInformationDict = {}
            let buildingInformation = this.site['buildings'][building]
            console.log(buildingInformation)
            for (const element in buildingInformation) {
                if (element === 'country') {
                    buildingInformationDict['Land'] = buildingInformation[element]
                } else if (element === 'city') {
                    buildingInformationDict['Stadt'] =  buildingInformation[element]
                } else if (element === 'street') {
                    buildingInformationDict['Straße'] = buildingInformation[element] + ' ' + buildingInformation['streetNumber']
                } else if (element === 'buildingName') {
                    buildingInformationDict['Name Gebäude'] = buildingInformation[element] 
                }
            }
            buildings.push(buildingInformationDict)
        }
        console.log(buildings)
        return buildings
    }
  }
}

</script>
