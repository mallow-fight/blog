<template>
	<nav-wrap :navConfig="navConfig">
		<div :slot="navConfig.exampleBody[0].title">
      <Buttoner text="normal" type="normal" />
      <Buttoner text="simple" type="simple" />
      <Buttoner text="dotted" type="dotted" />
      <Buttoner text="danger" type="danger" />
		</div>
		<div :slot="navConfig.exampleBody[1].title">
      <Buttoner text="large" type="normal" size="large" />
      <Buttoner text="default" type="normal" size="default" />
      <Buttoner text="small" type="normal" size="small" />
		</div>
    <div :slot="navConfig.exampleBody[2].title">
      <Buttoner text="count-down" :second="second" />
    </div>
  </nav-wrap>
</template>
<script>
export default {
  name: 'ButtonerWrap',
  data() {
    return {
      second: 10,
      navConfig: {
        navTitle: 'Button 按钮',
        navExplain: '按钮用于开始一个即时操作。',
        when2useExplain: ['标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。'],
        exampleBody: [
          {
            title: '不同类型的按钮',
            code: `
...
<Buttoner text="normal" type="normal" />
<Buttoner text="simple" type="simple" />
<Buttoner text="dotted" type="dotted" />
<Buttoner text="danger" type="danger" />
...
`
          },
          {
            title: '不同大小的按钮',
            code: `
...
<Buttoner text="large" type="normal" size="large" />
<Buttoner text="default" type="normal" size="default" />
<Buttoner text="small" type="normal" size="small" />
...
`
          },
          {
            title: '带有倒计时的按钮',
            code: `
...
<Buttoner text="count-down" :second="second" />
...
second: 10
`
          }
        ],
		api: [
			['text', '按钮显示文字', 'string', `''`],
			['type', '按钮类型', 'string', 'normal'],
			['click', '按钮点击事件的回调', 'function', '(e) => {}'],
			['size', '按钮大小', 'string', 'default'],
			['second', '倒计时秒数', 'number', '-1']
		]
      }
    }
  }
}
</script>
