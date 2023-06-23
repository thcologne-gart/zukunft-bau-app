<template>
    <div>        
        <v-card-actions>
            
            <v-btn
                variant="outlined"
                color = "success"
                @click="show = !show"
            >
                {{ building['Name Gebäude'] }}
            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
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
                        v-for="key, value in building"
                        :key="key"
                        >
                        <td class="text-left">{{ value }}</td>
                        <td class="text-left">{{ key }}</td>
                        </tr>
                    </tbody>
                    </v-table>
                </v-container>
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
    building: Array,
  }
}

</script>
