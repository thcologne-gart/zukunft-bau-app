<template>
    <div>
        <v-container>
            <GatewayInformationSelected :buildingId="$route.params.buildingid"/>
        </v-container>
    </div>
</template>

<script>
import GatewayInformationSelected from "@/components/digitalTwin/GatewayInformationSelected.vue"

export default{
    components: {
        GatewayInformationSelected
    }
}

</script>
