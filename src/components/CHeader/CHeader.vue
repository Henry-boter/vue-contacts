<template>
  <div class="c-header">
    <h1 class="text">{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Cheader',
  component: {
  },
  data () {
    return {
      msg: 'vue-contacts'
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .c-header
    position: relative
    height: 44px
    text-align: center
    color: $color-text
    font-size: 0
    background-color $color-background
  .text
    display: inline-block
    vertical-align: top
    line-height: 44px
    font-size: $font-size-large
</style>
