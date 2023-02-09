export default  {
    height: 368,
    width: 1000,
    //工具栏的设置
    toolbarConfig: {
        pin: true,
    },
    //最大字数
    counter: {
        enable: true,
        max: 1024,
    },
    placeholder: "请输入你的问题",
    typewriterMode: true, //打字机模式
    theme: "classic", //主题
    icon: "ant", //图标主题

    preview: {
        //代码块高亮
        hljs: {
            style: "github",
            lineNumber: true,
        },
        //markdown
        markdown: {
            toc: true, //插入目录
        },
    },
    hint: {
        //表情  https://github.com/88250/lute/blob/master/parse/emoji_map.go?utm_source=ld246.com
        emoji: {
            "+1": "👍",
            "-1": "👎",
            carousel_horse: "🎠",
            carrot: "🥕",
            cat: "🐱",
            cat2: "🐈",
            cayman_islands: "🇰🇾",
            cd: "💿",
            cherry_blossom: "🌸",
            chestnut: "🌰",
            chicken: "🐔",
            children_crossing: "🚸",
            chile: "🇨🇱",
            chipmunk: "🐿",
            chocolate_bar: "🍫",
            christmas_island: "🇨🇽",
            christmas_tree: "🎄",
        },
    },
    //上传图片和文件
    upload: {
        url: 'https://www.baidu.com',
        msg: "上传成功",
        code: 0,
        data: {
            errFiles: ["filename", "filename2"],
            succMap: {
                filename3: "filepath3",
            },
        },
    },
    //显示大纲
    outline: {
        enable: true,
        position: "right"
    }
}