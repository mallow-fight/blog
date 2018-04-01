<style scoped>
    .top, .main, .down, .side, .side-large{
        font-size: 1rem;
        text-align: center;
        color: white;
    }
    .top, .down{
        background: gray;
        line-height: 2rem;        
    }
    .main{
        background: #2c3e50;
        line-height: 4rem;
    }
    .side{
        background: #314659;
        line-height: 4rem;
    }
    .side-large{
        background: #314659;
        line-height: 8rem;
    }
</style>
<template>
  <nav-wrap :navConfig="navConfig">
    <div :slot="navConfig.exampleBody[0].title">
        <!--a slot-->
        <Layouter type="topMainDown">
            <div slot="top" class="top">
                this is top.
            </div>
            <div slot="main" class="main">
                this is main.
            </div>
            <div slot="down" class="down">
                this is down.
            </div>
        </Layouter>
    </div>
    <div :slot="navConfig.exampleBody[1].title">
        <!--another slot-->
        <Layouter type="topMainSideDown">
            <div slot="top" class="top">
                this is top.
            </div>
            <div slot="main" class="main">
                this is main.
            </div>
            <div slot="side" class="side">
                this is side.
            </div>
            <div slot="down" class="down">
                this is down.
            </div>
        </Layouter>
    </div>
    <div :slot="navConfig.exampleBody[2].title">
        <!--another slot-->
        <Layouter type="topSideMainDown">
            <div slot="top" class="top">
                this is top.
            </div>
            <div slot="side" class="side">
                this is side.
            </div>
            <div slot="main" class="main">
                this is main.
            </div>
            <div slot="down" class="down">
                this is down.
            </div>
        </Layouter>
    </div>
    <div :slot="navConfig.exampleBody[3].title">
        <!--another slot-->
        <Layouter type="sideTopMainDown">
            <div slot="side" class="side-large">
                this is side.
            </div>
            <div slot="top" class="top">
                this is top.
            </div>
            <div slot="main" class="main">
                this is main.
            </div>
            <div slot="down" class="down">
                this is down.
            </div>
        </Layouter>
    </div>
  </nav-wrap>
</template>

<script>
export default {
  name: 'LayoutWrap',
  data() {
    return {
      navConfig: {
        navTitle: 'Layout 布局',
        navExplain: '协助进行页面级整体布局。',
        when2useExplain: [
          '使得页面变得整洁有序。'
        ],
        exampleBody: [
          {
            title: '上-中-下，布局',
            code: `
<Layouter>
    <div slot="top" class="top">
        this is top.
    </div>
    <div slot="main" class="main">
        this is main.
    </div>
    <div slot="down" class="down">
        this is down.
    </div>
</Layouter>
`
          },
          {
            title: '上-中-侧-下，布局',
            code: `
<Layouter type="topMainSideDown">
    <div slot="top" class="top">
        this is top.
    </div>
    <div slot="main" class="main">
        this is main.
    </div>
    <div slot="side" class="side">
        this is side.
    </div>
    <div slot="down" class="down">
        this is down.
    </div>
</Layouter>
`
          },
          {
              title: '上-侧-中-下，布局',
              code: `
<Layouter type="topSideMainDown">
    <div slot="top" class="top">
        this is top.
    </div>
    <div slot="side" class="side">
        this is side.
    </div>
    <div slot="main" class="main">
        this is main.
    </div>
    <div slot="down" class="down">
        this is down.
    </div>
</Layouter>
`
          },
          {
              title: '侧-上-中-下，布局',
              code: `
<Layouter type="sideTopMainDown">
    <div slot="side" class="side">
        this is side.
    </div>
    <div slot="top" class="top">
        this is top.
    </div>
    <div slot="main" class="main">
        this is main.
    </div>
    <div slot="down" class="down">
        this is down.
    </div>
</Layouter>
`
          }
        ],
        api: [
          ['type', '布局类型', 'string', 'topMainDown']
        ]
      }
    }
  }
}
</script>
