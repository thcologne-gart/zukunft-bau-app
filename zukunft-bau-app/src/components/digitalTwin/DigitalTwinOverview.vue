<template>
    <div>
        <v-container>
            <v-card class="mx-auto" elevation="1" rounded="0">
                <v-card-item :title="site.siteName"></v-card-item>
                <v-divider :thickness="2"></v-divider>
                <v-card-actions>
                    <v-btn class="mt-0" variant="outlined" color="success" 
                        @click="$router.push({name:'DigitalTwins_Site', params:{siteid:site.siteName}})">GO
                    </v-btn>
                    <v-file-input
                        v-model="file"
                        variant="underlined"
                        chips
                        accept=".json"
                        label="Select an AAS file (as JSON)"
                        :style="{ 'max-width': '30%' }"
                    ></v-file-input>
                    <v-btn 
                        class="ma-3" 
                        variant="outlined"
                        color = "#063970" 
                        @click="digitalTwinStore.startNlp(file)">Upload AAS</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import { useDigitalTwinsStore } from "@/store/digitaltwins"

export default{
    data () {
        return {
            file: null,
        }
    },
    props: {
        site: Object
    },
    computed: {
        digitalTwinStore () {
        return useDigitalTwinsStore()
        }
    }
}
</script>