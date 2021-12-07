import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Wishlist from '../views/Wishlist.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/share/:id',
    name: 'ShareWishlist',
    component: () =>
      import(/* webpackChunkName: "wishlist" */ '../views/ShareWishlist.vue'),
  },
  {
    path: '/my-wishlists',
    name: 'MyWishlists',
    component: () =>
      import(/* webpackChunkName: "wishlist" */ '../views/MyWishlists.vue'),
  },
  {
    path: '/wishlist/:id',
    name: 'Wishlist',
    component: () =>
      import(/* webpackChunkName: "wishlist" */ '../views/Wishlist.vue'),
  },
  {
    path: '/wishlist/:id/:itemId',
    name: 'EditWishlist',
    component: () =>
      import(
        /* webpackChunkName: "wishlist" */ '../views/EditWishlistItem.vue'
      ),
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "wishlist" */ '../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "wishlist" */ '../views/Login.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
