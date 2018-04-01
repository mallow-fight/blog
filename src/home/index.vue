<style lang="less" src="./index.less" scoped></style>
<template>
    <div id="home">
        <div class="guide">
            <Guide />
        </div>
        <div class="article">
            <router-view />
        </div>
    </div>
</template>
<script>
import guide from './guide/index.vue'
    export default {
        name: 'home',
        components: {
            Guide: guide
        }
    }
</script>