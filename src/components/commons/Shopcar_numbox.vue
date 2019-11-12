<template>
  <div class="mui-numbox" data-numbox-min="0" data-numbox-max="100">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initcount"
      @change="countChanged"
      ref="numbox"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button" disabled>+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
      this.$store.commit("updateGoodsInfo",{
        id:this.goodid,
        count:this.$refs.numbox.value
      })
    }
  },
  props:["initcount","goodid"],
};
</script>

<style>
</style>