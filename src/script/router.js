import VueRouter from 'vue-router'
import home from '../components/tabbar/home.vue'
import member from '../components/tabbar/member.vue'
import shopcar from '../components/tabbar/shopcar.vue'
import search from '../components/tabbar/search.vue'
import newsList from '../components/detail/newslist.vue'
import photolist from '../components/detail/photolist.vue'
import newDetail from '../components/dataDetail/newDetail.vue'
import photosDetail from '../components/dataDetail/photosDetail.vue'
import goodlist from '../components/detail/goodlist.vue'
import goodDetail from '../components/dataDetail/goodDetail.vue'
import Comment from '../components/commons/Comment.vue'
import Desc from '../components/commons/desc.vue'
var router = new VueRouter({
    routes: [
        {
            path:'/',
            redirect:"/home"
        },
        {
            path:'/home',
            component:home
        },
        {
            path:'/member',
            component:member
        },
        {
            path:'/shopcar',
            component:shopcar
        },
        {
            path:'/search',
            component:search
        },{
            path:'/home/newsList',
            component:newsList
        },{
            path:'/home/photolist',
            component:photolist
        },{
            path:'/home/newsinfo/:id',
            component:newDetail
        },{
            path:'/home/photoinfo/:id',
            component:photosDetail
        },{
            path:'/home/goodlist',
            component:goodlist
        },{
            path:'/home/goodinfo/:id',
            component:goodDetail
        },
        {
            path:'/home/goodComment/:id',
            component:Comment
        },
        {
            path:'/home/goodDesc/:id',
            component:Desc
        }


    ],
    linkActiveClass:"mui-active"
})

export default router