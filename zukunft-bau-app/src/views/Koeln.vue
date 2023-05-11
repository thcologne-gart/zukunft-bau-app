<template>
    <div>
        <TestForm2 />
    </div>
    <v-btn @click="filter='all'">All tasks</v-btn>
    <v-btn @click="filter='favs'">Fav tasks</v-btn>

    <div class="building-list" v-if="filter === 'all'">
        <p>You have {{ buildingStore.totalCount }} buildings</p>
        <div v-for="building in buildingStore.buildings">
          <BuildingDetails :building ="building"/>
        </div>
    </div>
    <div class="building-list" v-if="filter === 'favs'">
        <p>You have {{ buildingStore.favCount }} fav buildings</p>
        <div v-for="building in buildingStore.favs">
          <BuildingDetails :building ="building"/>
        </div>
    </div>

</template>

<script>
import  BuildingDetails from '@/components/general/BuildingDetails.vue';
import TestForm2 from '@/components/general/TestForm2.vue';
import { useBuildingStore } from '@/store/app';
import { ref } from 'vue';

export default{
    components:{ BuildingDetails, TestForm2},
    setup () {
        const buildingStore= useBuildingStore()
        const filter = ref('all')
        return { buildingStore, filter }
    }
}
</script>