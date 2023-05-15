<template>
    <div>
        <v-card-actions>
            <v-btn
                color="#5D3FD3"
                text
                @click="show = !show"
            >
                {{ site[1].value }}
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
                icon
                @click="show = !show"
            >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
                <InformationFromSites :site="site"/>
            </div>
        </v-expand-transition>
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
