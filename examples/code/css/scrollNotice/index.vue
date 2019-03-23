<template lang="pug">
  .snippet-wrap
    .top-title
      h2 滚动提示
    .row
      ul.list
        li.item Ada Catlace
        li.item Alan Purring
        li.item Schrödingcat
        li.item Tim Purrners-Lee
        li.item WebKitty
        li.item Json
        li.item Void
        li.item Neko
        li.item NaN
        li.item Cat5
        li.item Vector
</template>

<script>
export default {
  name: 'scrollNotice'
}
</script>

<style scoped>
.list {
  overflow: auto;
  width: 10em;
  height: 8em;
  padding: .3em .5em;
  border: 1px solid silver;
  background: linear-gradient(white 30%, transparent),
    radial-gradient(at 50% 0, rgba(0, 0, 0, .2),
    transparent 70%);
  background-repeat: no-repeat;
  background-size: 100% 50px, 100% 15px;
  background-attachment: local, scroll;
}
</style>
