<template>
  <transition name="slide">
    <div class="contacts-detail">
      contacts-detail
    </div>
  </transition>
</template>
<script>
export default {
  components: {},
  data () {
    return {}
  },
  filters: {},
  mounted () {

  },
  computed: {},
  methods: {}
}
</script>

<style scoped="scoped" lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl"
  .contacts-detail
    position fixed
    z-index 100
    top: 0
    left 0
    right 0
    bottom 0
    background $color-background
  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
