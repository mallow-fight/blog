<style scoped>
    .leftNav{
        font-size: 1rem;
        font-weight: 600;
        width: 100%;
    }
    .linkText{
        height: 3rem;
        line-height: 3rem;
        color: #2c3e50;                
    }
    .components-hidden,.components-show{
        width: 1rem;
        height: 1rem;
        margin-left: 50%;
        vertical-align: middle;        
    }
    .kinds-key{
        font-size: .8rem;
        color: rgba(0, 0, 0, 0.45);
        text-indent: .2rem;
    }
    .kind-text{
        font-size: 1rem;
        text-indent: .4rem;
        font-weight: 400;
    }
    .components-height{
        line-height: 3rem;
    }
    .kind-link{
        display: block;
        color: #2c3e50;                        
    }
    .kind-link:hover,.kind-link-focus{
        background: rgba(0, 0, 0, 0.45);
        color: white;
    }
</style>
<template>
    <div class="leftNav">
        <router-link :to="path + 'install'">
            <div @click="removeFocus" class="linkText">安装指南</div>
        </router-link>
        <div class="linkText">
            <div @click="changeShowComponents">
                组件
                <svg v-show="!showComponents" class="components-hidden">
                    <use xlink:href="#icon-down"></use>
                </svg>
                <svg v-show="showComponents" class="components-show">
                    <use xlink:href="#icon-up"></use>
                </svg>
            </div>
        </div>
        <div class="components-height" v-show="showComponents">
            <div v-for="(kinds, key) in componentsList" :key="key">
                <div class="kinds-key">{{key}}</div>
                <div @click="keepFocus(key)" class="kind-text" v-for="(kind, key) in kinds" :key="key">
                    <router-link :class="{'kind-link': true, 'kind-link-focus': focusComponents === key}" :to="kind.path">
                        {{key}}&nbsp;{{kind.name}}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'LeftNav',
        props: {
            path: {
                type: String,
                default: '/home/projects/meer/'
            }
        },
        methods: {
            changeShowComponents() {
                this.showComponents = !this.showComponents
            },
            keepFocus(key) {
                this.focusComponents = key
                window.scroll(0, 0)
            },
            removeFocus(){
                this.focusComponents = ''
            }
        },
        data() {
            return {
                showComponents: true,
                focusComponents: '',
                componentsList: {
                    General: {
                        Button: {
                            name: '按钮',
                            path: this.path + 'Button'
                        },
                        Icon: {
                            name: '图标',
                            path: this.path + 'Icon'
                        }
                    },
                    Layout: {
                        Grid: {
                            name: '栅格',
                            path: this.path + 'Grid'
                        },
                        Layout: {
                            name: '布局',
                            path: this.path + 'Layout'
                        }
                    },
                    Navigation: {
                        Affix: {
                            name: '固钉',
                            path: this.path + 'Affix'
                        },
                        Breadcrumber: {
                            name: '面包屑',
                            path: this.path + 'Breadcrumb'
                        },
                        Dropdown: {
                            name: '下拉菜单',
                            path: this.path + 'Dropdown'
                        },
                        Menu: {
                            name: '导航菜单',
                            path: this.path + 'Menu'
                        },
                        Pagination: {
                            name: '分页',
                            path: this.path + 'Pagination'
                        },
                        Steps: {
                            name: '步骤条',
                            path: this.path + 'Steps'
                        }
                    },
                    'Data Entry': {
                        AutoComplete: {
                            name: '自动完成',
                            path: this.path + 'Autocomplete'
                        },
                        Cascader: {
                            name: '级联选择',
                            path: this.path + 'Cascader'
                        },
                        Checkbox: {
                            name: '多选框',
                            path: this.path + 'Checkbox'
                        },
                        DatePicker: {
                            name: '日期选择器',
                            path: this.path + 'DatePicker'
                        },
                        Form: {
                            name: '表单',
                            path: this.path + 'Form'
                        },
                        Input: {
                            name: '输入框',
                            path: this.path + 'Input'
                        },
                        InputNumber: {
                            name: '数字输入框',
                            path: this.path + 'InputNumber'
                        },
                        Mention: {
                            name: '提及',
                            path: this.path + 'Mention'
                        },
                        Rate: {
                            name: '评分',
                            path: this.path + 'Rate'
                        },
                        Radio: {
                            name: '单选框',
                            path: this.path + 'Radio'
                        },
                        Select: {
                            name: '选择器',
                            path: this.path + 'Select'
                        },
                        Slider: {
                            name: '滑动输入条',
                            path: this.path + 'Slider'
                        },
                        Switch: {
                            name: '开关',
                            path: this.path + 'Switch'
                        },
                        TreeSelect: {
                            name: '树选择',
                            path: this.path + 'TreeSelect'
                        },
                        TimePicker: {
                            name: '时间选择框',
                            path: this.path + 'TimePicker'
                        },
                        Transfer: {
                            name: '穿梭框',
                            path: this.path + 'Transfer'
                        },
                        Upload: {
                            name: '上传',
                            path: this.path + 'Upload'
                        }
                    },
                    'Data Display': {
                        Avatar: {
                            name: '头像',
                            path: this.path + 'Avatar'
                        },
                        Badge: {
                            name: '消息提示',
                            path: this.path + 'Badge'
                        },
                        Calendar: {
                            name: '日历',
                            path: this.path + 'Calendar'
                        },
                        Card: {
                            name: '卡片',
                            path: this.path + 'Card'
                        },
                        Carousel: {
                            name: '走马灯',
                            path: this.path + 'Carousel'
                        },
                        Collapse: {
                            name: '折叠面板',
                            path: this.path + 'Collapse'
                        },
                        List: {
                            name: '列表',
                            path: this.path + 'List'
                        },
                        Popover: {
                            name: '气泡卡片',
                            path: this.path + 'Popover'
                        },
                        Tooltip: {
                            name: '文字提示',
                            path: this.path + 'Tooltip'
                        },
                        Table: {
                            name: '表格',
                            path: this.path + 'Table'
                        },
                        Tabs: {
                            name: '标签页',
                            path: this.path + 'Tabs'
                        },
                        Tag: {
                            name: '标签',
                            path: this.path + 'Tag'
                        },
                        Timeline: {
                            name: '时间轴',
                            path: this.path + 'Timeline'
                        },
                        Tree: {
                            name: '树形控件',
                            path: this.path + 'Tree'
                        }
                    },
                    'Feedback': {
                        Alert: {
                            name: '警告提示',
                            path: this.path + 'Alert'
                        },
                        Modal: {
                            name: '对话框',
                            path: this.path + 'Modal'
                        },
                        Message: {
                            name: '全局提示',
                            path: this.path + 'Message'
                        },
                        Notification: {
                            name: '通知提醒框',
                            path: this.path + 'Notification'
                        },
                        Progress: {
                            name: '进度条',
                            path: this.path + 'Progress'
                        },
                        Popconfirm: {
                            name: '气泡确认框',
                            path: this.path + 'Popconfirm'
                        },
                        Spin: {
                            name: '加载中',
                            path: this.path + 'Spin'
                        }
                    },
                    'Other': {
                        Anchor: {
                            name: '锚点',
                            path: this.path + 'Anchor'
                        },
                        BackTop: {
                            name: '回到顶部',
                            path: this.path + 'BackTop'
                        },
                        Divider: {
                            name: '分割线',
                            path: this.path + 'Divider'
                        },
                        LocaleProvider: {
                            name: '国际化',
                            path: this.path + 'LocaleProvider'
                        }
                    }
                }
            }
        }
    }
</script>