<template>
  <div class="contacts">
    <list-view ref="list" :data="singers" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import ListView from '@/base/listview/listview'
import {singer} from '../../data/singer'
import {getSingerData} from './contacts'
import {ERR_OK} from '@/common/js/config'
import {mapMutations} from 'vuex'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  name: 'Contacts',
  components: {
    ListView
  },
  data () {
    return {
      singer: [], //  静态的数据
      singers: [] // 动态的数据
    }
  },
  created () {
    // this._getSingerList()静态数据
    this._getSinger()
  },
  methods: {
    //  数据请求调试（动态）
    _getSinger () {
      getSingerData().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizesinger(res.data.list)
        }
      })
    },
    selectSinger (singer) {
      this.$router.push({
        path: `/${singer.id}`
      })
      this.setSinger(singer)
    },
    //  静态数据
    _getSingerList () {
      this.singers = this._normalizesinger(singer.data.list)
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
          id: item.Fsinger_mid,
          name: item.Fsinger_name,
          avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
        })
      })
      //  为了得到有序列表，我们需要处理map
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
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
