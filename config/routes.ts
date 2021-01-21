export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
       /*  component: '../layouts/UserLayout', */
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },

        ],
      },
      {
        path: '/',
        // component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            // authority: ['admin', 'user'],
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
                path: '/personal',
                name: 'personal',
                icon: 'smile',
                component: './user/settings/personal',
              },

              {
                path: '/dashboard',
                name: 'dashboard',
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
                    name: '施工部',
                    path: '/dashboard/construction',

                    routes: [
                      {
                        name: '钢结构安装',
                        path: '/dashboard/construction/steelstructure',
                        component: './Dashboard/steelstructure',
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
                path: '/workplace',
                name: 'workplace',
                icon: 'tool',
                routes: [
                  { path: '/', redirect: '/workplace/index' },
                  {
                    path: '/workplace/index',
                    name: 'work',
                    icon: 'table',
                    component: './Workplace',
                  },
                  
                  {
                    path: '/workplace/pro',
                    name: 'ProTable',
                    icon: 'table',
                    component: './Workplace/ProTableList',
                  },
                  {
                    path: '/workplace/model',
                    name: 'ModelTable',
                    icon: 'table',
                    component: './Workplace/ModelTableList',
                  },
                ],
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
