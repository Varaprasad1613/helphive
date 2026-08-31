import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './auth.guard';
import { AppLayout } from './layout/app-layout';
import { AuthPage } from './pages/auth-page/auth-page';
import { CommunityPage } from './pages/community-page/community-page';
import { AccountPage } from './pages/account-page/account-page';
import { MyPostsPage } from './pages/my-posts-page/my-posts-page';
import { MyResponsesPage } from './pages/my-responses-page/my-responses-page';

export const routes: Routes = [
  { path: 'auth/login', component: AuthPage, canActivate: [guestGuard], title: 'Sign in | HelpHive' },
  { path: 'auth/register', component: AuthPage, canActivate: [guestGuard], title: 'Create account | HelpHive' },
  {
    path: '', component: AppLayout, canActivate: [authGuard], children: [
      { path: 'community', component: CommunityPage, title: 'Community | HelpHive' },
      { path: 'account', component: AccountPage, title: 'My account | HelpHive' },
      { path: 'my-posts', component: MyPostsPage, title: 'My posts | HelpHive' },
      { path: 'my-responses', component: MyResponsesPage, title: 'My responses | HelpHive' },
      { path: '', pathMatch: 'full', redirectTo: 'community' },
    ],
  },
  { path: '**', redirectTo: '' },
];
