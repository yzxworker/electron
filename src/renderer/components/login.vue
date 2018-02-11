<template>
    <div class="centerIn">
		<h2 class="title">系统</h2>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
			<el-form-item prop="username">
				<el-input placeholder="账号" v-model="ruleForm.username" />
			</el-form-item>
			<el-form-item prop="password">
				<el-input placeholder="密码" v-model="ruleForm.password"/>
			</el-form-item>
			<el-form-item>
				<el-button-group class="btnwidth">
					<el-button class="entrywidth" type="primary" @click="register('ruleForm')">注册</el-button>
					<el-button class="entrywidth" type="primary" @click="login('ruleForm')">登录</el-button>
				</el-button-group>
			</el-form-item>
		</el-form>
    </div>
</template>

<script>

  export default {
	name: 'login',
	data() {
		return {
			ruleForm:{
				username: '',
				password: ''
			},
			rules: {
				username: [
					{ required: true, message: '请输入账号', trigger: 'blur' }
				],
				password: [
					{
						required: true, message: '请输入密码', trigger: 'blur'
					}
				]
			}
		}
	},
	methods: {
		register(ruleForm) {
			this.$refs[ruleForm].validate((valid) => {
				if (valid) {
					this.axios.post('http://59.110.163.181:3000/admin/register',{
						username: this.ruleForm.username,
						password: this.ruleForm.password
					})
					.then( (data) => {
						if( data.data.state ) {
							this.$message({
								showClose: true,
								message: '注册成功',
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
				} else {
					this.$message({
						showClose: true,
						message: '请填写完整信息',
						type: 'error'
					});
					return false;
				}
			});
		},
		login(ruleForm){
			this.$refs[ruleForm].validate((valid) => {
				if (valid) {
					this.axios.post('http://59.110.163.181:3000/admin/login',{
						username: this.ruleForm.username,
						password: this.ruleForm.password
					})
					.then( (data) => {
						if( data.data.state ) {
							this.$message({
								showClose: true,
								message: '登录成功',
								type: 'success'
                            });
                            this.$router.push('/home');
						} else {
							this.$message({
								showClose: true,
								message: data.data.msg,
								type: 'error'
							});
						}
					  } )
				} else {
					this.$message({
						showClose: true,
						message: '请填写完整信息',
						type: 'error'
					});
					return false;
				}
			});
		}
	}
  }
</script>

<style scoped>
  /* CSS */
  .centerIn{
	  position: fixed;
	  top:50%;
	  left: 50%;
	  width: 400px;
	  margin-top: -100px;
	  margin-left: -200px;
	  background: rgba(200, 216, 212, 0.3);
	  padding: 10px 10px 5px 10px;
	  border-radius: 5px;
	  
  }
  .btnwidth{
	  width: 100%;
  }
  .entrywidth{
	  width: 50%;
  }
  .title{
	  text-align: center;
  }
</style>
