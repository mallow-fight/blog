<template>
    <div class="installer">
        <h1>使用脚手架创建vue项目</h1>
        <div class="code-area">
            <div>npm install -g @vue/cli</div>
            <div># or</div>
            <div>yarn global add @vue/cli</div>
            <div>vue create my-project</div>
        </div>
        <h1>install Meer</h1>
        <div class="code-area">
            <div>cd my-project</div>
            <div>npm install meer --save</div>
            <div># or</div>
            <div>yarn add meer --save</div>
            <div># 修改main.js</div>
            <div>import Meer from 'meer'</div>
            <div>Vue.use(Meer)</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Installer'
    }
</script>
<style scoped>
    .installer{
        font-family: "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;
        font-size: 1.5rem;
        width: 100%;
    }
    .code-area{
        width: 90%;
        margin-top: 1rem;
        padding: 1.6rem;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: #f6f8fa;
        border-radius: 3px;
    }
</style>