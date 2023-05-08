<template>
    <v-form fast-fail @submit.prevent>
        <v-text-field v-model="companyName" label="Name des Unternehmens">
        </v-text-field>
        <v-text-field v-model="street" label="Straße und Hausnummer">
        </v-text-field>
        <v-text-field v-model="zipcode" label="Postleitzahl">
        </v-text-field>
        <v-text-field v-model="city" label="Stadt">
        </v-text-field>
        <v-text-field v-model="country" label="Land">
        </v-text-field>
        <v-text-field v-model="sites" label="Standorte z.B. Köln, Hamburg, München">
        </v-text-field>
    </v-form>   
    <v-btn type="submit" block class="mt-2" @click="sm_companyinformation">Submit</v-btn>
    
  </template>


<script>
import { computed, ref } from 'vue'


export default{
  setup() {
    const count=ref(0)
    const companyName=ref('')
    const city=ref('köln')
    const street=ref('')
    const zipcode=ref('')
    const country=ref('')
    const sites=ref(['Köln','Hamburg'])
    let result={}
    const number_sites = computed(() => {return sites.value.length})
   
    const sm_companyinformation = () => {
        result=JSON.stringify({"companyName":companyName.value,"city":city.value, "street":street.value, "zipcode":zipcode.value,
                            "country":country.value, "sites":sites.value, "number_sites":number_sites.value})
        console.log(result)};
   
    return {
      count, companyName, city, street, zipcode, country, number_sites, sites, result, sm_companyinformation,
    }
  },
}
</script>

  