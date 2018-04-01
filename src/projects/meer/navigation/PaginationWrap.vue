<template>
    <nav-wrap :navConfig="navConfig">
        <div :slot="navConfig.exampleBody[0].title">
            <Paginationer :total="config.one.total" :loadPage="config.one.loadPage" />
        </div>
        <div :slot="navConfig.exampleBody[1].title">
            <Paginationer :total="config.two.total" :loadPage="config.two.loadPage" />
        </div>
        <div :slot="navConfig.exampleBody[2].title">
            <Paginationer :pageSize="parseInt(config.three.pageSize)" :total="config.three.total" :loadPage="config.three.loadPage" />
            <select style="margin-top: 1rem; margin-left: .5rem" v-model="config.three.pageSize">
                <option value="10">10/page</option>
                <option value="20">20/page</option>
                <option value="30">30/page</option>
            </select>
        </div>
        <div :slot="navConfig.exampleBody[3].title">
            <Paginationer :defaultPageNo="parseInt(config.four.defaultPageNo)" :total="config.four.total" :loadPage="config.four.loadPage" />
            <input style="margin-top: 1rem; margin-left: .5rem" placeholder="please input pageNo expected" type="number" v-model="config.four.defaultPageNo" />            
        </div>
        <div :slot="navConfig.exampleBody[4].title">
            <Paginationer :total="config.five.total" :loadPage="config.five.loadPage" :showTotal="config.five.showTotal" />
        </div>
    </nav-wrap>
</template>
<script>
    export default {
        name: 'PaginationWrap',
        data() {
            return {
                navConfig: {
                    navTitle: 'Pagination 分页',
                    navExplain: '采用分页的形式分隔长列表，每次只加载一个页面。',
                    when2useExplain: ['当加载/渲染所有数据将花费很多时间时。', '可切换页码浏览数据。'],
                    exampleBody: [
                        {
                            title: '总页数不超过七页',
                            code: `
...
<Paginationer :total="config.one.total" :loadPage="config.one.loadPage" />
...
config: {
    one: {
        total: 70,
        loadPage: (pageNo, pageSize) => {
            console.log(pageNo, pageSize)
        }
    }
}
                            `
                        },
                        {
                            title: '总页数超过7页',
                            code: `
...
<Paginationer :total="config.two.total" :loadPage="config.two.loadPage" />
...
config: {
    two: {
        total: 1000,
        loadPage: (pageNo, pageSize) => {
            console.log(pageNo, pageSize)
        }
    }
}
                            `
                        },
                        {
                            title: '可选择每页大小',
                            code: `
...
<Paginationer :pageSize="parseInt(config.three.pageSize)" :total="config.three.total" :loadPage="config.three.loadPage" />
<select v-model="config.three.pageSize">
    <option value="10">10/page</option>
    <option value="20">20/page</option>
    <option value="30">30/page</option>
</select>
...
config: {
    three: {
        total: 1000,
        loadPage: (pageNo, pageSize) => {
            console.log(pageNo, pageSize)
        },
        pageSize: 10
    }
}

                            `
                        },
                        {
                            title: '可选择当前页码',
                            code: `
...
<Paginationer :defaultPageNo="parseInt(config.four.defaultPageNo)" :total="config.four.total" :loadPage="config.four.loadPage" />
<input placeholder="please input pageNo expected" type="number" v-model="config.four.defaultPageNo" />
...
config: {
    four: {
        total: 1000,
        loadPage: (pageNo, pageSize) => {
            console.log(pageNo, pageSize)
        },
        defaultPageNo: 1
    }
}
`
                        },
                        {
                            title: '显示总条数',
                            code: `
...
<Paginationer :total="config.five.total" :loadPage="config.five.loadPage" :showTotal="config.five.showTotal" />
...
config: {
    five: {
        total: 1000,
        loadPage: (pageNo, pageSize) => {
            console.log(pageNo, pageSize)
        },
        showTotal: true
    }
}
`
                        }
                    ],
                    api: [
                        ['total', '总条数', 'number', 0],
                        ['pageSize', '每页大小', 'number', 10],
                        ['defaultPageNo', '默认页码', 'number', 1],
                        ['defaultLastPageText', '默认上一页按钮文字', 'string', '<'],
                        ['defaultNextPageText', '默认下一页按钮文字', 'string', '>'],
                        ['loadPage', '跳转到某页之后的回调', 'function(pageNo, pageSize)', '-'],
                        ['showTotal', '是否显示总条数', 'Boolean', 'false']
                    ]
                },
                config: {
                    one: {
                        total: 70,
                        loadPage: (pageNo, pageSize) => {
                            console.log(pageNo, pageSize)
                        }
                    },
                    two: {
                        total: 1000,
                        loadPage: (pageNo, pageSize) => {
                            console.log(pageNo, pageSize)
                        }
                    },
                    three: {
                        total: 1000,
                        loadPage: (pageNo, pageSize) => {
                            console.log(pageNo, pageSize)
                        },
                        pageSize: 10
                    },
                    four: {
                        total: 1000,
                        loadPage: (pageNo, pageSize) => {
                            console.log(pageNo, pageSize)
                        },
                        defaultPageNo: 1
                    },
                    five: {
                        total: 1000,
                        loadPage: (pageNo, pageSize) => {
                            console.log(pageNo, pageSize)
                        },
                        showTotal: true
                    }
                }
            }
        }
    }
</script>
<style scoped>
    
</style>