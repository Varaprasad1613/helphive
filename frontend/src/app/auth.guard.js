import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
export const authGuard = (_route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.authenticated()
        ? true
        : router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
};
export const guestGuard = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.authenticated() ? router.createUrlTree(['/community']) : true;
};
export const adminGuard = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.user()?.role === 'ADMIN' ? true : router.createUrlTree(['/community']);
};
