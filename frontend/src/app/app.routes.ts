import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './auth.guard';
import { AppLayout } from './layout/app-layout';
import { AuthPage } from './pages/auth-page/auth-page';
import { CommunityPage } from './pages/community-page/community-page';

export const routes: Routes = [
  { path: 'auth/login', component: AuthPage, canActivate: [guestGuard], title: 'Sign in | HelpHive' },
  { path: 'auth/register', component: AuthPage, canActivate: [guestGuard], title: 'Create account | HelpHive' },
  {
    path: '', component: AppLayout, canActivate: [authGuard], children: [
      { path: 'community', component: CommunityPage, title: 'Community | HelpHive' },
      { path: '', pathMatch: 'full', redirectTo: 'community' },
    ],
  },
  { path: '**', redirectTo: '' },
];
