<template>
  <v-card>
    <v-card-title>Gesamt-Peformance meines Gebäudes</v-card-title>
    <v-card-subtitle>Betrachtung der letzten Woche</v-card-subtitle>
    <v-card-text>

      <div id="traffic-light">
  <div class="light red" :class="{active: DataStore.ampel=='red'}"></div>
  <div class="light yellow" :class="{active: DataStore.ampel=='yellow'}"></div>
  <div class="light green" :class="{active: DataStore.ampel=='green'}"></div>
</div>

    </v-card-text>

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
        Ich bin eine Ampel, die dir sagt, wie gerade die Performance deines Hauses ist.
      </v-card-text>
    </div>
  </v-expand-transition>
  </v-card>
</template>

<style>
#traffic-light {
  width: 100px;
  height: 280px;
  /* background:#222; */
  border-style: solid;
  border-color:#6c6c6c;
  border-radius: 8px;
  margin: auto;
  padding: 15px;
  position: relative;
}
#traffic-light::after {
    content: "";
    width: 17px;
    height: 100%;
    position: absolute;
    right: 0;
    left: 0;
    bottom: -100%;
    border-style:solid;
    border-color: #6c6c6c;
    margin: 0 auto;
}
.light {
  display: inline-block;
  border-radius: 100%;
  width: 70px;
  height: 70px;
  margin-bottom: 8px;
  opacity: 0.1;
  transition: opacity 0.2s;
  position: relative;
}

.active {
  opacity: 1;
}

.red {
  background: red;
}
.yellow {
  background: yellow;
}
.green {
  background: green;
}
</style>

  <script>

  import { ref } from 'vue';
  import { useMonitoringStore } from '@/store/monitoring';
import { onMounted } from 'vue';


  export default {
  setup () {
    const DataStore=useMonitoringStore()
    DataStore.getDataOverall();
    const show=ref(false)

    return {DataStore, show}
  }}
 </script>
