// import the defineStore function
import { defineStore } from 'pinia'
import axios from 'axios'
// import axios from 'axios'

export const useGeneralStore = defineStore('general', {
  // arrow function recommended for full type inference
  state: () => {
    return {
        loading: false,
        loadedSiteInformation: [],
        loadedSiteInformationWithBuildings: [],
        //loadedSiteBuildingInformation: [],
        loadedOrganizationInformation: [],
      // all these properties will have their type inferred automatically
    }
  },
  actions: {
    async createAas(semanticIdType, aasIdShort) {
        let aasId = ''
        try {
            const createAas = 'api/v1/AAS/createAasByAasType'
            const url = '/awsBackend/' + createAas
            console.log(url)
            const response = await axios.post(url, {
                userId: 10002,
                semanticIdAasType: semanticIdType,
                idShort: aasIdShort
            })
            console.log(response.data)
            aasId = response.data
        } catch (error) {
            console.log(error)
        }
        return aasId
    },

    async addSubmodelElements(companyAasId, submodelIdShort, semanticIdSubmodel, submodelElementValues) {
        try {
            const updateSubmodel = 'api/v1/Submodel/addSubmodelElements'
            const url = '/awsBackend/' + updateSubmodel
            console.log(url)
            const response = await axios.post(url, {
                userId: 10002,
                aasIdentifier: companyAasId,
                submodelIdShort: submodelIdShort,
                semanticIdSubmodel: semanticIdSubmodel,
                submodelElementValues: submodelElementValues	
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    },

    async inititalPostBomHasPart(parentId, partId) {

        const bom = 'api/v1/Submodel/BOM/initialPost'
        const urlBom = '/awsBackend/' + bom
        try {
            const response = await axios.post(urlBom, {
                userId: 10002,
                aasIdentifier: parentId,
                submodelIdShort:"HierarchicalStructures",
                BomValues: {
                    ArcheType:"Full",
                    entityType:"SelfManagedEntity", 
                    EntitiyAasIdentifier: parentId,
                    HasPart:[
                        partId
                    ],
                    IsPartOf:[
        
                    ]
                }	
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    },

    async inititalPostBomIsPartOf(parentId, partId) {
        
        const bom = 'api/v1/Submodel/BOM/initialPost'
        const urlBom = '/awsBackend/' + bom
        try {
            const response = await axios.post(urlBom, {
                userId: 10002,
                aasIdentifier: partId,
                submodelIdShort:"HierarchicalStructures",
                BomValues: {
                    ArcheType:"Full",
                    entityType:"SelfManagedEntity", 
                    EntitiyAasIdentifier: partId,
                    HasPart:[
                    ],
                    IsPartOf:[
                        parentId        
                    ]
                }	
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    },

    async addHasPart(parentId, partId) {
        const bom = 'api/v1/Submodel/BOM/addHasPartElement'
        const urlBom = '/awsBackend/' + bom
        try {
            const response = await axios.post(urlBom, {
                userId: 10002,
                aasIdentifier: parentId,
                submodelIdShort:"HierarchicalStructures",
                BomValues: {
                    EntitiyAasIdentifier: parentId,
                    HasPart: partId
                }	
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    },

    async getBomChilds(aasId) {
        const bomChilds = 'api/v1/Submodel/BOM/getChilds'
        const urlBomChilds = '/awsBackend/' + bomChilds
        let childAasIds = []
        try {
            const response = await axios.post(urlBomChilds, {
                userId: 10002,
                aasIdentifier: aasId,
                submodelIdShort: 'HierarchicalStructures'
            })

            console.log(response.data)
            childAasIds = response.data
        } catch (error) {
            console.log(error)
        }
        return childAasIds
    },
    async getAasByType (semanticId) {
        const getAasByType = 'api/v1/AAS/getAllAasIdentifierByAasType'
        const url = '/awsBackend/' + getAasByType
        let aasIds = ''
        try {
            //console.log(url)
            const response = await axios.post(url, {
                userId: 10002,
                semanticIdAasType: semanticId
            })
            aasIds = response.data
        } catch (error) {
            console.log(error)
        }

        return aasIds
    },

    async getSeValue (aasId, submodelIdShort, idShortPaths) {

        let allSeInformations = {}
        const getSeValue = 'api/v1/Submodel/getSubmodelElementValue'
        const urlSeValue = '/awsBackend/' + getSeValue

        for (let element in idShortPaths) {
            let value = idShortPaths[element] 
            if (value.length == 1) {
                try {
                    const response = await axios.post(urlSeValue, {
                        userId: 10002,
                        aasIdentifier: aasId,
                        submodelIdShort: submodelIdShort,
                        submodelElementShortIdPath: [
                            value[0]
                        ]
                    })
                    
                    if (response.data !== '') {
                        allSeInformations[element] = response.data
                    } 
                } catch (error) {
                    console.log(error)
                }
            } else if (value.length == 2) {
                try {
                    const response = await axios.post(urlSeValue, {
                        userId: 10002,
                        aasIdentifier: aasId,
                        submodelIdShort: submodelIdShort,
                        submodelElementShortIdPath: [
                            value[0],
                            value[1]
                        ]
                    })
                    if (response.data !== '') {
                        allSeInformations[element] = response.data
                    } 
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return allSeInformations
    },

    async editSeValue (aasId, submodelIdShort, idShort, value) {

        const editSeValue = 'api/v1/Submodel/editSubmodelElementValue'
        const url = '/awsBackend' + editSeValue

        if (idShort.length == 1) {
            try {
                const response = await axios.post(url, {
                    userId: 10002,
                    aasIdentifier: aasId,
                    submodelIdShort: submodelIdShort,
                    submodelElementShortIdPath: [
                        idShort[0]
                    ],
                    value: value
                })
                console.log(response)
            
            } catch (error) {
                console.log(error)
            }
        } else if (idShort.length == 2) {
            try {
                const response = await axios.post(url, {
                    userId: 10002,
                    aasIdentifier: aasId,
                    submodelIdShort: submodelIdShort,
                    submodelElementShortIdPath: [
                        idShort[0],
                        idShort[1]
                    ],
                    value: value
                })
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
    },
    async fetchGeneralInfos() {

        // this.loading=true
        const companyIdShortPaths = {
            organizationName: ['CompanyName'],
            country: ['Address', 'NationalCode'],
            city: ['Address', 'CityTown'],
            zipcode: ['Address', 'Zipcode'],
            street: ['Address', 'Street'],
        }
        const siteIdShortPaths = {
            siteName: ['SiteName'],
            country: ['Address', 'NationalCode'],
            city: ['Address', 'CityTown'],
            zipcode: ['Address', 'Zipcode'],
            lat: ['Address', 'Lattitude'],
            lng: ['Address', 'Longitude'],
            street: ['Address', 'Street'],
        }
        this.loadedOrganizationInformation = []
        this.loadedSiteInformation = []

        const semanticIdAasType = 'https://th-koeln.de/gart/CompanyAAS/1/0'        
        const aasIds = await this.getAasByType(semanticIdAasType)
        const companyAasId = aasIds[0]
        
        const companySubmodelId = 'CompanyInformation'
        const organizationInformation =  await this.getSeValue (companyAasId, companySubmodelId, companyIdShortPaths)

        if (Object.keys(organizationInformation).length !== 0) {
            this.loadedOrganizationInformation.push(organizationInformation)  
        }
        
        let siteAasIds = []
        siteAasIds = await this.getBomChilds(companyAasId)
        console.log(siteAasIds)   
        
        const siteSubmodelId = 'SiteInformation'
        for (let siteId in siteAasIds) {
            let siteAasId = siteAasIds[siteId]
            console.log(siteAasId)
            let siteInformation = {}
            siteInformation = await this.getSeValue (siteAasId, siteSubmodelId, siteIdShortPaths)

            if (Object.keys(siteInformation).length !== 0) {
                this.loadedSiteInformation.push(siteInformation)  
            }
        }
        //console.log(this.loadedSiteInformation)

        this.loadedSiteInformationWithBuildings = this.getBuildingsForEachSite()
        // this.loading=false
    },
    async addOrganizationInformation(organizationName, country, city, zipcode, street) {
        
        const semanticIdType = 'https://th-koeln.de/gart/CompanyAAS/1/0'
        const companyAasId = await this.createAas(semanticIdType, organizationName)

        const submodelIdShort = "CompanyInformation"
        const semanticIdSubmodel = "https://th-koeln.de/gart/vocabulary/CompanyInformation/1/0"
        const submodelElementValues = {
            CompanyName:organizationName,
            Address:{
                Street:street,
                Zipcode:zipcode,
                CityTown:city,
                NationalCode:country
            }
        }

        await this.addSubmodelElements(companyAasId, submodelIdShort, semanticIdSubmodel, submodelElementValues)
        this.fetchGeneralInfos()
    },
    async editOrganizationInformation(organizationName, country, city, zipcode, street) {

        const organizationInformation= {
            organizationName: organizationName,
            country: country, 
            city: city,
            zipcode: zipcode,
            street: street
        }
        const companyIdShortPaths = {
            organizationName: ['CompanyName'],
            country: ['Address', 'NationalCode'],
            city: ['Address', 'CityTown'],
            zipcode: ['Address', 'Zipcode'],
            street: ['Address', 'Street'],
        }
        //console.log(organizationInformation)
        
        const semanticIdAasType = 'https://th-koeln.de/gart/CompanyAAS/1/0'        
        const aasIds = await this.getAasByType(semanticIdAasType)
        const companyAasId = aasIds[0]
        
        const submodelIdShort = 'CompanyInformation'
        for (let element in companyIdShortPaths) {
            let idShort = companyIdShortPaths[element] 
            await this.editSeValue(companyAasId, submodelIdShort, idShort, organizationInformation[element])

        }
        this.fetchGeneralInfos()
    },

    async addSiteInformation(country, city, street, streetNumber, lat, lng, zipcode, siteName) {
        
        const semanticIdCompanyAasType = 'https://th-koeln.de/gart/CompanyAAS/1/0'
        const aasIds = await this.getAasByType(semanticIdCompanyAasType)
        const companyAasId = aasIds[0]
        
        const semanticIdSiteAasType = 'https://th-koeln.de/gart/SiteAAS/1/0'
        const siteAasId = await this.createAas(semanticIdSiteAasType, siteName)

        const submodelIdShort = "SiteInformation"
        const semanticIdSubmodel = "https://th-koeln.de/gart/vocabulary/SiteInformation/1/0"
        const submodelElementValues = {
            SiteName:siteName,
            Address:{
                Street: street,
                Zipcode: zipcode,
                CityTown: city,
                NationalCode: country,
                Lattitude: lat,
                Longitude: lng
            }
        }

        await this.addSubmodelElements(siteAasId, submodelIdShort, semanticIdSubmodel, submodelElementValues)

        const companyChilds = await this.getBomChilds(companyAasId)
        if (companyChilds.length === 0) {
            await this.inititalPostBomHasPart(companyAasId, siteAasId)
        } else if (companyChilds.length >= 1) {
            await this.addHasPart(companyAasId, siteAasId)
        }
        await this.inititalPostBomIsPartOf(companyAasId, siteAasId)

        this.fetchGeneralInfos()
    },
    /*
    async getBuildingsFromSite(site) {
        this.loadedSiteBuildingInformation = []
        console.log(site)
        const resOrganization = await fetch ('http://localhost:3000/organization')
        const data = await resOrganization.json()
        const sites = data[0]['sites']
        console.log(sites)

        let buildings
        for (let element in sites) {
            if (sites[element].siteInformation.siteName === site.siteName) {
                console.log(sites[element])
                buildings = sites[element].buildings
            }
        }
        console.log(buildings)
        this.loadedSiteBuildingInformation = buildings
    },
    */
    async getBuildingsForEachSite() {
        const buildingIdShortPaths = {
            buildingName: ['BuildingName'],
            country: ['Address', 'NationalCode'],
            city: ['Address', 'CityTown'],
            zipcode: ['Address', 'Zipcode'],
            lat: ['Address', 'Lattitude'],
            lng: ['Address', 'Longitude'],
            street: ['Address', 'Street'],
        }

        this.loadedSiteInformationWithBuildings = []

        const semanticIdAasTypeSite = 'https://th-koeln.de/gart/SiteAAS/1/0'        
        const siteAasIds = await this.getAasByType(semanticIdAasTypeSite)
        //console.log(siteAasIds)

        let allSitesWithBuildings = []
        const siteSubmodelId = 'SiteInformation' 
        const siteIdShortPaths = {
            siteName: ['SiteName']
        }
        for (let siteId in siteAasIds) {
            let buildings = []
            let buildingIds = await this.getBomChilds(siteAasIds[siteId])
            //console.log(buildingIds)
            let siteName = await this.getSeValue(siteAasIds[siteId], siteSubmodelId, siteIdShortPaths)
            const buildingSubmodelId = 'BuildingInformation'
            let buildingInformationDict = {}
            for (let building in buildingIds) {
                let buildingAasId = buildingIds[building]
                let buildingInformation =  await this.getSeValue(buildingAasId, buildingSubmodelId, buildingIdShortPaths)
                //console.log(buildingInformation)
                buildingInformationDict[buildingAasId] = buildingInformation
                buildings.push(buildingInformation)
            }
            //console.log(buildingInformationDict)
            let siteDict = {
                siteName: siteName['siteName'],
                siteAasId: siteAasIds[siteId],
                buildings: buildings
            }
            allSitesWithBuildings.push(siteDict)
        }

        this.loadedSiteInformationWithBuildings = allSitesWithBuildings

        return allSitesWithBuildings
    },
    async addBuildingInformation(site, buildingName, country, city, street, streetNumber, lat, lng, zipcode) {
        //console.log(site)
        //console.log(buildingName)
        const siteAasId = site['siteAasId']

        const semanticIdBuildingAasType = 'https://th-koeln.de/gart/BuildingAAS/1/0'
        const buildingAasId = await this.createAas(semanticIdBuildingAasType, buildingName)

        const submodelIdShort = "BuildingInformation"
        const semanticIdSubmodel = "https://th-koeln.de/gart/vocabulary/BuildingInformation/1/0"
        const submodelElementValues = {
            BuildingName: buildingName,
            Address:{
                Street: street,
                Zipcode: zipcode,
                CityTown: city,
                NationalCode: country,
                Lattitude: lat,
                Longitude: lng
            }
        }
        //console.log(submodelElementValues)

        await this.addSubmodelElements(buildingAasId, submodelIdShort, semanticIdSubmodel, submodelElementValues)

        await this.addHasPart(siteAasId, buildingAasId)
        await this.inititalPostBomIsPartOf(siteAasId, buildingAasId)

        this.fetchGeneralInfos()
    }
  }
})
