// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/home_general.vue'
import Home_Site from '../views/home/site/site_general.vue'
import Home_Site_Building from '../views/home/site/building/building_general.vue'
import RegisterInfos from '../views/RegisterInfos.vue'
import DigitalTwins from '../views/digitaltwins/digitaltwins_general.vue'
import DigitalTwins_Site from '../views/digitaltwins/site/site_general.vue'
import DigitalTwins_Site_Building from '../views/digitaltwins/site/building/building_general.vue'
import DigitalTwins_Site_Building_Grundfunktion from '../views/digitaltwins/site/building/GrundfunktionTga.vue'
import Monitoring from '../views/monitoring/monitoring_general.vue'
import Monitoring_Site from '../views/monitoring/site/monitoring_site.vue'
import Monitoring_Site_Building from '../views/monitoring/site/building/monitoring_building.vue'
import Monitoring_Site_Building_Grundfunktion from '../views/monitoring/site/building/monitoring_grundfunktion.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:siteid',
    name: 'Home_Site',
    component: Home_Site,
  },
  {
    path: '/:siteid/:buildingid',
    name: 'Home_Site_Building',
    component: Home_Site_Building,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterInfos,
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
  {
    path: '/digitaltwins/:siteid/:buildingid/:bacnetid/:grundfunktion',
    name: 'DigitalTwins_Site_Building_Grundfunktion',
    component: DigitalTwins_Site_Building_Grundfunktion,
  },
  {
    path: '/monitoring',
    name: 'Monitoring',
    component: Monitoring,
  },
  {
    path: '/monitoring/:siteid',
    name: 'Monitoring_Site',
    component: Monitoring_Site,
  },
  {
    path: '/monitoring/:siteid/:buildingid',
    name: 'Monitoring_Site_Building',
    component: Monitoring_Site_Building,
  },
  {
    path: '/monitoring/:siteid/:buildingid/:grundfunktion',
    name: 'Monitoring_Site_Building_Grundfunktion',
    component: Monitoring_Site_Building_Grundfunktion,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
