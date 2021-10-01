import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadAuthGuard } from '@core/_services/guard/can-load-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: "full" },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),

  },
  {
    path: 'home',
    loadChildren: () => import('./feature-modules/home/home.module').then(m => m.HomeModule),
    canLoad: [CanLoadAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    paramsInheritanceStrategy: 'always',
    relativeLinkResolution: 'corrected',
  })],
  exports: [RouterModule],
  providers: [
    CanLoadAuthGuard
  ]
})
export class AppRoutingModule { }
