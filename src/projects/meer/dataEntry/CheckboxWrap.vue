<template>
  <nav-wrap :navConfig="navConfig">
    <div :slot="navConfig.exampleBody[0].title">
        <!--a slot-->
        <Checkbox @check="check" choosedTitle="choosed" unchoosedTitle="unchoosed" :choosed="false" />
        <Checkbox choosedTitle="choosed" unchoosedTitle="unchoosed" :choosed="true" />
        <Checkbox choosedTitle="choosed" unchoosedTitle="unchoosed" :choosed="true" :disabled="true" />
    </div>
    <div :slot="navConfig.exampleBody[1].title">
        <!--another slot-->
        <CheckAllbox
        choosedTitle="checkAll"
        unchoosedTitle="uncheckAll"
        :choosed="false"
        @check="check">
            <Checkbox choosedTitle="choosed" unchoosedTitle="unchoosed" :choosed="false" />
            <Checkbox choosedTitle="choosed" unchoosedTitle="unchoosed" :choosed="true" />
            <Checkbox choosedTitle="choosed" unchoosedTitle="unchoosed" :choosed="false" />
            <Checkbox choosedTitle="choosed" unchoosedTitle="unchoosed" :choosed="true" />
            <Checkbox choosedTitle="choosed" unchoosedTitle="unchoosed" :choosed="false" />
        </CheckAllbox>
    </div>
  </nav-wrap>
</template>

<script>
export default {
  name: '',
  methods: {
      check(checkStatus) {
          console.log(checkStatus)
      }
  },
  data() {
    return {
      navConfig: {
        navTitle: 'Checkbox',
        navExplain: '多选框',
        when2useExplain: [
          '在一组可选项中进行多项选择时',
          '单独使用可以表示两种状态之间的切换，和switch类似。区别在于切换switch会直接触发状态改变，而checkbox一般用于状态标记，需要和提交操作配合。'
        ],
        exampleBody: [
          {
            title: '不同状态的多选框',
            code: `
<Checkbox @check="check" choosedTitle="choosed" unchoosedTitle="unchoosed" :choosed="false" />
<Checkbox choosedTitle="choosed" unchoosedTitle="unchoosed" :choosed="true" />
<Checkbox choosedTitle="choosed" unchoosedTitle="unchoosed" :choosed="true" :disabled="true" />
...
check(checkStatus) {
    console.log(checkStatus)
}
...
`
          },
          {
            title: 'checkbox组',
            code: `
<CheckAllbox
choosedTitle="checkAll"
unchoosedTitle="uncheckAll"
:choosed="false"
@check="check">
    <Checkbox choosedTitle="choosed" unchoosedTitle="unchoosed" :choosed="false" />
    <Checkbox choosedTitle="choosed" unchoosedTitle="unchoosed" :choosed="true" />
    <Checkbox choosedTitle="choosed" unchoosedTitle="unchoosed" :choosed="false" />
    <Checkbox choosedTitle="choosed" unchoosedTitle="unchoosed" :choosed="true" />
    <Checkbox choosedTitle="choosed" unchoosedTitle="unchoosed" :choosed="false" />
</CheckAllbox>
...
check(checkStatus) {
    console.log(checkStatus)
}
...
`
          }
        ],
        api: [
          ['choosedTitle', '选择状态下的提示文字', 'string', '-'],
          ['unchoosedTitle', '非选中状态下的提示文字', 'string', '-'],
          ['choosed', '选中状态', 'boolean', 'false'],
          ['disabled', '是否不可用', 'boolean', 'false'],
          ['check', '点击多选框得事件回调', 'function', '() => {}']
        ]
      }
    }
  }
}
</script>

<style scoped>
</style>
