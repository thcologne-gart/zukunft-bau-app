<template>
    <h1>Digital Twins - Liegenschaft {{ site }}</h1>
    <div v-for="building in buildings_hamburg" :key="building.id" >
       <router-link :to="{name:'DigitalTwins_Site_Building', params:{buildingid:building.name}}">
        <h2>{{ building.name }}</h2>
       </router-link>  
    </div>
</template> 

<script>
import { useRoute } from 'vue-router'
export default{
    setup(){
        const route = useRoute()
        const site= route.params.siteid
        // in deinem store aktuelle site suchen und gebäude etc daraus entnehmen:
        const buildings_hamburg=[ {name:"Hotel",id:"1"},{name:"Schule",id:"2"} ]
        const buildings_köln=[ {name:"Halle West",id:"1"},{name:"IWZ",id:"2"} ]
    return{buildings_hamburg, buildings_köln, site}}
}
</script>