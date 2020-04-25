const path = require('path')

function resolve(p) {
  return path.resolve(__dirname, p)
}

module.exports = {
  title: 'StudyTime',
  description: '记录和整理生活、工作与学习的知识，致力成为一名终身学习者！',
  head: [
    ['link', { rel: 'icon', href: '/imags/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'apple-touch-icon', href: '/imags/logo.png' }],
  ],
  base: '/',
  serviceWorker: true,
  enhanceAppFiles: resolve('enhanceAppFile.js'),
  configureWebpack: {
    resolve: {
      alias: {
        '@image': resolve('public/images'),
      }
    },
  },
  plugins: [
    require('./plugins/exact-code.js'),
    [
      '@vuepress/back-to-top',
    ],
    ['@vuepress/active-header-links'],
    [
      '@vuepress/register-components',
      {
        componentsDir: resolve('examples'),
      },
    ],
  ],
  themeConfig: {
    sidebarDepth: 2,
    displayAllHeaders: true,
    smoothScroll: true,
    lastUpdated: '最近更新',
    logo: '/images/logo.png',
    nav: [
      { text: '实验室', link: '/' },
      { text: 'Code', items: [
        { text: 'Javascript', link: '/code/js/' },
        { text: 'TypeScript', link: '/code/ts/1-type' },
        { text: '工具方法', link: '/code/utils/' },
        { text: '库/框架', link: '/code/libs/30sec'},
        { text: '设计模式', link: '/code/designPatterns/single' },
        { text: '算法', link: '/code/algorithm/' },
        { text: 'Docker', link: '/code/docker/' },
      ]},
      {
        text: 'Get it',
        items: [
          { text: 'Finance', link: '/getit/finance/' },
          { text: 'Math', link: '/getit/math/001' },
          { text: 'Day Know', link: '/getit/day-know/001' },
          { text: 'Life Algorithm', link: '/getit/life-algorithm/001' },
          { text: 'Economics', link: '/getit/economics/' },
          { text: 'Literature', link: '/getit/literature/' },
        ],
      },
    ],
    sidebar: {
      '/getit/': [
        {
          title: '经济学',
          children: ['/getit/economics/', '/getit/economics/01'],
        },
        {
          title: '金融学',
          children: [
            '/getit/finance/',
            '/getit/finance/01',
            '/getit/finance/02',
            '/getit/finance/03',
            '/getit/finance/04',
            '/getit/finance/05',
            '/getit/finance/06',
          ],
        },
        {
          title: '日知录',
          children: ['/getit/day-know/001'],
        },
        {
          title: '数学通识',
          children: ['/getit/math/001', '/getit/math/002', '/getit/math/003'],
        },
        {
          title: '人生算法',
          children: ['/getit/life-algorithm/001', '/getit/life-algorithm/002'],
        },
        {
          title: '文学',
          children: ['/getit/literature/'],
        },
      ],
      '/code/js/': [
        '/code/js/variable',
        '/code/js/types',
        '/code/js/this',
        '/code/js/object',
        '/code/js/array',
        '/code/js/scope',
        '/code/js/prototype',
        '/code/js/function',
        '/code/js/regexp',
        '/code/js/math',
        '/code/js/es6',
      ],
      '/code/ts/': [
        '/code/ts/1-type',
        '/code/ts/2-statement',
        '/code/ts/3-class',
        '/code/ts/4-interface',
        '/code/ts/5-func',
        '/code/ts/6-generices',
        '/code/ts/7-enums',
        '/code/ts/8-inference',
      ],
      '/code/libs/': ['/code/libs/30sec', '/code/libs/goodjs', '/code/libs/koa'],
      '/code/utils/': ['/code/utils/'],
      '/code/designPatterns/': [
        {
          title: '设计模式',
          children: [
            '/code/designPatterns/single',
            '/code/designPatterns/strategy',
            '/code/designPatterns/proxy',
            '/code/designPatterns/iterator',
            '/code/designPatterns/pub-sub',
            '/code/designPatterns/command',
            '/code/designPatterns/compose',
            '/code/designPatterns/template',
            '/code/designPatterns/flyweight',
            '/code/designPatterns/duties',
            '/code/designPatterns/intermediary',
            '/code/designPatterns/decoration',
            '/code/designPatterns/status',
            '/code/designPatterns/adapter',
          ],
        },
      ],
      '/code/algorithm': [
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
        '/code/algorithm/tree',
      ],
      '/code/docker/': [
        '/code/docker/',
        '/code/docker/docker-registry',
        '/code/docker/docker-network',
        '/code/docker/docker-machine',
        '/code/docker/docker-compose',
        '/code/docker/dockerfile',
      ],
    },
  },
}
