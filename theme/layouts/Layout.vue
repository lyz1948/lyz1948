<template>
  <div class="theme-layout">
    <VHeader />
    <div class="page">
      <div class="page-wrapper">
        <Content />
      </div>
    </div>
  </div>
</template>

<script>
import VHeader from '../../components/Header'

export default {
  components: { VHeader },
}
</script>

<style lang="stylus" scoped>
@import '../../styles/index.styl'
.page
  position: absolute
  top: 121px
  bottom: 0
  width: 100%
  overflow: hidden
  background: #f2f3f4
  padding: 0
  .page-wrapper
    position: absolute
    left: 0
    right: 0
    bottom: 0
    top: 0
    overflow-x: hidden
    overflow-y: auto
    &::-webkit-scrollbar
      display: none
    // & > .content
    //   margin: 0 auto
    //   padding: 20px
</style>
