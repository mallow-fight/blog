<template>
  <nav-wrap :navConfig="navConfig">
    <div :slot="navConfig.exampleBody[0].title">
        <!--a slot-->
        <DatePicker @click="getDate" />
    </div>
    <div :slot="navConfig.exampleBody[1].title">
        <!--another slot-->
        <TimePicker @click="getDate" />
    </div>
  </nav-wrap>
</template>

<script>
export default {
  name: 'DatePickerWrap',
  methods: {
      getDate(date) {
          console.log(date)
      }
  },
  data() {
    return {
      navConfig: {
        navTitle: 'DatePicker 日期选择器',
        navExplain: '输入或选择日期的控件。',
        when2useExplain: [
          '当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。'
        ],
        exampleBody: [
          {
            title: '选择日期',
            code: `
<DatePicker @click="getDate" />
...
methods: {
      getDate(date) {
          console.log(date)
      }
  }
...
`
          },
          {
            title: '选择时间',
            code: `
<TimePicker @click="getDate" />
...
methods: {
      getDate(date) {
          console.log(date)
      }
  }
...
`
          }
        ],
        api: [
          ['click', '点击日历的回调事件', 'function', '-']
        ],
        todos: [
            '和输入框结合',
            '美化，过渡效果'
        ]
      }
    }
  }
}
</script>

<style scoped>
</style>
