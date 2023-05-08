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
</script>

