<template>
    <v-container fill-height class="mb-3 mx-2" >
    <HeizkreisMonitoring />
    <v-row no-gutters
      class="flex-nowrap">
      <div v-for="site in sites" :key="site.id" >
       <router-link :to="{name:'Home_Site', params:{siteid:site.name}}">
        <h2>{{ site.name }} </h2>
       </router-link>  
    </div>
    </v-row>


    <v-row
      no-gutters
      class="flex-nowrap"
    >
      <v-col
        cols="2"
        class="flex-column"
      >
          <v-card class="ma-2 pa-2" color="primary-darken-1">hello</v-card>
      </v-col>

      <v-col
        cols="1"
      >
      <v-card class="ma-2 pa-2" color="primary-darken-1">hello</v-card>
      </v-col>

      <v-col
        cols="5"
      >
      <v-card class="ma-2 pa-2" color="primary">hello</v-card>
      </v-col>
    </v-row>
  



      <div class='d-flex flex-row align-content-space-between'>
        <div class="d-flex flex-column">
          
        </div>
        <div class="d-flex flex-column">
          <v-card>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum repudiandae modi doloremque reiciendis, aut exercitationem consequatur blanditiis qui quibusdam assumenda quas hic sint voluptatem tenetur sed quidem eaque cupiditate labore.</v-card>
        </div>
          <v-col cols="4" class='align-center' >
            <v-card color="primary-darken-1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At nesciunt reprehenderit commodi dolores perferendis ad nostrum nam sapiente necessitatibus enim ipsam rerum, eligendi ab provident tenetur possimus? Consectetur, at nisi?
            </v-card>
          </v-col>
          <!-- <div class='d-flex justify-end'> -->
            <v-col>
            <v-card >Lorem ipsum dolor sit amet, consectetur adipisicing elit. At nesciunt reprehenderit commodi dolores perferendis ad nostrum nam sapiente necessitatibus enim ipsam rerum, eligendi ab provident tenetur possimus? Consectetur, at nisi?
              <v-img height="100px" src="@/assets/logo_TH.png"></v-img>
            </v-card>
          </v-col>   
        </div>


        <v-row>
          <v-col cols="7" >
            <v-card color="secondary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At nesciunt reprehenderit commodi dolores perferendis ad nostrum nam sapiente necessitatibus enim ipsam rerum, eligendi ab provident tenetur possimus? Consectetur, at nisi?
            </v-card>
          </v-col>
          <v-col cols="5" >
            <v-card color="highlight">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At nesciunt reprehenderit commodi dolores perferendis ad nostrum nam sapiente necessitatibus enim ipsam rerum, eligendi ab provident tenetur possimus? Consectetur, at nisi?
            </v-card>
          </v-col>
        </v-row>

    </v-container>

 
</template>

<script>
import HeizkreisMonitoring from "@/components/monitoring/HeizkreisMonitoring.vue"
export default{
  components: {
        HeizkreisMonitoring
    },
    setup(){
        // das hier dann aus deinem store laden:
        const sites=[ {name:"Köln",id:"1"},{name:"Hamburg",id:"2"} ]
    return{sites}}
}

</script>
