<template>
    <div>
        <v-card-actions>
            <v-btn
                text
                @click="show = !show"
            >
                {{ building[6].value }}
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
                        v-for="item in building"
                        :key="item.value"
                        >
                        <td class="text-left">{{ item.idShort }}</td>
                        <td class="text-left">{{ item.value }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </div>
        </v-expand-transition>
    </div>
</template>

<script>
export default {
  data: () => ({
    show: false
  }),
  props: {
    site: Array,
    building: Array
  },
  computed: {
    buildings () {
      // console.log(this.building)
      console.log(this.$store.getters.loadedBuildingInformation)
      console.log(this.site)
      return this.$store.getters.loadedBuildingInformation
    }
  }
}

</script>
