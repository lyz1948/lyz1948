<template lang="pug">
  .snippet-wrap
    .top-title
      h2 动画

    .row.ball-wrap
      .ball.ball-1
      .ball.ball-2
      .ball.ball-3
      .ball.ball-4
</template>

<script>
export default {
  name: 'animation'
}
</script>

<style scoped>
.ball-wrap {
    position: relative;
    height: 500px;
  }

  .ball {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #00E886;
    position: absolute;
    top: 0;
    /*animation: bounce 3s ease-in; */
    animation: bounce 3s cubic-bezier(.1, .25, 1, .25);
  }

  .ball-1 {
    left: 0;
  }

  .ball-2 {
    left: 100px;
  }

  .ball-3 {
    left: 200px;
  }

  .ball-4 {
    left: 300px;
  }

  @keyframes bounce {
    60%,
    80%,
    to {
      transform: translateY(400px);
      animation-timing-function: ease;
    }

    70% {
      transform: translateY(300px);
    }

    90% {
      transform: translateY(360px);
    }
  }
</style>
