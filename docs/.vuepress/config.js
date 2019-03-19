module.exports = {
  title: "lyz",
  description: 'lyz的学习记录',
  base: '/lyz1948/',
  themeConfig: {
    nav: [
      { text: 'Code', link: '/' },
      { text: 'Note', link: '/note/' },
      { text: 'Finance', link: '/finance/' },
      { text: 'Economics', link: '/economics/' },
      { text: 'Literature', link: '/literature/' }
    ],
    sidebar: {
      '/': [
        {
          title: 'JavaScript',
          children: [
            '/code/js/string',
            // '/code/js/types',
            // '/code/js/variable',
            // '/code/js/scope',
            // '/code/js/regexp',
            // '/code/js/object',
            // '/code/js/array',
            // '/code/js/prototype',
            // '/code/js/function',
            // '/code/js/this',
            // '/code/js/class',
          ]
        },
        {
          title: 'TypeScript',
          collapsable: false,
          children: [
            '/code/ts/string'
          ]
        }
      ],
      '/note/': [
        '01',
      ],
      '/finance/': [
        '01',
      ],
      '/economics/': [
        '01',
      ],
      '/literature/': [
        '01',
      ]
    }
  }
}