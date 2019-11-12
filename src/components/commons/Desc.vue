<template>
  <div class="goodsdesc-container">
      <h3>{{list.title}}</h3>
      <hr>
      <div class="content">
          <p v-html="list.content"></p>
          <p align="center">
              <span style="color:#ff0000;font-size:16px">
                  <img :src="list.src" class="gomeImgLoad">
              </span>
          </p>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            list:{},
            id:this.$route.params.id,
        }
    },
    created() {
        this.getdesc()
    },
    methods: {
        getdesc(){
            this.$http.get("api/goods/getdesc/"+this.id).then(result =>{
                if(result.body.status === 0){
                    this.list = result.body.message[0]
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.goodsdesc-container{
    padding: 4px;
    h3{
        font-size: 16px;
        color:#226aff;
        text-align: center;
        margin:15px 0;
    }
}

.content p{
    font-size: 14px;
    margin-top: 0;
    margin-bottom: 10px;
    color:#8f8f94
}
.goodsdesc-container .content img{
    width: 100%;
}
</style>