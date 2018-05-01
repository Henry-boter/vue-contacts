<template>
  <div id="app">
    <c-header v-show="isShowHeader"></c-header>
    <router-view></router-view>
  </div>
</template>

<script>
import CHeader from '@/components/CHeader/CHeader.vue'

export default {
  name: 'App',
  components: {
    CHeader
  },
  data () {
    return {
      isShowHeader: true
    }
  },
  watch: {
    '$route': {
      handler: 'head',
      immediate: true
    }
  },
  created () {
    this.head()
  },
  methods: {
    head () {
      if (this.$route.name === 'home') {
        this.isShowHeader = false
      } else {
        this.isShowHeader = true
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/reset.styl"
</style>
