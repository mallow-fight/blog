export default [
    {
        id: 1,
        label: '简介',
        router: 'intro'
    },
    {
        id: 2,
        label: '搜索',
        router: 'look'
    },
    {
        id: 3,
        router: 'donate',
        label: '请客'
    },
    {
        id: 4,
        label: '项目',
        router: 'projects',
        children: [
            {
                label: 'meer',
                router: 'projects/meer'
            }
        ]
    },
    {
        id: 5,
        label: '文章',
        router: 'articles',
        children: [
            {
                label: 'meer-基于vue设计的ui框架',
                router: 'articles?id=0'
            },
            {
                label: '如何搭建博客',
                router: 'articles?id=1'
            }
        ]
    }
]