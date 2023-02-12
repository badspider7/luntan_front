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
},
  {
    
    name: "createQuestion",//创建文章
    path: "/post",
    component: ()=> import('../views/forum/CreatePost.vue')
},
  {
    name: "chatRoom", //聊天室
    path: "/chatRoom",
    component: () => import("../views/ChatRoom.vue")
  },
  {
    name: "Blog",  //文章列表
    path: "/blog",
    component: () => import("../views/Blog/Blog.vue")
  },
  {
    path: "/blog/:articleId", //文章的详细信息
    component:() => import("../views/Blog/BlogDeatil.vue")
  },
  {
    name: "Tags", //问题的话题
    path: "/tags/:id",
    component: () => import("../views/Tags.vue")
  },
  {
    path: "/aboutme", //关于我
    component: () => import("../views/AboutMe.vue")
  },
  {
    name: "following",  //关注
    path: "/following",
    component:() => import("../components/Following.vue")
  }, {
    name: "collection", //收藏
    path: "/collections",
    component:() => import("../views/collecting.vue")
  },
  {
    path: '/:questionId',  //问题详情
    name: "QuestionDetail",
    component: () => import('../views/forum/QuestionsDetail.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router