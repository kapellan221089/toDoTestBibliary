<template>
  <v-app app>
    <BlogList/>
  </v-app>
</template>


<script>
import { mapState, mapMutations } from "vuex";
import BlogList from '../components/BlogList';
  export default {
    data: () => ({

    }),
    computed: mapState(["user"]),
    components: {BlogList}
}
</script>