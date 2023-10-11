import { defineStore } from 'pinia'
import axios from 'axios'
import { useGeneralStore } from "@/store/general"

export const useMonitoringStore = defineStore('monitoring', {
    state: () => {
        return {
            loadingLineChart: false,
            aasServer: 'https://svmiv1rcci.execute-api.us-east-1.amazonaws.com/dev/v1/',
            roomTemperature: []
        }
    },
    actions: {
        async createLineChart(submodelElementPath, submodelRefIdShort, aasId) {
            this.loadingLineChart = true

            const readTimeSeries = 'submodel/timeseries/readtimeseries'
            const url = this.aasServer + readTimeSeries
            let responseBasyx = ''    
            console.log(url)      
            const generalStore = useGeneralStore()
            const userId = generalStore.userId
            const actualTime = Math.floor(new Date().getTime() / 1000)
            
            try {
                const response = await axios.post(url, {
                    userId: userId,
                    aasIdentifier: aasId,
                    submodelRefIdShort:submodelRefIdShort,
                    submodelElementPath:submodelElementPath,
                    //aasIdentifier: 'TestAAS',
                    //submodelRefIdShort:"Measurements",
                    //submodelElementPath:"RoomTemperature",
                    timestampStart: 0,
                    timestampStop: actualTime,
                    // timestampStop: 1696878572
                }, {
                    timeout: 600000
                  })
                responseBasyx = response.data
            } catch (error) {
                console.log(error)
            }
            console.log(responseBasyx)
            this.roomTemperature = responseBasyx
            this.loadingLineChart = false

            // return responseBasyx
        }
    }
})
