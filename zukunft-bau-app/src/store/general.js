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
            const cleanedString = response.data.replace('[', '').replace(']', '')
            const responseArray = JSON.parse(`["${cleanedString}"]`)
            childAasIds = responseArray
        } catch (error) {
            console.log(error)
        }
        return childAasIds
    },
    async fetchGeneralInfos() {

        // this.loading=true
        const organizationInformation = {}
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
        
        let companyAasId = ''
        try {
            const getAasByType = 'api/v1/AAS/getAllAasIdentifierByAasType'
            const url = '/awsBackend/' + getAasByType
            console.log(url)
            const response = await axios.post(url, {
                userId: 10002,
                semanticIdAasType: 'https://th-koeln.de/gart/CompanyAAS/1/0'
            })
            // Remove the square brackets from the string
            const cleanedString = response.data.replace('[', '').replace(']', '');
            const responseArray = JSON.parse(`["${cleanedString}"]`);
            console.log(responseArray)
            companyAasId = responseArray[0]
        } catch (error) {
            console.log(error)
        }

        const getSeValue = 'api/v1/Submodel/getSubmodelElementValue'
        const urlSeValue = '/awsBackend/' + getSeValue

        for (let element in companyIdShortPaths) {
            let value = companyIdShortPaths[element] 
            if (value.length == 1) {
                try {
                    const response = await axios.post(urlSeValue, {
                        userId: 10002,
                        aasIdentifier: companyAasId,
                        submodelIdShort: 'CompanyInformation',
                        submodelElementShortIdPath: [
                            value[0]
                        ]
                    })
                    
                    if (response.data !== '') {
                        organizationInformation[element] = response.data
                    } 
                } catch (error) {
                    console.log(error)
                }
            } else if (value.length == 2) {
                try {
                    const response = await axios.post(urlSeValue, {
                        userId: 10002,
                        aasIdentifier: companyAasId,
                        submodelIdShort: 'CompanyInformation',
                        submodelElementShortIdPath: [
                            value[0],
                            value[1]
                        ]
                    })
                    if (response.data !== '') {
                        organizationInformation[element] = response.data
                    } 
                    // Remove the square brackets from the string
                } catch (error) {
                    console.log(error)
                }
            }
        }
        if (Object.keys(organizationInformation).length !== 0) {
            this.loadedOrganizationInformation.push(organizationInformation)  
        }
        
        let siteAasIds = []
        siteAasIds = await this.getBomChilds(companyAasId)
        console.log(siteAasIds)   

        for (let siteId in siteAasIds) {
            let site = siteAasIds[siteId]
            console.log(site)
            let siteInformation = {}
            for (let element in siteIdShortPaths) {
                let value = siteIdShortPaths[element] 
                if (value.length == 1) {
                    try {
                        const response = await axios.post(urlSeValue, {
                            userId: 10002,
                            aasIdentifier: site,
                            submodelIdShort: 'SiteInformation',
                            submodelElementShortIdPath: [
                                value[0]
                            ]
                        })
                        
                        if (response.data !== '') {
                            siteInformation[element] = response.data
                        } 
                    } catch (error) {
                        console.log(error)
                    }
                } else if (value.length == 2) {
                    try {
                        const response = await axios.post(urlSeValue, {
                            userId: 10002,
                            aasIdentifier: site,
                            submodelIdShort: 'SiteInformation',
                            submodelElementShortIdPath: [
                                value[0],
                                value[1]
                            ]
                        })
                        if (response.data !== '') {
                            siteInformation[element] = response.data
                        } 
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            if (Object.keys(organizationInformation).length !== 0) {
                this.loadedSiteInformation.push(siteInformation)  
            }
        }
        console.log(this.loadedSiteInformation)
        /*
        const resOrganization = await fetch ('http://localhost:3000/organization')
        const dataOrganization = await resOrganization.json()
        this.loadedOrganizationInformation.push(dataOrganization[0]['organizationInformation'])
        console.log(dataOrganization)
        for (let site in dataOrganization[0]['sites']) {
            this.loadedSiteInformation.push(dataOrganization[0]['sites'][site]['siteInformation'])
        }
        this.loadedSiteInformationWithBuildings
        this.loadedSiteInformationWithBuildings = this.getBuildingsForEachSite()
        console.log(this.loadedSiteInformation)
        */
        // this.loading=false
    },
    async addOrganizationInformation(organizationName, country, city, zipcode, street) {

        let companyAasId = ''
        try {
            const createAasCompany = 'api/v1/AAS/createAasByAasType'
            // const url = 'http://backend1-env.eba-qq8c86yd.us-east-1.elasticbeanstalk.com/api/v1/AAS/getAllAasIdentifier'
            // const getAasByType = 'api/v1/AAS/getAllAasIdentifier'
            const url = '/awsBackend/' + createAasCompany
            console.log(url)
            const response = await axios.post(url, {
                userId: 10002,
                semanticIdAasType: 'https://th-koeln.de/gart/CompanyAAS/1/0',
                idShort: organizationName
            })
            console.log(response.data)
            companyAasId = response.data
        } catch (error) {
            console.log(error)
        }
        
        try {
            const updateCompanySubmodel = 'api/v1/Submodel/addSubmodelElements'
            const url = '/awsBackend/' + updateCompanySubmodel
            console.log(url)
            console.log(companyAasId)
            const response = await axios.post(url, {
                userId: 10002,
                aasIdentifier: companyAasId,
                submodelIdShort: "CompanyInformation",
                semanticIdSubmodel: "https://th-koeln.de/gart/vocabulary/CompanyInformation/1/0",
                submodelElementValues: {
                    CompanyName:organizationName,
                    Address:{
                        Street:street,
                        Zipcode:zipcode,
                        CityTown:city,
                        NationalCode:country
                    }
                }	
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        
        /*
        try {
            const response = await fetch('http://localhost:3000/organization', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                const responseData = await response.json();
                console.log('POST request succeeded:', responseData);
            } else {
                console.log('POST request failed:', response.status);
            }

        } catch (error) {
            console.log(error)
        }
        */
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
        console.log(organizationInformation)
        let companyAasId = ''
        try {
            const getAasByType = 'api/v1/AAS/getAllAasIdentifierByAasType'
            const url = '/awsBackend/' + getAasByType
            console.log(url)
            const response = await axios.post(url, {
                userId: 10002,
                semanticIdAasType: 'https://th-koeln.de/gart/CompanyAAS/1/0'
            })
            console.log(response.data)
            // Remove the square brackets from the string
            const cleanedString = response.data.replace('[', '').replace(']', '');
            const responseArray = JSON.parse(`["${cleanedString}"]`);
            console.log(responseArray)
            companyAasId = responseArray[0]
            console.log(companyAasId)
        } catch (error) {
            console.log(error)
        }

        const editSeValue = 'api/v1/Submodel/editSubmodelElementValue'
        const url = '/awsBackend' + editSeValue

        for (let element in companyIdShortPaths) {
            let idShort = companyIdShortPaths[element] 
            if (idShort.length == 1) {
                try {
                    const response = await axios.post(url, {
                        userId: 10002,
                        aasIdentifier: companyAasId,
                        submodelIdShort: 'CompanyInformation',
                        submodelElementShortIdPath: [
                            idShort[0]
                        ],
                        value: organizationInformation[element]
                    })
                    console.log(response)
                
                } catch (error) {
                    console.log(error)
                }
            } else if (idShort.length == 2) {
                try {
                    const response = await axios.post(url, {
                        userId: 10002,
                        aasIdentifier: companyAasId,
                        submodelIdShort: 'CompanyInformation',
                        submodelElementShortIdPath: [
                            idShort[0],
                            idShort[1]
                        ],
                        value: organizationInformation[element]
                    })
                    console.log(response)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        /*
        try {
            const response = await fetch('http://localhost:3000/organization/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                const responseData = await response.json();
                console.log('POST request succeeded:', responseData);
            } else {
                console.log('POST request failed:', response.status);
            }

        } catch (error) {
            console.log(error)
        }
        */
        this.fetchGeneralInfos()
    },

    async addSiteInformation(country, city, street, streetNumber, lat, lng, zipcode, siteName) {

        const getAasByType = 'api/v1/AAS/getAllAasIdentifierByAasType'
        const url = '/awsBackend/' + getAasByType
        let companyAasId = ''
        try {
            const response = await axios.post(url, {
                userId: 10002,
                semanticIdAasType: 'https://th-koeln.de/gart/CompanyAAS/1/0'
            })
            console.log(response.data)
            // Remove the square brackets from the string
            const cleanedString = response.data.replace('[', '').replace(']', '');
            const responseArray = JSON.parse(`["${cleanedString}"]`);
            console.log(responseArray)
            companyAasId = responseArray[0]
            console.log(companyAasId)
        } catch (error) {
            console.log(error)
        }

        let siteAasId = ''
        try {
            const createAas = 'api/v1/AAS/createAasByAasType'
            const url = '/awsBackend/' + createAas
            console.log(url)
            const response = await axios.post(url, {
                userId: 10002,
                semanticIdAasType: 'https://th-koeln.de/gart/SiteAAS/1/0',
                idShort: siteName
            })
            console.log(response.data)
            siteAasId = response.data
        } catch (error) {
            console.log(error)
        }

        try {
            const updateSubmodel = 'api/v1/Submodel/addSubmodelElements'
            const url = '/awsBackend/' + updateSubmodel
            const response = await axios.post(url, {
                userId: 10002,
                aasIdentifier: siteAasId,
                submodelIdShort: "SiteInformation",
                semanticIdSubmodel: "https://th-koeln.de/gart/vocabulary/SiteInformation/1/0",
                submodelElementValues: {
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
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }

        const bom = 'api/v1/Submodel/BOM/initialPost'
        const urlBom = '/awsBackend/' + bom
        try {
            const response = await axios.post(urlBom, {
                userId: 10002,
                aasIdentifier: companyAasId,
                submodelIdShort:"HierarchicalStructures",
                BomValues: {
                    ArcheType:"Full",
                    entityType:"SelfManagedEntity", 
                    EntitiyAasIdentifier: companyAasId,
                    HasPart:[
                        siteAasId
                    ],
                    IsPartOf:[
        
                    ]
                }	
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }

        try {
            console.log(url)
            const response = await axios.post(urlBom, {
                userId: 10002,
                aasIdentifier: siteAasId,
                submodelIdShort:"HierarchicalStructures",
                BomValues: {
                    ArcheType:"Full",
                    entityType:"SelfManagedEntity", 
                    EntitiyAasIdentifier: siteAasId,
                    HasPart:[
                    ],
                    IsPartOf:[
                        companyAasId
                    ]
                }	
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }



        /*
        const resOrganization=await fetch ('http://localhost:3000/organization')
        const dataOrganization=await resOrganization.json()
        // const loadedSites = dataOrganization[0]['sites']
        dataOrganization[0]['sites'].push(data)
        console.log(dataOrganization[0])
        try {
            const response = await fetch('http://localhost:3000/organization/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataOrganization[0])
            })
            console.log(response)
            if (response.ok) {
                const responseData = await response.json();
                console.log('POST request succeeded:', responseData);
            } else {
                console.log('POST request failed:', response.status);
            }

        } catch (error) {
            console.log(error)
        }
        */
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
        this.loadedSiteInformationWithBuildings = []
        const resOrganization = await fetch ('http://localhost:3000/organization')
        const data = await resOrganization.json()
        const sites = data[0]['sites']
        console.log(sites)
        const buildings = []

        for (let element in sites) {
            console.log(sites[element])
            let siteDict = {
                [sites[element].siteInformation.siteName]: sites[element].buildings
            }
            console.log(siteDict)
            buildings.push(siteDict)
            //this.loadedSiteInformationWithBuildings.push(siteDict)
        }
        this.loadedSiteInformationWithBuildings = buildings
        console.log(this.loadedSiteInformationWithBuildings)

        return buildings
    },
    async addBuildingInformation(site, buildingName, country, city, street, streetNumber, lat, lng, zipcode) {
        console.log(country)
        const data =  {
            buildingInformation: {
                buildingName: buildingName,
                country: country,
                city: city, 
                street: street,
                streetNumber: streetNumber,
                lat: lat,
                lng: lng,
                zipcode: zipcode
            }
        }
    
        console.log(data)
        console.log(site)
        const key = Object.keys(site)
        const siteName = key[0]
        
        const resOrganization=await fetch ('http://localhost:3000/organization')
        const siteData =await resOrganization.json()
        
        const sites = siteData[0]['sites']
        console.log(sites)

        for (let element in sites) {
            if (sites[element].siteInformation.siteName === siteName) {
                console.log(sites[element])
                siteData[0]['sites'][element]['buildings'].push(data)
            }
        }

        try {
            const response = await fetch('http://localhost:3000/organization/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(siteData[0])
            })
            console.log(response)
            if (response.ok) {
                const responseData = await response.json();
                console.log('POST request succeeded:', responseData);
            } else {
                console.log('POST request failed:', response.status);
            }
    
        } catch (error) {
            console.log(error)
        }
        this.fetchGeneralInfos()
    }
  }
})
