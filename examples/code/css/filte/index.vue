<template lang="pug">
  .snippet-wrap
    .top-title
      h2 filter
    .row
      .pic
        img(src='http://cdn.ykpine.com/images/orange.jpeg', alt='')
      .pic.pic1
        img(src='http://cdn.ykpine.com/images/orange.jpeg', alt='')
      .pic.pic2
        img(src='http://cdn.ykpine.com/images/orange.jpeg', alt='')
      .pic.pic3
        img(src='http://cdn.ykpine.com/images/orange.jpeg', alt='')
      a.pic.pic4(href='#')
        img(src='http://cdn.ykpine.com/images/orange.jpeg', alt='')

    .row.tinted-image
      .parent
        main
          blockquote
            | "The only way to get rid of a temptation[...]"
            footer
              cite
                | Oscar Wilde, The Picture of Dorian Gray
</template>

<script>
export default {
  name: 'filte'
}
</script>

<style scoped>
.pic {
    width: 300px;
    height: 200px;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .pic>img {
    width: 100%;
    height: 100%;
  }

  .pic>img:hover,
  .pic>img:focus {
    -webkit-filter: none;
  }

  .pic1>img {
    -webkit-transition: .5s filter;
    transition: .5s filter;
    -webkit-filter: sepia(1) saturate(4) hue-rotate(295deg);
  }

  .pic2>img {
    -webkit-filter: sepia(1) saturate(4) hue-rotate(195deg);
  }

  .pic3>img {
    -webkit-filter: sepia(1) saturate(4) hue-rotate(25deg);
  }

  .pic4 {
    background: hsl(335, 100%, 50%);
  }

  .pic4>img {
    mix-blend-mode: luminosity;
  }

  .tinted-image {
    float: left;
    width: 640px;
    height: 240px;
    background-size: cover;
    background-color: hsl(335, 100%, 50%);
    background-blend-mode: luminosity;
    transition: .5s background-color;
  }

  .tinted-image:hover {
    background-color: transparent;
  }

  /* body, */

  main::before {
    background: url("http://cdn.ykpine.com/images/orange.jpeg") 0 / cover fixed;
  }

  main {
    position: relative;
    margin: 0 auto;
    padding: 1em;
    max-width: 23em;
    background: hsla(0, 0%, 100%, .25) border-box;
    overflow: hidden;
    border-radius: .3em;
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, .3) inset, 0 .5em 1em rgba(0, 0, 0, 0.6);
    text-shadow: 0 1px 1px hsla(0, 0%, 100%, .3);
  }

  main::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: -30px;
    z-index: -1;
    -webkit-filter: blur(20px);
    filter: blur(20px);
  }

  blockquote {
    font-style: italic
  }

  blockquote cite {
    font-style: normal;
  }
</style>
