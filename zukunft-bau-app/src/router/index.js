// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RegisterInfos from '../views/RegisterInfos.vue'
//import Koeln from '../views/Koeln.vue'
import DigitalTwins from '../views/digitaltwins/general.vue'
import Monitoring from '../views/monitoring/general.vue'
import DigitalTwins_Site from '../views/digitaltwins/site/general.vue'
import DigitalTwins_Site_Building from '../views/digitaltwins/site/building/general.vue'

const routes = [
  {
    
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterInfos,
  },
  // {
  //   path: '/koeln',
  //   name: 'Koeln',
  //   component: Koeln,
  // },
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
  {
    path: '/monitoring',
    name: 'Monitoring',
    component: Monitoring,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
