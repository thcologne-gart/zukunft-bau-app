<template>
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
          v-for="item in site"
          :key="item.value"
        >
          <td class="text-left">{{ item.idShort }}</td>
          <td class="text-left">{{ item.value }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    site: Array
  }
}

</script>
