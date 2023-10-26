<template>
    <div>
        <v-container>
            <h2 style="color: #3B5249;">Digital Twins - {{ $route.params.siteid }}</h2>
            <GoogleMapsCard />
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