const path = require('path')
const exactCode = require('./plugins/exact-code.js')

function resolve(p) {
  return path.resolve(__dirname, p)
}

module.exports = {
  title: 'lyz的学习记录',
  description: '记录和整理生活、工作与学习的知识，致力成为一名终身学习者！',
  head: [
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'apple-touch-icon', href: '/img/logo.png' }],
  ],
  base: '/',
  serviceWorker: true,
  enhanceAppFiles: resolve('enhanceAppFile.js'),
  plugins: [
    exactCode,
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
    lastUpdated: '最后更新',
    nav: [
      { text: '实验室', link: '/' },
      { text: 'Javascript', link: '/js/' },
      { text: 'TypeScript', link: '/ts/1-type' },
      { text: '工具方法', link: '/utils/' },
      { text: '库/框架', link: '/libs/30sec' },
      { text: '设计模式', link: '/designPatterns/single' },
      { text: '算法', link: '/algorithm' },
      { text: 'Docker', link: '/docker' },
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

      '/js/': [
        '/js/scope',
        '/js/prototype',
        '/js/function',
        '/js/math',
        '/js/es6',
      ],
      '/ts/': [
        '/ts/1-type',
        '/ts/2-statement',
        '/ts/3-class',
        '/ts/4-interface',
        '/ts/5-func',
        '/ts/6-generices',
        '/ts/7-enums',
        '/ts/8-inference',
      ],
      '/libs/': ['/libs/30sec', '/libs/ydnjs', '/libs/goodjs'],
      '/utils/': ['/utils/'],
      '/designPatterns/': [
        {
          title: '设计模式',
          children: [
            '/designPatterns/single',
            '/designPatterns/strategy',
            '/designPatterns/proxy',
            '/designPatterns/iterator',
            '/designPatterns/pub-sub',
            '/designPatterns/command',
            '/designPatterns/compose',
            '/designPatterns/template',
            '/designPatterns/flyweight',
            '/designPatterns/duties',
            '/designPatterns/intermediary',
            '/designPatterns/decoration',
            '/designPatterns/status',
            '/designPatterns/adapter',
          ],
        },
      ],
      '/algorithm': [
        '/algorithm/dictionary',
        '/algorithm/divideBy2',
        '/algorithm/doublyLinkedList',
        '/algorithm/graphic',
        '/algorithm/hashTable',
        '/algorithm/hashTableLinkedList',
        '/algorithm/linkedList',
        '/algorithm/loopLinkedList',
        '/algorithm/priorityQueue',
        '/algorithm/queue',
        '/algorithm/stack',
        '/algorithm/set',
        '/algorithm/sort',
        '/algorithm/tree',
      ],
      '/docker/': [
        '/docker/',
        '/docker/docker-registry',
        '/docker/docker-network',
        '/docker/docker-machine',
        '/docker/docker-compose',
        '/docker/dockerfile',
      ],
    },
  },
}
