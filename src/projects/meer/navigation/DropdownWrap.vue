<template>
  <nav-wrap :navConfig="navConfig">
    <div :slot="navConfig.exampleBody[0].title">
        <!--a slot-->
        <Dropdowner :click="handleClick" title="点击下拉" action="click" :list="list" />
    </div>
    <div :slot="navConfig.exampleBody[1].title">
        <!--another slot-->
        <Dropdowner title="划过下拉" action="hover" :list="list" />
    </div>
    <div :slot="navConfig.exampleBody[2].title">
        <Dropdowner action="click" position="down" title="下方" :list="list" />    
        <Dropdowner action="click" position="top" title="上方" :list="list" />
        <Dropdowner action="click" position="left" title="左方" :list="list" />
        <Dropdowner action="click" position="right" title="右方" :list="list" />
        <Dropdowner action="click" position="down-left" title="左下方" :list="list" />
        <Dropdowner action="click" position="down-right" title="右下方" :list="list" />
        <Dropdowner action="click" position="top-left" title="左上方" :list="list" />
        <Dropdowner action="click" position="top-right" title="右上方" :list="list" />
    </div>
  </nav-wrap>
</template>

<script>
export default {
  name: 'DropdownWrap',
  methods: {
    handleClick(e, li) {
      console.log(e, li)
    }
  },
  data() {
    return {
      list: [
        {
          key: 'item1',
          value: 'item-one'
        },
        {
          key: 'item2',
          value: 'item-two'
        },
        {
          key: 'item3',
          value: 'item-three'
        }
      ],
      navConfig: {
        navTitle: 'Dropdown 下拉菜单',
        navExplain: '向下弹出的列表。',
        when2useExplain: [
          '当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。',
          '可在列表中进行选择，并执行相应的命令。'
        ],
        exampleBody: [
          {
            title: '点击下拉',
            code: `
<Dropdowner title="点击下拉" action="click" :list="list" />
`
          },
          {
            title: '划过下拉',
            code: `
<Dropdowner title="划过下拉" action="hover" :list="list" />
`
          },
          {
            title: '不同位置的下拉列表',
            code: `
<Dropdowner position="down" title="下方" :list="list" />    
<Dropdowner position="top" title="上方" :list="list" />
<Dropdowner position="left" title="左方" :list="list" />
<Dropdowner position="right" title="右方" :list="list" />
<Dropdowner position="down-left" title="左下方" :list="list" />
<Dropdowner position="down-right" title="右下方" :list="list" />
<Dropdowner position="top-left" title="左上方" :list="list" />
<Dropdowner position="top-right" title="右上方" :list="list" />
`
          }
        ],
        api: [
          ['title', '标题', 'string', `''`],
          ['list', '下拉列表内容', 'array', '[]'],
          ['position', '下拉列表出现的位置', 'string', 'down'],
          ['action', '动作', 'string', 'hover'],
          ['initStatus', '默认展开状态', 'boolean', 'false'],
          ['click', '点击下拉菜单的事件回调', 'function', '(e, li) => {}'],
          ['icon', '下拉菜单的图标', 'string', 'down']
        ]
      }
    }
  }
}
</script>