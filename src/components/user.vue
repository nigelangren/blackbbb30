<template>
  <div class="el-row">
    <div class="el-col el-col-24">
      <div class="comp">
        <div class="tmpl routeanimate">
          <div class="section">
            <div class="location">
              <span>当前位置：</span>
              <a href="/index.html">首页</a> &gt;
              <a href="/user/center/index.html">会员中心</a>
            </div>
          </div>
          <div class="section clearfix">
            <div class="left-260">
              <div class="bg-wrap">
                <div class="avatar-box">
                  <a href="/user/center/avatar.html" class="img-box">
                    <i class="iconfont icon-user-full"></i>
                  </a>
                  <h3>ivanyb</h3>
                  <p>
                    <b>注册会员</b>
                  </p>
                </div>
                <div class="center-nav">
                  <ul>
                    <li>
                      <h2>
                        <i class="iconfont icon-order"></i>
                        <span>订单管理</span>
                      </h2>
                      <div class="list">
                        <p>
                          <a href="#/site/member/orderlist" class>
                            <i class="iconfont icon-arrow-right"></i>交易订单
                          </a>
                          <router-link to="/user/listindex">
                            <i class="iconfont icon-arrow-right"></i>首页
                          </router-link>
                          <router-link to="/user/order">
                            <i class="iconfont icon-arrow-right"></i>订单
                          </router-link>
                          <router-link to="/user/detatle">
                            <i class="iconfont icon-arrow-right"></i>详情
                          </router-link>
                        </p>
                      </div>
                    </li>
                    <li>
                      <h2>
                        <i class="iconfont icon-user"></i>
                        <span>账户管理</span>
                      </h2>
                      <div class="list">
                        <p>
                          <a href="#/site/member/center" class="router-link-exact-active">
                            <i class="iconfont icon-arrow-right"></i>账户资料
                          </a>
                        </p>
                        <p>
                          <a href="#/site/member/center" class="router-link-exact-active">
                            <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置
                          </a>
                        </p>
                        <p>
                          <a href="#/site/member/center" class="router-link-exact-active">
                            <i class="iconfont icon-arrow-right"></i>修改密码
                          </a>
                        </p>
                        <p>
                          <a href="javascript:void(0)" @click='logout'>
                            <!-- <router-link to="/logout"> -->
                              <i class="iconfont icon-arrow-right"></i>退出登录
                            <!-- </router-link> -->
                            
                          </a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="right-auto">
              <!-- <div class="bg-wrap" style="min-height: 765px;">
                <div class="sub-tit">
                  <ul>
                    <li class="selected">
                      <a href="javascript:;">个人中心</a>
                    </li>
                  </ul>
                </div>
                <div class="center-head clearfix">
                  <div class="img-box">
                    <i class="iconfont icon-user-full"></i>
                  </div>
                  <div class="list-box">
                    <h3>欢迎您~ ivanyb</h3>
                    <ul>
                      <li>组别：注册会员</li>
                      <li>手机：13987654321</li>
                      <li>Email:ivanyb1@qq.com</li>
                    </ul>
                  </div>
                </div>
                <div class="center-info clearfix"></div>
                <div class="center-tit">
                  <span>
                    <a href="/user/order-list.html">更多..</a>
                  </span>
                  <h3>
                    <i class="iconfont icon-order"></i>我的订单
                  </h3>
                </div>
                <div class="center-info clearfix">
                  <ul>
                    <li>已完成订单：0个</li>
                    <li>待完成订单：2个</li>
                  </ul>
                </div> -->
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
import axios from 'axios'
export default {
  name: "/user",
  created() {
          axios.get('http://111.230.232.110:8899/site/account/islogin').
      then(res=>{
        console.log(res);
        if(res.data.code=="nologin"){
          location = 'http://localhost:8080/#/adminlist'
        }
      })
  },
  methods: {
    logout(){
      axios.get('http://111.230.232.110:8899/site/account/logout').
      then(res=>{
        console.log(res);
        if(res.data.status=1){
          alert(res.data.message)
          location='http://localhost:8080/#/adminlist'
        }
      })
    }
  },
};
</script>

<style>

</style>
