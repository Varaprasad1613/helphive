import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class AdminService {
    http = inject(HttpClient);
    overview() { return this.http.get('/api/admin/overview'); }
    users() { return this.http.get('/api/admin/users'); }
    posts() { return this.http.get('/api/admin/posts'); }
    setRole(id, role) {
        return this.http.patch(`/api/admin/users/${id}/role`, { role });
    }
    setActive(id, active) {
        return this.http.patch(`/api/admin/users/${id}/status`, { active });
    }
    deletePost(id) { return this.http.delete(`/api/admin/posts/${id}`); }
    static ɵfac = function AdminService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AdminService, factory: AdminService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
