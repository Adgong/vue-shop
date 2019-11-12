<template>
  <div class="mui-numbox" data-numbox-min="0" data-numbox-max="100">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="0" @change="countChanged" ref="numbox"/>
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
    countChanged(){
      this.$emit("getcount",parseInt(this.$refs.numbox.value));
    }
  },
};
</script>

<style>
</style>