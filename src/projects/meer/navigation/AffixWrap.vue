<template>
    <nav-wrap :navConfig="navConfig">
        <div :slot="navConfig.exampleBody[0].title">
            <Affixer offsetTop="10">
                <Iconer link="eye" />
            </Affixer>            
        </div>
    </nav-wrap>
</template>
<script>
    export default {
        name: 'AffixWrap',
        data() {
            return {
                navConfig: {
                    navTitle: 'Affix 固钉',
                    navExplain: '将页面元素钉在可视范围。',
                    when2useExplain: [
                        '当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。',
                        '页面可视范围过小时，慎用此功能以免遮挡页面内容。'
                    ],
                    exampleBody: [
                        {
                            title: '固定高度显示',
                            code: `
<Affixer offsetTop="10">
    <Iconer link="eye" />
</Affixer>
`
                        }
                    ],
                    api: [
                        ['offsetTop', '从什么位置开始固定显示', 'string', `'0'`]
                    ]
                }
            }
        }
    }
</script>
<style scoped>
    
</style>