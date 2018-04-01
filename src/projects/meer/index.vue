<style>
.logo {
    width: 2rem;
    height: 2rem;
    overflow: hidden;
}
.logo-text,.version{
    height: 2rem;
    font-size: 1.5rem;
    line-height: 2.2rem;
}
.logo-text{
    margin-left: 1rem;
}
.top-contain{
    padding-top: 1rem;
}
.top-line{
    margin-top: 1rem;
    margin-bottom: 1.5rem;
}
.github{
    width: 1.5rem;
    height: 1.5rem;
    margin-top: .3rem;
}
</style>
<template>
    <div>
        <Rower class="top-contain">
            <Coler span="5" offset="1">
                <Iconer class="logo" link="file-markdown" />
                <span class="logo-text">Meer</span>
            </Coler>
            <Coler span="1">
                <Liner direction="vertical" />
            </Coler>
            <Coler span="6" offset="9">
                <span class="version">版本：0.3.0</span>
            </Coler>
            <Coler span="2">
                <a href="https://github.com/mallow-fight/meer" target="blank">
                    <Iconer class="github" link="github" />
                </a>
            </Coler>
        </Rower>
        <Rower class="top-line">
            <Coler span="24">
                <Liner />
            </Coler>
        </Rower>
        <Rower>
            <Coler span="5" offset="1">
                <!--left-nav-->
                <LeftNav />
            </Coler>
            <Coler span="1">
                <Liner direction="vertical" />
            </Coler>
            <Coler span="17">
                <!--right-contain-->
                <router-view />
            </Coler>
        </Rower>
    </div>
</template>
<script>
// meer project entry.
// a ui design for Vue.
import LeftNav from './common/LeftNav.vue'
export default {
    name: 'meer',
    components: {
        LeftNav
    }
}
</script>