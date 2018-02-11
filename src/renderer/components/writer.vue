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
            <el-button type="primary" @click="handleSubmit">发表文章</el-button>
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
            } )
        }
    },
    data() {
        return {
            content: '',
            title: ''
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
