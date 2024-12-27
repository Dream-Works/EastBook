// .vuepress/config.js
import { plumeTheme } from 'vuepress-theme-plume'
import { defineUserConfig } from 'vuepress'
import { navbar,notes} from '../config'
import { searchProPlugin } from 'vuepress-plugin-search-pro'
import { cut } from 'nodejs-jieba'


export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'EasyBook',
  head: [
    ['link', { rel: 'icon', href: '/assets/image/note.png' }], // 需要被注入到当前页面的 HTML <head> 中的标签
  ],
  plugins: [
    searchProPlugin({
      // 配置选项
      indexContent: true,
      indexOptions: {
        // 使用 nodejs-jieba 进行分词
        tokenize: (text, fieldName) =>
          fieldName === 'id' ? [text] : cut(text, true),
      },
    }),
  ],
  theme: plumeTheme({
    // 此处放置主题配置
    logo: '/assets/image/note.png',

    navbar: navbar,
    notes: {
      dir: '_notes',
      link: '/note/',
      //@ts-ignore
      notes: notes,
    },
  }),
})
