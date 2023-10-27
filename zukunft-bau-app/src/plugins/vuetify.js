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
    background:'#fcefef',
    surface:'#FFFFFF',
    primary:'#c42424', //th: orange
    //primary: '#FF4A1C',
    'primary-darken-1':'#bc3384',
    highlight:'#ec5c24',
    secondary:'#a3a0a0',
    'secondary-darken-1': '#6c6c6c',
    error:'#e03024',
    info:'#ec5c24',
    //success:'#bc3384',
    success: '#3B5249',
    //warning:'#ff4a1c',
    warning: '#372772',
    //monitoring: '#285757',
    monitoring: '#3B5249',
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
