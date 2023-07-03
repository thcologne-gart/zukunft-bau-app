<template>
    <div>
        <v-container>
            <h2 style="color: #bc3384;">Digital Twins - Gebäude {{ $route.params.buildingid  }}</h2>
            <!--
                <v-file-input
                    v-model="file"
                    variant="underlined"
                    chips
                    accept=".json"
                    label="Select an AAS file (as JSON)"
                    :style="{ 'max-width': '30%' }"
                ></v-file-input>
                <v-btn 
                    class="mt-0" 
                    variant="outlined" 
                    color="success"
                    @click="digitalTwinStore.startNlp(file)">Upload AAS
                </v-btn>
            -->
                <v-container>
                    <div v-if="digitalTwinStore.showProgressUploadAas === true">
                        <v-progress-linear
                        indeterminate
                        color="success"
                        ></v-progress-linear>
                    </div>
                </v-container>
                <GatewayInformationSelected :buildingId="$route.params.buildingid"/>            
        </v-container>
    </div>
    
</template> 

<script>
import { useDigitalTwinsStore } from "@/store/digitaltwins"
import { useGeneralStore } from "@/store/general"
import GatewayInformationSelected from "@/components/digitalTwin/GatewayInformationSelected.vue"

export default{
    data () {
        return {
            file: null,
        }
    },
    components: {
        GatewayInformationSelected
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