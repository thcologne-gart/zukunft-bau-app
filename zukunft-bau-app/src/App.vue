<template>
  <v-app>
    <NavBar />
    <NavigationDrawer />
    <v-main>
      <router-view />
      <Footer />
    </v-main>
    
  </v-app>

</template>

<script setup>
import NavBar from '@/components/general/NavBar.vue'
import Footer from '@/components/general/Footer.vue'
import NavigationDrawer from '@/components/general/NavigationDrawer.vue'

import { onMounted } from "vue"
import { useGeneralStore } from "@/store/general"

const store = useGeneralStore()

onMounted( () => {
  store.fetchGeneralInfos()
})
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat");
#app {
  font-family: "Montserrat";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

