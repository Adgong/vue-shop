<template>
  <div class="newsinfo-container">
    <h3 class="title">{{lists.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{lists.add_time |dateFormat}}</span>
      <span>点击：{{lists.click}}次</span>
    </p>
    <hr />
    <div v-html="lists.content"></div>
    <div>
      <h3>发表评论</h3>
      <hr />
      <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="msg"></textarea>
      <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
      <div class="cmt-list" v-for="(item,index) in arrlists" :key="index">
        <div class="cmt-item">
          <div
            class="cmt-title"
          >第{{index+1}}楼 用户：{{item.user_name}} 发表时间：{{item.add_time | dateFormat}}</div>
          <div class="cmt-body">{{item.content}}</div>
        </div>
      </div>
      <mt-button type="danger" size="large" @click="leijia">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      lists: {},
      arrlists: [],
      count: 1,
      arr: [],
      msg: ""
    };
  },
  created() {
    this.getnew();
    this.getPinlun();
  },
  methods: {
    leijia() {
      this.count = this.count + 1;
      console.log(this.arr);
      this.getPinlun();
    },
    getnew() {
      var a = this.$route.params.id;
      var url = "api/getnew/";
      url = url + a;
      this.$http.get(url).then(response => {
        console.log(response.body);
        if (response.body.status === 0) {
          this.lists = response.body.message[0];
          console.log(this.lists);
        } else {
          Toast("数据加载失败");
        }
      });
    },
    getPinlun() {
      let a = this.$route.params.id;
      var url = "api/getcomments/";
      url = url + a + "?pageindex=" + this.count;
      console.log(url);
      this.$http.get(url).then(response => {
        console.log(response.body);
        if (response.body.status === 0) {
          this.arr = response.body.message;
          this.arrlists = this.arrlists.concat(this.arr);
        } else {
          Toast("数据加载失败");
        }
      });

      console.log(this.arrlists);
    },
    postComment() {
        if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空");
        }
        this.$http
        .post("api/postcomment/" + this.$route.params.id, {
            content: this.msg.trim()
        })
        .then(result => {
            if (result.body.status === 0) {
            var comment = {
                user_name: "匿名用户",
                add_time: Date.now(),
                content: this.msg.trim()
            };
            this.arrlists.unshift(comment)
            this.msg=""
            }
        });
    }
  },
  
};
</script>

<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 4px;
}
.title {
  font-size: 16px;
  text-align: center;
  margin: 15px 0;
  color: red;
}
.subtitle {
  font-size: 13px;
  color: #226aff;
  display: flex;
  justify-content: space-between;
}
.mint-button--danger {
  color: red;
  background-color: #fff;
  border: 1px solid red;
  padding-bottom: 80px;
}
.cmt-list {
  margin: 5px 0;
}
.cmt-item .cmt-title {
  line-height: 30px;
  background-color: #ccc;
  font-size: 13px;
}
.cmt-body {
  line-height: 35px;
  text-indent: 2em;
  font-size: 13px;
}
</style>