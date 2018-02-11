<template>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="time"
      label="时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者"
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题">
    </el-table-column>
    <el-table-column
      prop="abstract"
      label="简介">
    </el-table-column>
  </el-table>
</template>

<script>
import { VueEditor } from 'vue2-editor'
  export default {
    name: 'baselist',
    components:{ VueEditor },
    data() {
        return {
            tableData: []
        }
    },
    created() {
        this.axios.post('/article/getAll')
        .then( (data) => {
            if( data.data.state ) {
                const datas = data.data.msg;
                datas.map( ( item ) => {
                    const table = {};
                    table.time = item.time;
                    table.author = item.author;
                    table.title = item.title;
                    table.abstract = item.abstract;
                    this.tableData.push( table );
                } );
            }
        } )
    }
  }
</script>

<style scoped>
.editor {
    height: 100%;
}
</style>
