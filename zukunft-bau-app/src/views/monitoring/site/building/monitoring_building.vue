<template>
    <div>
        <v-container>
            <h2 style="color: #285757;">Monitoring - Gebäude {{ $route.params.buildingid  }}</h2> 
                <v-carousel
                    cycle
                    height="400"
                    hide-delimiter-background
                    show-arrows="hover"
                >
                    <v-carousel-item
                    v-for="(item, i) in items"
                    :key="i"
                    >
                    <a @click="navigateToRoute(item.route, siteid = $route.params.siteid, buildingid = $route.params.buildingid)">
                        <v-img :src="item.image" class="hand-cursor"/>
                    </a>
                    <div class="d-flex justify-center align-center">
                        <div class="text-h4">
                            {{ item.function }}
                        </div>
                    </div>
                    </v-carousel-item>
                </v-carousel>       
        </v-container>
    </div>
    
</template> 

<script>
import { useGeneralStore } from "@/store/general"
import { useMonitoringStore } from "@/store/monitoring"

  export default {
    data () {
      return {
        grundfunktionen: [],
        items: [
            {function: 'Luft versorgen', image: Object.values(import.meta.glob('@/assets/air-system.jpeg', {as:'url', eager:true}))[0], route: 'Monitoring_Site_Building_Grundfunktion'},
            {function: 'Kälte versorgen', image: Object.values(import.meta.glob('@/assets/cooling-system.jpeg', {as:'url', eager:true}))[0], route: 'Monitoring_Site_Building_Grundfunktion'},
            {function: 'Wärme versorgen', image: Object.values(import.meta.glob('@/assets/heating-system.jpeg', {as:'url', eager:true}))[0], route: 'Monitoring_Site_Building_Grundfunktion'}
        ]
      }
    },
    props: {
        buildingAasId: String
    },
    computed: {
        generalStore () {
            return useGeneralStore()
        },
        monitoringStore () {
            return useMonitoringStore()
        }
    },
    mounted() {
        this.grundfunktionen = this.generalStore.loadedBuildingWithGrundfunktion
        this.getGrundfunktionenForBulding(this.$route.params.buildingaasid)
    },
    methods: {
        navigateToRoute(routeName, siteid, buildingid) {
            this.$router.push({name:routeName, params:{siteid:siteid, buildingid: buildingid, grundfunktion:'Luft versorgen'}});
        },
        async getGrundfunktionenForBulding(aasId) {
            await this.monitoringStore.getGrundfunktionen(aasId, this.grundfunktionen)
        }
    }
  }
</script>

<style scoped>
.hand-cursor {
  cursor: pointer;
}
</style>
