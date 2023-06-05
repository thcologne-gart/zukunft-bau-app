<template>
  <v-card>
    <v-card-title>Verteilung Stromverbrauch</v-card-title>
    <v-card-subtitle>Betrachtung der letzten Woche</v-card-subtitle>
    <div id="traffic-light">
  <div class="light red" :class="{active: current=='red'}"></div>
  <div class="light yellow" :class="{active: current=='yellow'}"></div>
  <div class="light green" :class="{active: current=='green'}"></div>
</div>
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
  width: 80px;
  height: 200px;
  background: #222;
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
    background-color: #222;
    margin: 0 auto;
}
.light {
  display: inline-block;
  border-radius: 100%;
  width: 70px;
  height: 70px;
  margin-bottom: 8px;
  opacity: 0.2;
  transition: opacity 0.2s;
  position: relative;
}
.light span {
    transition: opacity 0.2s;
    color: #fff;
    font-size: 33px;
    position: absolute;
    right: 0;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    opacity: 0;
    visibility: hidden;
}
.light.active span {
  opacity: 1;
  visibility: visible;
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
  import { ref} from 'vue';
  class State {
  constructor(name, dur, next){
    this.name = name;
    this.dur = dur;
    this.next = next;
  }
}
class Constroller {
  trigger(state, callback){
    callback(state);

  }
}
  export default {
    data:{
    current: 'red',
    currentTime: 2,
    timer: null
  },
  mounted(){
    var constroller = new Constroller();

    var red = new State('red', 15);
    var yellowR = new State('yellow', 2);
    var yellowG = new State('yellow', 2);
    var green = new State('green', 8);

    red.next = yellowR;
    yellowR.next = green;
    green.next = yellowG;
    yellowG.next = red;

    constroller.trigger(red, (state)=>{
      this.current = state.name;
    })},
  setup () {
    const show=ref(false)
    return {show}
  }}
 </script>
