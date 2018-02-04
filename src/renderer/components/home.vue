<template>
    <div class="centerIn">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">数据库</span>
                </template>
                <el-menu-item v-for="(item,index) in dbList" :index="'/home/baselist'" :key="index" >
                   {{ item }}
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<script>

  export default {
    name: 'home',
    data() {
      return {
          dbList:[]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClick( item ) {
          console.log(item);
      }, 
      getDatabase() {
        this.axios.post('http://localhost:3000/home/getAll')
        .then( (data) => {
            if( data.data.state ) {
                this.dbList = data.data.msg;
                this.$message({
                    showClose: true,
                    message: '查询成功',
                    type: 'success'
                });
            } else {
                this.$message({
                    showClose: true,
                    message: data.data.msg,
                    type: 'error'
                });
            }
            } )
      }
    },
    created() {
        this.getDatabase();
    }
  }
</script>

<style scoped>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
