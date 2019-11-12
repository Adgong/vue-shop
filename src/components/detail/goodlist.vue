<template>
  <div class="goods-list">
   
      <router-link :to="'/home/goodInfo/'+item.id" class="goods-item" v-for="(item,index) in list" :key="index" tag="div">
        <img :src="item.img_url" alt />
        <h1 class="title">{{item.title}}</h1>
        <div class="info">
          <p class="price">
            <span class="now">￥{{item.sell_price}}</span>
            <span class="old">￥{{item.market_price}}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩{{item.stock_quantity}}件</span>
          </p>
        </div>
      </router-link>
    <mt-button type="danger" size="large" @click="leijia">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      arr: [],
      number: 1
    };
  },
  created() {
    this.getgoods();
  },
  methods: {
    leijia() {
      this.number++;
      this.getgoods();
    },
    getgoods() {
      this.$http.get("api/getgoods?pageindex=" + this.number).then(result => {
        if (result.body.status == 0) {
          this.arr = result.body.message;
          this.list = this.list.concat(this.arr);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  background-color: #eee;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    .info {
      background-color: #eee;
      .price {
        margin: 0;
        padding: 5px;
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
.title {
  font-size: 14px;
  color: #000
}
img {
  width: 100%;
}
.mint-button--danger {
  color: #fff;
  background-color: #ef4f4f;
  border: 1px solid red;
  padding-bottom: 60px;
}
</style>