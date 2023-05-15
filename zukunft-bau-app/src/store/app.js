// Utilities
import { defineStore } from 'pinia'

export const useBuildingStore = defineStore('building', {
  state: () => ({
    buildings: [],
    loading:false
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
    async getBuildings (){
      this.loading=true
      const res=await fetch ('http://localhost:3000/buildings')
      const data=await res.json()
      this.buildings=data
      this.loading=false

    },

    addBuilding(building) {
      this.buildings.push(building)
    },
    deleteBuilding(id) {
      this.buildings=this.buildings.filter(b => {return b.id !== id})
    },
    toggleFav(id) {
      const building = this.buildings.find(b => b.id === id)
      building.isfav = !building.isfav
    }
  }
})
