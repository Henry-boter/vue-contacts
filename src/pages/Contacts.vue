<template>
  <div class="contacts">
    <list-view ref="list"></list-view>
  </div>
</template>

<script>
import ListView from '@/base/listview/listview'

export default {
  name: 'Contacts',
  components: {
    ListView
  },
  data () {
    return {
      msg: 'contacts'
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .contacts
    position: fixed
    top: 44px
    bottom: 0
    width: 100%
</style>
