import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Hello from '../views/Hello.vue'
import Book from '../views/Book.vue'
import BookList from "../views/BookList.vue";
import App from "../App.vue";
import About from '../views/About.vue'
import PageThree from "../views/PageThree";
import PageFour from "../views/PageFour";
import Index from "../views/Index";
import BookAdd from "../views/BookAdd";
import BookEdit from "../views/BookEdit";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '图书管理',
    component: Index,
    redirect: "bookList",//默认跳转的首页地址
    show:true,
    children :[
      {
        path: "/bookList",
        name: "图书列表",
        component: BookList
      },{
        path: "/bookAdd",
        name: "添加图书",
        component: BookAdd
      }
    ]
  },
  {
    path: "/bookEdit",
    name: "编辑书籍",
    show: false,
    component: BookEdit
  }
]

const router = new VueRouter({
  //model 和 base 两个参数公共支持 url 通过斜杠访问而不用井号
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
