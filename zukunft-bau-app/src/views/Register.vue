<template>
    <v-card class="mx-auto my-16"
        max-width="65%">
      <v-stepper v-model="e1">
          <v-stepper-header>
          <v-stepper-step
              :complete="e1 > 1"
              step="1"
              color="#5D3FD3"
          >
              Registrierung Unternehmen
          </v-stepper-step>
  
          <v-divider></v-divider>
  
          <v-stepper-step
              :complete="e1 > 2"
              step="2"
              color="#5D3FD3"
          >
              Registrierung Liegenschaften
          </v-stepper-step>
  
          <v-divider></v-divider>
  
          <v-stepper-step step="3" color="#5D3FD3">
              Registrierung Gebäude
          </v-stepper-step>
          </v-stepper-header>
  
          <v-stepper-items>
            <v-stepper-content step="1">
                <div v-if="organization == null">
                  <AddOrgaInformation />
                </div>
                <div v-else-if="organization != null">
                  <!-- <v-card-title id="card-title">Unternehmensinformationen</v-card-title> -->
                  <v-card id="cardOrganizationForm" color="grey lighten-3" class="mx-auto my-6" max-width="75%">
                      <v-simple-table class="grey lighten-3">
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left">
                                Name
                              </th>
                              <th class="text-left">
                                Wert
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="information in organization" :key="information.idShort"
                            >
                              <td class="text-left">{{ information.idShort }}</td>
                              <td class="text-left">{{ information.value }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                      <EditOrganizationInformation :organization = organization />
                  </v-card>
                </div>
                <div v-if="organization != null">
                  <v-btn
                  color="outline-secondary"
                  @click="e1 = 2"
                  id= "buttons-card"
                  >
                  Continue
                  </v-btn>
                </div>
  
            </v-stepper-content>
  
            <v-stepper-content step="2">
                <AddSites />
                <div>
                  <v-btn @click="e1 = 1" color="outline-secondary" id= "buttons-card">
                  Back
                  </v-btn>
                  <v-btn v-if="sites != null"
                  color="outline-secondary"
                  @click="e1 = 3"
                  id= "buttons-card"
                  >
                  Continue
                  </v-btn>
                </div>
            </v-stepper-content>
  
            <v-stepper-content step="3">
                <AddBuildings />
                <div>
                  <v-btn id= "buttons-card" color="outline-secondary" @click="e1 = 2">
                  Back
                  </v-btn>
                  <v-btn v-if="sites != null"
                  color="outline-secondary"
                  to="/generalstart"
                  id= "buttons-card"
                  >
                  Continue
                  </v-btn>
                </div>
  
            </v-stepper-content>
          </v-stepper-items>
      </v-stepper>
    </v-card>
  </template>
  
  <script>
//   import AddOrgaInformation from '@/components/general/AddOrgaInformation.vue'
    import AddSites from '@/components/general/AddSites.vue'
//   import AddBuildings from '@/components/general/AddBuildings.vue'
//   import EditOrganizationInformation from '@/components/ems/context/EditOrganizationInformation.vue'
  
//   export default {
//     data () {
//       return {
//         e1: 1,
//         toStart: '/generalstart'
//       }
//     },
//     components: { AddOrgaInformation, EditOrganizationInformation, AddSites, AddBuildings },
//     computed: {
//       organization () {
//         // console.log(this.$store.getters.loadedOrganizationInformation)
//         return this.$store.getters.loadedOrganizationInformation
//       },
//       sites () {
//         // console.log(this.$store.getters.loadedSiteInformation)
//         return this.$store.getters.loadedSiteInformation
//       }
//     }
//   }
  </script>
  