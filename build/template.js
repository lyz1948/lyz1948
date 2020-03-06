module.exports = {
  codeTemplate: data => {
    return `
## ${data.title}
${data.category} ${data.tags}

<CodeDemo :collapse="true">
  <template slot="code-template">
    <<< @/docs/.vuepress/examples/${data.path}.vue?template
  </template>
  <template slot="code-script">
    <<< @/docs/.vuepress/examples/${data.path}.vue?script
  </template>
  <template slot="code-style">
    <<< @/docs/.vuepress/examples/${data.path}.vue?style
  </template>
  <${data.path} slot="demo"/>
</CodeDemo>

${data.description}
`
  },
}
