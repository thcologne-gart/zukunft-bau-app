<template>
    <v-card
    id="cardOrganizationForm" class="mx-auto my-6" max-width="75%"
    >
        <v-table class="grey lighten-3">
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
    </v-card>
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