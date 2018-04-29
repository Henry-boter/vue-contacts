<template>
  <transition name="slide">
    <!--<div class="contacts-detail">-->
      <!--{{singer}}-->
    <!--</div>-->
    <music-list></music-list>
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
      song: []
    }
  },
  filters: {},
  created () {
    this._getDetail()
  },
  mounted () {

  },
  computed: {
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
