<template>
    <v-container :style="{ width: '80%' }">
        <v-table
        style="background-color: whitesmoke;">
            <thead>
                <tr>
                <th class="text-left">
                    Name
                </th>
                <th class="text-left">
                    Wert
                </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, key, index) in generalStore.loadedOrganizationInformation[0]" :key="key">
                    <td class="text-left">{{ orgaPropertyNames[index] }}</td>
                    <td class="text-left">{{ value }}</td>
                </tr>
            </tbody>
        </v-table>
        <EditOrganizationInformation :orgaInformation="generalStore.loadedOrganizationInformation[0]"/>
    </v-container>
</template>

<script>
import EditOrganizationInformation from '@/components/general/EditOrganizationInformation.vue'

import { useGeneralStore } from "@/store/general"

export default {
    data() {
        return {
            orgaPropertyNames: [
                'Name Unternehmen',
                'Sitz des Unternehmens (Land)',
                'Sitz des Unternehmens (Stadt)',
                'Sitz des Unternehmens (Postleitzahl)',
                'Straße und Hausnummer'
               /*
               'Company name',
               'Head office (Country)',
               'Head office (City)',
               'Head office (Postal code)',
               'Street'
               */
            ]
        }
    },
    components: { EditOrganizationInformation },
    computed: {
        generalStore () {
            return useGeneralStore()
        }
    }
}

</script>