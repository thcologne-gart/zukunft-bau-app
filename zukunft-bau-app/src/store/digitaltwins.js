import { defineStore } from 'pinia'
import axios from 'axios'
//import { all } from 'core-js/library/es6/promise'

export const useDigitalTwinsStore = defineStore('digitalTwins', {
    state: () => {
      return {
        nlpSubmodel: [],
        allNlpSubmodelElements: []          
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
            const aas_id = '/TestAAS'
            this.getBasyxNlpSubmodel(aas_id)
        },
        async getBasyxNlpSubmodel(aas_id) {
            const aasBasyxServer = "http://3.83.126.51:4001/aasServer/shells"
            const uriAas = aasBasyxServer + '/' + aas_id + '/aas'
            const uriSubmodel = uriAas + '/submodels/NLPClassificationResult/submodel'

            try {
                const response = await axios.get(uriSubmodel, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
                const nlpSubmodel = response.data
                const submodelElements = nlpSubmodel['submodelElements']
                const allSubmodelElements = []
                for (let submodelElement in submodelElements) {
                    // let idShort = submodelElements[submodelElement]['idShort']
                    let grundfunktionValue = submodelElements[submodelElement]['value'][0]['value'][0]['value'][0]['value']
                    let grundfunktionScore = submodelElements[submodelElement]['value'][0]['value'][0]['value'][1]['value']
                    let zweiteEbeneValue = submodelElements[submodelElement]['value'][1]['value'][0]['value'][0]['value']
                    let zweiteEbeneScore = submodelElements[submodelElement]['value'][1]['value'][0]['value'][1]['value']
                    let komponentenEbeneValue = submodelElements[submodelElement]['value'][2]['value'][0]['value'][0]['value']
                    let komponentenEbeneScore = submodelElements[submodelElement]['value'][2]['value'][0]['value'][1]['value']
                    let datenpunktEbeneValue = submodelElements[submodelElement]['value'][3]['value'][0]['value'][0]['value']
                    let datenpunktEbeneScore = submodelElements[submodelElement]['value'][3]['value'][0]['value'][1]['value']
                    let nlpInput = submodelElements[submodelElement]['value'][4]['value']
                    let bacnetId = submodelElements[submodelElement]['value'][6]['value']
                    let submodelElementInfo = {
                        'GrundfunktionValue': grundfunktionValue,
                        'GrundfunktionScore': grundfunktionScore,
                        'ZweiteEbeneValue': zweiteEbeneValue,
                        'ZweiteEbeneScore': zweiteEbeneScore,
                        'KomponentenEbeneValue': komponentenEbeneValue,
                        'KomponentenEbeneScore': komponentenEbeneScore,
                        'DatenpunktEbeneValue': datenpunktEbeneValue,
                        'DatenpunktEbeneScore': datenpunktEbeneScore,
                        'NLPInput': nlpInput,
                        'BacnetId': bacnetId
                    }
                    allSubmodelElements.push(submodelElementInfo)
                }
                console.log(allSubmodelElements)
                this.allNlpSubmodelElements = allSubmodelElements

                return allSubmodelElements

            } catch (error) {
                console.error(error)
            }

            // const responseServerAas = await fetch(uriSubmodel)
            // const nlpSubmodel = await responseServerAas.json()
            /*
            const submodelElements = nlpSubmodel['submodelElements']
            const allSubmodelElements = []
            for (let submodelElement in submodelElements) {
                // let idShort = submodelElements[submodelElement]['idShort']
                let grundfunktionValue = submodelElements[submodelElement]['value'][0]['value'][0]['value'][0]['value']
                let grundfunktionScore = submodelElements[submodelElement]['value'][0]['value'][0]['value'][1]['value']
                let zweiteEbeneValue = submodelElements[submodelElement]['value'][1]['value'][0]['value'][0]['value']
                let zweiteEbeneScore = submodelElements[submodelElement]['value'][1]['value'][0]['value'][1]['value']
                let komponentenEbeneValue = submodelElements[submodelElement]['value'][2]['value'][0]['value'][0]['value']
                let komponentenEbeneScore = submodelElements[submodelElement]['value'][2]['value'][0]['value'][1]['value']
                let datenpunktEbeneValue = submodelElements[submodelElement]['value'][3]['value'][0]['value'][0]['value']
                let datenpunktEbeneScore = submodelElements[submodelElement]['value'][3]['value'][0]['value'][1]['value']
                let nlpInput = submodelElements[submodelElement]['value'][4]['value']
                let bacnetId = submodelElements[submodelElement]['value'][6]['value']
                let submodelElementInfo = {
                    'GrundfunktionValue': grundfunktionValue,
                    'GrundfunktionScore': grundfunktionScore,
                    'ZweiteEbeneValue': zweiteEbeneValue,
                    'ZweiteEbeneScore': zweiteEbeneScore,
                    'KomponentenEbeneValue': komponentenEbeneValue,
                    'KomponentenEbeneScore': komponentenEbeneScore,
                    'DatenpunktEbeneValue': datenpunktEbeneValue,
                    'DatenpunktEbeneScore': datenpunktEbeneScore,
                    'NLPInput': nlpInput,
                    'BacnetId': bacnetId
                }
                allSubmodelElements.push(submodelElementInfo)
            }
           // this.nlpSubmodel = allSubmodelElements
           // this.nlpSubmodel.push(submodelElementInfo)
           */
           //console.log(allSubmodelElements)

           //return allSubmodelElements
        }
    }
})