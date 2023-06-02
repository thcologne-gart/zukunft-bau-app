<template>
  <v-card>
  <Line v-if="loaded" :data="data" :options="options" />
  <v-card-actions>
     <v-spacer></v-spacer>
    <v-btn
      color="highlight"
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
        {{ DataStore.filterProfile }}
        {{ DataStore.totalCountValues }}
        Ich bin ein Heizkreis. Du siehst hier meine Vorlauf- und Rücklauftemperatur sowie die Außentemperatur. Den Sollwert meiner Vorlauftemperatur siehst du ebenfalls.
        Auch wann die Pumpe on/off ist kannst du sehen. Dazu klicke einfach auf den Button "Anforderung Wärme?"
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
import { ref, computed} from 'vue';
import { useMonitoringStore } from '@/store/monitoring';



ChartJS.register(CategoryScale,LinearScale,PointElement,
LineElement,Title,Tooltip,Legend)

export default{
  components: {Line},
  setup () {
      const DataStore=useMonitoringStore()
      DataStore.getData()

      const show=ref(false)
      const loaded=true
      const data= computed(()=>(
        console.log('test', DataStore.vorlauftemperatur_timestamp),
        { labels:DataStore.vorlauftemperatur_timestamp,
        datasets: [
                    {
                    label:'Vorlauftemperatur',
                    backgroundColor:'#f87979',
                    data: DataStore.vorlauftemperatur_value

        }]}
      ))
      // const data_new = {
      //             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      //             datasets: [
      //                         {
      //                         label: 'Data One',
      //                         backgroundColor: '#f87979',
      //                         data: [40, 39, 10, 40, 39, 80, 40]
      //                         }
      //                         ]}
      const options={ responsive: true, maintainAspectRatio: false}

      //const monitoringStore= useMonitoringStore()
      //const {totalCount,favCount,loading}=storeToRefs(buildingStore)
      //buildingStore.getBuildings()
      //const filter = ref('all')
      return { show, data, loaded, DataStore}
  }
}
</script>
