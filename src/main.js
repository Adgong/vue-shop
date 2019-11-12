//导入vue运行时版本
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem("car") || '[]')
var store = new Vuex.Store({
    state:{
        car:car
    },
    mutations:{
        addToCar(state,goodinfo){
            //1.car[]已存在该商品信息，更新购买数量
            //2.car[]不存在该商品信息，直接把商品放入到数组中
            var flag = false
            state.car.some(item =>{
                if(item.id == goodinfo.id){
                    item.count += parseInt(goodinfo.count)
                    flag = true
                    return true
                }
            })

            if(!flag){
                state.car.push(goodinfo)
            }
            localStorage.setItem("car",JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodinfo){
            state.car.some(item =>{
                if(item.id == goodinfo.id){
                    item.count = parseInt(goodinfo.count)
                    return true
                }
            })
            localStorage.setItem("car",JSON.stringify(state.car))
        },
        RemoveToCar(state,id){
            state.car.some((item,i) =>{
                if(item.id == id){
                    state.car.splice(i,1)
                    return true
                }
            })
            localStorage.setItem("car",JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some((item,i) =>{
                if(item.id == info.id){
                    item.selected = info.selected
                    return true
                }
            })
            localStorage.setItem("car",JSON.stringify(state.car))
        }
    },
    getters:{
        getAllCount(state){
            var count = 0
            state.car.forEach(item =>{
                count += item.count
            })
            return count
        },
        getGoodsCount(state){
            var o ={}
            state.car.forEach( item =>{
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state){
            var o ={}
            state.car.forEach( item =>{
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsAll(state){
            var o ={
                piece:0,
                totla:0
            }
            state.car.forEach( item =>{
                if(item.selected == true){
                    o.piece += item.count;
                    o.totla += item.count * item.price; 
                }
            })
            return o
        }
    }

})

//导入 mint-ui 和 mui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

import VuePreview from "vue-preview"
Vue.use(VuePreview)
import VueRouter from "vue-router"
Vue.use(VueRouter)
import router from './script/router'

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = "http://192.168.3.2:8080"
Vue.http.options.emulateJSON = true

//日期处理全局过滤器
import moment from "moment"
Vue.filter("dateFormat",function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

//导入组件
import APP from './APP.vue'


var vm = new Vue({

    el: "#app",
    render:c => c(APP),
    router,
    store
})

