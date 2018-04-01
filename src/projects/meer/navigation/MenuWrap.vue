<template>
  <nav-wrap :navConfig="navConfig">
    <div :slot="navConfig.exampleBody[0].title">
        <Menuer direction="vertical">
            <Menuer-button type="hover" title="nav one" icon="down">
                <Menuer-item title="item1" />
                <Menuer-item title="item2" />
                <Menuer-item title="item3" />
            </Menuer-button>
            <Menuer-button title="nav two" icon="laptop">
                <Menuer-group title="group1" icon="down">
                    <Menuer-item title="item1" />
                    <Menuer-item title="item2" />
                </Menuer-group>
                <Menuer-group title="group2">
                    <Menuer-item title="item1" />
                    <Menuer-item title="item2" icon="down" />
                </Menuer-group>
            </Menuer-button>
            <Menuer-button title="nav three" icon="user">
                <Menuer-group title="group1" icon="down">
                    <Menuer-item title="item1" icon="down" />
                    <Menuer-group title="group1-1">
                        <Menuer-item title="item2" />
                        <Menuer-item title="item3" icon="down" />
                    </Menuer-group>
                </Menuer-group>
            </Menuer-button>
            <Menuer-button title="nav four" icon="tags" :disabled="true">
                <Menuer-item title="item1" icon="down" />
            </Menuer-button>
        </Menuer>
    </div>
    <div :slot="navConfig.exampleBody[1].title">
        <Menuer direction="horizon">
            <Menuer-button type="hover" title="nav one" icon="down">
                <Menuer-item title="item1" />
                <Menuer-item title="item2" />
                <Menuer-item title="item3" />
            </Menuer-button>
            <Menuer-button title="nav two" icon="laptop">
                <Menuer-group title="group1" icon="down">
                    <Menuer-item title="item1" />
                    <Menuer-item title="item2" />
                </Menuer-group>
                <Menuer-group title="group2">
                    <Menuer-item title="item1" />
                    <Menuer-item title="item2" icon="down" />
                </Menuer-group>
            </Menuer-button>
            <Menuer-button title="nav three" icon="user">
                <Menuer-group title="group1" icon="down">
                    <Menuer-item title="item1" icon="down" />
                    <Menuer-group title="group1-1">
                        <Menuer-item title="item2" />
                        <Menuer-item title="item3" icon="down" />
                    </Menuer-group>
                </Menuer-group>
            </Menuer-button>
            <Menuer-button title="nav four" icon="tags" :disabled="true">
                <Menuer-item title="item1" icon="down" />
            </Menuer-button>
        </Menuer>
    </div>
  </nav-wrap>
</template>

<script>
export default {
  name: 'MenuWrap',
  methods: {
    clickItemOne(e) {
        console.log('click item one, the event is:', e)
    },
    clickMenuOne(e) {
        console.log('clicl menu one, the event is:', e)
    }
  },
  data() {
    return {
      navConfig: {
        navTitle: 'Menu 导航菜单',
        navExplain: '为页面和功能提供导航的菜单列表。',
        when2useExplain: [
          '导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。'
        ],
        exampleBody: [
            {
            title: '纵向导航',
            code: `
<Menuer direction="horizon">
    <Menuer-button type="hover" title="nav one" icon="down">
        <Menuer-item title="item1" />
        <Menuer-item title="item2" />
        <Menuer-item title="item3" />
    </Menuer-button>
    <Menuer-button title="nav two" icon="laptop">
        <Menuer-group title="group1" icon="down">
            <Menuer-item title="item1" />
            <Menuer-item title="item2" />
        </Menuer-group>
        <Menuer-group title="group2">
            <Menuer-item title="item1" />
            <Menuer-item title="item2" icon="down" />
        </Menuer-group>
    </Menuer-button>
    <Menuer-button title="nav three" icon="user">
        <Menuer-group title="group1" icon="down">
            <Menuer-item title="item1" icon="down" />
            <Menuer-group title="group1-1">
                <Menuer-item title="item2" />
                <Menuer-item title="item3" icon="down" />
            </Menuer-group>
        </Menuer-group>
    </Menuer-button>
    <Menuer-button title="nav four" icon="tags" :disabled="true">
        <Menuer-item title="item1" icon="down" />
    </Menuer-button>
</Menuer>
`
          },
          {
            title: '横向导航',
            code: `
<Menuer direction="horizon">
    <Menuer-button type="hover" title="nav one" icon="down">
        <Menuer-item title="item1" />
        <Menuer-item title="item2" />
        <Menuer-item title="item3" />
    </Menuer-button>
    <Menuer-button title="nav two" icon="laptop">
        <Menuer-group title="group1" icon="down">
            <Menuer-item title="item1" />
            <Menuer-item title="item2" />
        </Menuer-group>
        <Menuer-group title="group2">
            <Menuer-item title="item1" />
            <Menuer-item title="item2" icon="down" />
        </Menuer-group>
    </Menuer-button>
    <Menuer-button title="nav three" icon="user">
        <Menuer-group title="group1" icon="down">
            <Menuer-item title="item1" icon="down" />
            <Menuer-group title="group1-1">
                <Menuer-item title="item2" />
                <Menuer-item title="item3" icon="down" />
            </Menuer-group>
        </Menuer-group>
    </Menuer-button>
    <Menuer-button title="nav four" icon="tags" :disabled="true">
        <Menuer-item title="item1" icon="down" />
    </Menuer-button>
</Menuer>
`
          }
        ],
        api: [
          ['direction', '导航展示方向', 'string', 'horizon'],
          ['title', '菜单标题', 'string', `''`],
          ['icon', '菜单图标', 'string', `''`],
          ['type', '菜单展示动作', 'string', 'click'],
          ['disabled', '菜单是否禁止使用', 'string', 'false'],
        ]
      }
    }
  }
}
</script>