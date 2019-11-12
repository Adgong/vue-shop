<template>
  <div class="goodsinfo-container">
    <transition @beforeEnter="beforeEnter" @enter="enter" @after-enter="afterEnter">
    <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
        <div>
          <swiper :lunbo="list" :isfull="true" ></swiper>
        </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
				<div class="mui-card-header">{{arr.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <p class="price">
              市场价:<del>￥{{arr.market_price}}</del>
              &nbsp;&nbsp;销售价:<span class="now_price">￥{{arr.sell_price}}</span>
            </p>
            <p>
              购买数量：
               <numbox @getcount="getSelectedCount"></numbox>
            </p>
            <p>
              <mt-button type="primary" size="small">立即购买</mt-button>
              <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            </p>
					</div>

				</div>
		</div>
    <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <p>商品货号：{{arr.goods_no}}</p>
            <p>库存情况：{{arr.stock_quantity}}件</p>
            <p>上架时间：{{arr.add_time | dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
          
          <mt-button type="primary" size="large" plain @click="btn1(arr.id)">图文介绍</mt-button>
          <mt-button type="danger" size="large" plain @click="btn2(arr.id)">商品评论</mt-button>
        </div>
			</div>
  </div>    
</template>

<script>
import Vue from 'vue'
import swiper from '../commons/Swiper.vue'
import numbox from '../commons/numbox.vue'
export default {
  data() {
    return {
      list:[],
      arr:{},
      id:this.$route.params.id,
      rootPath:Vue.http.options.root,
      ballFlag:false,
      selectedCount:1,
    }
  },
  created() {
     this.getthum()
     this.getinfo()
  },
  methods: {
    getthum(){
      this.$http.get('api/getthumimages/'+this.id).then(result =>{
        if(result.body.status === 0){
          result.body.message.forEach(item =>{
              item.src = this.rootPath + item.src
              item.img = item.src
          })
          this.list = result.body.message
        }
      })
    },
    getinfo(){
      this.$http.get('api/goods/getinfo/'+this.id).then(result =>{
          if(result.body.status === 0){
            this.arr = result.body.message[0]
          }
      })
    },
    getSelectedCount(count){
      this.selectedCount = count;
    },
    addToShopCar(){
      this.ballFlag = ! this.ballFlag

      var goodinfo = {
        id:this.id,
        count:this.selectedCount,
        price:this.arr.sell_price,
        selected:true
      };
      this.$store.commit("addToCar",goodinfo)

    },
    beforeEnter(el){
      el.style.transform = "translate(0,0)"
    },
    enter(el,done){
      el.offsetWidth;
      var ballPosition = this.$refs.ball.getBoundingClientRect()
      var badgePosition = document.getElementById("badge").getBoundingClientRect()
      var xDist = badgePosition.left-ballPosition.left;
      var yDist = badgePosition.top-ballPosition.top;
      el.style.transform=`translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 0.5s ease-out";
      done();
    },
    afterEnter(el){
      this.ballFlag = !this.ballFlag;
    },
    btn1(id){
      this.$router.push("/home/goodDesc/"+id);
    },
    btn2(id){
      this.$router.push("/home/goodComment/"+id);
    }
  },
  components:{
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.ball{
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  z-index:99;
  top:390px;
  left:152px;
}
.now_price{
  color:red;
  font-size: 15px;
  font-weight: bold;
}
.mui-card-footer{
  display: block;
  button{
    margin: 10px 2px
  }
}
</style>