import { defineStore } from 'pinia'
import axios from 'axios'
import { useGeneralStore } from "@/store/general"

export const useMonitoringStore = defineStore('monitoring', {
    state: () => {
        return {
            aasServer: 'https://svmiv1rcci.execute-api.us-east-1.amazonaws.com/dev/v1/',
            roomTemperature: []
        }
    },
    actions: {
        async createLineChart() {

            const readTimeSeries = 'submodel/timeseries/readtimeseries'
            const url = this.aasServer + readTimeSeries
            let responseBasyx = ''    
            console.log(url)      
            const generalStore = useGeneralStore()
            const userId = generalStore.userId

            
            try {
                const response = await axios.post(url, {
                    userId: userId,
                    aasIdentifier: 'TestAAS',
                    submodelRefIdShort:"Measurements",
                    submodelElementPath:"RoomTemperature",
                    timestampStart: 0,
                    timestampStop: 1696878572
                }, {
                    timeout: 600000
                  })
                responseBasyx = response.data
            } catch (error) {
                console.log(error)
            }
            console.log(responseBasyx)
            this.roomTemperature = responseBasyx
        }
    }
})
