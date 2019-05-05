<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/login.html">会员登录</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit">
            <a class="selected" href="javascript:;">账户登录</a>
            <i>|</i>
            <a href="/register.html">免费注册</a>
          </div>

          <div id="loginform" name="loginform" class="login-box">
            <div class="input-box">
              <input
                id="txtUserName"
                name="txtUserName"
                type="text"
                placeholder="用户名/手机/邮箱"
                maxlength="50"
                v-model="adminlist"
              >
            </div>
            <div class="input-box">
              <input
                id="txtPassword"
                name="txtPassword"
                type="password"
                placeholder="输入登录密码"
                maxlength="16"
                v-model="password"
              >
            </div>
            <div class="btn-box">
              <input id="btnSubmit" name="btnSubmit" type="submit" value="立即登录" @click='loginlist'>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "/admin",
  data(){
      return{
          adminlist:'',
          password:''
      }
  },
  methods: {
      loginlist(){
                axios
        .post(
          `http://111.230.232.110:8899/site/account/login`,
          {
            user_name:this.adminlist,
            password:this.password
          }
        ).then(res=>{
            console.log(res);
            if(res.data.status!=0){
                alert(res.data.message)
                return
            }else{
                alert(res.data.message)
                location='http://localhost:8080/#/user'
            }
        })
      }
  },
};
</script>
    
<style>
</style>
