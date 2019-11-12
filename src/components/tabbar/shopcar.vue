<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card" v-for=" (item,index) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="changSelected(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="rootPath+item.thumb_path" />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodid="item.id"></numbox>
                <a href="#" @click="remove(item.id,index)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计1000</p>
            <p>
              已勾选商品
              <span class="red">{{$store.getters.getGoodsAll.piece}}</span> 件，总价
              <span class="red">￥{{$store.getters.getGoodsAll.totla}}</span>
            </p>
          </div>
          <button class="mint-button mint-button--danger mint-button--normal">
            <label class="mint-button-text">去结算</label>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../commons/Shopcar_numbox.vue";
import Vue from "vue";
export default {
  data() {
    return {
      goodslist: [],
      rootPath: Vue.http.options.root
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      var ids = [];
      this.$store.state.car.forEach(item => {
        ids.push(item.id);
      });

      if (ids.length < 0) {
        return;
      }
      console.log(ids);
      this.$http
        .get("api/goods/getshopcarlist/" + ids.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });
    },
    remove(id, index) {
      this.goodslist.splice(index, 1);
      this.$store.commit("RemoveToCar", id);
    },
    changSelected(id,val){
      this.$store.commit("updateGoodsSelected",{id,selected:val})
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
}
.red {
  color: red;
}
/* .left{
    position: absolute;
    top: 20px;
    left: 10px;
  } */
button {
  position: absolute;
  top: 25px;
  right: 15px;
}
</style>
