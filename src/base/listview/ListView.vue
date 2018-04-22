<template>
 <scroll
   :listen-scroll="listenScroll"
   @scroll="scroll"
   class="listview"
   :data="data"
   ref="listview">
   <ul>
     <li v-for="(group, index) in data" :key="index" class="list-group" ref="listGroup">
       <h2 class="list-group-title">{{group.title}}</h2>
       <ul>
         <li v-for="(item, Findex) in group.items" :key="Findex" class="list-group-item">
           <img class="avatar" v-lazy="item.avatar" alt="">
           <span class="name">{{item.name}}</span>
         </li>
       </ul>
     </li>
   </ul>
   <div class="list-shortcut"
        @touchstart="onShortcutTouchStart"
        @touchmove.stop.prevent="onShortcutTouchMove">
     <ul>
       <li v-for="(item, index) in shortcutList"
           :key="index"
           :data-index="index"
           class="item">{{item}}</li>
       <li class="item current">A</li>
     </ul>
   </div>
   <div class="list-fixed" ref="fixed">
     <div class="fixed-title">A</div>
   </div>
 </scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll'

const ANCHOR_HEIGHT = 18

export default {
  props: {
    data: {
      type: Array
    }
  },
  components: {
    Scroll
  },
  data () {
    return {
      msg: 'ListView',
      scrollY: -1,
      currentIndex: 0
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    }
  },
  created () {
    this.touch = {}
    this.listenScroll = true
  },
  computed: {
    shortcutList () {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  methods: {
    //  获取dom自定义属性
    getData (el, name, val) {
      const prefix = 'data-'
      if (val) {
        return el.setAttribute(prefix + name, val)
      }
      return el.getAttribute(prefix + name)
    },
    onShortcutTouchStart (e) {
      let anchorIndex = this.getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      // 获取touchStart的位置
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    //  触摸右边字母
    onShortcutTouchMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    _scrollTo (index) {
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom 30px
      .list-group-title
        height 30px
        height 30px
        line-height 30px
        padding-left 20px
        font-size $font-size-small
        color $color-text-l
        background $color-highlight-background
      .list-group-item
        display flex
        align-items center
        padding 20px 0 0 30px
        .avatar
          width 50px
          height 50px
          border-radius 50%
        .name
          margin-left 20px
          color $color-text-l
    .list-shortcut
      position absolute
      z-index 30
      right 0
      top: 50%
      transform translateY(-50%)
      width 20px
      padding 20px 0
      border-radius 10px
      text-align center
      background $color-background-d
      font-family Helvetica
      .item
        padding 3px
        line-height 1
        color $color-text-l
        font-size $font-size-small
        &.current
          color $color-theme
    .list-fixed
      position absolute
      top:0
      left 0
      width 100%
      .fixed-title
        height 30px
        line-height 30px
        padding-left 20px
        font-size $font-size-small
        color $color-text-l
        background $color-highlight-background
</style>
