
<template>
  <div class="box">
    <ul class="mui-table-view" >
      <li class="mui-table-view-cell mui-media" v-for="(item,index) in lists" :key="index">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img :src="item.img_url" class="mui-media-object mui-pull-left" />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间:{{item.add_time |dateFormat}}</span>
              <span class="clickNum">点击：{{item.click}}次</span>
            </p>
          </div>
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
      lists:[]
    };
  },
  created() {
        this.getnewslist()
  },
  methods: {
    
    getnewslist(){
        this.$http.get("api/getnewslist").then(response =>{
          
          if(response.body.status === 0){
            this.lists = response.body.message
          }else{
            Toast("数据加载失败")
          }
          
        })
    }
  },
  
};
</script>

<style scoped>
ul {
  white-space: normal !important;
}
img {
  width: 42px;
  height: 42px;
  margin-right: 10px;
}
h1 {
  font-size: 14px;
}
span {
  font-size: 12px;
  color: blue;
}
.clickNum {
  position: absolute;
  right: 20px;
  top: 50%;
}
</style>