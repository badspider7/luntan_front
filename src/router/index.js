import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: "/",
    component: () => import('../views/Home.vue')
  }, {
    name: "chatRoom",
    path: "/chatRoom",
    component: () => import("../views/ChatRoom.vue")
  },
  {
    name: "Blog",
    path: "/blog",
    component: () => import("../views/Blog.vue")
  },{
    name: "Tags",
    path: "/tags",
    component: () => import("../views/Tags.vue")
  },
  {
    path: "/aboutme",
    component:()=>import("../views/AboutMe.vue")
  }

]

const router = new VueRouter({
  routes
})

export default router