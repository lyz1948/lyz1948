<template lang="pug">
  .snippet-wrap
    .top-title
      h2 元素居中
    .content
      p Some text [...]
      figure
        img(src='http://cdn.ykpine.com/images/orange.jpeg')
        figcaption
          | The great Sir Adam Catlace was named after Countess Ada Lovelace, the first programmer.
      p More text [...].
    .footer
      p
        | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt tenetur repudiandae sit facilis a aut ad amet est nostrum maiores rem nulla cupiditate, praesentium laborum voluptatum, ipsa. Tempora, corporis, dolorem?
      p
        | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt tenetur repudiandae sit facilis a aut ad amet est nostrum maiores rem nulla cupiditate, praesentium laborum voluptatum, ipsa. Tempora, corporis, dolorem?
      p
        | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt tenetur repudiandae sit facilis a aut ad amet est nostrum maiores rem nulla cupiditate, praesentium laborum voluptatum, ipsa. Tempora, corporis, dolorem?
      p
        | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt tenetur repudiandae sit facilis a aut ad amet est nostrum maiores rem nulla cupiditate, praesentium laborum voluptatum, ipsa. Tempora, corporis, dolorem?
</template>

<script>
export default {
  name: 'center'
}
</script>

<style scoped>
figure {
  max-width: 500px;
  max-width: min-content;
  margin: auto;
}

figure > img {
  max-width: inherit;
  width: 200px;
}
.footer {
  padding: 1em;
  padding: 1em calc(50% - 300px);
  background: #1F1E04;
  color: #fff;
}
</style>
