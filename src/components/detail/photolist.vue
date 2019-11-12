<template>
  <div class="box1">
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div
          class="mui-scroll"
          style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;"
        >
          <a
            :class="['mui-control-item',item.id==0?'mui-active':'']"
            v-for="item in lists"
            :key="item.id"
            @tap="getPhotos(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <ul class="photo-list">
      <li v-for="(item, index) in items" :key="index">
        <router-link :to="'/home/photoinfo/'+item.id">
          <img v-lazy="'http://192.168.3.2:8080'+item.img_url" />
          <div class="info">
            <h1 class="info-title">{{item.title}}</h1>
            <div class="info-body">{{item.zhaiyao}}</div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      items: [],
      lists: []
    };
  },
  created() {
    this.getCategory();
    this.getPhotos(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数 系数越大，滚动速度越慢，滚动距离了越小，默认值0.0006
    });
  },
  methods: {
    getCategory() {
      this.$http.get("api/getimgcategory").then(response => {
        if (response.body.status === 0) {
          response.body.message.unshift({ title: "全部", id: 0 });
          this.lists = response.body.message;
          console.log(this.lists);
        } else {
          Toast("数据加载失败");
        }
      });
    },
    leijia() {
      this.count = this.count + 1;
      this.getPinlun();
    },
    getPhotos(itemId) {
      this.$http.get("api/getimages/" + itemId).then(response => {
        if (response.body.status === 0) {
          this.items = response.body.message;
          console.log(this.lists);
        } else {
          Toast("数据加载失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-x;
}
.box1 {
  width: 100%;
  height: 50px;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 40px;
}
.photo-list li {
  background-color: #ccc;
  text-align: center;
  margin-bottom: 10px;
  box-shadow: 0 0 9px #999;
  position: relative;
}
.photo-list li img {
  width: 100%;
  vertical-align: middle;
}
.photo-list li .info {
  color: white;
  text-align: left;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  max-height: 84px;
}
.photo-list li .info-title {
  font-size: 14px;
}
.photo-list li .info-body {
  font-size: 13px;
}
img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>