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
                        <router-link class="titlelink" :to="'/home/showarticle/'+scope.row.id">{{ scope.row.title }}</router-link>
                    </template>
                </el-table-column>
                <el-table-column
                width="160"
                label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit( scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete( scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination
                class="article-pagination"
                background
                layout="sizes, prev, pager, next"
                :total="total"
                :page-size="size"
                @size-change="handleSizeChange"
                @current-change="hnadleCurrent"
            >
            </el-pagination>
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
            tableData: [],
            total: 0,
            size: 20
        }
    },
    methods: {
        handleSort(a, b) {
            const next = moment(a.time,'YYYY年MM月DD日 HH:mm:ss')._d.getTime();
            const last = moment(b.time,'YYYY年MM月DD日 HH:mm:ss')._d.getTime();
            return next - last;
        },
        handleGetArticle( mark ) {
            this.axios.post('/article/getAll',{
                pagemark: mark,
                pagesize: this.size
            })
            .then( (data) => {
                if( data.data.state ) {
                    const datas = data.data.msg;
                    this.total = data.data.count[0]['COUNT(*)'];
                    const tableData = []
                    datas.map( ( item ) => {
                        const table = {};
                        table.time = moment(item.time).format('YYYY年MM月DD日 HH:mm:ss');
                        table.id = item.id
                        table.author = item.author;
                        table.title = item.title;
                        table.abstract = item.abstract;
                        tableData.push( table );
                    } );
                    this.tableData = tableData;
                }
            } )
        },
        hnadleCurrent( mark ) {
            this.handleGetArticle( mark );
        },
        handleSizeChange( size ) {
            this.size = size;
            this.handleGetArticle( 1 );
        },
        handleEdit( rowData ) {
            this.$router.push( { name: 'writeanarticle', params: { articleID: rowData.id } } );
        },
        handleDelete( rowData ) {

        }
    },
    created() {
        this.handleGetArticle( 1 );
    }
  }
</script>

<style scoped>
.editor {
    height: 100%;
}
.titlelink {
    text-decoration: none;
    color: #000;
}
.article-pagination {
    text-align: center;
    margin-top: 10px;
 }
</style>
