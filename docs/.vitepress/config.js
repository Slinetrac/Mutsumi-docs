import { defineConfig } from 'vitepress'

// English navigation
const enNav = [
  { text: 'Home', link: '/' },
  { text: 'Guide', link: '/guide/' },
  { text: 'Tech Stack', link: '/tech/' }
]

// Chinese navigation
const zhNav = [
  { text: '首页', link: '/zh/' },
  { text: '指南', link: '/zh/guide/' },
  { text: '技术栈', link: '/zh/tech/' }
]

export default defineConfig({
  title: 'Mutsumi',
  description: 'Documentation for Mutsumi - A personal, serverless image gallery',
  
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/',
      themeConfig: {
        nav: enNav
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: '/zh/',
      themeConfig: {
        nav: zhNav
      }
    }
  },

  themeConfig: {
    sidebar: {
      '/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'Setup', link: '/guide/setup' },
            { text: 'Deployment', link: '/guide/deployment' }
          ]
        },
        {
          text: 'Components',
          items: [
            { text: 'Telegram Bot', link: '/components/telegram' },
            { text: 'Cloudflare Worker', link: '/components/worker' },
            { text: 'Frontend', link: '/components/frontend' },
            { text: 'Workers KV', link: '/components/kv' }
          ]
        },
        {
          text: 'Tech Stack',
          items: [
            { text: 'Backend', link: '/tech/backend' },
            { text: 'Frontend', link: '/tech/frontend' }
          ]
        }
      ],
      
      '/zh/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/zh/guide/' },
            { text: '架构', link: '/zh/guide/architecture' },
            { text: '设置', link: '/zh/guide/setup' },
            { text: '部署', link: '/zh/guide/deployment' }
          ]
        },
        {
          text: '组件',
          items: [
            { text: 'Telegram机器人', link: '/zh/components/telegram' },
            { text: 'Cloudflare Worker', link: '/zh/components/worker' },
            { text: '前端', link: '/zh/components/frontend' },
            { text: 'Workers KV', link: '/zh/components/kv' }
          ]
        },
        {
          text: '技术栈',
          items: [
            { text: '后端', link: '/zh/tech/backend' },
            { text: '前端', link: '/zh/tech/frontend' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Slinetrac/mutsumi' }
    ],
    
    localeLinks: {
      items: [
        { text: 'English', link: '/' },
        { text: '简体中文', link: '/zh/' }
      ]
    }
  }
})