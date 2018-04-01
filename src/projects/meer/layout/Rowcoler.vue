<template>
  <nav-wrap :navConfig="navConfig">
    <div :slot="navConfig.exampleBody[0].title">
        <Rower>
          <Coler span="6" class="colbg bg1">span-6</Coler>
          <Coler span="6" class="colbg bg2">span-6</Coler>
          <Coler span="6" class="colbg bg3">span-6</Coler>
          <Coler span="6" class="colbg bg4">span-6</Coler>
        </Rower>
    </div>
    <div :slot="navConfig.exampleBody[1].title">
        <Rower>
          <Coler span="5" offset="1" class="colbg bg1">span-5-offset-1</Coler>
          <Coler span="15" offset="3" class="colbg bg2">span-15-offset-3</Coler>
        </Rower>
    </div>
  </nav-wrap>
</template>

<script>
export default {
  name: 'Rowcoler',
  data() {
    return {
      navConfig: {
        navTitle: 'Grid 栅格',
        navExplain: '24 栅格系统。',
        when2useExplain: [
          '解决大量信息收纳的问题。',
          '视觉层面的舒适感。'
        ],
        exampleBody: [
          {
            title: 'span',
            code: `
<Rower>
  <Coler span="6">span-6</Coler>
  <Coler span="6">span-6</Coler>
  <Coler span="6">span-6</Coler>
  <Coler span="6">span-6</Coler>
</Rower>
`
          },
          {
            title: 'offset',
            code: `
<Rower>
  <Coler span="5" offset="1">span-5-offset-1</Coler>
  <Coler span="15" offset="3">span-15-offset-3</Coler>
</Rower>
`
          }
        ],
        api: [
          ['span', '占据多少条栅格', 'string', `'0'`],
          ['offset', '左端空置多少条栅格', 'string', `'0'`]
        ]
      }
    }
  }
}
</script>

<style scoped>
.colbg{
    height: 30px;
    font-size: 15px;
    color: white;
    font-weight: 500;
}
.bg1{
    background: #2c3e50;
}
.bg2{
    background: gray;
}
.bg3{
    background: #2c3e50;
}
.bg4{
    background: gray;
}
.fix-margin{
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
