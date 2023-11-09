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
import Monitoring_Site_Building_Grundfunktion_Anlage from '../views/monitoring/site/building/monitoring_anlage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { breadcrumb: 'Home' }
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
    meta: { 
      breadcrumb: (route) => {
        return [
            { text: 'Monitoring', to: '/monitoring' },
        ];
      } 
    }
  },
  {
    path: '/monitoring/:siteid',
    name: 'Monitoring_Site',
    component: Monitoring_Site,
    meta: {
      breadcrumb: (route) => {
          return [
              { text: 'Monitoring', to: '/monitoring' },
              { text: `${route.params.siteid}`, to: `/monitoring/${route.params.siteid}` }
          ];
      }
    }
  },
  {
    path: '/monitoring/:siteid/:buildingid/:buildingaasid',
    name: 'Monitoring_Site_Building',
    component: Monitoring_Site_Building,
    meta: {
      breadcrumb: (route) => {
          return [
              { text: 'Monitoring', to: '/monitoring' },
              { text: `${route.params.siteid}`, to: `/monitoring/${route.params.siteid}` },
              { text: `${route.params.buildingid}`, to: `/monitoring/${route.params.siteid}/${route.params.buildingid}/${route.params.buildingaasid}` }
          ];
      }
    }
  },
  {
    path: '/monitoring/:siteid/:buildingid/:buildingaasid/:grundfunktion',
    name: 'Monitoring_Site_Building_Grundfunktion',
    component: Monitoring_Site_Building_Grundfunktion,
    meta: {
      breadcrumb: (route) => {
          return [
              { text: 'Monitoring', to: '/monitoring' },
              { text: `${route.params.siteid}`, to: `/monitoring/${route.params.siteid}` },
              { text: `${route.params.buildingid}`, to: `/monitoring/${route.params.siteid}/${route.params.buildingid}/${route.params.buildingaasid}`},
              { text: `${route.params.grundfunktion}`, to: `/monitoring/${route.params.siteid}/${route.params.buildingid}/${route.params.buildingaasid}/${route.params.grundfunktion}` }
          ];
      }
    }
  },
  {
    path: '/monitoring/:siteid/:buildingid/:buildingaasid/:grundfunktion/:anlage',
    name: 'Monitoring_Site_Building_Grundfunktion_Anlage',
    component: Monitoring_Site_Building_Grundfunktion_Anlage,
    meta: {
      breadcrumb: (route) => {
          return [
              { text: 'Monitoring', to: '/monitoring' },
              { text: `${route.params.siteid}`, to: `/monitoring/${route.params.siteid}` },
              { text: `${route.params.buildingid}`, to: `/monitoring/${route.params.siteid}/${route.params.buildingid}/${route.params.buildingaasid}`},
              { text: `${route.params.grundfunktion}`, to: `/monitoring/${route.params.siteid}/${route.params.buildingid}/${route.params.buildingaasid}/${route.params.grundfunktion}` },
              { text: `${route.params.anlage}`, to: `/monitoring/${route.params.siteid}/${route.params.buildingid}/${route.params.buildingaasid}/${route.params.grundfunktion}/${route.params.anlage}` }
          ];
      }
    }
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  mode: 'history',
})

export default router
