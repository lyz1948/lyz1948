
## A*算法

algorithm Algorithm

A*算法，从某点位置出发，以最优路线寻找到目标位置，实现思路是，获取当前位置的上下左右周围的元素位置，根据offset的位置来确定下一个最近的点，循环操作来达到目标点。

<CodeDemo :collapse="true">
  <template slot="code-template">
    <<< @/docs/.vuepress/examples/AlgorithmAStar.vue?template
  </template>
  <template slot="code-script">
    <<< @/docs/.vuepress/examples/AlgorithmAStar.vue?script
  </template>
  <template slot="code-style">
    <<< @/docs/.vuepress/examples/AlgorithmAStar.vue?style
  </template>
  <AlgorithmAStar slot="demo"/>
</CodeDemo>
