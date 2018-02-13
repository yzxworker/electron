<template>
    <el-container>
        <el-header>
            <el-input
                class="wirterIn"
                size="medium"
                placeholder="请输入标题"
                suffix-icon="el-icon-date"
                v-model="title">
            </el-input>
        </el-header>
        <el-main>
            <VueEditor v-model="content" class="editor" placeholder="请输入文章"></VueEditor>
        </el-main>
        <el-footer>
            <el-button v-if="revamp" type="primary" @click="handleAmend">修改文章</el-button>
            <el-button v-else type="primary" @click="handleSubmit">发表文章</el-button>
        </el-footer>
    </el-container>
</template>

<script>
import { VueEditor } from 'vue2-editor'
  export default {
    name: 'baselist',
    components:{ VueEditor },
    methods: {
        handleSubmit() {
            this.axios.post('/article/addArticle',{
                title: this.title,
                content: this.content
            })
            .then( (data) => {
                console.log( data.data );
                if( data.data.state ) {
                    this.$message({
                        showClose: true,
                        message: data.data.msg,
                        type: 'success'
                    });
                this.$router.push( { name: 'ArticlePage', params: { articleID: data.data.id } } );
                }
            } )
        },
        handleAmend() {
            this.axios.post('/article/update',{
                title: this.title,
                content: this.content,
                id: this.articleID
            })
            .then( (data) => {
                console.log( data.data );
                if( data.data.state ) {
                    this.$message({
                        showClose: true,
                        message: data.data.msg,
                        type: 'success'
                    });
                this.$router.push( { name: 'ArticlePage', params: { articleID: data.data.id } } );
                }
            } )
        }
    },
    data() {
        return {
            content: '',
            title: '',
            revamp: false,
            articleID: ''
        }
    },
    created() {
        const articleID = this.$route.params.articleID;
        if( articleID ) {
            this.revamp = true;
            this.articleID = articleID;
            this.axios.post('/article/getArticle',{
                id: articleID
            })
            .then( (data) => {
                const result = data.data.msg;
                this.content = result.content;
                this.title = result.title;
            } )
        }
    }
  }
</script>

<style>
.editor {
    height: 100%;
}
.wirterIn {
    margin-top: 24px;
}
.quillWrapper {
    position: relative;
}
#quill-container {
    height: auto;
    position: absolute;
    top: 48px;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
