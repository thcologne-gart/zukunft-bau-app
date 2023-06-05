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
    background:'#ece9e9',
    surface:'#FFFFFF',
    primary:'#c42424', //th: orange
    'primary-darken-1':'#bc3384',
    highlight:'#ec5c24',
    secondary:'#a3a0a0',
    'secondary-darken-1': '#6c6c6c',
    error:'#e03024',
    info:'#ec5c24',
    success:'#bc3384',
    warning:'#c42424',
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
