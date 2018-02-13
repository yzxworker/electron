<template>
    <el-container>
        <el-header>
          <h2 class="article-title">{{ article.title }}</h2>
        </el-header>
        <el-main>
            <p class="author">作者: {{ article.author }}, 时间:{{ article.time }}</p>
            <div class="ql-container ql-snow">
                <div class="ql-editor">
                    <div class="article-content" v-html="article.content"></div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
  export default {
    name: 'articledetails',
    methods: {
        handleSubmit() {
        }
    },
    data() {
        return {
            article: {}
        }
    },
    created() {
        const ID = this.$route.params.articleID;
        if( typeof ID !== 'undefined' ) {
            this.axios.post('/article/getArticle',{
                id: ID
            })
            .then( (data) => {
                const result = data.data.msg;
                this.article = result;
            } )
        }
    }
  }
</script>

<style scoped>
.ql-container {
    height: auto;
}
.article-title {
    text-align: center;
    line-height: 60px;
}
.author {
    font-size: 14px;
    padding-left: 30px;
    line-height: 30px;
}
.article-content {
    padding: 10px 30px;
    background: rgba(204, 204, 204, 0.12);
    border-radius: 5px;
}
</style>
