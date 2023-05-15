// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Koeln from '../views/Koeln.vue'
import DigitalTwins from '../views/digitaltwins/general.vue'
import DigitalTwins_Site from '../views/digitaltwins/site/general.vue'
import DigitalTwins_Site_Building from '../views/digitaltwins/site/building/general.vue'


const routes = [
  {
    //Hier optional später: Nested Routes/Children einführen für z.B. /user/ ..child 1, child 2 & lazy loading!!
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/koeln',
    name: 'Koeln',
    component: Koeln,
  },
  {
    path: '/digitaltwins',
    name: 'DigitalTwins',
    component: DigitalTwins,
  },
  {
    path: '/digitaltwins/:siteid',
    name: 'DigitalTwins_Site',
    component: DigitalTwins_Site,
  },
  {
    path: '/digitaltwins/:siteid/:buildingid',
    name: 'DigitalTwins_Site_Building',
    component: DigitalTwins_Site_Building,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
