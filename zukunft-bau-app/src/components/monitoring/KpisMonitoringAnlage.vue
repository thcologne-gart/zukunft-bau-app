<template>
    <div>
        <v-card 
        style="border-radius: 40px; background-color: rgba(178, 255, 169, 0.3);"
        variant="outlined" class="pa-4">
            <v-data-iterator 
            :items="kpis"
            :items-per-page="kpisPerPage"
            item-value="name">
                <template v-slot:default="{ items, isExpanded, toggleExpand }">
                    <v-row>
                        <v-col
                        v-for="kpi in items"
                        :key="kpi.raw.name"
                        cols="12"
                        sm="3"
                        xl="3"
                        >
                        <v-card
                        variant="outlined"

                        style="border-radius: 40px; background-color: whitesmoke">
                            <!--
                            <v-img
                            :gradient="`to top right, rgba(255, 255, 255, .1), rgba(${item.raw.color}, .15)`"
                            :src="item.raw.src"
                            cover
                            height="150"
                            ></v-img>
                            -->
                            <v-card-text class="center-content text-h6">
                                <v-avatar :style="{ border: `2px solid ${kpi.raw.color}` }" 
                                size="70">
                                    {{ kpi.raw.value }}
                                </v-avatar>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-list-item
                            :title="kpi.raw.name"
                            lines="two"
                            density="comfortable"
                            >
                            <template v-slot:title>
                                <v-card-subtitle>
                                    {{ kpi.raw.name }}
                                </v-card-subtitle>
                            </template>
                            </v-list-item>
                            <div class="px-4">
                                <v-switch
                                    :model-value="isExpanded(kpi)"
                                    :label="`${isExpanded(kpi) ? 'Hide' : 'Show'} details`"
                                    density="compact"
                                    inset
                                    @click="() => toggleExpand(kpi)"
                                ></v-switch>
                            </div>
                            <v-divider></v-divider>
                            <v-expand-transition>
                                <div v-if="isExpanded(kpi)">{{ kpi.raw.name }}</div>
                            </v-expand-transition>
                            <!--
                            <v-table density="compact" class="text-caption">
                            <tbody>
                                <tr align="right">
                                <th>DPI:</th>

                                <td>{{ item.raw.dpi }}</td>
                                </tr>

                                <tr align="right">
                                <th>Buttons:</th>

                                <td>{{ item.raw.buttons }}</td>
                                </tr>

                                <tr align="right">
                                <th>Weight:</th>

                                <td>{{ item.raw.weight }}</td>
                                </tr>

                                <tr align="right">
                                <th>Wireless:</th>

                                <td>{{ item.raw.wireless ? 'Yes' : 'No' }}</td>
                                </tr>

                                <tr align="right">
                                <th>Price:</th>

                                <td>${{ item.raw.price }}</td>
                                </tr>
                            </tbody>
                            </v-table>
                        -->
                        </v-card>
                        </v-col>
                    </v-row>
                </template>
            </v-data-iterator>
        </v-card>
    </div>
</template>

<script>

export default {
    data () {
        return {
            kpisPerPage: 4,
            kpis: [
                {
                    name: 'Sollwertabweichung Vorlauftemperatur',
                    value: '1',
                    color: '#FF0000'
                },
                {
                    name: 'Erhöhte Raumtemperatur',
                    value: '9',
                    color: '#33FF33'
                },
                {
                    name: 'Erhöhte Zulufttemperatur',
                    value: '4',
                    color: '#FF9966'
                },
                {
                    name: 'Ventilatoren im Dauerbetrieb ',
                    value: '7',
                    color: '#99FF99'
                }
            ]
            /* color palette
            Green (for 10): #00FF00
            Lighter Green: #33FF33
            Moderate Green: #66FF66
            Mild Green: #99FF99
            Neutral: #B0E57C (a balanced mix of green and red)
            Mild Red: #FF9966
            Moderate Red: #FF6347
            Lighter Red: #FF3300
            Red (for 1): #FF0000
            */
        }
    }
}
</script>

<style scoped>
.custom-avatar {
  background-color: #ffffff; /* White background color */
  border: 2px solid #4caf50; /* Green border color */
  box-sizing: content-box; /* Ensure the border is included in the size */
}

.title-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>