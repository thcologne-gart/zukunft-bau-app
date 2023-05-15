<template>
    <v-form fast-fail @submit.prevent>
        <v-text-field v-model="newBuilding" label="Bezeichnung des Gebäudes">
        </v-text-field>
        <!-- <v-text-field v-model="street" label="Straße und Hausnummer">
        </v-text-field>
        <v-text-field v-model="zipcode" label="Postleitzahl">
        </v-text-field>
        <v-text-field v-model="city" label="Stadt">
        </v-text-field>
        <v-text-field v-model="country" label="Land">
        </v-text-field> -->
        <v-text-field v-model="baujahr" label="Baujahr">
        </v-text-field>
    </v-form>   
    <v-btn type="submit" color='primary-darken-1' block class="mt-2" @click="handleSubmit">Submit</v-btn>
    
  </template>

<script>
import { useBuildingStore } from '@/store/app';
import {ref} from 'vue';

export default{
    setup(){
        const buildingStore=useBuildingStore()
        const newBuilding=ref('')
        const baujahr=ref('')
        const handleSubmit=() => {
            console.log(newBuilding.value)
            if (newBuilding.value.length>0){
                console.log(newBuilding.value, baujahr.value)
                buildingStore.addBuilding({
                    id: Math.floor(Math.random()*10000),
                    buildingname: newBuilding.value,
                    year: baujahr.value,
                    isfav: false
                })
                newBuilding.value=''
                baujahr.value=''
                
            }
        }
        return{ handleSubmit,newBuilding,baujahr }

    }
}
</script>