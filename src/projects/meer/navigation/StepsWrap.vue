<template>
  <nav-wrap :navConfig="navConfig">
    <div :slot="navConfig.exampleBody[0].title">
        <!--a slot-->
        <Steps direction="horizon" :current="current">
            <Step icon="user" title="填写用户信息" description="已完成" />
            <Step icon="question" title="调查问卷" description="进行中" />
            <Step icon="loading1" title="开通账户" description="待完成" />
        </Steps>
    </div>
    <div :slot="navConfig.exampleBody[1].title">
        <!--another slot-->
        <Steps direction="vertical" :current="current">
            <Step icon="user" title="填写用户信息" description="已完成" />
            <Step icon="question" title="调查问卷" description="进行中" />
            <Step icon="loading1" title="开通账户" description="待完成" />
        </Steps>
    </div>
  </nav-wrap>
</template>

<script>
export default {
  name: 'stepWrap',
  data() {
    return {
      current: 1,
      navConfig: {
        navTitle: 'Steps 步骤条',
        navExplain: '引导用户按照流程完成任务的导航条。',
        when2useExplain: [
          '当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。'
        ],
        exampleBody: [
          {
            title: '横向步骤条',
            code: `
<Steps direction="horizon" :current="current">
    <Step icon="user" title="填写用户信息" description="已完成" />
    <Step icon="question" title="调查问卷" description="进行中" />
    <Step icon="loading1" title="开通账户" description="待完成" />
</Steps>
`
          },
          {
            title: '纵向步骤条',
            code: `
<Steps direction="vertical" :current="current">
    <Step icon="user" title="填写用户信息" description="已完成" />
    <Step icon="question" title="调查问卷" description="进行中" />
    <Step icon="loading1" title="开通账户" description="待完成" />
</Steps>
`
          }
        ],
        api: [
          ['direction', '步骤条方向', 'string', 'horizon'],
          ['current', '当前步骤，第一步0', 'number', 0],
          ['icon', '步骤图标', 'string', `''`],
          ['title', '步骤标题', 'string', `''`],
          ['description', '步骤描述', 'string', `''`]
        ]
      }
    }
  }
}
</script>

<style scoped>
</style>
