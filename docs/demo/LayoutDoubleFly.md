
## 布局-双飞翼

layout float, margin, padding

双飞翼布局，左中右三列，中间列部分溢出隐藏，左右给padding, 左侧与右侧的元素分别给负值margin

<CodeDemo :collapse="true">
  <template slot="code-template">
    <<< @/docs/.vuepress/examples/LayoutDoubleFly.vue?template
  </template>
  <template slot="code-script">
    <<< @/docs/.vuepress/examples/LayoutDoubleFly.vue?script
  </template>
  <template slot="code-style">
    <<< @/docs/.vuepress/examples/LayoutDoubleFly.vue?style
  </template>
  <LayoutDoubleFly slot="demo"/>
</CodeDemo>
