<template>
    <div>
        <v-row>
            <v-col cols = "4" v-for="kpi in this.kpis" :key="kpi.name">
                <v-card variant="flat" color ="#FFFAF4">
                    <v-card-subtitle class="multiline-title center-content text-body-2">{{ kpi.name }}</v-card-subtitle>
                    <v-card-text class="center-content text-h6">
                        <v-avatar :style="{ border: `2px solid ${kpi.color}` }" size="80">
                            {{ kpi.value }}
                        </v-avatar>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default {
    data () {
        return {
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
.multiline-title {
    white-space: normal;
}
</style>