module.exports = {
  title: "lyz",
  description: 'lyz的学习记录',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  base: '/lyz1948/',
  themeConfig: {
    nav: [
      { text: 'Code', link: '/' },
      { text: 'Note', link: '/note/' },
      { text: 'Math', link: '/math/' },
      { text: 'Get it', 
        items: [
          { text: 'Finance', link: '/getit/finance/' },
          { text: 'Economics', link: '/getit/economics/' },
          { text: 'Literature', link: '/getit/literature/' }
        ]
      }
    ],
    sidebar: {
      '/note/': [
        '/note/01',
      ],
      '/getit/': [
        '/getit/',
        '/getit/finance/',
        '/getit/economics/',
        '/getit/literature/',
      ],
      '/': [
        '',
        '/code/designPatterns/',
        '/code/koa/',
        '/code/ramda/',
        '/code/tools/',
        '/code/tools/30sec',
        '/code/html/',
        {
          title: 'JavaScript',
          collapsable: false,
          children: [
            '/code/js/',
            '/code/js/string',
            '/code/js/types',
            '/code/js/variable',
            '/code/js/scope',
            '/code/js/regexp',
            '/code/js/object',
            '/code/js/array',
            '/code/js/prototype',
            '/code/js/function',
            '/code/js/math',
            '/code/js/this',
            '/code/js/es6',
            '/code/js/class',
          ]
        },
        {
          title: 'TypeScript',
          children: [
            '/code/ts/string'
          ]
        },
        {
          title: 'Algorithm',
          children: [
            '/code/algorithm/',
            '/code/algorithm/queue',
            '/code/algorithm/Stack',
            '/code/algorithm/LinkedList',
            '/code/algorithm/DoublyLinkedList',
            '/code/algorithm/Set',
            '/code/algorithm/Dictionary',
            '/code/algorithm/Tree',
            '/code/algorithm/Graphic',
            '/code/algorithm/Sort',
          ]
        },
        {
          title: 'Docker',
          children: [
            '/code/docker/',
            '/code/docker/docker',
            '/code/docker/docker-registry',
            '/code/docker/docker-network',
            '/code/docker/docker-machine',
            '/code/docker/docker-compose',
            '/code/docker/dockerfile'
          ]
        }
      ]
    }
  }
}