import { defineStore } from 'pinia'
import axios from 'axios'
//import { all } from 'core-js/library/es6/promise'

export const useDigitalTwinsStore = defineStore('digitalTwins', {
    state: () => {
      return {
        nlpSubmodel: [],
        allNlpSubmodelElements: [],
        wärmeVersorgen: [],  
        wärmeVersorgenZweite: {
            'Verteilen': {
                'Pumpe': [],
                'Heizkreis allgemein': []
            },
            'Erzeugen': {
                'BHKW': [],
                'Wärmeerzeuger allgemein': [],
                'Wärmepumpe': [],
            },
            'Beziehen': {},
            'Speichern': {}
        },
        luftVersorgen: [],
        luftVersorgenZweite: {
            'Verteilen': {
                'Volumenstromregler Zuluft': []
            },
            'Bereitstellen': {
                'Zuluftventilator': []
            }
        }
        ,
        kälteVersorgen: [],
        stromVersorgen: [],
        medienVersorgen: [],
        sichern: [],        
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
                const wärmeVersorgen = []
                const luftVersorgen = []
                const kälteVersorgen = []
                const medienVersorgen = []
                const sichern = []
                const stromVersorgen = []
                const wärmeVersorgenZweite = {
                    'Verteilen': {
                        'Pumpe': [],
                        'Heizkreis allgemein': []
                    },
                    'Erzeugen': {
                        'BHKW': [],
                        'Wärmeerzeuger allgemein': [],
                        'Wärmepumpe': [],
                    },
                    'Beziehen': {},
                    'Speichern': {}
                }
                const luftVersorgenZweite = {
                    'Verteilen': {
                        'Volumenstromregler Zuluft': []
                    },
                    'Bereitstellen': {
                        'Zuluftventilator': []
                    }
                }

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
                    console.log(submodelElementInfo)
                    allSubmodelElements.push(submodelElementInfo)
                    if (grundfunktionValue == 'WaermeVersorgen') {
                        wärmeVersorgen.push(submodelElementInfo)
                        if (zweiteEbeneValue == 'Verteilen' && komponentenEbeneValue == 'HeizkreisAllgemein') {
                            wärmeVersorgenZweite['Verteilen']['Heizkreis allgemein'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'Verteilen' && komponentenEbeneValue == 'Pumpe') {
                            wärmeVersorgenZweite['Verteilen']['Pumpe'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'Erzeugen' && komponentenEbeneValue == 'WaermeversorgerAllgemein') {
                            console.log(wärmeVersorgenZweite['Erzeugen']['Wärmeerzeuger allgemein'])
                            wärmeVersorgenZweite['Erzeugen']['Wärmeerzeuger allgemein'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'Erzeugen' && komponentenEbeneValue == 'BHKW') {
                            wärmeVersorgenZweite['Erzeugen']['BHKW'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'Beziehen') {
                            wärmeVersorgenZweite['Beziehen'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'Speichern') {
                            wärmeVersorgenZweite['Speichern'].push(submodelElementInfo)
                        }
                    } else if (grundfunktionValue == 'LuftVersorgen') {
                        luftVersorgen.push(submodelElementInfo)
                        if (zweiteEbeneValue == 'LuftVerteilen' && komponentenEbeneValue == 'VolumenstromreglerZuluft') {
                            luftVersorgenZweite['Verteilen']['Volumenstromregler Zuluft'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'Zuluftventilator') {
                            luftVersorgenZweite['Bereitstellen']['Zuluftventilator'].push(submodelElementInfo)
                        }
                    } else if (grundfunktionValue == 'MedienVersorgen') {
                        medienVersorgen.push(submodelElementInfo)
                    } else if (grundfunktionValue == 'KaelteVersorgen') {
                        kälteVersorgen.push(submodelElementInfo)
                    } else if (grundfunktionValue == 'Sichern') {
                        sichern.push(submodelElementInfo)
                    } else if (grundfunktionValue == 'StromVersorgen') {
                        stromVersorgen.push(submodelElementInfo)
                    }
                }
                console.log(wärmeVersorgenZweite)
                for (const key1 in wärmeVersorgenZweite) {
                    if (Object.prototype.hasOwnProperty.call(wärmeVersorgenZweite, key1)) {
                      const innerObj = wärmeVersorgenZweite[key1];
                      for (const key2 in innerObj) {
                        if (Object.prototype.hasOwnProperty.call(innerObj, key2)) {
                          const arr = innerObj[key2];
                          if (Array.isArray(arr) && arr.length === 0) {
                            delete innerObj[key2];
                          }
                        }
                      }
                    }
                }

                console.log(wärmeVersorgenZweite)


                console.log(allSubmodelElements)
                this.wärmeVersorgen = wärmeVersorgen
                this.wärmeVersorgenZweite = wärmeVersorgenZweite

                this.luftVersorgen = luftVersorgen
                this.luftVersorgenZweite = luftVersorgenZweite

                this.sichern = sichern
                this.medienVersorgen = medienVersorgen
                this.kälteVersorgen = kälteVersorgen
                this.stromVersorgen = stromVersorgen
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