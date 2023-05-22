<template>
    <div>
        <v-container>
            <div>{{ site.siteName }}</div>
        </v-container>
    </div>
</template>

<script>
export default{
    props: {
        site: Object
    }
}
</script>