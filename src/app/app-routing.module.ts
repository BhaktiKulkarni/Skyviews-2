import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/session/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/session/register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './pages/session/dashboard/dashboard.module#DashboardPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
