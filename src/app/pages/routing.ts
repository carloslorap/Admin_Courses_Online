import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  },{
    path: 'users',
    loadChildren: () =>
      import('../modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('../modules/categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('../modules/course/course.module').then((m) => m.CourseModule),
  },
  {
    path: 'cupones',
    loadChildren: () =>
      import('../modules/coupon/coupon.module').then((m) => m.CouponModule),
  },
  {
    path: 'descuento',
    loadChildren: () =>
      import('../modules/discount/discount.module').then((m) => m.DiscountModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
