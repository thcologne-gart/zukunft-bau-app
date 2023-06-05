<template>
<v-card>
  <v-card-title>Verteilung Stromverbrauch</v-card-title>
  <v-card-subtitle>Betrachtung der letzten Woche</v-card-subtitle>
  <Doughnut v-if="loaded" :data="data" :options="options" />
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
        Ich bin eine Übersicht zum Energieverbrauch
      </v-card-text>
    </div>
  </v-expand-transition>
  </v-card>

</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { ref, computed} from 'vue';


ChartJS.register(ArcElement, Tooltip, Legend)

export default {

  components: {
    Doughnut
  },
  setup () {
    const show=ref(false)
    const loaded=true
    const data={
  labels: ['Heizung', 'Kälte', 'Lüftung','Haushaltsstrom'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10]
    }
  ]
}
    const options={ responsive: true, maintainAspectRatio: false}
    return {loaded,show, data}

  }

}
</script>
