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

    async addBuilding(building) {
      console.log(JSON.stringify(building))
      this.buildings.push(building)
      
      const res=await fetch ('http://localhost:3000/buildings/',{
        method: 'POST', 
        body: JSON.stringify(building),
        //header:{'Content-Type':'application/json'}
      })
      console.log(res.body, this.buildings)
      if (res.error){
        console.log(res.error)
      }
    },

    async deleteBuilding(id) {
      this.buildings=this.buildings.filter(b => {return b.id !== id})

      const res=await fetch ('http://localhost:3000/buildings/'+ id,{
        method: 'DELETE'
      })
      console.log(res.body)
      if (res.error){
        console.log(res.error)
      }

    },
    async toggleFav(id) {
      const building = this.buildings.find(b => b.id === id)
      building.isfav = !building.isfav

      const res=await fetch ('http://localhost:3000/buildings/'+ id,{
        method: 'PATCH',
        body: JSON.stringify({isfav: building.isfav})
      })
      console.log(res.body)
      if (res.error){
        console.log(res.error)
      }


    }
  }
})
