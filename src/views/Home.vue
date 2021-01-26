<template>
  <div id="home">
    <cube-page type="scroll-nav-side" title="ScrollNav">
    </cube-page>

    
 
    
  </div>
</template>

<script>
import CubePage from "../components/CubePage";

export default {
  components: {
    CubePage,


  },
  computed: {
    lang() {
      return this.$store.state.language;
    },
    
  },
  mounted() {
   
  },
  data() {
    return {
     
    };
  },
  methods: {
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  
</style>
