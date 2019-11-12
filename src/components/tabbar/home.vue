<template>
<div class="box">
    <div class="box1">
      <mt-swipe >
        <mt-swipe-item v-for="(item,index) in lunbos" :key="index">
          <img :src="item.img" alt class="swipeimg" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img class="liImg" src="http://192.168.3.2:4000/15200d52-menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photoList">
          <img class="liImg" src="http://192.168.3.2:4000/64e2fbce-menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link  to="/home/goodList">
         <img class="liImg" src="http://192.168.3.2:4000/a99e8466-menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
         <img class="liImg" src="http://192.168.3.2:4000/64d2fcb9-menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img class="liImg" src="http://192.168.3.2:4000/28fc050c-menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
         <img class="liImg" src="http://192.168.3.2:4000/19ace747-menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
       lunbos:[]
    }
  },
  created(){
      this.getLunbo()
  },
  methods: {
    getLunbo(){
        this.$http.get("http://192.168.3.2:8080/api/getlunbo").then(response =>{
         
          if(response.body.status === 0){
            this.lunbos = response.body.message
          }else{
            Toast("数据加载失败")
          }
          
        })
    }
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 461px;
  background-color: #fff
}
.box1{
  width: 100%;
  height: 200px;
}
.swipeimg {
  width: 100%;
  height: 200px;
}
.liImg{
   width: 60px;
   height: 60px;
}
li{
  background-color: #fff
}
.mui-grid-view.mui-grid-9{
  background-color: #fff;
  border: 0;

}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
  border : 0;
}
</style>