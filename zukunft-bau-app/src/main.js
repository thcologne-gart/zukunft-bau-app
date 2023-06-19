/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components


/* eslint-disable no-undef */


import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins';
// import * as VueGoogleMaps from "vue3-google-maps" 
import  { Loader } from '@googlemaps/js-api-loader'
// import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App)

registerPlugins(app)


const loader = new Loader({ 
    apiKey: 'AIzaSyDrSZaSw1y8mnFuNa_ZYHTd-0kFxd4eCnQ',
    version: "weekly",
    libraries: ["places"]})  

loader.load().then(() => {
    app.mount('#app')
})

//app.mount('#app')
