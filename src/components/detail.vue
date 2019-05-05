<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box">
                <el-carousel height="311px">
                  <el-carousel-item v-for="(item, index) in imglist" :key="index">
                    <img :src="item.original_path" alt>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <div class="el-input-number el-input-number--small">
                          <span
                            role="button"
                            class="el-input-number__decrease"
                            @click="listnumdaa"
                            :class="{'is-disabled':listnum<=1}"
                          >
                            <i class="el-icon-minus"></i>
                          </span>
                          <span
                            role="button"
                            class="el-input-number__increase"
                            @click="listnumadd"
                            :class="{'is-disabled':listnum>=goodsinfo.stock_quantity}"
                          >
                            <i class="el-icon-plus"></i>
                          </span>
                          <div class="el-input el-input--small">
                            <!---->
                            <input
                              autocomplete="off"
                              size="small"
                              type="text"
                              rows="2"
                              max="60"
                              min="1"
                              validateevent="true"
                              class="el-input__inner"
                              role="spinbutton"
                              aria-valuemax="60"
                              aria-valuemin="1"
                              aria-valuenow="1"
                              aria-disabled="false"
                              v-model="listnum"
                              v-if="listnum>goodsinfo.stock_quantity?goodsinfo.stock_quantity:listnum"
                            >
                            <!---->
                            <!---->
                            <!---->
                          </div>
                        </div>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <div
                id="tabHead"
                class="tab-head"
                style="position: static; top: 517px; width: 925px;"
              >
                <ul>
                  <li>
                    <a href="javascript:;" :class="{selected:index==1}" @click="detaillist">商品介绍</a>
                  </li>
                  <li>
                    <a href="javascript:;" :class="{selected:index==2}" @click="detaillisttwo">商品评论</a>
                  </li>
                </ul>
              </div>
              <div
                class="tab-content entry"
                style="display: block;"
                v-html="goodsinfo.content"
                v-show="index==1"
              ></div>
              <div class="tab-content" style="display: block;" v-show="index==2">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          data-type="*10-1000"
                          nullmsg="请填写评论内容！"
                          v-model.trim="msg"
                          @keyup.13="listsubmie"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          value="提交评论"
                          class="submit"
                          @click="listsubmie"
                        >
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                      v-show="getbypage.length<1"
                    >暂无评论，快来抢沙发吧！</p>
                    <li v-for="(item, index) in getbypage" :key="index">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.reply_time | momentlist}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <div id="pagination" class="digg">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[5, 10, 15, 18]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pinlunlist.totalcount"
                        background
                      ></el-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="(item, index) in hotgoodslist" :key="index">
                    <div class="img-box">
                      <!-- <a href="#/site/goodsinfo/90" class> -->
                      <router-link :to="'/detail/'+item.id">
                        <img :src="item.img_url">
                      </router-link>
                      <!-- </a> -->
                    </div>
                    <div class="txt-box">
                      <!-- <a href="#/site/goodsinfo/90" class> -->
                      <router-link :to="'/detail/'+item.id">
                      {{item.title}}
                      <!-- </a> -->
                      </router-link>
                      <span>{{item.add_time | momentlist}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "detail",
  data() {
    return {
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      getbypage: [],
      index: 1,
      commentList: [],
      msg: "",
      listnum: 1,
      pinlunlist: [],
      pageSize: 10,
      pageIndex: 1
    };
  },
  created() {
    // console.log(this.$route.params.id);
    axios.get(
        `http://111.230.232.110:8899/site/goods/getgoodsinfo/${
          this.$route.params.id
        }`
      )
      .then(response => {
        // console.log(response);
        this.goodsinfo = response.data.message.goodsinfo;
        this.hotgoodslist = response.data.message.hotgoodslist;
        this.imglist = response.data.message.imglist;
      });

      axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.$route.params.id
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(response => {
          this.pinlunlist = response.data;
          console.log(response);
          this.getbypage = response.data.message;
        });
  },
  filters: {
    momentlist(value) {
      return moment(value).format("YYYY年MM月DD日");
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);  


    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
            axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.$route.params.id
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(response => {
          this.pinlunlist = response.data;
          console.log(response);
          this.getbypage = response.data.message;
        });
    },
    detaillist() {
      this.index = 1;
    },
    detaillisttwo() {
      this.index = 2;
    },
    listsubmie() {
      if (this.msg == "") {
        return;
      }
      axios
        .post(
          `http://111.230.232.110:8899/site/validate/comment/post/goods/${
            this.$route.params.id
          }`,
          {
            commenttxt: this.msg
          }
        )
        .then(response => {
          console.log(response);

          if (response.data.message == "评论成功") {
            axios
              .get(
                `http://111.230.232.110:8899/site/comment/getbypage/goods/${
                  this.$route.params.id
                }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
              )
              .then(response => {
                this.pinlunlist = response;
                console.log(response);
                this.getbypage = response.data.message;
              });
          }
        }),
        (this.msg = "");
    },
    listnumdaa() {
      if (this.listnum <= 1) {
        return;
      }
      this.listnum--;
    },
    listnumadd() {
      if (this.listnum >= this.goodsinfo.stock_quantity) {
        return;
      }
      this.listnum++;
    }
  },
  watch:{
    '$route.params.id'(vw,vo){
          axios.get(
        `http://111.230.232.110:8899/site/goods/getgoodsinfo/${
          vw
        }`
      )
      .then(response => {
        // console.log(response);
        this.goodsinfo = response.data.message.goodsinfo;
        this.hotgoodslist = response.data.message.hotgoodslist;
        this.imglist = response.data.message.imglist;
      });
    }
  }
};
</script>

<style>
.pic-box {
  width: 395px;
  height: 311px;
}

.pic-box img {
  width: 100%;
  height: 100%;
}
</style>
