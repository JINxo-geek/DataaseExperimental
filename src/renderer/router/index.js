import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '化学品管理',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        icon: 'dashboard',
        noCache: true
      }
    }]
  },
  {
    path: '/putaway',
    component: Layout,
    children: [{
      path: 'index',
      name: 'putaway',
      component: () =>
        import('@/views/putaway/index'),
      meta: {
        title: '入库',
        icon: 'form'
      }
    }]
  },
  {
    path: '/log',
    component: Layout,
    children: [{
      path: 'index',
      name: 'log',
      component: () =>
        import('@/views/log/index'),
      meta: {
        title: '过期药品',
        icon: 'form'
      }
    }]
  },
  {
    path: '/tiao',
    component: Layout,
    children: [{
      path: 'index',
      name: 'tiao',
      component: () =>
        import('@/views/tiao/index'),
      meta: {
        title: '调配',
        icon: 'form'
      }
    }]
  },
  {
    path: '/supplier',
    component: Layout,
    children: [{
      path: 'index',
      name: 'supplier',
      component: () =>
        import('@/views/supplier/index'),
      meta: {
        title: '供货商',
        icon: 'form'
      }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/warehouse',
    component: Layout,
     meta: {
       title: '调配',
       icon: 'example',
       roles: ['admin']
     },
    children: [
      {
        path: 'warehouse',
        name: 'warehouse',
        component: () => import('@/views/warehouse/index'),
        meta: {
          title: '总库',
          icon: 'form',
          roles: ['admin']
        }
      },
    {
      path: 'warehouse1',
      name: 'warehouse1',
      component: () =>
        import ('@/views/warehouse1/index'),
      meta: {
        title: '分库1',
        icon: 'form'
      }
    },
    {
      path: 'warehouse2',
      name: 'warehouse2',
      component: () =>
        import ('@/views/warehouse2/index'),
      meta: {
        title: '分库2',
        icon: 'form'
      }
    },
    {
      path: 'warehouse3',
      name: 'warehouse3',
      component: () =>
        import ('@/views/warehouse3/index'),
      meta: {
        title: '分库3',
        icon: 'form'
      }
    }
    ]
  },
  {
    path: '/search',
    component: Layout,
    meta: {
      title: '查询',
      icon: 'example'
    },
    children: [
      {
        path: 'search',
        name: 'search',
        component: () =>
          import ('@/views/search/index'),
        meta: {
          title: '总库',
          icon: 'form'
        }
      },
      {
        path: 'search1',
        name: 'warehouse1',
        component: () =>
          import ('@/views/search1/index'),
        meta: {
          title: '分库1',
          icon: 'form'
        }
      },
      {
        path: 'search2',
        name: 'warehouse2',
        component: () =>
          import ('@/views/search2/index'),
        meta: {
          title: '分库2',
          icon: 'form'
        }
      },
      {
        path: 'search3',
        name: 'warehouse3',
        component: () =>
          import ('@/views/search3/index'),
        meta: {
          title: '分库3',
          icon: 'form'
        }
      }
    ]
  },
  



/*   {
    path: '/test',
    component: Layout,
    children: [{
      path: 'index',
      name: 'test',
      component: () =>
        import ('@/views/test2/index'),
      meta: {
        title: 'test',
        icon: 'form'
      }
    }]
  }, */

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

