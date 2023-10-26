import { defineStore } from 'pinia'
import axios from 'axios'
import { useGeneralStore } from "@/store/general"

export const useMonitoringStore = defineStore('monitoring', {
    state: () => {
        return {
            timeSeriesSubmodel: [],
            timeSeriesSubmodelElementsIdShorts: [],
            userId: '',
            loadingLineChart: false,
            aasServer: 'https://svmiv1rcci.execute-api.us-east-1.amazonaws.com/dev/v1/',
            roomTemperature: [],
            aasTree: [],
            loadingAasTree: false,
            aasZweiteGrundfunktion: [],
            currentBuildingAas: '',
            aasAnlage: []
        }
    },
    actions: {
        /*
        async getGrundfunktionen(aasId, allBuildings) {
            const generalStore = useGeneralStore()


            for (const obj of allBuildings) {
                for (const key in obj) {
                  if (key === aasId) {
                    let grundfunktionenAas = obj[key]
                    let aasStrukturinformationen = []
                    for (let grundfunktionAas in grundfunktionenAas) {
                        let aasIdGrundfunktion = grundfunktionenAas[grundfunktionAas]
                        let idShort = await generalStore.getAasIdShortByIdentifier(aasIdGrundfunktion)
                        //console.log(idShort)
                        let aasIdsZweiteEbene = await generalStore.getBomChilds(aasIdGrundfunktion)
                        console.log(aasIdsZweiteEbene)
                        let aasZweiteEbeneArray = []
                        for (let aas in aasIdsZweiteEbene) {
                            let aasIdZweiteEbene = aasIdsZweiteEbene[aas]
                            let idShortZweiteEbene = await generalStore.getAasIdShortByIdentifier(aasIdZweiteEbene)
                            
                            let aasIdsAnlagen = await generalStore.getBomChilds(aasIdZweiteEbene)
                            
                            let aasAnlagen = []
                            for (let aasAnlage in aasIdsAnlagen) {
                                let aasIdAnlage = aasIdsAnlagen[aasAnlage]
                                let idShortAnlage = await generalStore.getAasIdShortByIdentifier(aasIdAnlage)

                                let aasIdsKomponenten = await generalStore.getBomChilds(aasIdAnlage)
                                
                                let aasKomponenten = []
                                for (let aasKomponente in aasIdsKomponenten) {
                                    let aasIdKomponente = aasIdsKomponenten[aasKomponente]
                                    let idShortKomponente = await generalStore.getAasIdShortByIdentifier(aasIdKomponente)
                                    
                                    aasKomponenten.push(
                                        {
                                            'semanticId': 'Platzhalter',
                                            'aasId': aasIdKomponente,
                                            'idShort': idShortKomponente[0]
                                        }
                                    )
                                }

                                aasAnlagen.push(
                                    {
                                        'semanticId': 'Platzhalter',
                                        'aasId': aasIdAnlage,
                                        'idShort': idShortAnlage[0],
                                        'komponentenAas': aasKomponenten
                                    }
                                )

                            }
                            aasZweiteEbeneArray.push(
                                {
                                    'semanticId': 'Platzhalter',
                                    'aasId': aasIdZweiteEbene,
                                    'idShort': idShortZweiteEbene[0],
                                    'anlagenAas': aasAnlagen
                                }
                            )
                        }
                        let allAas = {
                            'aasGrundfunktion': {
                                'semanticId': 'Platzhalter',
                                'aasId': aasIdGrundfunktion,
                                'idShort': idShort[0]
                            },
                            'aasZweiteEbene': aasZweiteEbeneArray
                        }
                        aasStrukturinformationen.push(allAas)
                    }
                    console.log(aasStrukturinformationen)
                    break
                  }
                }
            }
        },
        */
        async getGrundfunktionen(aasId, allBuildings) {
            if (this.currentBuildingAas === aasId) {
              return this.aasTree
            }
            this.aasTree = []
            this.loadingAasTree = true
            const generalStore = useGeneralStore()
            //const aasStrukturinformationen = []
          
            for (const obj of allBuildings) {
              for (const key in obj) {
                if (key === aasId) {
                  const grundfunktionenAas = obj[key];
                  const aasPromises = [];
          
                  for (let grundfunktionAas in grundfunktionenAas) {
                    aasPromises.push(fetchAasData(grundfunktionenAas[grundfunktionAas]));
                  }
          
                  const aasData = await Promise.all(aasPromises);
          
                  console.log(aasData);
                  this.aasTree = aasData
                  this.loadingAasTree = false
                  this.currentBuildingAas = aasId
                  return aasData
                  //break;
                }
              }
            }
          
            async function fetchAasData(aasId) {
              const idShort = await generalStore.getAasIdShortByIdentifier(aasId);
              const semanticId = await generalStore.getSemanticIdAas(aasId);
              const aasIdsZweiteEbene = await generalStore.getBomChilds(aasId);
          
              const aasZweiteEbeneArray = await Promise.all(
                aasIdsZweiteEbene.map((aasIdZweiteEbene) =>
                  fetchAasZweiteEbeneData(aasIdZweiteEbene)
                )
              );
          
              return {
                aasGrundfunktion: {
                  semanticId: semanticId[0],
                  aasId: aasId,
                  idShort: idShort[0],
                },
                aasZweiteEbene: aasZweiteEbeneArray,
              };
            }
          
            async function fetchAasZweiteEbeneData(aasIdZweiteEbene) {
              const idShortZweiteEbene = await generalStore.getAasIdShortByIdentifier(
                aasIdZweiteEbene
              );
              const semanticIdZweiteEbene = await generalStore.getSemanticIdAas(aasId);
              const aasIdsAnlagen = await generalStore.getBomChilds(aasIdZweiteEbene);
          
              const aasAnlagen = await Promise.all(
                aasIdsAnlagen.map((aasIdAnlage) => fetchAasAnlageData(aasIdAnlage))
              );
          
              return {
                semanticId: semanticIdZweiteEbene[0],
                aasId: aasIdZweiteEbene,
                idShort: idShortZweiteEbene[0],
                anlagenAas: aasAnlagen,
              };
            }
          
            async function fetchAasAnlageData(aasIdAnlage) {
              const idShortAnlage = await generalStore.getAasIdShortByIdentifier(
                aasIdAnlage
              );
              const semanticIdAnlage = await generalStore.getSemanticIdAas(aasId);
              const aasIdsKomponenten = await generalStore.getBomChilds(aasIdAnlage);
          
              const aasKomponenten = await Promise.all(
                aasIdsKomponenten.map((aasIdKomponente) =>
                  fetchAasKomponenteData(aasIdKomponente)
                )
              );
          
              return {
                semanticId: semanticIdAnlage[0],
                aasId: aasIdAnlage,
                idShort: idShortAnlage[0],
                komponentenAas: aasKomponenten,
              };
            }
          
        async function fetchAasKomponenteData(aasIdKomponente) {
            const idShortKomponente = await generalStore.getAasIdShortByIdentifier(
            aasIdKomponente
            );
            const semanticIdKomponente = await generalStore.getSemanticIdAas(aasId);
        
            return {
            semanticId: semanticIdKomponente[0],
            aasId: aasIdKomponente,
            idShort: idShortKomponente[0],
            };
            }
        },
        async getTimeSeriesSubmodelElements(aasId) {
            const getSubmodelElements = 'submodel/getsubmodelelementbypath'
            const url = this.aasServer + getSubmodelElements
            let responseBasyx = ''
            const generalStore = useGeneralStore()
            const userId = generalStore.userId
            this.userId = userId
            console.log(this.userId)
            console.log(aasId)

            try {
                const response = await axios.post(url, {
                    userId: this.userId,
                    aasIdentifier: aasId,
                    submodelIdShort : 'TimeSeries',
                    submodelElementShortIdPath: [
                        "Segments"
                    ]
                })
                responseBasyx = response.data
            } catch (error) {
                console.log(error)
            }
            let idShorts = []
            for  (let element in responseBasyx['value']) {
                console.log(responseBasyx['value'][element]['idShort'])
                idShorts.push(responseBasyx['value'][element]['idShort'])
            }
            this.timeSeriesSubmodelElementsIdShorts = idShorts
            this.timeSeriesSubmodel = responseBasyx


            return responseBasyx
        }, 
        async getTimeSeriesValues(submodelElementPath, submodelRefIdShort, aasId) {
            this.loadingLineChart = true

            const readTimeSeries = 'submodel/timeseries/readtimeseries'
            const url = this.aasServer + readTimeSeries
            let responseBasyx = ''    
            console.log(url)      
            //const generalStore = useGeneralStore()
            //const userId = generalStore.userId
            //this.userId = userId
            const actualTime = Math.floor(new Date().getTime() / 1000)
            
            try {
                const response = await axios.post(url, {
                    userId: this.userId,
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
