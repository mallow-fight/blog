<template>
  <nav-wrap :navConfig="navConfig">
    <div :slot="navConfig.exampleBody[0].title">
        <!--a slot-->
        <Cascader :source="source"  />
    </div>
  </nav-wrap>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      source: [
        {
          value: 1,
          label: '手机',
          children: [
            {
              value: 2,
              label: '诺基亚'
            },
            {
              value: 3,
              label: '小米',
              children: [
                {
                  value: 9,
                  label: '红米'
                },
                {
                  value: 10,
                  label: '小米5s'
                }
              ]
            },
            {
              value: 4,
              label: '华为'
            }
          ]
        },
        {
          value: 5,
          label: '电脑',
          children: [
            {
              value: 6,
              label: '戴尔'
            },
            {
              value: 7,
              label: '三星'
            },
            {
              value: 8,
              label: 'mac',
              children: [
                {
                  value: 11,
                  label: 'air'
                },
                {
                  value: 12,
                  label: 'pro'
                }
              ]
            }
          ]
        },
        {
          value: 13,
          label: '平板'
        }
      ],
      navConfig: {
        navTitle: 'Cascader 级联选择',
        navExplain: '级联选择框。',
        when2useExplain: [
          '需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。',
          '从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。',
          '比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。'
        ],
        exampleBody: [
          {
            title: '任意层次的级联选择',
            code: `
<Cascader :source="source"  />
...
data() {
    return {
      source: [
        {
          value: 1,
          label: '手机',
          children: [
            {
              value: 2,
              label: '诺基亚'
            },
            {
              value: 3,
              label: '小米',
              children: [
                {
                  value: 9,
                  label: '红米'
                },
                {
                  value: 10,
                  label: '小米5s'
                }
              ]
            },
            {
              value: 4,
              label: '华为'
            }
          ]
        },
        {
          value: 5,
          label: '电脑',
          children: [
            {
              value: 6,
              label: '戴尔'
            },
            {
              value: 7,
              label: '三星'
            },
            {
              value: 8,
              label: 'mac',
              children: [
                {
                  value: 11,
                  label: 'air'
                },
                {
                  value: 12,
                  label: 'pro'
                }
              ]
            }
          ]
        },
        {
          value: 13,
          label: '平板'
        }
      ]
    }
...
`
          }
        ],
        api: [
          ['source', '级联选择的数据源', 'array', '[]']
        ],
        todos: [
          '美化样式',
          '使得每一级都可以选择'
        ]
      }
    }
  }
}
</script>

<style scoped>
</style>
