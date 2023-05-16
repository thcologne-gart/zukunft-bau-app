// import the defineStore function
import { defineStore } from 'pinia'
// import axios from 'axios'

export const useGeneralStore = defineStore('general', {
  // arrow function recommended for full type inference
  state: () => {
    return {
        loading: false,
        loadedSiteInformation: [],
        loadedBuildingInformation: [],
        loadedOrganizationInformation: [],
      // all these properties will have their type inferred automatically
    }
  },
  actions: {
    async fetchGeneralInfos() {
        // this.loading=true
        this.loadedOrganizationInformation = []
        this.loadedSiteInformation = []
        const resOrganization=await fetch ('http://localhost:3000/organization')
        const dataOrganization=await resOrganization.json()
        this.loadedOrganizationInformation.push(dataOrganization[0]['organizationInformation'])
        console.log(dataOrganization)
        for (let site in dataOrganization[0]['sites']) {
            this.loadedSiteInformation.push(dataOrganization[0]['sites'][site]['siteInformation'])
        }
        console.log(this.loadedSiteInformation)
        // this.loading=false
    },
    async addOrganizationInformation(organizationName, country, city, zipcode, street) {
        const data = {
            organizationInformation: {
                organizationName: organizationName,
                country: country, 
                city: city,
                zipcode: zipcode,
                street: street
            },
            sites: []
        }
        console.log(data)
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
        this.fetchGeneralInfos()
    },
    async editOrganizationInformation(organizationName, country, city, zipcode, street) {
        const data = {
            organizationInformation: {
                organizationName: organizationName,
                country: country, 
                city: city,
                zipcode: zipcode,
                street: street
            },
            sites: []
        }

        console.log(data)
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
        this.fetchGeneralInfos()
    },

    async addSiteInformation(country, city, street, streetNumber, lat, lng, zipcode, siteName) {
        const data =  {
            siteInformation: {
                siteName: siteName,
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
        this.fetchGeneralInfos()
    },
  }  
})
