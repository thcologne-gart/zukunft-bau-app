import { defineStore } from 'pinia'
import axios from 'axios'
//import { all } from 'core-js/library/es6/promise'

export const useDigitalTwinsStore = defineStore('digitalTwins', {
    state: () => {
      return {
        showProgressUploadAas: false,
        showProgressEditDatenpunkt: false,
        aasId: '',
        nlpSubmodel: [],
        allNlpSubmodelElements: [],
        wärmeVersorgen: [],  
        wärmeVersorgenZweite: {},
        luftVersorgen: [],
        luftVersorgenZweite: {}
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
            this.showProgressUploadAas = true
            let formData = new FormData()
            // formData.append("aas", this.file[0])
            formData.append("aas", bacnetAas[0])
            // console.log(formData)
            console.log('Start NLP')
            try {
                const response = await axios.post('/nlpEndpoints/startNLPPipeline', formData, {
                //const response = await axios.post('/awsNlpEndpoints/startNLPPipeline', formData, {
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
            this.showProgressUploadAas = false
        },
        async editDatenpunktGrundfunktion (datenpunkt, predictedGrundfunktion) {
            this.showProgressEditDatenpunkt = true
            const startPrediction = 'Grundfunktion'
            if (predictedGrundfunktion == 'Wärme versorgen') {
                predictedGrundfunktion = 'WaermeVersorgen'
            } else if (predictedGrundfunktion == 'Luft versorgen') {
                predictedGrundfunktion = 'LuftVersorgen'
            }

            const datapointInformation = {
                startPrediction: startPrediction,
                correctedLabel: predictedGrundfunktion,
                nlpInput: datenpunkt['NLPInput'],
                idShort: datenpunkt['IdShort'],
                aasId: this.aasId
            }
            console.log(datapointInformation)
            //let formData = new FormData()
            // formData.append('datapointInformation', datapointInformation)
            //formData.append('correctedLabel', predictedGrundfunktion)
            // formData.append('datapoint', datenpunkt)

            try {
                const response = await axios.post('/nlpEndpoints/editDatapoint', datapointInformation, {
                //const response = await axios.post('/awsNlpEndpoints/editDatapoint', datapointInformation, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
            this.showProgressEditDatenpunkt = false
        },
        async editDatenpunktZweiteEbene (datenpunkt, predictedGrundfunktion, predictedZweiteEbene) {
            this.showProgressEditDatenpunkt = true            
            console.log(predictedZweiteEbene)
            const startPrediction = 'ZweiteEbene'

            if (predictedGrundfunktion == 'Wärme versorgen') {
                predictedGrundfunktion = 'WaermeVersorgen'
            } else if (predictedGrundfunktion == 'Luft versorgen') {
                predictedGrundfunktion = 'LuftVersorgen'
            }

            if (predictedZweiteEbene == 'Wärme verteilen') {
                predictedZweiteEbene = 'Verteilen'
            } else if (predictedZweiteEbene == 'Wärme erzeugen') {
                predictedZweiteEbene = 'Erzeugen'
            } else if (predictedZweiteEbene == 'Wärme beziehen') {
                predictedZweiteEbene = 'Beziehen'
            } else if (predictedZweiteEbene == 'Wärme speichern') {
                predictedZweiteEbene = 'Speichern'
            } else if (predictedZweiteEbene == 'Luft verteilen') {
                predictedZweiteEbene = 'LuftVerteilen'
            } else if (predictedZweiteEbene == 'Luft bereitstellen') {
                predictedZweiteEbene = 'LuftBereitstellen'
            }

            const datapointInformation = {
                startPrediction: startPrediction,
                labelGrundfunktion: predictedGrundfunktion,
                labelZweiteEbene: predictedZweiteEbene,                
                nlpInput: datenpunkt['NLPInput'],
                idShort: datenpunkt['IdShort'],
                aasId: this.aasId
            }
            console.log(datapointInformation)
            //let formData = new FormData()
            // formData.append('datapointInformation', datapointInformation)
            //formData.append('correctedLabel', predictedGrundfunktion)
            // formData.append('datapoint', datenpunkt)

            try {
                const response = await axios.post('/nlpEndpoints/editDatapoint', datapointInformation, {
                //const response = await axios.post('/awsNlpEndpoints/editDatapoint', datapointInformation, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
            this.showProgressEditDatenpunkt = false
        },
        async editDatenpunktKomponente (datenpunkt, predictedGrundfunktion, predictedZweiteEbene, predictedKomponente) {
            this.showProgressEditDatenpunkt = true
            const startPrediction = 'Komponente'

            if (predictedGrundfunktion == 'Wärme versorgen') {
                predictedGrundfunktion = 'WaermeVersorgen'
            } else if (predictedGrundfunktion == 'Luft versorgen') {
                predictedGrundfunktion = 'LuftVersorgen'
            } 
            
            if (predictedZweiteEbene == 'Wärme verteilen') {
                predictedZweiteEbene = 'Verteilen'
            } else if (predictedZweiteEbene == 'Wärme erzeugen') {
                predictedZweiteEbene = 'Erzeugen'
            } else if (predictedZweiteEbene == 'Wärme beziehen') {
                predictedZweiteEbene = 'Beziehen'
            } else if (predictedZweiteEbene == 'Wärme speichern') {
                predictedZweiteEbene = 'Speichern'
            } else if (predictedZweiteEbene == 'Luft verteilen') {
                predictedZweiteEbene = 'LuftVerteilen'
            } else if (predictedZweiteEbene == 'Luft bereitstellen') {
                predictedZweiteEbene = 'LuftBereitstellen'
            } 
            
            if (predictedKomponente == 'Fernwärme') {
                predictedKomponente = 'Fernwaerme'
            } else if (predictedKomponente == 'Wärmepumpe') {
                predictedKomponente = 'Waermepumpe'
            } else if (predictedKomponente == 'Rücklauf') {
                predictedKomponente = 'Ruecklauf'
            } else if (predictedKomponente == 'Heizkreis allgemein') {
                predictedKomponente = 'HeizkreisAllgemein'
            } else if (predictedKomponente == 'Abluft allgemein') {
                predictedKomponente = 'AbluftAllgemein'
            } else if (predictedKomponente == 'Zuluft allgemein') {
                predictedKomponente = 'ZuluftAllgemein'
            } else if (predictedKomponente == 'Kühler') {
                predictedKomponente = 'Kuehler'
            } else if (predictedKomponente == 'Volumenstromregler Abluft') {
                predictedKomponente = 'VolumenstromreglerAbluft'
            } else if (predictedKomponente == 'Volumenstromregler Zuluft') {
                predictedKomponente = 'VolumenstromreglerZuluft'
            } else if (predictedKomponente == 'Volumenstromregler Raum') {
                predictedKomponente = 'VolumenstromreglerRaum'
            } else if (predictedKomponente == 'Wärmerückgewinnung') {
                predictedKomponente = 'Waermerueckgewinnung'
            } else if (predictedZweiteEbene == 'Gerät allgemein') {
                predictedZweiteEbene = 'GeraetAllgemein'
            }

            const datapointInformation = {
                startPrediction: startPrediction,
                labelGrundfunktion: predictedGrundfunktion,
                labelZweiteEbene: predictedZweiteEbene,  
                labelKomponente: predictedKomponente,              
                nlpInput: datenpunkt['NLPInput'],
                idShort: datenpunkt['IdShort'],
                aasId: this.aasId
            }
            console.log(datapointInformation)
            //let formData = new FormData()
            // formData.append('datapointInformation', datapointInformation)
            //formData.append('correctedLabel', predictedGrundfunktion)
            // formData.append('datapoint', datenpunkt)
            let editingReady = ''
            try {
                const response = await axios.post('/nlpEndpoints/editDatapoint', datapointInformation, {
                //const response = await axios.post('/awsNlpEndpoints/editDatapoint', datapointInformation, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                console.log(response.data)
            } catch (error) {
                console.error(error)
            }

            //this.getBasyxNlpSubmodel(this.aasId)
            this.showProgressEditDatenpunkt = false

            return editingReady
        },
        async editDatenpunkt (datenpunkt, predictedGrundfunktion, predictedZweiteEbene, predictedKomponente, predictedDatenpunkt) {
            
            this.showProgressEditDatenpunkt = true
            const startPrediction = 'Datenpunkt'
            const datapointInformation = {
                startPrediction: startPrediction,
                labelGrundfunktion: predictedGrundfunktion,
                labelZweiteEbene: predictedZweiteEbene,  
                labelKomponente: predictedKomponente,   
                labelDatenpunkt: predictedDatenpunkt,           
                nlpInput: datenpunkt['NLPInput'],
                idShort: datenpunkt['IdShort'],
                aasId: this.aasId
            }
            try {
                //const response = await axios.post('/nlpEndpoints/editDatapoint', datapointInformation, {
                const response = await axios.post('/awsNlpEndpoints/editDatapoint', datapointInformation, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
            this.showProgressEditDatenpunkt = false

        },
        async getBasyxNlpSubmodel(aas_id) {
            this.aasId = aas_id
            const aasBasyxServer = "http://3.83.126.51:4001/aasServer/shells"
            //const aasBasyxServer = 'http://52.23.209.38:4003/aasServer/shells'
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
                console.log(submodelElements)
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
                        'Heizkreis allgemein': [],
                        'Ventil': [],
                        'Raum': [],
                        'Vorlauf': [],
                        'Rücklauf': []
                    },
                    'Erzeugen': {
                        'BHKW': [],
                        'Wärmeerzeuger allgemein': [],
                        'Wärmepumpe': [],
                        'Kessel': [],
                        'Pelletkessel': []
                    },
                    'Beziehen': {
                        'Fernwärme': [],
                    },
                    'Speichern': {
                        'Speicher': []
                    }
                }
                const luftVersorgenZweite = {
                    'Verteilen': {
                        'Volumenstromregler Zuluft': [],
                        'Volumenstromregler Abluft': [],
                        'Volumenstromregler Raum': [],
                        'Raum': [],
                    },
                    'Bereitstellen': {
                        'Zuluftventilator': [],
                        'Abluft allgemein': [],
                        'Zuluft allgemein': [],
                        'Abluftventilator': [],
                        'Fortluftklappe': [],
                        'Abluftklappe': [],
                        'Zuluftklappe': [],
                        'Außenluftklappe': [],
                        'Befeuchter': [],
                        'Erhitzer': [],
                        'Abluftfilter': [],
                        'Zuluftfilter': [],
                        'Filter': [],
                        'Außenluftfilter': [],
                        'Gerät allgemein': [],
                        'Kühler': [],
                        'Wärmerückgewinnung': [],
                    }
                }

                for (let submodelElement in submodelElements) {
                    // console.log(submodelElement)
                    let idShort = submodelElements[submodelElement]['idShort']
                    let grundfunktionValue = submodelElements[submodelElement]['value'][0]['value'][0]['value'][0]['value']
                    let grundfunktionScore = submodelElements[submodelElement]['value'][0]['value'][0]['value'][1]['value']
                    let zweiteEbeneValue = submodelElements[submodelElement]['value'][1]['value'][0]['value'][0]['value']
                    let zweiteEbeneScore = submodelElements[submodelElement]['value'][1]['value'][0]['value'][1]['value']
                    let komponentenEbeneValue = submodelElements[submodelElement]['value'][2]['value'][0]['value'][0]['value']
                    let komponentenEbeneScore = submodelElements[submodelElement]['value'][2]['value'][0]['value'][1]['value']
                    let datenpunktEbeneValue = submodelElements[submodelElement]['value'][3]['value'][0]['value'][0]['value']
                    let datenpunktEbeneScore = submodelElements[submodelElement]['value'][3]['value'][0]['value'][1]['value']
                    // console.log(typeof datenpunktEbeneScore)
                    let roundedDatenpunktScore = parseFloat(datenpunktEbeneScore)
                    let roundedGrundfunktionScore = parseFloat(grundfunktionScore)
                    let roundedZweiteEbeneScore = parseFloat(zweiteEbeneScore)
                    let roundedKomponentenEbeneScore = parseFloat(komponentenEbeneScore)
                    let nlpInput = submodelElements[submodelElement]['value'][4]['value']
                    let objectName = submodelElements[submodelElement]['value'][6]['value']
                    let objectType = submodelElements[submodelElement]['value'][7]['value']
                    let description = submodelElements[submodelElement]['value'][8]['value']
                    let submodelElementInfo = {
                        'GrundfunktionValue': grundfunktionValue,
                        'GrundfunktionScore': roundedGrundfunktionScore,
                        'ZweiteEbeneValue': zweiteEbeneValue,
                        'ZweiteEbeneScore': roundedZweiteEbeneScore,
                        'KomponentenEbeneValue': komponentenEbeneValue,
                        'KomponentenEbeneScore': roundedKomponentenEbeneScore,
                        'DatenpunktEbeneValue': datenpunktEbeneValue,
                        'DatenpunktEbeneScore': roundedDatenpunktScore,
                        'NLPInput': nlpInput,
                        'ObjectName': objectName,
                        'ObjectType': objectType,
                        'Description': description,
                        'IdShort': idShort
                    }
                    //console.log(submodelElementInfo)
                    allSubmodelElements.push(submodelElementInfo)
                    if (grundfunktionValue == 'WaermeVersorgen') {
                        wärmeVersorgen.push(submodelElementInfo)
                        if (zweiteEbeneValue == 'Verteilen' && komponentenEbeneValue == 'HeizkreisAllgemein') {
                            wärmeVersorgenZweite['Verteilen']['Heizkreis allgemein'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'Verteilen' && komponentenEbeneValue == 'Pumpe') {
                            wärmeVersorgenZweite['Verteilen']['Pumpe'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'Verteilen' && komponentenEbeneValue == 'Vorlauf') {
                            wärmeVersorgenZweite['Verteilen']['Vorlauf'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'Verteilen' && komponentenEbeneValue == 'Ruecklauf') {
                            wärmeVersorgenZweite['Verteilen']['Rücklauf'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'Verteilen' && komponentenEbeneValue == 'Ventil') {
                            wärmeVersorgenZweite['Verteilen']['Ventil'].push(submodelElementInfo)

                        } else if (zweiteEbeneValue == 'Erzeugen' && komponentenEbeneValue == 'WaermeversorgerAllgemein') {
                            wärmeVersorgenZweite['Erzeugen']['Wärmeerzeuger allgemein'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'Erzeugen' && komponentenEbeneValue == 'Kessel') {
                            wärmeVersorgenZweite['Erzeugen']['Kessel'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'Erzeugen' && komponentenEbeneValue == 'Pelletkessel') {
                            wärmeVersorgenZweite['Erzeugen']['Pelletkessel'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'Erzeugen' && komponentenEbeneValue == 'Waermepumpe') {
                            wärmeVersorgenZweite['Erzeugen']['Waermepumpe'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'Erzeugen' && komponentenEbeneValue == 'BHKW') {
                            wärmeVersorgenZweite['Erzeugen']['BHKW'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'Beziehen') {
                            wärmeVersorgenZweite['Beziehen']['Fernwärme'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'Speichern') {
                            wärmeVersorgenZweite['Speichern']['Speicher'].push(submodelElementInfo)
                        }
                    } else if (grundfunktionValue == 'LuftVersorgen') {
                        luftVersorgen.push(submodelElementInfo)
                        if (zweiteEbeneValue == 'LuftVerteilen' && komponentenEbeneValue == 'VolumenstromreglerZuluft') {
                            luftVersorgenZweite['Verteilen']['Volumenstromregler Zuluft'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftVerteilen' && komponentenEbeneValue == 'VolumenstromreglerAbluft') {
                            luftVersorgenZweite['Verteilen']['Volumenstromregler Abluft'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftVerteilen' && komponentenEbeneValue == 'VolumenstromreglerRaum') {
                            luftVersorgenZweite['Verteilen']['Volumenstromregler Raum'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftVerteilen' && komponentenEbeneValue == 'Raum') {
                            luftVersorgenZweite['Verteilen']['Raum'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'Zuluftventilator') {
                            luftVersorgenZweite['Bereitstellen']['Zuluftventilator'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'AbluftAllgemein') {
                            luftVersorgenZweite['Bereitstellen']['Abluft allgemein'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'ZuluftAllgemein') {
                            luftVersorgenZweite['Bereitstellen']['Zuluft allgemein'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'Abluftventilator') {
                            luftVersorgenZweite['Bereitstellen']['Abluftventilator'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'Fortluftklappe') {
                            luftVersorgenZweite['Bereitstellen']['Fortluftklappe'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'Abluftklappe') {
                            luftVersorgenZweite['Bereitstellen']['Abluftklappe'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'Zuluftklappe') {
                            luftVersorgenZweite['Bereitstellen']['Zuluftklappe'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'Außenluftklappe') {
                            luftVersorgenZweite['Bereitstellen']['Außenluftklappe'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'Befeuchter') {
                            luftVersorgenZweite['Bereitstellen']['Befeuchter'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'Erhitzer') {
                            luftVersorgenZweite['Bereitstellen']['Erhitzer'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'Zuluftfilter') {
                            luftVersorgenZweite['Bereitstellen']['Zuluftfilter'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'Außenluftfilter') {
                            luftVersorgenZweite['Bereitstellen']['Außenluftfilter'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'GerätAllgemein') {
                            luftVersorgenZweite['Bereitstellen']['Gerät allgemein'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'Kühler') {
                            luftVersorgenZweite['Bereitstellen']['Kühler'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'Wärmerückgewinnung') {
                            luftVersorgenZweite['Bereitstellen']['Wärmerückgewinnung'].push(submodelElementInfo)
                        } else if (zweiteEbeneValue == 'LuftBereitstellen' && komponentenEbeneValue == 'Abluftfilter') {
                            luftVersorgenZweite['Bereitstellen']['Abluftfilter'].push(submodelElementInfo)
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
                //console.log(wärmeVersorgenZweite)
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

                for (const key1 in luftVersorgenZweite) {
                    if (Object.prototype.hasOwnProperty.call(luftVersorgenZweite, key1)) {
                      const innerObj = luftVersorgenZweite[key1];
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

                // console.log(wärmeVersorgenZweite)


                // console.log(allSubmodelElements)
                this.wärmeVersorgen = wärmeVersorgen
                this.wärmeVersorgenZweite = wärmeVersorgenZweite

                this.luftVersorgen = luftVersorgen
                this.luftVersorgenZweite = luftVersorgenZweite

                this.sichern = sichern
                this.medienVersorgen = medienVersorgen
                this.kälteVersorgen = kälteVersorgen
                this.stromVersorgen = stromVersorgen
                this.allNlpSubmodelElements = allSubmodelElements

                console.log(allSubmodelElements)

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