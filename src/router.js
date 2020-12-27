import Vue from "vue";
import Router from "vue-router";
import data from "@/views/data";
import wideScreen from "@/views/wideScreen";
import quality from "@/views/quality";
import NotFound from "@/views/404.vue";

Vue.use(Router);
export const AppRoutes = [{
    path: "/",
    name: "index",
    redirect: "wideScreen"
  },
  // {
  //   path: "*",
  //   name: "notFound",
  //   component: NotFound,
  //   // beforeEnter: requireAuth
  // },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: () =>
  //     import( /* webpackChunkName: "login" */ "@/views/Login.vue")
  // },
  {
    path: "/mainScreen",
    name: "data",
    component: data
  },
  {
    path: "/wideScreen",
    name: "wideScreen",
    component: wideScreen
  },
  {
    path: "/waterquality",
    name: "waterquality",
    component: quality
  }
];



export default new Router({
  // base: process.env.BASE_URL,
  routes: [{
      path: "*",
      name: "notFound",
      component: NotFound,
      // beforeEnter: requireAuth
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import( /* webpackChunkName: "llogin" */ "@/views/Login.vue")
    },
    ...AppRoutes
  ]
});
