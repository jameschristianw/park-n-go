import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'register',
    loadChildren: './pages/auth/register/register.module#RegisterPageModule',
  },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'auth', loadChildren: './pages/auth/main/main.module#MainPageModule' },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfilePageModule', 
  },
  { path: 'account/manage-vehicle', loadChildren: './pages/manage-vehicle/manage-vehicle.module#ManageVehiclePageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
