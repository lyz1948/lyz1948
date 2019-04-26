module.exports = {
  title: "lyz的学习记录",
  description: '记录和整理生活、工作与学习的知识，致力成为一名终身学习者！',
  head: [
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'apple-touch-icon', href: '/img/logo.png' }],
  ],
  base: '/',
  docsDir: 'docs',
  serviceWorker: true,
  themeConfig: {
    sidebarDepth: 2,
    displayAllHeaders: true,
    nav: [
      { text: 'Code', link: '/' },
      { text: 'Note', link: '/note/' },
      {
        text: 'Get it',
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
      '/getit/': [
        '/getit/',
        '/getit/finance/',
        '/getit/economics/',
        '/getit/literature/'
      ],
      '/': [
        '/code/ts/',
        {
          title: 'JavaScript',
          children: [
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
            '/code/js/'
          ]
        },
        {
          title: 'Algorithm',
          children: [
            ['/code/algorithm/', '数据结构与算法'],
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
        },
        '/code/designPatterns/',
        '/code/libs/',
        '/code/koa/',
        '/code/ramda/',
        '/code/libs/30sec',
        '/code/libs/ydnjs',
        'code/libs/goodjs'
      ]
    }
  }
}