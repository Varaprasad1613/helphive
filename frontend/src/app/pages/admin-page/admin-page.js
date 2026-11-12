import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AdminService } from '../../admin.service';
import { AuthService } from '../../auth.service';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function AdminPage_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 4);
    i0.ɵɵtext(1, "Loading admin data\u2026");
    i0.ɵɵdomElementEnd();
} }
function AdminPage_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "div", 4)(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "button", 3);
    i0.ɵɵdomListener("click", function AdminPage_Conditional_16_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵtext(4, "Try again");
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.error());
} }
function AdminPage_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 8)(1, "article")(2, "span");
    i0.ɵɵtext(3, "\u2659");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(6, "p");
    i0.ɵɵtext(7, "Total members");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(8, "small");
    i0.ɵɵtext(9);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(10, "article")(11, "span");
    i0.ɵɵtext(12, "\u25A4");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(13, "strong");
    i0.ɵɵtext(14);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(15, "p");
    i0.ɵɵtext(16, "Community posts");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(17, "small");
    i0.ɵɵtext(18, "Requests and offers");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(19, "article")(20, "span");
    i0.ɵɵtext(21, "\u2197");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(22, "strong");
    i0.ɵɵtext(23);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(24, "p");
    i0.ɵɵtext(25, "Help responses");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(26, "small");
    i0.ɵɵtext(27);
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵdomElementStart(28, "div", 9)(29, "h2");
    i0.ɵɵtext(30, "Admin responsibilities");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(31, "p");
    i0.ɵɵtext(32, "Only suspend accounts or remove posts that violate community expectations. Promote another admin only when they are trusted to manage all member data.");
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.overview().users);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", ctx_r1.overview().activeUsers, " active");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.overview().posts);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r1.overview().responses);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", ctx_r1.overview().pendingResponses, " awaiting review");
} }
function AdminPage_Conditional_18_For_18_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "tr")(1, "td")(2, "b");
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(13, "td")(14, "select", 11);
    i0.ɵɵdomListener("change", function AdminPage_Conditional_18_For_18_Template_select_change_14_listener($event) { const user_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.changeRole(user_r4, $event.target.value)); });
    i0.ɵɵdomElementStart(15, "option", 12);
    i0.ɵɵtext(16, "Member");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(17, "option", 13);
    i0.ɵɵtext(18, "Admin");
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵdomElementStart(19, "td")(20, "button", 14);
    i0.ɵɵdomListener("click", function AdminPage_Conditional_18_For_18_Template_button_click_20_listener() { const user_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggleActive(user_r4)); });
    i0.ɵɵtext(21);
    i0.ɵɵdomElementEnd()()();
} if (rf & 2) {
    const user_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("suspended", !user_r4.active);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(user_r4.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r4.email);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 13, user_r4.createdAt, "mediumDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(user_r4.postCount);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r4.emailVerified ? "Yes" : "No");
    i0.ɵɵadvance(2);
    i0.ɵɵdomProperty("value", user_r4.role)("disabled", user_r4.id === ctx_r1.auth.user()?.id);
    i0.ɵɵadvance(6);
    i0.ɵɵclassProp("activate", !user_r4.active);
    i0.ɵɵdomProperty("disabled", user_r4.id === ctx_r1.auth.user()?.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(user_r4.active ? "Suspend" : "Reactivate");
} }
function AdminPage_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 5)(1, "table")(2, "thead")(3, "tr")(4, "th");
    i0.ɵɵtext(5, "Member");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(6, "th");
    i0.ɵɵtext(7, "Joined");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(8, "th");
    i0.ɵɵtext(9, "Posts");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(10, "th");
    i0.ɵɵtext(11, "Verified");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(12, "th");
    i0.ɵɵtext(13, "Role");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(14, "th");
    i0.ɵɵtext(15, "Account");
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵdomElementStart(16, "tbody");
    i0.ɵɵrepeaterCreate(17, AdminPage_Conditional_18_For_18_Template, 22, 16, "tr", 10, _forTrack0);
    i0.ɵɵdomElementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(17);
    i0.ɵɵrepeater(ctx_r1.users());
} }
function AdminPage_Conditional_19_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "article")(1, "div")(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "h2");
    i0.ɵɵtext(5);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(8, "small");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(11, "button", 3);
    i0.ɵɵdomListener("click", function AdminPage_Conditional_19_For_2_Template_button_click_11_listener() { const post_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.deletePost(post_r6)); });
    i0.ɵɵtext(12, "Remove");
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const post_r6 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", post_r6.type, " \u00B7 ", post_r6.status.replace("_", " "));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(post_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(post_r6.description);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", post_r6.authorName, " \u00B7 ", post_r6.location, " \u00B7 ", i0.ɵɵpipeBind2(10, 7, post_r6.createdAt, "mediumDate"));
} }
function AdminPage_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 6);
    i0.ɵɵrepeaterCreate(1, AdminPage_Conditional_19_For_2_Template, 13, 10, "article", null, _forTrack0);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.posts());
} }
function AdminPage_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 7);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.toast());
} }
export class AdminPage {
    service = inject(AdminService);
    auth = inject(AuthService);
    overview = signal({ users: 0, activeUsers: 0, posts: 0, responses: 0, pendingResponses: 0 }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "overview" }] : /* istanbul ignore next */ []));
    users = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "users" }] : /* istanbul ignore next */ []));
    posts = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "posts" }] : /* istanbul ignore next */ []));
    tab = signal('overview', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tab" }] : /* istanbul ignore next */ []));
    loading = signal(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    error = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    toast = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "toast" }] : /* istanbul ignore next */ []));
    constructor() { this.load(); }
    load() {
        this.loading.set(true);
        this.error.set('');
        forkJoin({ overview: this.service.overview(), users: this.service.users(), posts: this.service.posts() }).subscribe({
            next: result => { this.overview.set(result.overview); this.users.set(result.users); this.posts.set(result.posts); this.loading.set(false); },
            error: () => { this.loading.set(false); this.error.set('Could not load the admin dashboard.'); },
        });
    }
    changeRole(user, role) {
        this.service.setRole(user.id, role).subscribe({
            next: updated => { this.replaceUser(updated); this.show('Member role updated.'); },
            error: response => this.show(response.error?.message ?? 'Could not update the role.'),
        });
    }
    toggleActive(user) {
        this.service.setActive(user.id, !user.active).subscribe({
            next: updated => { this.replaceUser(updated); this.show(updated.active ? 'Account reactivated.' : 'Account suspended.'); this.refreshOverview(); },
            error: response => this.show(response.error?.message ?? 'Could not update the account.'),
        });
    }
    deletePost(post) {
        if (!confirm(`Remove “${post.title}” from HelpHive?`))
            return;
        this.service.deletePost(post.id).subscribe({
            next: () => { this.posts.update(items => items.filter(item => item.id !== post.id)); this.show('Post removed.'); this.refreshOverview(); },
            error: () => this.show('Could not remove the post.'),
        });
    }
    replaceUser(updated) { this.users.update(items => items.map(item => item.id === updated.id ? updated : item)); }
    refreshOverview() { this.service.overview().subscribe(value => this.overview.set(value)); }
    show(message) { this.toast.set(message); window.setTimeout(() => this.toast.set(''), 2600); }
    static ɵfac = function AdminPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminPage, selectors: [["app-admin-page"]], decls: 21, vars: 8, consts: [[1, "page"], [1, "eyebrow"], [1, "tabs"], [3, "click"], [1, "state"], [1, "table-wrap"], [1, "post-list"], [1, "toast"], [1, "metrics"], [1, "admin-note"], [3, "suspended"], [3, "change", "value", "disabled"], ["value", "MEMBER"], ["value", "ADMIN"], [1, "status-button", 3, "click", "disabled"]], template: function AdminPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "section", 0)(1, "header")(2, "div", 1);
            i0.ɵɵtext(3, "Administration");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(4, "h1");
            i0.ɵɵtext(5, "Community dashboard");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(6, "p");
            i0.ɵɵtext(7, "Monitor activity, manage members, and keep HelpHive useful and safe.");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(8, "div", 2)(9, "button", 3);
            i0.ɵɵdomListener("click", function AdminPage_Template_button_click_9_listener() { return ctx.tab.set("overview"); });
            i0.ɵɵtext(10, "Overview");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(11, "button", 3);
            i0.ɵɵdomListener("click", function AdminPage_Template_button_click_11_listener() { return ctx.tab.set("members"); });
            i0.ɵɵtext(12, "Members");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(13, "button", 3);
            i0.ɵɵdomListener("click", function AdminPage_Template_button_click_13_listener() { return ctx.tab.set("posts"); });
            i0.ɵɵtext(14, "Posts");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵconditionalCreate(15, AdminPage_Conditional_15_Template, 2, 0, "div", 4)(16, AdminPage_Conditional_16_Template, 5, 1, "div", 4)(17, AdminPage_Conditional_17_Template, 33, 5)(18, AdminPage_Conditional_18_Template, 19, 0, "div", 5)(19, AdminPage_Conditional_19_Template, 3, 0, "div", 6);
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(20, AdminPage_Conditional_20_Template, 2, 1, "div", 7);
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵclassProp("active", ctx.tab() === "overview");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.tab() === "members");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.tab() === "posts");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading() ? 15 : ctx.error() ? 16 : ctx.tab() === "overview" ? 17 : ctx.tab() === "members" ? 18 : 19);
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.toast() ? 20 : -1);
        } }, dependencies: [DatePipe], styles: [".page[_ngcontent-%COMP%] { max-width: 1180px; margin: 0 auto; padding: 70px 24px 100px; }.eyebrow[_ngcontent-%COMP%] { color: var(--%NS%coral); text-transform: uppercase; letter-spacing: 2px; font-size: 10px; font-weight: 800; }h1[_ngcontent-%COMP%] { margin: 10px 0; font: 800 48px 'Manrope'; letter-spacing: -2px; }header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { color: var(--%NS%muted); }.tabs[_ngcontent-%COMP%] { display: flex; gap: 6px; margin: 30px 0 24px; padding: 5px; border-radius: 9px; background: var(--%NS%cream); }.tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { flex: 1; padding: 12px; border: 0; border-radius: 7px; background: transparent; cursor: pointer; font-weight: 800; }.tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] { background: white; color: var(--%NS%green); box-shadow: 0 2px 8px rgba(23,45,40,.08); }.metrics[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }.metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] { padding: 27px; border: 1px solid var(--%NS%line); border-radius: 12px; background: white; }.metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { font-size: 23px; color: var(--%NS%coral); }.metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display: block; margin: 18px 0 2px; color: var(--%NS%green); font: 800 40px 'Manrope'; }.metrics[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; font-weight: 800; }.metrics[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: var(--%NS%muted); }.admin-note[_ngcontent-%COMP%] { margin-top: 18px; padding: 25px; border-radius: 12px; background: var(--%NS%green); color: white; }.admin-note[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 0 0 8px; }.admin-note[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: #c5d6d0; line-height: 1.6; }\r\n.table-wrap[_ngcontent-%COMP%] { overflow-x: auto; border: 1px solid var(--%NS%line); border-radius: 12px; background: white; }table[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; }th[_ngcontent-%COMP%], td[_ngcontent-%COMP%] { padding: 14px 16px; border-bottom: 1px solid var(--%NS%line); text-align: left; font-size: 12px; }th[_ngcontent-%COMP%] { background: var(--%NS%cream); text-transform: uppercase; letter-spacing: .7px; font-size: 9px; }td[_ngcontent-%COMP%]   b[_ngcontent-%COMP%], td[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { display: block; }td[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: var(--%NS%muted); margin-top: 3px; }.suspended[_ngcontent-%COMP%] { opacity: .6; }select[_ngcontent-%COMP%], .status-button[_ngcontent-%COMP%] { min-height: 34px; padding: 0 9px; border: 1px solid var(--%NS%line); border-radius: 5px; background: white; }.status-button[_ngcontent-%COMP%] { color: #9b3e33; cursor: pointer; font-weight: 700; }.status-button.activate[_ngcontent-%COMP%] { color: var(--%NS%green); }.post-list[_ngcontent-%COMP%] { display: grid; gap: 12px; }.post-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr auto; gap: 20px; padding: 22px; border: 1px solid var(--%NS%line); border-radius: 12px; background: white; }.post-list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .post-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: var(--%NS%muted); font-size: 10px; }.post-list[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 8px 0 5px; font: 800 18px 'Manrope'; }.post-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { color: var(--%NS%muted); }.post-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { align-self: center; min-height: 38px; padding: 0 14px; border: 1px solid #e2c5bf; border-radius: 6px; background: white; color: #a84034; cursor: pointer; font-weight: 800; }.state[_ngcontent-%COMP%] { min-height: 300px; display: grid; place-items: center; align-content: center; gap: 10px; background: var(--%NS%cream); border-radius: 12px; }.state[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { min-height: 38px; border: 0; border-radius: 6px; background: var(--%NS%green); color: white; }.toast[_ngcontent-%COMP%] { position: fixed; left: 50%; bottom: 28px; transform: translateX(-50%); padding: 12px 18px; border-radius: 999px; background: #10261f; color: white; font-size: 12px; }\r\n@media (max-width: 760px) { .metrics[_ngcontent-%COMP%] { grid-template-columns: 1fr; }h1[_ngcontent-%COMP%] { font-size: 40px; }.post-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] { grid-template-columns: 1fr; }.post-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { justify-self: start; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminPage, [{
        type: Component,
        args: [{ selector: 'app-admin-page', imports: [DatePipe], template: "<section class=\"page\">\r\n  <header><div class=\"eyebrow\">Administration</div><h1>Community dashboard</h1><p>Monitor activity, manage members, and keep HelpHive useful and safe.</p></header>\r\n  <div class=\"tabs\"><button [class.active]=\"tab() === 'overview'\" (click)=\"tab.set('overview')\">Overview</button><button [class.active]=\"tab() === 'members'\" (click)=\"tab.set('members')\">Members</button><button [class.active]=\"tab() === 'posts'\" (click)=\"tab.set('posts')\">Posts</button></div>\r\n  @if (loading()) { <div class=\"state\">Loading admin data\u2026</div> }\r\n  @else if (error()) { <div class=\"state\"><p>{{ error() }}</p><button (click)=\"load()\">Try again</button></div> }\r\n  @else if (tab() === 'overview') {\r\n    <div class=\"metrics\"><article><span>\u2659</span><strong>{{ overview().users }}</strong><p>Total members</p><small>{{ overview().activeUsers }} active</small></article><article><span>\u25A4</span><strong>{{ overview().posts }}</strong><p>Community posts</p><small>Requests and offers</small></article><article><span>\u2197</span><strong>{{ overview().responses }}</strong><p>Help responses</p><small>{{ overview().pendingResponses }} awaiting review</small></article></div>\r\n    <div class=\"admin-note\"><h2>Admin responsibilities</h2><p>Only suspend accounts or remove posts that violate community expectations. Promote another admin only when they are trusted to manage all member data.</p></div>\r\n  } @else if (tab() === 'members') {\r\n    <div class=\"table-wrap\"><table><thead><tr><th>Member</th><th>Joined</th><th>Posts</th><th>Verified</th><th>Role</th><th>Account</th></tr></thead><tbody>\r\n      @for (user of users(); track user.id) { <tr [class.suspended]=\"!user.active\"><td><b>{{ user.name }}</b><small>{{ user.email }}</small></td><td>{{ user.createdAt | date:'mediumDate' }}</td><td>{{ user.postCount }}</td><td>{{ user.emailVerified ? 'Yes' : 'No' }}</td><td><select [value]=\"user.role\" [disabled]=\"user.id === auth.user()?.id\" (change)=\"changeRole(user, $any($event.target).value)\"><option value=\"MEMBER\">Member</option><option value=\"ADMIN\">Admin</option></select></td><td><button class=\"status-button\" [disabled]=\"user.id === auth.user()?.id\" [class.activate]=\"!user.active\" (click)=\"toggleActive(user)\">{{ user.active ? 'Suspend' : 'Reactivate' }}</button></td></tr> }\r\n    </tbody></table></div>\r\n  } @else {\r\n    <div class=\"post-list\">@for (post of posts(); track post.id) { <article><div><span>{{ post.type }} \u00B7 {{ post.status.replace('_', ' ') }}</span><h2>{{ post.title }}</h2><p>{{ post.description }}</p><small>{{ post.authorName }} \u00B7 {{ post.location }} \u00B7 {{ post.createdAt | date:'mediumDate' }}</small></div><button (click)=\"deletePost(post)\">Remove</button></article> }</div>\r\n  }\r\n</section>\r\n@if (toast()) { <div class=\"toast\">{{ toast() }}</div> }\r\n", styles: [".page { max-width: 1180px; margin: 0 auto; padding: 70px 24px 100px; }.eyebrow { color: var(--coral); text-transform: uppercase; letter-spacing: 2px; font-size: 10px; font-weight: 800; }h1 { margin: 10px 0; font: 800 48px 'Manrope'; letter-spacing: -2px; }header p { color: var(--muted); }.tabs { display: flex; gap: 6px; margin: 30px 0 24px; padding: 5px; border-radius: 9px; background: var(--cream); }.tabs button { flex: 1; padding: 12px; border: 0; border-radius: 7px; background: transparent; cursor: pointer; font-weight: 800; }.tabs button.active { background: white; color: var(--green); box-shadow: 0 2px 8px rgba(23,45,40,.08); }.metrics { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }.metrics article { padding: 27px; border: 1px solid var(--line); border-radius: 12px; background: white; }.metrics article > span { font-size: 23px; color: var(--coral); }.metrics strong { display: block; margin: 18px 0 2px; color: var(--green); font: 800 40px 'Manrope'; }.metrics p { margin: 0; font-weight: 800; }.metrics small { color: var(--muted); }.admin-note { margin-top: 18px; padding: 25px; border-radius: 12px; background: var(--green); color: white; }.admin-note h2 { margin: 0 0 8px; }.admin-note p { margin: 0; color: #c5d6d0; line-height: 1.6; }\r\n.table-wrap { overflow-x: auto; border: 1px solid var(--line); border-radius: 12px; background: white; }table { width: 100%; border-collapse: collapse; }th,td { padding: 14px 16px; border-bottom: 1px solid var(--line); text-align: left; font-size: 12px; }th { background: var(--cream); text-transform: uppercase; letter-spacing: .7px; font-size: 9px; }td b,td small { display: block; }td small { color: var(--muted); margin-top: 3px; }.suspended { opacity: .6; }select,.status-button { min-height: 34px; padding: 0 9px; border: 1px solid var(--line); border-radius: 5px; background: white; }.status-button { color: #9b3e33; cursor: pointer; font-weight: 700; }.status-button.activate { color: var(--green); }.post-list { display: grid; gap: 12px; }.post-list article { display: grid; grid-template-columns: 1fr auto; gap: 20px; padding: 22px; border: 1px solid var(--line); border-radius: 12px; background: white; }.post-list span,.post-list small { color: var(--muted); font-size: 10px; }.post-list h2 { margin: 8px 0 5px; font: 800 18px 'Manrope'; }.post-list p { color: var(--muted); }.post-list button { align-self: center; min-height: 38px; padding: 0 14px; border: 1px solid #e2c5bf; border-radius: 6px; background: white; color: #a84034; cursor: pointer; font-weight: 800; }.state { min-height: 300px; display: grid; place-items: center; align-content: center; gap: 10px; background: var(--cream); border-radius: 12px; }.state button { min-height: 38px; border: 0; border-radius: 6px; background: var(--green); color: white; }.toast { position: fixed; left: 50%; bottom: 28px; transform: translateX(-50%); padding: 12px 18px; border-radius: 999px; background: #10261f; color: white; font-size: 12px; }\r\n@media (max-width: 760px) { .metrics { grid-template-columns: 1fr; }h1 { font-size: 40px; }.post-list article { grid-template-columns: 1fr; }.post-list button { justify-self: start; } }\r\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminPage, { className: "AdminPage", filePath: "src/app/pages/admin-page/admin-page.ts", lineNumber: 14 }); })();
