<template>
    <el-row class="elrow">
        <el-col :xs="8" :sm="6" :md="6" :lg="6" :xl="6" class="elcol">
            <el-menu class="el-menu-vertical-demo menuLeft" @open="handleOpen" @close="handleClose" router 
							background-color="#545c64"
							text-color="#fff"
  						active-text-color="#ffd04b"
						>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">数据库</span>
                    </template>
                    <el-menu-item v-for="(item,index) in dbList" :index="'/home/baselist/'+item" :key="index" >
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
        </el-col>
        <el-col :xs="16" :sm="18" :md="18" :lg="18" :xl="18">
            <router-view></router-view>
        </el-col>
    </el-row>
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
        this.axios.post('http://59.110.163.181:3000/home/getAll')
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
    height: 100%;
    border: none;
  }

  .menuLeft{ 
    width: 100%;
  }

  .elrow {
    height: 100%;
  }

  .elcol{
    height: 100%;
  }
</style>
