import { defineStore } from 'pinia'
import axios from 'axios'

export const useDigitalTwinsStore = defineStore('digitalTwins', {
    state: () => {
      return {
          
        // all these properties will have their type inferred automatically
      }
    },
    actions: {
        async startNlp(bacnetAas) {
            let formData = new FormData()
            // formData.append("aas", this.file[0])
            formData.append("aas", bacnetAas[0])
            console.log(formData)
            console.log('Start NLP')
            try {
                const response = await axios.post('/startNlp/startNLPPipeline', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                console.log(response)
            } catch (error) {
                console.error(error)
            }

            const aasBasyxServer = "http://3.83.126.51:4001/aasServer/shells"
            const aas_id = '/TestAAS'
            const uriAas = aasBasyxServer + '/' + aas_id + '/aas'
            try {
                const responseServerSubmodelElement = await axios.get(uriAas)
                console.log(responseServerSubmodelElement.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
})