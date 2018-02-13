<template>
    <el-container>
        <el-main>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                sortable
                :sort-method="handleSort"
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
                    label="标题"
                >
                    <template slot-scope="scope">
                        <router-link class="listlink" :to="'/home/showarticle/'+scope.row.id">{{ scope.row.title }}</router-link>
                    </template>
                </el-table-column>
                <el-table-column
                prop="abstract"
                label="简介">
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
        </el-footer>
    </el-container>
    
</template>

<script>
import { VueEditor } from 'vue2-editor';
import moment from 'moment';
  export default {
    name: 'baselist',
    components:{ VueEditor },
    data() {
        return {
            tableData: []
        }
    },
    methods: {
        handleSort(a, b) {
            const next = moment(a.time,'YYYY年MM月DD日,hh:mm:ss')._d.getTime();
            const last = moment(b.time,'YYYY年MM月DD日,hh:mm:ss')._d.getTime();
            return next - last;
        }
    },
    created() {
        this.axios.post('/article/getAll')
        .then( (data) => {
            if( data.data.state ) {
                const datas = data.data.msg;
                datas.map( ( item ) => {
                    const table = {};
                    table.time = moment(item.time).format('YYYY年MM月DD日,hh:mm:ss');
                    table.id = item.id
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
.listlink {
    text-decoration: none;
    color: #000;
}
</style>
