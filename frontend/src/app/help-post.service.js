import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class HelpPostService {
    http = inject(HttpClient);
    baseUrl = '/api/posts';
    list(filters) {
        let params = new HttpParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value)
                params = params.set(key, value);
        });
        return this.http.get(this.baseUrl, { params });
    }
    stats() {
        return this.http.get(`${this.baseUrl}/stats`);
    }
    mine() {
        return this.http.get(`${this.baseUrl}/mine`);
    }
    create(input) {
        return this.http.post(this.baseUrl, input);
    }
    update(id, input) {
        return this.http.put(`${this.baseUrl}/${id}`, input);
    }
    updateStatus(id, status) {
        return this.http.patch(`${this.baseUrl}/${id}/status`, { status });
    }
    delete(id) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
    static ɵfac = function HelpPostService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HelpPostService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: HelpPostService, factory: HelpPostService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HelpPostService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
