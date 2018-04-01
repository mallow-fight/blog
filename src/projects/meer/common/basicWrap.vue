<template>
  <nav-wrap :navConfig="navConfig">
    <div :slot="navConfig.exampleBody[0].title">
        <!--a slot-->
    </div>
    <div :slot="navConfig.exampleBody[1].title">
        <!--another slot-->
    </div>
  </nav-wrap>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      navConfig: {
        navTitle: '',
        navExplain: '',
        when2useExplain: [
          '',
          ''
        ],
        exampleBody: [
          {
            title: '',
            code: `

`
          },
          {
            title: '',
            code: `

`
          }
        ],
        api: [
          ['prop name', '说明', '类型', '默认值'],
          ['prop name', '说明', '类型', '默认值']
        ]
      }
    }
  }
}
</script>

<style scoped>
</style>
