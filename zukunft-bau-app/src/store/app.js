// Utilities
import { defineStore } from 'pinia'

export const useBuildingStore = defineStore('building', {
  state: () => ({
    buildings: [
      {id:1, buildingname:"Halle West",year:"1983", isfav:true},
      {id:2, buildingname:"IWZ",year:"1970", isfav:false}
    ],
  }),
})
