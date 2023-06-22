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
      //console.log(place.address_components)
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
      //console.log(this.country, this.city, this.street, this.streetNumber)
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
