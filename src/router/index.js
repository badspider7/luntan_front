import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: "/",
    component: () => import('../views/Home.vue'),
    children: [{
      path: '/',
      name: "QuestionList",
      component: () => import('../views/forum/QuestionList.vue')
    }]
  }, {
    name: "chatRoom",
    path: "/chatRoom",
    component: () => import("../views/ChatRoom.vue")
  },
  {
    name: "Blog",
    path: "/blog",
    component: () => import("../views/Blog.vue")
  }, {
    name: "Tags",
    path: "/tags",
    component: () => import("../views/Tags.vue")
  },
  {
    path: "/aboutme",
    component: () => import("../views/AboutMe.vue")
  },
  {
    path: '/:questionId',
    name: "QuestionDetail",
    component: () => import('../views/forum/QuestionsDetail.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router