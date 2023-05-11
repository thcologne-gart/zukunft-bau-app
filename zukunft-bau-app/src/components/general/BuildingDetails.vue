<template>
    <div class="building">
        <h3>{{ building.buildingname }}</h3>
        <div class="icons">
            <v-icon icon="mdi-delete" @click="buildingStore.deleteBuilding(building.id)"></v-icon>
            <v-icon icon="mdi-heart" @click="buildingStore.toggleFav(building.id)" ></v-icon>
        </div>
    </div>
</template>
<script>
import { useBuildingStore } from '@/store/app';
export default{
    props:['building'],
    setup() {
        const buildingStore=useBuildingStore
        return{buildingStore}
    }

}

</script>