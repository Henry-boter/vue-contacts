<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
import MusicList from '@/components/music-list/MusicList'
import {mapGetters} from 'vuex'
import {getSingerDetail} from '@/pages/contacts/contacts'
import {ERR_OK} from '@/common/js/config'
import {createSong} from '@/common/js/song'
export default {
  components: {
    MusicList
  },
  data () {
    return {
      songs: []
    }
  },
  filters: {},
  created () {
    this._getDetail()
  },
  mounted () {

  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    _getDetail () {
      if (!this.singer.id) {
        this.$router.push('/')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        console.log(res)
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style scoped="scoped" lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
