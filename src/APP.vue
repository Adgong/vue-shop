<template>
  <div class="container">
    <mt-header title="ECShop">
      <router-link to="/" slot="left" :style="{'display':display}">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
   <transition>
       <router-view ></router-view>
   </transition>
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>

      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
        display:"true"
    };
  },
  methods: {
    
  }
};
</script>
<style lang="scss" scoped>

// .container {
//   padding-top: 40px;
//   padding-bottom: 40px;
//   // overflow-x:hidden;

// }
.v-enter{
  opacity: 0;
  transform: translateX(100%)
}
.v-leave-to{
   opacity: 0;
  transform: translateX(-100%);
  position:absolute
}
.v-enter-active, .v-leave-active{
  transition: all 0.5s ease
}
</style>