module.exports = {
  title: "lyz",
  description: 'lyz的学习记录',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  base: '/lyz1948/',
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      { text: 'Code', link: '/' },
      { text: 'Note', link: '/note/trouble/' },
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
        '/note/',
        '/note/centos',
        '/note/deploy',
        '/note/editor',
        '/note/git',
        '/note/gitbook',
        '/note/interview',
        '/note/mongodb',
        '/note/nginx',
        '/note/nvm',
        '/note/pm2',
        '/note/ssh',
        '/note/rnapp',
      ],
      '/math/': [
        '/math/',
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
            '/code/algorithm/dictionary',
            '/code/algorithm/divideBy2',
            '/code/algorithm/doublyLinkedList',
            '/code/algorithm/graphic',
            '/code/algorithm/hashTable',
            '/code/algorithm/hashTableLinkedList',
            '/code/algorithm/linkedList',
            '/code/algorithm/loopLinkedList',
            '/code/algorithm/priorityQueue',
            '/code/algorithm/queue',
            '/code/algorithm/stack',
            '/code/algorithm/set',
            '/code/algorithm/sort',
            '/code/algorithm/tree'
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