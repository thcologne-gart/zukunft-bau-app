<template>
   
        <v-navigation-drawer
          expand-on-hover
          rail
          permanent
        >
          <v-list>
            <v-list-item
              prepend-icon="mdi-home-city-outline"
              title="Meine Liegenschaften"
             ></v-list-item>
          </v-list>
          <v-divider></v-divider>
                <v-list density="compact" nav>
                    <!--<v-row my-0 py-0>
                        <v-col cols="2" my-0 py-0></v-col>
                            <v-col cols="10" my-0 py-0> -->
                                <v-list-item v-for="site in generalStore.loadedSiteInformation" :key="site.siteName"
                                    prepend-icon="mdi-menu-right" :title="site.siteName" :value="site.siteName" @click="$router.push({name:'Home_Site', params:{siteid:site.siteName}})">
                                </v-list-item>
                            <!--</v-col>
                    </v-row>-->
                    <v-divider color="white"></v-divider>
                    <v-row my-0 py-0>
                        <v-col cols="4"></v-col>
                            <v-col cols="6">
                                <!-- <v-list-item 
                                    prepend-icon="" title="Hamburg" value="hamburg" @click="$router.push('/hamburg')">
                                </v-list-item> -->
                            </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row my-2 py-2>
                        <v-col cols="4"></v-col>
                            <v-col cols="12">
                                <v-list-item 
                                    prepend-icon="mdi-home-plus-outline" title="Hinzufügen" value="hinzufügen" @click="$router.push('/register')">
                            </v-list-item>
                            </v-col>
                    </v-row>
                </v-list>        
        </v-navigation-drawer>
</template>

<script>
import { useGeneralStore } from "@/store/general"

export default{
    computed: {
        generalStore () {
            return useGeneralStore()
        }
    }

}
    
</script>