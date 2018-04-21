<template>
  <div class="contacts">
    <list-view ref="list"></list-view>
  </div>
</template>

<script>
import ListView from '@/base/listview/listview'
import {singer} from '../data/singer'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  name: 'Contacts',
  components: {
    ListView
  },
  data () {
    return {
      singer: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    _getSingerList () {
      this.singers = singer.data.list
      console.log(this.singers)
    },
    _normalizesinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
            avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
          })
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push({
        })
      })
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
