<template>
    <div>
      <v-container class="no-padding" :style="{ width: '90%' }">
        <v-card-actions>
            <v-btn
                color="success"
                text
                @click="show = !show"
            >
            {{ this.siteName }}
            </v-btn>
        </v-card-actions>
        <v-expand-transition>
            <div v-show="show">
              <InformationFromBuildings :site="site"/>
              </div>
        </v-expand-transition>
    </v-container>
    </div>
</template>

<script>
import InformationFromBuildings from '@/components/general/InformationFromBuildings.vue'

import { useGeneralStore } from "@/store/general"
export default {
  data: () => ({
    show: false,
    form: {
      designation: ''
    },
    country: '',
    city: '',
    street: '',
    streetNumber: '',
    lat: '',
    lng: ''
  }),
  props: {
    site: Object
  },
  components: {
    InformationFromBuildings
  },
  computed: {
    generalStore () {
      return useGeneralStore()
    },
    siteName () {
      // const key = Object.keys(this.site)
      const siteName = this.site['siteName']
      return siteName
    },
    buildings () {
      // console.log(this.building)
      console.log(this.$store.getters.loadedBuildingInformation)
      console.log(this.site)
      return this.$store.getters.loadedBuildingInformation
    }
  },
  methods: {
    setPlace (place) {
      console.log(place.address_components)
      this.currentPlace = place
      const location = place.address_components
      for (const element in location) {
        if (location[element].types[0] === 'country') {
          this.country = location[element].long_name
        } else if (location[element].types[0] === 'locality') {
          this.city = location[element].long_name
        } else if (location[element].types[0] === 'street_number') {
          this.streetNumber = location[element].long_name
        } else if (location[element].types[0] === 'route') {
          this.street = location[element].long_name
        }
      }
      this.lat = this.currentPlace.geometry.location.lat()
      this.lng = this.currentPlace.geometry.location.lng()
      console.log(this.country, this.city, this.street, this.streetNumber)
    },
    onCreateBuildingAas (event) {
      console.log(this.site)
      // event.preventDefault()
      const newAas = {}
      const assetKeys = {
        type: 'Asset',
        local: true,
        value: `ems-site-asset/${this.form.designation}`,
        index: 0,
        idType: 'IRI'
      }
      newAas.asset = {
        keys: [assetKeys]
      }

      const submodelKeys = {
        type: 'Submodel',
        local: true,
        value: `submodels/building-information/${this.form.designation}`,
        index: 0,
        idType: 'IRI'
      }
      newAas.submodels = {
        keys: [submodelKeys]
      }

      newAas.identification = {
        idType: 'IRI',
        id: `building-aas/${this.form.designation}`
      }
      newAas.idShort = `BuildingAas/${this.form.designation}`
      newAas.category = 'CONSTANT'
      newAas.modelType = {
        name: 'AssetAdministrationShell'
      }
      // Submodel Creation
      const newSubmodel = {}
      const submodelKeySemanticId = {
        type: 'GlobalReference',
        local: true,
        value: 'ems/building/information-semantics',
        index: 0,
        idType: 'IRI'
      }
      newSubmodel.semanticId = {
        keys: [submodelKeySemanticId]
      }
      newSubmodel.qualifiers = []

      newSubmodel.identification = {
        idType: 'IRI',
        id: `submodels/building-information/${this.form.designation}`
      }
      newSubmodel.idShort = 'Building Information'
      newSubmodel.category = 'CONSTANT'
      newSubmodel.modelType = {
        name: 'Submodel'
      }

      // Inhalte aus der Form jetzt zu Submodel hinzufügen
      newSubmodel.submodelElements = [
        {
          value: this.country,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/country',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'Country',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'STRING'
            }
          },
          kind: 'Instance'
        },
        {
          value: this.city,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/city',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'City',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'STRING'
            }
          },
          kind: 'Instance'
        },
        {
          value: this.street,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/context-semantics/street',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'Street',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'STRING'
            }
          },
          kind: 'Instance'
        },
        {
          value: this.streetNumber,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/streetNumber',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'StreetNumber',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'INTEGER'
            }
          },
          kind: 'Instance'
        },
        {
          value: this.lat,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/lattitude',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'Lattitude',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'REAL'
            }
          },
          kind: 'Instance'
        },
        {
          value: this.lng,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/longitude',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'Longitude',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'REAL'
            }
          },
          kind: 'Instance'
        },
        {
          value: this.form.designation,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/context-semantics/designation',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'Designation',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'STRING'
            }
          },
          kind: 'Instance'
        },
        {
          value: this.site[7].value,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/context-semantics/numberSite',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'NumberOfSite',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'INTEGER'
            }
          },
          kind: 'Instance'
        },
        {
          value: this.site[6].value + 1,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/context-semantics/buildingNumber',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'BuildingNumber',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'INTEGER'
            }
          },
          kind: 'Instance'
        }
      ]

      console.log(newAas)
      console.log(newSubmodel)

      this.$store.dispatch('createAas', newAas)
      this.$store.dispatch('createSubmodelContext', newSubmodel)

      this.$store.dispatch('updateNumberOfBuildingsInSite', {
        id: this.site[8].key,
        numberOfBuildings: this.site[6].value + 1
      })

      console.log(newAas)
      this.$emit('new-aas', newAas)
      // this.form.country = null
      this.form.street = ''
      this.form.designation = ''
    },
    onReset (event) {
      // event.preventDefault()
      // Reset our form values
      console.log(this.site)
      this.form.country = ''
      this.form.city = ''
      this.form.zipcode = ''
      this.form.numberBuildings = ''
    }
  }
}
</script>

<style>
#building-register-card-title {
    color: #5D3FD3;
    text-transform: uppercase;
    font-size: 14px;
}
</style>
