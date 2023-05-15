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
        const resOrganization=await fetch ('http://localhost:3000/organization')
        const dataOrganization=await resOrganization.json()
        console.log(dataOrganization[0]['organizationInformation'])
        this.loadedOrganizationInformation.push(dataOrganization[0]['organizationInformation'])
        console.log(this.loadedOrganizationInformation)

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
            }
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
            }
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
    }
  }  
})
