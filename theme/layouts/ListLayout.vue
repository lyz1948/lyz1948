<template>
  <div class="nav-list wrapper">
    <div class="card card-preview">
      <div class="card-meta flex">
        <div class="card-icon"></div>
        <div class="card-data">
          <h2 class="card-title">Bouncing loader</h2>
          <p class="card-tag">CSS, Animation, Intermediate</p>
        </div>
      </div>
      <div class="card-body">
        <p class="card-desc">Creates a bouncing loader animation.</p>
      </div>
    </div>
    <div class="card card-preview">
      <div class="card-meta flex">
        <div class="card-icon"></div>
        <div class="card-data">
          <h2 class="card-title">Bouncing loader</h2>
          <p class="card-tag">CSS, Animation, Intermediate</p>
        </div>
      </div>
      <div class="card-body">
        <p class="card-desc">Creates a bouncing loader animation.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
.wrapper
  position: absolute
  left: 0
  right: 0
  bottom: 0
  top: 0
  overflow-x: hidden
  overflow-y: auto
  &::-webkit-scrollbar
    display: none

.card-preview
  margin-top: 1.25rem
  overflow: hidden

.card
  position: relative
  margin: 1.75rem .875rem 1rem
  box-shadow: 0 4px 9px $text-color
  border-radius: .25rem
  padding: 1rem
  background: #fff
  cursor: pointer
  .card-meta
    display: flex

  .card-icon
    padding: .63rem
    width: 1.88rem
    height: 1.88rem

  .card-title
    flex: 1
    font-size: $font-h5
    color: $title-color

  .card-tag
    font-size: $font-midume
    opacity: .5

  .card-desc
    font-size: $font-large
    color: $text-color
</style>
