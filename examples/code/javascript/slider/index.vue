<template lang="pug">
  .snippet-wrap
    .top-title
      h2 幻灯片
    div
      Slider1
      Slider2
      Slider4
      Slider5
      Slider3
</template>

<script>
import Slider1 from './slider1'
import Slider2 from './slider2'
import Slider3 from './slider3'
import Slider4 from './slider4'
import Slider5 from './slider5'
export default {
  name: 'slider',
  components: {
    Slider1,
    Slider2,
    Slider3,
    Slider4,
    Slider5
  }
}
</script>
