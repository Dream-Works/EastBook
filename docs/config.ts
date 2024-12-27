import {getFilesInDirectory} from "./readFile.js";

const baseUrl = "_notes/"
//导航栏配置
export const navbar = [
    {
        text: 'ES命令模版',
        link: '/note/es/index'
    },
    {
        text: 'ES-5.2.2本地文档',
        link: '/note/doc/index',
    },
    {
        text: 'other',
        link: '/note/other/index',
    },
    {
        text: 'prometheus文档',
        link: '/note/prometheus-book/index',
    }
];

//文件目录及其对应的路径配置
export const notes = [
    {
        dir: 'es',
        link: '/es/',
        sidebar: 'auto',
    },
    {
        dir: "doc",
        link: "/doc/",
        sidebar: 'auto'
    },
    {
        dir: "prometheus-book",
        link: "/prometheus-book/",
        // sidebar: 'auto',  // 可自动生成侧边栏，但是没有折叠功能
        sidebar: [     //手动配置侧边栏
            {
                text: "1、快速开始",    // 侧边栏标
                dir: "1、快速开始",  // 侧边栏所对应的子文件夹
                // link: "/prometheus-book/1/",    //可以单独为每个侧边栏添加链接，但不建议
                collapsed: true,   //是否开启折叠功能
                items: getFilesInDirectory(baseUrl + "prometheus-book/1、快速开始")  //文档列表
            },
            {
                text: "2、promql查询",
                dir: "2、promql查询",
                collapsed: true,
                items: getFilesInDirectory(baseUrl + "prometheus-book/2、promql查询")
            }
        ]
    }
]

