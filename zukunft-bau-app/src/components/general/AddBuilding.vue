<template>
    <div>
        <v-container class="no-padding">
        <v-card-actions class="d-flex justify-center align-center">
            <v-btn
                color="success"
                text
                @click="show = !show"
            >
                Hinzufügen Gebäude
            </v-btn>

        </v-card-actions>
        <v-expand-transition>
        <div v-show="show">
            <v-text-field 
            v-model='buildingName'
            label="Name des Gebäudes"
            required
            ></v-text-field>
            <v-text-field 
                :id="'map-' + Object.keys(site)[0]"
                v-model='currentPlace'
                label="Standort des Gebäudes"
                required
            ></v-text-field>
            <vue-google-autocomplete class="autocomplete-container" :id="'map-' + Object.keys(site)[0]" v-model="place" v-on:placechanged="setPlace"></vue-google-autocomplete>
            <v-container class="d-flex justify-center align-center">
              <v-btn class="mt-0" variant="outlined" color="success" 
                @click= "currentPlace = '';
                generalStore.addBuildingInformation(site, buildingName, country, city, street, streetNumber, lat, lng, zipcode);
                siteName = ''">Submit
            </v-btn>
            </v-container>
        </div>
        </v-expand-transition>
        </v-container>
    </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete"
import { useGeneralStore } from "@/store/general"

export default {
  data () {
    return {
      show: false,
      buildingName: '',
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
    components: {
        VueGoogleAutocomplete
    },  
  props: {
    site: Array
  },
  computed: {
    generalStore () {
      return useGeneralStore()
    }
  },
  methods: {
    setPlace (place) {
      this.currentPlace = place['route'] + ', ' + place['locality'] + ', '  + place['country']
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
      console.log(this.country, this.city, this.street, this.streetNumber, this.zipCode, this.lat, this.lng)
    }
}
}
</script>

<style>
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
.no-padding {
  padding-bottom: 0;
  padding-top: 0;
}
</style>