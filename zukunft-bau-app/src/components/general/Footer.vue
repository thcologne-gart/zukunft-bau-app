<template>
    <v-footer
      class="text-center d-flex flex-column" color="secondary-darken-1"
    >
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="text"
        ></v-btn>
      </div>
  
      <div class="pt-0">
       
      </div>
  
      <v-divider></v-divider>
  
      <div>
        {{ new Date().getFullYear() }} — <strong>TH Köln</strong>
        <p>Institut für Technische Gebäudeausrüstung</p>
      </div>
    </v-footer>
  </template>
  
  <script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
  </script>
  
  <style scoped>
  #footer {
    padding-top: 0;
    padding-bottom: 0;
  }
  #footer-button {
    width: 10%;
  }
  .container {
    padding: 0;
  }
  </style>
  