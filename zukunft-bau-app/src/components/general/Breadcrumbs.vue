<template>
  <v-breadcrumbs :items="breadcrumbs" @item-click="handleBreadcrumbClick"></v-breadcrumbs>

  <!-- Your router-view or other components go here -->
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [],
    };
  },
  watch: {
    $route: 'generateBreadcrumbs',
  },
  created() {
    this.generateBreadcrumbs();
  },
  methods: {
  generateBreadcrumbs() {
    console.log(this.$route.meta.breadcrumb(this.$route))
    this.breadcrumbs = this.$route.meta.breadcrumb(this.$route)
  },
  },
};
</script>
  
  