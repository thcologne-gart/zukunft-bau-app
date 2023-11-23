<template>
    <div>
        <v-row class="ma-0 pa-0">
            <v-col cols="11"></v-col>
            <v-col cols="1" class="ma-0 pa-0">
                <v-tooltip text="BACnet">
                    <template v-slot:activator="{ props }">
                        <v-btn 
                            v-bind="props"
                            :style="{ marginTop: '-100px' }" 
                            variant="outlined" 
                            color="warning"
                            @click="$router.push({name:'DigitalTwins_Site_Building_Bacnet',
                            params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid}})"
                            size="x-small"></v-btn>
                    </template>
                </v-tooltip>
            </v-col>
        </v-row>
    </div>
    
</template> 

<script>
import { useDigitalTwinsStore } from "@/store/digitaltwins"
import { useGeneralStore } from "@/store/general"

export default{
    data () {
        return {
            file: null,
        }
    },
    computed: {
        digitalTwinStore () {
        return useDigitalTwinsStore()
        },
        generalStore () {
            return useGeneralStore()
        }
    }
}
</script>

<style>
.negative-margin {
  margin-top: -100px; 
}
</style>