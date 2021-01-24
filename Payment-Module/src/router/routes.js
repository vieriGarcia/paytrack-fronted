
const routes = [
  {
    path: '/Login',
    component: () => import('layouts/Login.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/payment/:idOrden/:token',
    component: () => import('layouts/Payment.vue'),
    children: [
      { path: '', component: () => import('pages/Payment.vue') }
    ]
  },
  {
    path: '/stadistic',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Estadistica.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
