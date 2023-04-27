import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  MessageBox
} from 'element-ui';

Vue.use(VueRouter)

const routes = [{
    path: "/",
    component: () => import('../views/Home.vue'),
    meta: {
      Auth: false,
      title:"廿一"
    },
    children: [{
      path: '/',
      name: "QuestionList",
      component: () => import('../views/forum/QuestionList.vue'),
      meta: {
        Auth: false
      }
    }]
  },
  {
    name: "createQuestion", //创建文章
    path: "/post",
    component: () => import('../views/forum/CreatePost.vue'),
    meta: {
      Auth: true,
      title:"创建文章"
    }
  },
  {
    name: "chatRoom", //聊天室
    path: "/chatRoom",
    component: () => import("../views/ChatRoom.vue"),
    meta: {
      Auth: false,
      title:"聊天室"
    }
  },
  {
    name: "Blog", //文章列表
    path: "/blog",
    component: () => import("../views/Blog/Blog.vue"),
    meta: {
      Auth: false,
      title:"博客"
    }
  },
  {
    path: "/blog/:articleId", //文章的详细信息
    component: () => import("../views/Blog/BlogDeatil.vue"),
    meta: {
      Auth: false
    }
  },
  {
    name: "Tags", //话题列表
    path: "/tags",
    component: () => import("../views/Tags.vue"),
    meta: {
      Auth: false
    }
  },
  {
    path: "/aboutme", //关于我
    component: () => import("../views/AboutMe.vue"),
    meta: {
      Auth: false,
      title:"关于我"
    }
  },
  {
    // name: "following",  //关注
    path: "/following",
    component: () => import("../components/Following.vue"),
    meta: {
      Auth: true,
      title:"关注"
    },
    children: [{
      path: "",
      component: () => import("../components/FollowingList.vue"),
      meta: {
        Auth: true
      }
    }, {
      name: "follower",
      path: "/follower",
      component: () => import("../components/FollowerList.vue"),
      meta: {
        Auth: true
      }
    }]
  }, {
    name: "collection", //收藏
    path: "/collections",
    component: () => import("../views/collecting.vue"),
    meta: {
      Auth: true,
      title:"收藏"
    }
  },
  {
    name: "profile", //个人主页
    path: "/profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      Auth: true,
      title:"个人主页"
    }
  },
  {
    name:'category', //文章分类
    path: '/category',
    component: () => import('../views/Category.vue'),
    meta: {
      Auth: false,
      title: '文章分类'
    }
  },
  {
    path: '/:questionId', //问题详情
    name: "QuestionDetail",
    component: () => import('../views/forum/QuestionsDetail.vue'),
    meta: {
      Auth: false,
      title:"问题详情"
    }
  }

]

const router = new VueRouter({
  routes
})

//前置路由守卫
router.beforeEach((to, from, next) => {
  //校验登录状态
  if (to.meta.Auth) {
    //已经登录
    if (localStorage.getItem("user")) {
      next()
    } else {
      MessageBox.confirm('此页面需要登录,请前往登录', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        router.replace({
          name: ""
        },()=>{})
      }).catch(() => {
        next(false);
      })
    }
  } else {
    next()
  }

})


//后置路由守卫
router.afterEach((to, from) => {
  document.title= to.meta.title || "廿一"
})

export default router