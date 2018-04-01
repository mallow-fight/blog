<style scoped>
    .NavWrap{
        width: 80%;
    }
    .navTitle{
        font-size: 1.5rem;
        font-weight: 800;
    }
    .navExplain{
        font-size: 1rem;
        margin-top: 1rem;
    }
    .when2useTitle,.exampleTitle,.apiTitle{
        font-size: 1.2rem;
        margin-top: 1rem;
        font-weight: 700;
    }
    .when2useExplain{
        font-size: 1rem;
        margin-top: .5rem;
    }
    .example{
        border: 1px solid #ebedf0;
        margin-top: 1rem;
    }
    .slot{
        padding: 1rem;
    }
    .get-code{
        text-align: center;
        color: #ebedf0;
        cursor: pointer;
    }
    .get-code:hover{
        color: skyblue;
    }
    .code{
        display: none;
    }
    .focusCode{
        display: block;
    }
    .api{
        border-color: #ebedf0;
        text-align: left;
        font-size: .8rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .api-head th{
        padding: .5rem;
        background: rgba(0, 0, 0, 0.02);
    }
    .api-body td{
        padding: .5rem;
    }
    .exTitle{
        font-size: .7rem;
        text-indent: .5rem;
        line-height: 2rem;
    }
</style>
<template>
    <div class="NavWrap">
        <div class="navTitle">{{navConfig.navTitle}}</div>
        <div class="navExplain">{{navConfig.navExplain}}</div>
        <div class="when2useTitle">何时使用</div>
        <div class="when2useExplain" v-for="ex in navConfig.when2useExplain" :key="ex">{{ex}}</div>
        <div class="exampleTitle">例子</div>
        <div class="example" v-for="ex in navConfig.exampleBody" :key="ex.title">
            <div class="exTitle">{{ex.title}}</div>
            <div class="slot">
                <slot :name="ex.title" />
            </div>
            <div class="get-code" @click="getCode(ex.title)">查看代码</div>
            <div :class="{code: true, focusCode: focusTitle === ex.title}">
                <pre><code class="language-js">{{ex.code}}</code></pre>
            </div>
        </div>
        <div class="apiTitle">参考文档</div>
        <table class="api" border="1">
            <tr class="api-head">
                <th>参数</th>
                <th>说明</th>
                <th>类型</th>
                <th>默认值</th>
            </tr>
            <tr class="api-body" v-for="(apis, inx) in navConfig.api" :key="inx">
                <td v-for="api in apis" :key="api">
                    {{api}}
                </td>
            </tr>
        </table>
        <div v-if="navConfig.todos && navConfig.todos.length" class="apiTitle">todo</div>
        <div class="todo" v-for="(todo, inx) in navConfig.todos" :key="inx">
            -   {{todo}}
        </div>
    </div>
</template>
<script>
    export default {
        name: 'NavWrap',
        props: {
            navConfig: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {
                focusTitle: ''
            }
        },
        methods: {
            getCode(title) {
                if(this.focusTitle === title) return this.focusTitle = ''
                this.focusTitle = title
            }
        }
    }
</script>