<style lang="less" src="./index.less" scoped></style>
<script>
import articles from './index.js'
    export default {
        name: 'articles',
        render(h) {
            const renderArticle = (art) => {
                if(!art) return
                return art.map(tag => {
                    return h(
                        tag.name,
                        {
                            attrs: tag.attrs
                        },
                        [
                            tag.value,
                            renderArticle(tag.children)
                        ]
                    )
                })
            }
            return h(
                'div',
                {
                    class: {
                        mallow: true
                    }
                },
                renderArticle(articles[this.$route.query.id])
            )
        }
    }
</script>