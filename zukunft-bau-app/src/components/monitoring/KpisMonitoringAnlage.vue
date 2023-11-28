<template>
    <div>
        <v-row>
            <v-col cols = "3" v-for="kpi in this.kpis" :key="kpi.name">
                <v-card variant="outlined"
                style="border-radius: 40px; background-color: whitesmoke">
                    <v-toolbar color="success">
                        <v-toolbar-title class="title-center" style="color: white; font-size: 16px">
                        {{ kpi.name }}
                        </v-toolbar-title>                        
                    </v-toolbar>
                    <v-card-text class="center-content text-h6">
                        <v-avatar :style="{ border: `2px solid ${kpi.color}` }" 
                        size="70">
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

.title-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>