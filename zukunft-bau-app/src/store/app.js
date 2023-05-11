// Utilities
import { defineStore } from 'pinia'

export const useBuildingStore = defineStore('building', {
  state: () => ({
    buildings: [
      {id:1, buildingname:"Halle West",year:"1983", isfav:true},
      {id:2, buildingname:"IWZ",year:"1970", isfav:false}
    ],
  }),
  getters: { 
    favs(){
      return this.buildings.filter(b => b.isfav)
    },
    favCount(){
      return this.buildings.reduce((p,c) => {
        return c.isfav ? p+1:p },0)
      },
    totalCount:(state) => { return state.buildings.length}   
  },
  actions: {
    addBuilding(building) {
      this.buildings.push(building)
    },
    deleteBuilding(id) {
      this.buildings = this.buildings.filter(b => {return b.id !== id})
    },
    toggleFav(id){
      const building = this.buildings.find(b => b.id === id)
      building.isfav = !building.isfav
    }
  }
})
