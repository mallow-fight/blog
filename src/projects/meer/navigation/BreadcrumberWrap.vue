<template>
  <nav-wrap :navConfig="navConfig">
    <div :slot="navConfig.exampleBody[0].title">
        <!--a slot-->
        <div :slot="navConfig.exampleBody[0].title">
            <Breadcrumber></Breadcrumber>
        </div>
    </div>
  </nav-wrap>
</template>

<script>
export default {
  name: 'BreadcrumberWrap',
  data() {
    return {
      navConfig: {
        navTitle: 'Breadcrumber 面包屑',
        navExplain: '显示当前页面在系统层级结构中的位置，并能向上返回。',
        when2useExplain: [
          '当系统拥有超过两级以上的层级结构时。',
          '当需要告知用户『你在哪里』时。',
          '当需要向上导航的功能时。'
        ],
        exampleBody: [
          {
            title: '结合vue-router的面包屑,可点击跳转',
            code: `
<Breadcrumber></Breadcrumber>
`
          }
        ],
        api: [
          ['split', '分割线内容', 'string', '/'],
          ['pathColor', '路径字体颜色', 'string', 'red'],
          ['splitColor', '分割线颜色', 'string', 'skyblue']
        ]
      }
    }
  }
}
</script>

<style scoped>
</style>
