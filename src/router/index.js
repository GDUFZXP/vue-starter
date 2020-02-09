import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Hello from '../views/Hello.vue'
import Book from '../views/Book.vue'
import PageOne from "../views/PageOne.vue";
import App from "../App.vue";
import About from '../views/About.vue'
import PageThree from "../views/PageThree";
import PageFour from "../views/PageFour";
import Index from "../views/Index";
import PageTwo from "../views/PageTwo";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '导航1',
    component: Index,
    children :[
      {
        path: "/pageOne",
        name: "页面1",
        component: PageOne
      },{
        path: "/pageTwo",
        name: "页面2",
        component: PageTwo
      }
    ]
  },
  {
    path:"/navi",
    name:"导航2",
    component: App,
    children: [
      {
        path: "/pageThree",
        name: "页面3",
        component: PageThree
      },{
        path: "/pageFour",
        name: "页面4",
        component: PageFour
      }
    ]
  },
]

const router = new VueRouter({
  //model 和 base 两个参数公共支持 url 通过斜杠访问而不用井号
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
