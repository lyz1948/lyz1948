module.exports = {
  vueTemplate: compoenntName => {
  return `<template lang="pug">
  .snippet-wrap
    .top-title
      h2 ${compoenntName} 组件
</template>

<script>
export default {
  name: '${compoenntName}'
}
</script>

<style lang="stylus" scoped>

</style>
`
},
entryTemplate: moduleName => {
  moduleName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
  return `import ${moduleName} from './index.vue'
export default ${moduleName}`
},
routerTemplate: routeName => `export default [
  {
    path: '/${routeName}',
    component: () => import('@/views/${routeName}/index.vue')
  }
]`
}