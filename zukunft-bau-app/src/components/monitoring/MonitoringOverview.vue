<template>
    <div>
        <v-container>
            <v-card class="mx-auto" elevation="1" rounded="0">
                <v-row>
                    <v-col>
                        <v-card-item :title="site['siteName']"></v-card-item>
                    </v-col>
                    <v-col class="d-flex justify-center align-center">
                        <v-card-actions class="justify-end">
                            <v-btn class="mt-0" variant="outlined" color="monitoring" 
                                @click="$router.push({name:'Monitoring_Site', params:{siteid:site['siteName']}})">Information
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
                <v-divider class="mx-4" :thickness="3"></v-divider>
                <v-row v-for="building in site['buildings'][0]" :key="building['buildingName']">
                    <v-col>
                        <v-card-item>{{ building["buildingName"] }}</v-card-item>
                    </v-col>
                    <v-col class="d-flex justify-center align-center">
                        <v-card-actions class="justify-end">
                            <v-btn class="mt-0" variant="outlined" color="monitoring" size="small"
                            @click="$router.push({name:'Monitoring_Site_Building', params:{buildingid:building['buildingName'], siteid:site['siteName']}})">
                            Information
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
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
    },
    methods: {
        getBuildingId (building) {
            const buildingId = building['buildingName']
            return buildingId
        }
    }
}
</script>