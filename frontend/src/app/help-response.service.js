import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class HelpResponseService {
    http = inject(HttpClient);
    create(postId, message) {
        return this.http.post(`/api/posts/${postId}/responses`, { message });
    }
    sent() { return this.http.get('/api/responses/mine'); }
    received() { return this.http.get('/api/responses/received'); }
    updateStatus(id, status) {
        return this.http.patch(`/api/responses/${id}/status`, { status });
    }
    withdraw(id) { return this.http.delete(`/api/responses/${id}`); }
    static ɵfac = function HelpResponseService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HelpResponseService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: HelpResponseService, factory: HelpResponseService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HelpResponseService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
