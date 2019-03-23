<template lang="pug">
  .snippet-wrap
    .top-title
      h2 字体排印
    .row
      .font.font1
        dl
          dt Name:
          dd Lea Verou
          dt Email:
          dd lea@verou.me
          dd lea@verou.me
          dt Location:
          dd Earth
      .font.font2
        pre
          dl
            dt Name:
            dd Lea Verou
            dt Email:
            dd lea@verou.me
            dd lea@verou.me
            dt Location:
            dd Earth
    .row
      .font.font3
        | 当我们在浅色背景上使用深色文字时（比如眼前的这个例子），在底部 加上浅色投影通常效果最佳。
      .font.font4
        | 当我们在浅色背景上使用深色文字时（比如眼前的这个例子），在底部 加上浅色投影通常效果最佳。
    .row
      .font.font5
        a(href='') blur
      .font.font6
        a(href='') Glow
      .font.font7
        a(href='') Glow
    .row
      .font.font8
        | css空心字
      .font.font9
        | CSS3D
      .font.font10
        | RETRO
</template>

<script>
export default {
  name: 'font'
}
</script>

<style scoped>
 .font {
    width: 300px;
    height: 160px;
    padding: 20px;
    line-height: 30px;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  dt,
  dd {
    display: inline;
  }

  dd {
    margin: 0;
    font-weight: bold;
  }

  dd+dt::before {
    content: '\A';
    white-space: pre;
  }

  dd+dd::before {
    content: ', ';
    margin-left: -.25em;
    font-weight: normal;
  }

  .font2 pre {
    padding: .5em;
    line-height: 1.5;
    background: hsl(20, 50%, 95%);
    background-image: linear-gradient(rgba(120, 0, 0, .1) 50%, transparent 0);
    background-size: auto 3em;
    background-origin: content-box;
    font-family: Consolas, Monaco, monospace;
  }

  .font2 code {
    font: inherit
  }

  pre,
  code {
    font-family: monospace;
  }

  pre {
    display: block;
    margin: 1em 0;
    white-space: pre;
    tab-size: 2;
  }

  .font3 {
    background: hsl(210, 13%, 60%);
    color: hsl(210, 13%, 30%);
    text-shadow: 0 1px 1px hsla(0, 0%, 100%, .8);
    /*text-shadow: 0 .03em .03em hsla(0, 0%, 100%, .8);*/
  }

  .font4 {
    background: hsl(210, 13%, 40%);
    color: hsl(210, 13%, 75%);
    text-shadow: 0 -1px 1px black;
  }

  .font5 a {
    display: inline-block;
    padding: 50px 130px;
    font-size: 30px;
    background: #203;
    text-align: center;
    color: white;
    text-decoration: none;
    transition: 1s;
  }

  .font5 a:hover {
    -webkit-filter: blur(.1em);
    filter: blur(.1em);
  }

  .font6 a {
    display: inline-block;
    padding: 50px 100px;
    font-size: 50px;
    background: #203;
    color: white;
    text-align: center;
    text-decoration: none;
    transition: 1s;
  }

  .font6 a:hover {
    text-shadow: 0 0 .1em, 0 0 .3em;
  }

  .font7 a {
    display: inline-block;
    padding: 50px 100px;
    font-size: 50px;
    color: white;
    background: #203;
    text-decoration: none;
    text-align: center;
    transition: 1s;
  }

  .font7 a:hover {
    color: transparent;
    text-shadow: 0 0 .1em white, 0 0 .3em white;
  }

  .font8 {
    font-size: 50px;
    line-height: 200px;
    background: #8bc34a;
    color: white;
    text-align: center;
    text-shadow: 3px 3px black, -3px -3px black,
      3px -3px black, -3px 3px black;
  }

  .font9 {
    font-size: 50px;
    line-height: 200px;
    text-align: center;
    background: #58a;
    color: white;
    text-shadow: 0 1px hsl(0, 0%, 85%),
      0 2px hsl(0, 0%, 80%),
      0 3px hsl(0, 0%, 75%),
      0 4px hsl(0, 0%, 70%),
      0 5px hsl(0, 0%, 65%),
      0 5px 10px black;
  }

  .font10 {
    font-size: 50px;
    line-height: 200px;
    text-align: center;
    color: rgb(226, 212, 212);
    background: #58a;
    text-shadow: 1px 1px black, 2px 2px black,
      3px 3px black, 4px 4px black,
      5px 5px black, 6px 6px black,
      7px 7px black, 8px 8px black;
  }
</style>
