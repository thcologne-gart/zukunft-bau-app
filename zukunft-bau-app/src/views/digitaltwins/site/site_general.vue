<template>
    <div>
        <v-container>
            <h2 style="color: #bc3384;">Digital Twins - {{ $route.params.siteid }}</h2>
            <GoogleMapsCard />
            <v-card>
                Test
            </v-card>
        </v-container>
    </div>
</template> 

<script>
import GoogleMapsCard from "@/components/general/GoogleMapsCard.vue"

export default{
    components: {
        GoogleMapsCard
    }
}
</script>