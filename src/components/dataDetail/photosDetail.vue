<template>
  <div class="photoinfo-container">
      <h3>
          {{list.title}}
      </h3>
      <p class="subtitle">
          <span>发表时间:{{list.add_time | dateFormat}}</span>
          <span>点击：{{list.click}}次</span>
      </p>
      <hr>
      <div class="thumbs">
          <vue-preview :slides="arr" class="imgprev"></vue-preview>
      </div>
      <div class="content" v-html="list.content"></div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import Vue from "vue"
export default {
     data() {
         return {
             list:{},
             id:this.$route.params.id,
             arr:[],
             rootPath:Vue.http.options.root
         }
     },
     created() {
         this.getDetail()
         this.getThumbs()
     },
     methods: {
         getDetail(){ 
             this.$http.get("api/getimageInfo/"+this.id).then(response =>{
                 if(response.body.status === 0){
                     this.list = response.body.message[0]
                     console.log(this.list)
                 }else{
                     Toast("数据加载失败")
                 }
             })
         },
         getThumbs(){
             this.$http.get("api/getthumimages/"+this.id).then(response =>{
                 if(response.body.status === 0){
                    response.body.message.forEach(item =>{
                        item.src = this.rootPath+item.src;
                        item.msrc = item.src;
                        item.w = 600;
                        item.h = 400;
                    })
                     this.arr = response.body.message
                     console.log(this.arr)
                 }
             })
         }
     },
}
</script>

<style lang="scss" scoped>
.photoinfo-container h3{
    color:#26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
}
.photoinfo-container .subtitle{
    display: flex;
    justify-content: space-between;
    font-size: 13px
}
p{
    font-size: 14px;
    margin-top: 0;
    margin-bottom: 10px;
    color:#8f8f94;
}
.photoinfo-container .content{
    font-size: 13px;
    line-height: 30px;
}
</style>
<style lang="scss">
    .thumbs{
        .imgprev{
            .my-gallery{
                figure{
                    display: inline-block;
                    margin: 10px;
                }
                img{
                    width: 95px;
                    height: 70px;
                }
            }
        }
    }
</style>