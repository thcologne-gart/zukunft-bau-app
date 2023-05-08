<template>
    <div class="building">
        <h3>{{ building.buildingname }}</h3>
        <div class="icons">
            <v-icon icon="mdi-delete"></v-icon>
            <v-icon icon="mdi-heart"></v-icon>
        </div>
    </div>
</template>
<script>
export default{
    props:['building']

}

</script>