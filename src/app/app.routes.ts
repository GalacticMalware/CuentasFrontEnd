import { Routes } from '@angular/router';
import { authGuard } from './custom/auth.guard';

export const routes: Routes = [{
    path:'login',
    loadComponent:() => import('./pages/login/login.component'),canActivate:[authGuard]
},
{
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
},
{
    path:'dashboard',
    loadComponent:() => import('./pages/dashboard/dashboard.component'),canActivate:[authGuard]
},
{
    path:'register-purchases',
    loadComponent:() => import('./pages/register-purchases/register-purchases.component'),canActivate:[authGuard]
},
{
    path:'shopping-list',
    loadComponent:() => import('./pages/shopping-list/shopping-list.component'),canActivate:[authGuard]
},
];
