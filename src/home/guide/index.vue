<style src="./index.less" lang="less" scoped></style>
<template>
    <div>
        <button
        class="guide-item"
        @click="lead2somewhere(guide)"
        v-for="guide in guideList">
            <div
                :class="{'guide-item-title': guide.children && guide.children.length }"
            >{{guide.label}}</div>
            <div
            class="guide-item-child" 
            v-if="guide.children" 
            v-for="child in guide.children"
            @click="lead2somewhere(child)">
                {{child.label}}
            </div>
        </button>
    </div>
</template>
<script>
import guideList from './guide.list.js'
    export default {
        name: 'guide',
        data() {
            return {
                guideList
            }
        },
        methods: {
            lead2somewhere(guide) {
                if(guide.children) return
                const fullPath = this.$route.fullPath
                const isHome = fullPath.indexOf('home')
                let home = ''
                if(isHome === -1 || fullPath === '/home') { home = 'home/' }
                this.$router.push(home + guide.router)
            }
        }
    }
</script>