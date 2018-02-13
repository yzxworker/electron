<template>
    <el-container class="elrow">
        <el-aside width="200px">
            <el-menu class="el-menu-vertical-demo menuLeft" @open="handleOpen" @close="handleClose" router 
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span slot="title">文章</span>
                    </template>
                    <el-menu-item :index="'/home/baselist/'" >文章列表</el-menu-item>
                    <el-menu-item :index="'/home/writeanarticle/'" >撰写文章</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">用户</span></span>
                    </template>
                    <el-menu-item :index="'/home/userlist/'" >用户列表</el-menu-item>
                    <el-menu-item :index="'/home/user/'" >用户管理</el-menu-item>
                </el-submenu>
                <el-menu-item index="3">
                    <i class="el-icon-more"></i>
                    <span slot="title">其他</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <router-view></router-view>
    </el-container>
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
      },
      handleClose(key, keyPath) {
      },
      handleClick( item ) {
      }
    },
    created() {
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
