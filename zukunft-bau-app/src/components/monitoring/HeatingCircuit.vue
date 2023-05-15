<template>
    <v-card>
    <Line v-if="loaded" :data="data" :options="options" />
    <v-card-actions>
       <v-spacer></v-spacer>
      <v-btn
        color="orange-lighten-2"
        variant="text"
      >
        Explore
      </v-btn>
      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
    </v-card>

</template>
<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'vue-chartjs';
import { ref } from 'vue';
ChartJS.register(CategoryScale,LinearScale,PointElement,
  LineElement,Title,Tooltip,Legend)

export default{
    components: {Line},
    setup () { 
        const show=ref(false)
        const loaded=true
        const data = {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                                {
                                label: 'Data One',
                                backgroundColor: '#f87979',
                                data: [40, 39, 10, 40, 39, 80, 40]
                                }
                                ]}
        const options={ responsive: true, maintainAspectRatio: false}
        //const monitoringStore= useMonitoringStore()
        //const {totalCount,favCount,loading}=storeToRefs(buildingStore)
        //buildingStore.getBuildings()
        //const filter = ref('all')
        return { show, data, loaded  }
    }
}
</script>