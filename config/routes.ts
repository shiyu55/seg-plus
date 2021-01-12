export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './ListTableList',
              },
              {
                path: '/dashboard',
                name: '驾驶仓',
                icon: 'dashboard',
                routes: [
                  {
                    name: '行政部',
                    path: '/dashboard/admin',

                    routes: [
                      {
                        name: '分公司行政部',
                        path: '/dashboard/admin/admin',
                        component: './Dashboard/admin',
                      },
                    ],
                    
                  },
                  {
                    name: '分公司经营部',
                    path: '/dashboard/manage',
                    component: './Dashboard/manage/index',
                  },
                  {
                    name: '分公司经营部编辑',
                    path: '/dashboard/manage/table',
                    component: './Dashboard/manage/table',
                  },
                ],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
