<template>
  <div class="google-map-card">
    <v-btn
    @click="initMap()">

    </v-btn>
    <div id="map"></div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';

export default {
    methods: {
        async initMap() {
            /* eslint-disable no-undef */
            const uluru = { lat: -25.344, lng: 131.031 };

            const loader = new Loader({
                apiKey: 'AIzaSyDrSZaSw1y8mnFuNa_ZYHTd-0kFxd4eCnQ',
                version: 'weekly',
                libraries: ['places']
            });
            console.log(loader)

            loader.load().then(() => {
                const map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 4,
                    center: uluru
                });
                console.log(map)
                const marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                });
                console.log(marker)
            });
        }
    }
};
</script>

<style scoped>
.google-map-card {
  width: 100%;
  height: 400px;
}

.map {
  width: 100%;
  height: 100%;
}
</style>
