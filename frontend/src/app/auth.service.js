import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import * as i0 from "@angular/core";
const TOKEN_KEY = 'helphive_token';
const USER_KEY = 'helphive_user';
export class AuthService {
    http = inject(HttpClient);
    user = signal(this.readUser(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "user" }] : /* istanbul ignore next */ []));
    authenticated = computed(() => this.user() !== null && !!this.token(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "authenticated" }] : /* istanbul ignore next */ []));
    register(input) {
        return this.http.post('/api/auth/register', input);
    }
    login(input) {
        return this.http.post('/api/auth/login', input).pipe(tap(response => this.save(response)));
    }
    currentUser() {
        return this.http.get('/api/users/me').pipe(tap(user => this.replaceUser(user)));
    }
    updateProfile(input) {
        return this.http.put('/api/users/me', input).pipe(tap(user => this.replaceUser(user)));
    }
    changePassword(input) {
        return this.http.patch('/api/users/me/password', input);
    }
    verifyEmail(token) {
        return this.http.post('/api/auth/verify-email', { token });
    }
    resendVerification(email) {
        return this.http.post('/api/auth/resend-verification', { email });
    }
    forgotPassword(email) {
        return this.http.post('/api/auth/forgot-password', { email });
    }
    resetPassword(token, password) {
        return this.http.post('/api/auth/reset-password', { token, password });
    }
    logout() {
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(USER_KEY);
        this.user.set(null);
    }
    token() {
        return sessionStorage.getItem(TOKEN_KEY);
    }
    save(response) {
        sessionStorage.setItem(TOKEN_KEY, response.token);
        sessionStorage.setItem(USER_KEY, JSON.stringify(response.user));
        this.user.set(response.user);
    }
    replaceUser(user) {
        sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        this.user.set(user);
    }
    readUser() {
        try {
            const value = sessionStorage.getItem(USER_KEY);
            return value ? JSON.parse(value) : null;
        }
        catch {
            sessionStorage.removeItem(USER_KEY);
            return null;
        }
    }
    static ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
