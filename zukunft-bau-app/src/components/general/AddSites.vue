<template>
  <div>
    <div v-for="site in generalStore.loadedSiteInformation" :key="site">
      <ShowSiteInformation :site="site"/>
    </div>
    <v-divider :thickness="3"></v-divider>
    <v-container :style="{ width: '90%' }">
      <v-card-actions>
        <v-btn
            color="success"
            text
            @click="show = !show"
        >
            Hinzufügen Liegenschaft
        </v-btn>

        <v-spacer></v-spacer>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-text-field 
          v-model='siteName'
          label="Name der Liegenschaft"
          required
        ></v-text-field>
        <v-text-field 
            id="map"
            v-model='currentPlace'
            label="Standort der Liegenschaft"
            required
          ></v-text-field>
        <vue-google-autocomplete class="autocomplete-container" id="map" v-model="place" v-on:placechanged="setPlace"></vue-google-autocomplete>
        <v-btn class="max-3" type="reset" variant="outlined" color="success" 
          @click= "currentPlace = '';
          generalStore.addSiteInformation(
            country,
            city,
            street,
            streetNumber,
            lat,
            lng,
            zipCode,
            siteName
          );
          siteName = ''">Submit</v-btn>
      </div>
    </v-expand-transition>
    </v-container>
  </div>
</template>

<script>
import ShowSiteInformation from '@/components/general/ShowSiteInformation.vue'
import VueGoogleAutocomplete from "vue-google-autocomplete";
//import { GMapAutocomplete } from 'vue3-google-maps'

import { useGeneralStore } from "@/store/general"

export default {
  data () {
    return {
      show: false,
      siteName: '',
      currentPlace: '',
      country: '',
      city: '',
      street: '',
      streetNumber: '',
      lat: '',
      lng: '',
      zipCode: '',
    }
  },
  components: { ShowSiteInformation, VueGoogleAutocomplete },
  computed: {
    generalStore () {
      return useGeneralStore()
    },
  },
  methods: {
    /*
    onPlaceChanged(place) {
      console.log('Selected place:', place);
      // Handle the selected place data as needed
    },
    */
    setPlace (place) {
      this.currentPlace = place['route'] + ', ' + place['locality'] + ', '  + place['country']
      // console.log(place)
      // this.currentPlace = place
      // const location = place
      for (let key in place) {
        console.log(key, place[key])
        if (key === 'country') {
          this.country = place[key]
        } else if (key === 'locality') {
          this.city = place[key]
        } else if (key === 'street_number') {
          this.streetNumber = place[key]
        } else if (key === 'route') {
          this.street = place[key]
        } else if (key === 'latitude') {
          this.lat = place[key]
        } else if (key === 'longitude') {
          this.lng = place[key]
        } else if (key === 'postal_code') {
          this.zipCode = place[key]
        }
      }
      // this.lat = this.currentPlace.geometry.location.lat()
      // this.lng = this.currentPlace.geometry.location.lng()
      // console.log(this.country, this.city, this.street, this.streetNumber, this.zipCode, this.lat, this.lng)
    },
    /*
    addMarker () {
      if (this.currentPlace) {
        console.log(this.currentPlace.geometry.location.lat())
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
        console.log(marker)
        console.log(this.markers[0])
      }
    },
    */
    /*
    showForm () {
      console.log(this.site)
      console.log(this.siteAlreadyFilled.length)
      const card = document.getElementById('cardSiteForm')
      // const alreadyFilled = this.siteAlreadyFilled[0].value
      console.log('jiiii')
      if (this.site <= this.siteAlreadyFilled.length) {
        console.log('nicht null')
        card.classList.add('d-none')
      } else {
        console.log('hääääää')
        // card.classList.add('d-none')
      }
    },
    */
    onCreateSiteAas (event) {
      // console.log(this.site)
      // const card = document.getElementById('cardOrganizationForm')
      // card.classList.add('d-none')
      console.log(this.numberOfSites)
      const thisSiteNumber = this.numberOfSites
      // event.preventDefault()
      const newAas = {}
      const assetKeys = {
        type: 'Asset',
        local: true,
        value: `ems-site-asset/${this.city}`,
        index: 0,
        idType: 'IRI'
      }
      newAas.asset = {
        keys: [assetKeys]
      }

      const submodelKeys = {
        type: 'Submodel',
        local: true,
        value: `submodels/site-information/${this.city}`,
        index: 0,
        idType: 'IRI'
      }
      newAas.submodels = {
        keys: [submodelKeys]
      }

      newAas.identification = {
        idType: 'IRI',
        id: `site-aas/${this.city}`
      }
      newAas.idShort = `SiteAas/${this.city}`
      newAas.category = 'CONSTANT'
      newAas.modelType = {
        name: 'AssetAdministrationShell'
      }
      // Submodel Creation
      const newSubmodel = {}
      const submodelKeySemanticId = {
        type: 'GlobalReference',
        local: true,
        value: 'site/information-semantics',
        index: 0,
        idType: 'IRI'
      }
      newSubmodel.semanticId = {
        keys: [submodelKeySemanticId]
      }
      newSubmodel.qualifiers = []

      newSubmodel.identification = {
        idType: 'IRI',
        id: `submodels/site-information/${this.city}`
      }
      newSubmodel.idShort = 'Site Information'
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
              value: 'ems/site/context-semantics/street',
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
              name: 'INTEGER'
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
          value: 0,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/numberBuildings',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'NumberOfBuildings',
          category: 'PARAMETER',
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
          value: thisSiteNumber,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/numberSite',
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
        }
      ]

      this.$store.dispatch('createAas', newAas)
      this.$store.dispatch('createSubmodelContext', newSubmodel)

      const numberOfSitesForOrgaSubmodel = {
        value: thisSiteNumber,
        semanticId: {
          keys: [{
            type: 'GlobalReference',
            local: true,
            value: 'ems/context-semantics/numberOfSites',
            index: 0,
            idType: 'IRI'
          }]
        },
        constraints: [],
        idShort: 'NumberOfSites',
        category: 'PARAMETER',
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

      console.log(numberOfSitesForOrgaSubmodel)

      this.$store.dispatch('updateNumberOfSites', {
        id: this.organization[0].key,
        numberOfSites: thisSiteNumber
      })

      this.$emit('new-aas', newAas)
      this.form.country = ''
      this.form.city = ''
      this.form.zipcode = ''
      this.form.numberBuildings = ''
    },
    onReset (event) {
      // event.preventDefault()
      // Reset our form values

      this.country = ''
      this.city = ''
      this.zipcode = ''
      this.numberBuildings = ''
    }
  }
}
</script>
<style scoped>
.card {
    margin-inline: 20%;
    margin-bottom: 30px;
    margin-top: 40px;
}
.form-group {
    text-align: left;
    margin-bottom: 20px;
    margin-right: 10%;
    margin-left: 10%;
}
.btn {
    margin-left: 20px;
    margin-right: 20px;
}
#header {
    color: #0a322b;
    font-size: 1em
}
#body {
    font-size: 18px;
    padding-top: 5px;
    padding-bottom: 5px
}
.autocomplete-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 300px; /* Set the desired width */
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.autocomplete-container {
  width: 0%;
  height: 0%;
  border-style: none;
}
#addSiteTitle {
  color: #bc3384;
  font-weight: 300;
  margin-top: 8px;
  margin-bottom: 12px;
}
</style>
