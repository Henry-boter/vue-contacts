<template>
  <div id="app">
    <c-header></c-header>
    <router-view></router-view>
  </div>
</template>

<script>
import CHeader from '@/components/CHeader/CHeader.vue'

export default {
  name: 'App',
  components: {
    CHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/reset.styl"
</style>
