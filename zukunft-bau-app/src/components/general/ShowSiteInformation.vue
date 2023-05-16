<template>
    <div>
        <v-container class="no-padding" :style="{ width: '90%' }">
            <v-card-actions>
                <v-btn
                    color="success"
                    text
                    @click="show = !show"
                >
                    {{ site.siteName }}
                </v-btn>

                <v-spacer></v-spacer>
                <!--
                <v-btn
                    icon
                    @click="show = !show"
                >
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            -->
            </v-card-actions>
            <v-expand-transition>
                <div v-show="show">
                    <InformationFromSites :site="site"/>
                </div>
            </v-expand-transition>
        </v-container>
    </div>
</template>

<script>
import InformationFromSites from '@/components/general/InformationFromSites.vue'

export default {
  data: () => ({
    show: false
  }),
  props: {
    site: Array
  },
  components: {
    InformationFromSites
  }
}
</script>

<style>
.no-padding {
  padding-bottom: 0;
  padding-top: 0;
}
</style>

