<template>
   <mt-swipe >
        <mt-swipe-item v-for="(item,index) in lunbo" :key="index">
          <img :src="item.img" :class="{'swipeimg':isfull}" />
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
    props:["lunbo","isfull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;
    text-align: center;
}
.swipeimg{
    width: 100%;
    height: 100%;
}
</style>