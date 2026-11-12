import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import * as i0 from "@angular/core";
const _c0 = () => ({ create: "request" });
function AppLayout_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 8);
    i0.ɵɵtext(1, "Admin");
    i0.ɵɵelementEnd();
} }
function AppLayout_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 10)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r1 = ctx;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r1.name.charAt(0));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(user_r1.name);
} }
export class AppLayout {
    auth = inject(AuthService);
    router = inject(Router);
    logout() {
        this.auth.logout();
        void this.router.navigate(['/auth/login'], { queryParams: { notice: 'You are signed out.' } });
    }
    static ɵfac = function AppLayout_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppLayout)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppLayout, selectors: [["app-layout"]], decls: 34, vars: 4, consts: [[1, "site-header"], ["routerLink", "/community", "aria-label", "HelpHive home", 1, "brand"], [1, "brand-mark"], ["aria-label", "Main navigation"], ["routerLink", "/community", "routerLinkActive", "active"], ["routerLink", "/my-posts", "routerLinkActive", "active"], ["routerLink", "/my-responses", "routerLinkActive", "active"], ["routerLink", "/account", "routerLinkActive", "active"], ["routerLink", "/admin", "routerLinkActive", "active"], [1, "header-actions"], ["routerLink", "/account", 1, "account-chip"], ["type", "button", 1, "text-button", 3, "click"], ["routerLink", "/community", 1, "button", 3, "queryParams"], [1, "page-shell"], ["routerLink", "/community", 1, "brand"]], template: function AppLayout_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "header", 0)(1, "a", 1)(2, "span", 2);
            i0.ɵɵtext(3, "H");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "span");
            i0.ɵɵtext(5, "HelpHive");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "nav", 3)(7, "a", 4);
            i0.ɵɵtext(8, "Community");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "a", 5);
            i0.ɵɵtext(10, "My posts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "a", 6);
            i0.ɵɵtext(12, "My responses");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "a", 7);
            i0.ɵɵtext(14, "My account");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(15, AppLayout_Conditional_15_Template, 2, 0, "a", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 9);
            i0.ɵɵconditionalCreate(17, AppLayout_Conditional_17_Template, 4, 2, "a", 10);
            i0.ɵɵelementStart(18, "button", 11);
            i0.ɵɵlistener("click", function AppLayout_Template_button_click_18_listener() { return ctx.logout(); });
            i0.ɵɵtext(19, "Sign out");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "a", 12);
            i0.ɵɵtext(21, "Post a request \uFF0B");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(22, "main", 13);
            i0.ɵɵelement(23, "router-outlet");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "footer")(25, "a", 14)(26, "span", 2);
            i0.ɵɵtext(27, "H");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span");
            i0.ɵɵtext(29, "HelpHive");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "p");
            i0.ɵɵtext(31, "Built for stronger communities.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "span");
            i0.ɵɵtext(33, "Spring Boot \u00B7 Angular \u00B7 PostgreSQL");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            let tmp_1_0;
            i0.ɵɵadvance(15);
            i0.ɵɵconditional(ctx.auth.user()?.role === "ADMIN" ? 15 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional((tmp_1_0 = ctx.auth.user()) ? 17 : -1, tmp_1_0);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("queryParams", i0.ɵɵpureFunction0(3, _c0));
        } }, dependencies: [RouterLink, RouterLinkActive, RouterOutlet], styles: ["[_nghost-%COMP%] { display: block; min-height: 100vh; }\r\n.site-header[_ngcontent-%COMP%] { min-height: 78px; padding: 0 clamp(20px, 4vw, 64px); display: flex; align-items: center; gap: 28px; border-bottom: 1px solid var(--%NS%line); background: rgba(255,253,248,.96); position: sticky; top: 0; z-index: 20; }\r\n.brand[_ngcontent-%COMP%] { display: inline-flex; align-items: center; gap: 10px; font: 800 20px 'Manrope',sans-serif; letter-spacing: -.7px; white-space: nowrap; }\r\n.brand-mark[_ngcontent-%COMP%] { width: 34px; height: 34px; border-radius: 50% 50% 50% 12px; display: grid; place-items: center; background: var(--%NS%green); color: white; }\r\nnav[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 22px; margin: 0 auto; }\r\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] { padding: 28px 0 24px; border-bottom: 3px solid transparent; color: var(--%NS%muted); font-size: 13px; font-weight: 700; }\r\nnav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] { color: var(--%NS%green); border-color: var(--%NS%coral); }\r\n.header-actions[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 10px; }\r\n.account-chip[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 700; }\r\n.account-chip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { width: 30px; height: 30px; border-radius: 50%; background: var(--%NS%green); color: white; display: grid; place-items: center; }\r\n.text-button[_ngcontent-%COMP%] { border: 0; background: none; font-weight: 700; cursor: pointer; }\r\n.button[_ngcontent-%COMP%] { min-height: 42px; padding: 0 16px; border-radius: 7px; display: inline-flex; align-items: center; background: var(--%NS%green); color: white; font-size: 12px; font-weight: 800; }\r\n.page-shell[_ngcontent-%COMP%] { min-height: calc(100vh - 150px); }\r\nfooter[_ngcontent-%COMP%] { padding: 32px clamp(20px, 5vw, 74px); display: flex; align-items: center; justify-content: space-between; background: #10261f; color: white; }\r\nfooter[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], footer[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { color: #90a39c; font-size: 11px; }\r\n@media (max-width: 1050px) { nav[_ngcontent-%COMP%] { display: none; }.account-chip[_ngcontent-%COMP%] { display: none; }.site-header[_ngcontent-%COMP%] { justify-content: space-between; } }\r\n@media (max-width: 620px) { .site-header[_ngcontent-%COMP%] { min-height: 68px; padding: 0 14px; }.header-actions[_ngcontent-%COMP%]   .text-button[_ngcontent-%COMP%] { display: none; }.button[_ngcontent-%COMP%] { padding: 0 10px; }.brand[_ngcontent-%COMP%] { font-size: 18px; } footer[_ngcontent-%COMP%] { flex-direction: column; gap: 12px; text-align: center; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppLayout, [{
        type: Component,
        args: [{ selector: 'app-layout', imports: [RouterLink, RouterLinkActive, RouterOutlet], template: "<header class=\"site-header\">\r\n  <a class=\"brand\" routerLink=\"/community\" aria-label=\"HelpHive home\">\r\n    <span class=\"brand-mark\">H</span><span>HelpHive</span>\r\n  </a>\r\n  <nav aria-label=\"Main navigation\">\r\n    <a routerLink=\"/community\" routerLinkActive=\"active\">Community</a>\r\n    <a routerLink=\"/my-posts\" routerLinkActive=\"active\">My posts</a>\r\n    <a routerLink=\"/my-responses\" routerLinkActive=\"active\">My responses</a>\r\n    <a routerLink=\"/account\" routerLinkActive=\"active\">My account</a>\r\n    @if (auth.user()?.role === 'ADMIN') { <a routerLink=\"/admin\" routerLinkActive=\"active\">Admin</a> }\r\n  </nav>\r\n  <div class=\"header-actions\">\r\n    @if (auth.user(); as user) {\r\n      <a class=\"account-chip\" routerLink=\"/account\"><span>{{ user.name.charAt(0) }}</span>{{ user.name }}</a>\r\n    }\r\n    <button class=\"text-button\" type=\"button\" (click)=\"logout()\">Sign out</button>\r\n    <a class=\"button\" routerLink=\"/community\" [queryParams]=\"{ create: 'request' }\">Post a request \uFF0B</a>\r\n  </div>\r\n</header>\r\n<main class=\"page-shell\"><router-outlet /></main>\r\n<footer><a class=\"brand\" routerLink=\"/community\"><span class=\"brand-mark\">H</span><span>HelpHive</span></a><p>Built for stronger communities.</p><span>Spring Boot \u00B7 Angular \u00B7 PostgreSQL</span></footer>\r\n", styles: [":host { display: block; min-height: 100vh; }\r\n.site-header { min-height: 78px; padding: 0 clamp(20px, 4vw, 64px); display: flex; align-items: center; gap: 28px; border-bottom: 1px solid var(--line); background: rgba(255,253,248,.96); position: sticky; top: 0; z-index: 20; }\r\n.brand { display: inline-flex; align-items: center; gap: 10px; font: 800 20px 'Manrope',sans-serif; letter-spacing: -.7px; white-space: nowrap; }\r\n.brand-mark { width: 34px; height: 34px; border-radius: 50% 50% 50% 12px; display: grid; place-items: center; background: var(--green); color: white; }\r\nnav { display: flex; align-items: center; gap: 22px; margin: 0 auto; }\r\nnav a { padding: 28px 0 24px; border-bottom: 3px solid transparent; color: var(--muted); font-size: 13px; font-weight: 700; }\r\nnav a.active { color: var(--green); border-color: var(--coral); }\r\n.header-actions { display: flex; align-items: center; gap: 10px; }\r\n.account-chip { display: flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 700; }\r\n.account-chip span { width: 30px; height: 30px; border-radius: 50%; background: var(--green); color: white; display: grid; place-items: center; }\r\n.text-button { border: 0; background: none; font-weight: 700; cursor: pointer; }\r\n.button { min-height: 42px; padding: 0 16px; border-radius: 7px; display: inline-flex; align-items: center; background: var(--green); color: white; font-size: 12px; font-weight: 800; }\r\n.page-shell { min-height: calc(100vh - 150px); }\r\nfooter { padding: 32px clamp(20px, 5vw, 74px); display: flex; align-items: center; justify-content: space-between; background: #10261f; color: white; }\r\nfooter p, footer > span { color: #90a39c; font-size: 11px; }\r\n@media (max-width: 1050px) { nav { display: none; }.account-chip { display: none; }.site-header { justify-content: space-between; } }\r\n@media (max-width: 620px) { .site-header { min-height: 68px; padding: 0 14px; }.header-actions .text-button { display: none; }.button { padding: 0 10px; }.brand { font-size: 18px; } footer { flex-direction: column; gap: 12px; text-align: center; } }\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppLayout, { className: "AppLayout", filePath: "src/app/layout/app-layout.ts", lineNumber: 11 }); })();
