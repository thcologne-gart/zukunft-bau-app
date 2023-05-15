<template>
    <h1>Digital Twins - General</h1>
    <p> Wähle einen Standort aus, den du sehen möchtest</p>
    <div v-for="site in sites" :key="site.id" >
       <router-link :to="{name:'DigitalTwins_Site', params:{siteid:site.name}}">
        <h2>{{ site.name }}</h2>
       </router-link>  
    </div>
</template> 

<script>
export default{
    setup(){
        const sites=[ {name:"Köln",id:"1"},{name:"Hamburg",id:"2"} ]
    return{sites}}
}

</script>