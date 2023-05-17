<template>
  <div v-for="site in generalStore.loadedSiteInformation" :key="site">
      <SiteBuildings :site="site" />
  </div>
</template>

<script>
import SiteBuildings from '@/components/general/SiteBuildings.vue'
import { useGeneralStore } from "@/store/general"

export default {
  data () {
    return {
      form: {
        country: '',
        numberSite: '',
        city: '',
        zipcode: null,
        numberBuildings: null
      },
      countries: ['Deutschland', 'Österreich', 'Schweiz', 'Frankreich', 'Italien', 'England']
    }
  },
  components: { SiteBuildings },
  // props: {
  // site: Number
  // },
  // mounted () {
  // this.showForm()
  // },
  computed: {
    generalStore () {
      return useGeneralStore()
    },
    organization () {
      // console.log(this.$store.getters.loadedOrganizationInformation)
      return this.$store.getters.loadedOrganizationInformation
    },
    buildings () {
      // console.log(this.building)
      console.log(this.$store.getters.loadedBuildingInformation)
      return this.$store.getters.loadedBuildingInformation
    },
    sites () {
      // console.log(this.$store.getters.loadedSiteInformation)
      return this.$store.getters.loadedSiteInformation
    },
    numberOfSites () {
      // let loadInfos = 0
      const loadInfos = this.$store.getters.loadedSiteInformation
      let numberS
      if (loadInfos === null) {
        numberS = 1
      } else {
        numberS = loadInfos.length + 1
      }
      console.log(numberS)
      let numberSites
      for (const item in loadInfos) {
        if (loadInfos[item].idShort === 'NumberOfSites') {
          numberSites = loadInfos[item].value
          // console.log(numberSites)
        }
      }
      const numberOfSites = [0]
      let i
      for (i = 1; i < numberSites; i++) {
        numberOfSites.push(i)
      }
      // console.log(numberOfSites)
      return numberS
    }
  },
  methods: {
    /*
    showForm () {
      console.log(this.site)
      console.log(this.siteAlreadyFilled.length)
      const card = document.getElementById('cardSiteForm')
      // const alreadyFilled = this.siteAlreadyFilled[0].value
      console.log('jiiii')
      if (this.site <= this.siteAlreadyFilled.length) {
        console.log('nicht null')
        card.classList.add('d-none')
      } else {
        console.log('hääääää')
        // card.classList.add('d-none')
      }
    },
    */
    onCreateSiteAas (event) {
      // console.log(this.site)
      // const card = document.getElementById('cardOrganizationForm')
      // card.classList.add('d-none')
      console.log(this.numberOfSites)
      const thisSiteNumber = this.numberOfSites
      // event.preventDefault()
      const newAas = {}
      const assetKeys = {
        type: 'Asset',
        local: true,
        value: `ems-site-asset/${this.form.city}`,
        index: 0,
        idType: 'IRI'
      }
      newAas.asset = {
        keys: [assetKeys]
      }

      const submodelKeys = {
        type: 'Submodel',
        local: true,
        value: `submodels/site-information/${this.form.city}`,
        index: 0,
        idType: 'IRI'
      }
      newAas.submodels = {
        keys: [submodelKeys]
      }

      newAas.identification = {
        idType: 'IRI',
        id: `site-aas/${this.form.city}`
      }
      newAas.idShort = `SiteAas/${this.form.city}`
      newAas.category = 'CONSTANT'
      newAas.modelType = {
        name: 'AssetAdministrationShell'
      }
      // Submodel Creation
      const newSubmodel = {}
      const submodelKeySemanticId = {
        type: 'GlobalReference',
        local: true,
        value: 'site/information-semantics',
        index: 0,
        idType: 'IRI'
      }
      newSubmodel.semanticId = {
        keys: [submodelKeySemanticId]
      }
      newSubmodel.qualifiers = []

      newSubmodel.identification = {
        idType: 'IRI',
        id: `submodels/site-information/${this.form.city}`
      }
      newSubmodel.idShort = 'Site Information'
      newSubmodel.category = 'CONSTANT'
      newSubmodel.modelType = {
        name: 'Submodel'
      }

      // Inhalte aus der Form jetzt zu Submodel hinzufügen
      newSubmodel.submodelElements = [
        {
          value: this.form.country,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/country',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'Country',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'STRING'
            }
          },
          kind: 'Instance'
        },
        {
          value: this.form.city,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/city',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'City',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'STRING'
            }
          },
          kind: 'Instance'
        },
        {
          value: this.form.zipcode,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/zipcode',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'ZipCode',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'INTEGER'
            }
          },
          kind: 'Instance'
        },
        // {
        //   value: this.form.numberBuildings,
        //   semanticId: {
        //     keys: [{
        //       type: 'GlobalReference',
        //       local: true,
        //       value: 'ems/site/context-semantics/numberBuildings',
        //       index: 0,
        //       idType: 'IRI'
        //     }]
        //   },
        //   constraints: [],
        //   idShort: 'NumberOfBuildings',
        //   category: 'PARAMETER',
        //   modelType: {
        //     name: 'Property'
        //   },
        //   valuetype: {
        //     dataObjectType: {
        //       name: 'INTEGER'
        //     }
        //   },
        //   kind: 'Instance'
        // },
        {
          value: thisSiteNumber,
          semanticId: {
            keys: [{
              type: 'GlobalReference',
              local: true,
              value: 'ems/site/context-semantics/numberSite',
              index: 0,
              idType: 'IRI'
            }]
          },
          constraints: [],
          idShort: 'NumberOfSite',
          category: 'CONSTANT',
          modelType: {
            name: 'Property'
          },
          valuetype: {
            dataObjectType: {
              name: 'INTEGER'
            }
          },
          kind: 'Instance'
        }
      ]

      this.$store.dispatch('createAas', newAas)
      this.$store.dispatch('createSubmodelContext', newSubmodel)

      const numberOfSitesForOrgaSubmodel = {
        value: thisSiteNumber,
        semanticId: {
          keys: [{
            type: 'GlobalReference',
            local: true,
            value: 'ems/context-semantics/numberOfSites',
            index: 0,
            idType: 'IRI'
          }]
        },
        constraints: [],
        idShort: 'NumberOfSites',
        category: 'PARAMETER',
        modelType: {
          name: 'Property'
        },
        valuetype: {
          dataObjectType: {
            name: 'INTEGER'
          }
        },
        kind: 'Instance'
      }

      console.log(numberOfSitesForOrgaSubmodel)

      this.$store.dispatch('updateNumberOfSites', {
        id: this.organization[0].key,
        numberOfSites: thisSiteNumber
      })

      this.$emit('new-aas', newAas)
      this.form.country = ''
      this.form.city = ''
      this.form.zipcode = ''
      this.form.numberBuildings = ''
    },
    onReset (event) {
      // event.preventDefault()
      // Reset our form values

      this.form.country = ''
      this.form.city = ''
      this.form.zipcode = ''
      this.form.numberBuildings = ''
    }
  }
}
</script>
<style scoped>
.card {
    margin-inline: 20%;
    margin-bottom: 30px;
    margin-top: 40px;
}
.form-group {
    text-align: left;
    margin-bottom: 20px;
    margin-right: 10%;
    margin-left: 10%;
}
.btn {
    margin-left: 20px;
    margin-right: 20px;
}
#header {
    color: #0a322b;
    font-size: 1em
}
#body {
    font-size: 18px;
    padding-top: 5px;
    padding-bottom: 5px
}
</style>
