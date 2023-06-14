/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify} from 'vuetify'


const myCustomLightTheme = {
  dark:false,
  colors:{
    background:'#ece9e9', //leicht grau
    surface:'#FFFFFF',
    primary:'#c42424', //th: orange // th: rot c51f23
    'primary-darken-1':'#bc3384', // th:lila a33384
    highlight:'#ec5c24', //th: orange de5f23
    secondary:'#a3a0a0', // grau
    'secondary-darken-1': '#6c6c6c', // dunkel-grau
    error:'#e03024', // th: rot c51f23
    info:'#ec5c24', //th: orange de5f23
    success:'#bc3384', // aktuell noch th:lila a33384
    warning:'#c42424', // th: rot c51f23
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({

    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes:{
        myCustomLightTheme,
      }

    },
})
