<template>
  <v-container :style="{ width: '80%' }">
    <v-table class="grey lighten-3">
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
          v-for="key, value in siteInformation"
          :key="key"
        >
          <td class="text-left">{{ value }}</td>
          <td class="text-left">{{ key }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
export default {
  props: {
    site: Array
  },
  computed: {
    siteInformation () {
      const siteInformation = {}

      for (let element in this.site) {
        if (element === 'country') {
          siteInformation['Land'] = this.site[element]
        } else if (element === 'city') {
          siteInformation['Stadt'] =  this.site[element]
        } else if (element === 'street') {
          siteInformation['Straße'] = this.site[element] + ' ' + this.site['streetNumber']
        }
      }
      console.log(siteInformation)
      return siteInformation
    }
  }
}

</script>
