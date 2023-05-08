<template>
    <div class="building-list">
        <div v-for="building in buildingStore.buildings">
          <BuildingDetails :building ="building"/>
        </div>
    </div>

</template>

<script>
import  BuildingDetails from '@/components/general/BuildingDetails.vue';
import { useBuildingStore } from '@/store/app';

export default{
    components:{ BuildingDetails},
    setup () {
        const buildingStore= useBuildingStore()
        return { buildingStore }
    }
}
</script>