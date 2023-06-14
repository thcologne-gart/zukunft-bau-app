<template>
    <div>
        <v-container>
            <v-card class="mx-auto" elevation="1" rounded="0">
                <v-row>
                    <v-col>
                        <v-card-item :title="Object.keys(site)[0]"></v-card-item>
                    </v-col>
                    <v-col>
                        <v-card-actions class="justify-end">
                            <v-btn class="mt-0" variant="outlined" color="success" 
                                @click="$router.push({name:'DigitalTwins_Site', params:{siteid:Object.keys(site)[0]}})">Information
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
                <v-divider class="mx-4" :thickness="3"></v-divider>
                <v-row v-for="building in Object.values(site)[0]" :key="building">
                    <v-col>
                        <v-card-item>{{ Object.values(building)[0]["buildingName"] }}</v-card-item>
                    </v-col>
                    <v-col>
                        <v-card-actions class="justify-end">
                            <v-btn class="mt-0" variant="outlined" color="success" size="small"
                            @click="$router.push({name:'DigitalTwins_Site_Building', params:{buildingid:getBuildingId(Object.values(building)[0]), siteid:Object.keys(site)[0]}})">
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