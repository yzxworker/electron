<template>
        <VueEditor v-model="content" class="editor" placeholder="请输入文章"></VueEditor>
</template>

<script>
import { VueEditor } from 'vue2-editor'
  export default {
    name: 'baselist',
    components:{ VueEditor },
    data() {
        return {
            content: ''
        }
    }
  }
</script>

<style scoped>
.editor {
    height: 100%;
}
</style>
