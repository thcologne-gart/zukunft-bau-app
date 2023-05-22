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
                </v-card-actions>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default{
    props: {
        site: Object
    }
}
</script>