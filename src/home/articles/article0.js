// 属性名对应html标签
// 值对应html标签内容
export default [
    {
        name: 'h1',
        value: '搭建一个vue的ui框架'
    },
    {
        name: 'h5',
        value: '- 时间：2018-03-30'
    },
    {
        name: 'h2',
        value: '1.准备一个参考的网站',
        children: [
            {
                name: 'h3',
                value: `我这里参考的是ant.design， 而且是react版本的。`
            },
            {
                name: 'h3',
                value: '它有以下优点：'
            },
            {
                name: 'h3',
                value: '1.具有设计规范'
            },
            {
                name: 'h3',
                value: '2.文档良好'
            }
        ]
    }
]