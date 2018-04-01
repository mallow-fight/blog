<template>
    <div class="icon-wrap">
        <div class="title">用法</div>
        <pre>
            <code class="language-js">
                {{usage}}
            </code>
        </pre>
        <a class="gotoKnow" href="https://ant.design/components/icon-cn/" target="blank">点击前往了解更多图标</a>
    </div>
</template>
<script>
    export default {
        name: 'IconWrap',
        data() {
            return {
                usage: `
for example.
...
<Iconer class="someClass" link="icon-github" />
...`
            }
        }
    }
</script>
<style scoped>
    .icon-wrap{
        width: 90%;
    }
    .title{
        font-size: 1.5rem;
        font-weight: 800;
    }
    .gotoKnow{
        color: black;
        font-size: 1rem;
        font-weight: 400;
        margin-top: 1rem;
    }
</style>