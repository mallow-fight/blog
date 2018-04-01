<template>
  <nav-wrap :navConfig="navConfig">
    <div :slot="navConfig.exampleBody[0].title">
        <!--a slot-->
        <Autocompleter :dataSource="dataSource" />        
    </div>
  </nav-wrap>
</template>

<script>
export default {
  name: '',
  data() {
    return {
        dataSource: [
            'ma',
            'mal',
            'mall',
            'mallo',
            'mallow'
        ],
      navConfig: {
        navTitle: 'AutoComplete 自动完成',
        navExplain: '输入框自动完成功能。',
        when2useExplain: [
          '需要自动完成时。'
        ],
        exampleBody: [
          {
            title: '需要检索词库',
            code: `
<Autocompleter :dataSource="dataSource" />
`
          }
        ],
        api: [
          ['dataSource', '检索词库', 'Array', '[]']
        ]
      }
    }
  }
}
</script>