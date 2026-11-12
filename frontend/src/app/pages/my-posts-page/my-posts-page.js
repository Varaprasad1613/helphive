import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HelpPostService } from '../../help-post.service';
import * as i0 from "@angular/core";
const _c0 = () => ({ create: "request" });
const _forTrack0 = ($index, $item) => $item.id;
const arrowFn0 = (ctx, view) => post => post.status === "OPEN";
const arrowFn1 = (ctx, view) => post => post.status === "COMPLETED";
function MyPostsPage_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtext(1, "Loading your posts\u2026");
    i0.ɵɵelementEnd();
} }
function MyPostsPage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3)(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 5);
    i0.ɵɵlistener("click", function MyPostsPage_Conditional_11_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵtext(4, "Try again");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.error());
} }
function MyPostsPage_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3)(1, "span");
    i0.ɵɵtext(2, "\u2726");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h2");
    i0.ɵɵtext(4, "You have not posted yet");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Share a request or offer and it will appear here.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "a", 2);
    i0.ɵɵtext(8, "Create your first post");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("queryParams", i0.ɵɵpureFunction0(1, _c0));
} }
function MyPostsPage_Conditional_13_For_16_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 5);
    i0.ɵɵlistener("click", function MyPostsPage_Conditional_13_For_16_Conditional_15_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const post_r5 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setStatus(post_r5, "IN_PROGRESS")); });
    i0.ɵɵtext(1, "Start progress");
    i0.ɵɵelementEnd();
} }
function MyPostsPage_Conditional_13_For_16_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 5);
    i0.ɵɵlistener("click", function MyPostsPage_Conditional_13_For_16_Conditional_16_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const post_r5 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setStatus(post_r5, "COMPLETED")); });
    i0.ɵɵtext(1, "Mark complete");
    i0.ɵɵelementEnd();
} }
function MyPostsPage_Conditional_13_For_16_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 14);
    i0.ɵɵlistener("click", function MyPostsPage_Conditional_13_For_16_Conditional_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const post_r5 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setStatus(post_r5, "OPEN")); });
    i0.ɵɵtext(1, "Reopen");
    i0.ɵɵelementEnd();
} }
function MyPostsPage_Conditional_13_For_16_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article")(1, "div", 8)(2, "div", 9)(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 10);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "h2");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "small");
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 11);
    i0.ɵɵconditionalCreate(15, MyPostsPage_Conditional_13_For_16_Conditional_15_Template, 2, 0, "button");
    i0.ɵɵconditionalCreate(16, MyPostsPage_Conditional_13_For_16_Conditional_16_Template, 2, 0, "button");
    i0.ɵɵconditionalCreate(17, MyPostsPage_Conditional_13_For_16_Conditional_17_Template, 2, 0, "button", 12);
    i0.ɵɵelementStart(18, "button", 13);
    i0.ɵɵlistener("click", function MyPostsPage_Conditional_13_For_16_Template_button_click_18_listener() { const post_r5 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.remove(post_r5)); });
    i0.ɵɵtext(19, "Delete");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const post_r5 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("offer", post_r5.type === "OFFER");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(post_r5.type);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("done", post_r5.status === "COMPLETED");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(post_r5.status.replace("_", " "));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(post_r5.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(post_r5.description);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("\u2316 ", post_r5.location, " \u00B7 ", i0.ɵɵpipeBind2(13, 13, post_r5.createdAt, "mediumDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(post_r5.status === "OPEN" ? 15 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(post_r5.status === "IN_PROGRESS" ? 16 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(post_r5.status === "COMPLETED" ? 17 : -1);
} }
function MyPostsPage_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " total ");
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8, " open ");
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "strong");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13, " completed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 7);
    i0.ɵɵrepeaterCreate(15, MyPostsPage_Conditional_13_For_16_Template, 20, 16, "article", null, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.posts().length);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.posts().filter(i0.ɵɵarrowFunction(3, arrowFn0, ctx)).length);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.posts().filter(i0.ɵɵarrowFunction(4, arrowFn1, ctx)).length);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.posts());
} }
function MyPostsPage_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u2713 ", ctx_r1.toast());
} }
export class MyPostsPage {
    postsService = inject(HelpPostService);
    posts = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "posts" }] : /* istanbul ignore next */ []));
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
        this.postsService.mine().subscribe({
            next: posts => { this.posts.set(posts); this.loading.set(false); },
            error: () => { this.loading.set(false); this.error.set('Could not load your posts.'); },
        });
    }
    setStatus(post, status) {
        this.postsService.updateStatus(post.id, status).subscribe({
            next: updated => { this.posts.update(items => items.map(item => item.id === updated.id ? updated : item)); this.show('Post status updated.'); },
            error: () => this.show('Could not update this post.'),
        });
    }
    remove(post) {
        if (!confirm(`Delete “${post.title}”?`))
            return;
        this.postsService.delete(post.id).subscribe({
            next: () => { this.posts.update(items => items.filter(item => item.id !== post.id)); this.show('Post deleted.'); },
            error: () => this.show('Could not delete this post.'),
        });
    }
    show(message) {
        this.toast.set(message);
        window.setTimeout(() => this.toast.set(''), 2500);
    }
    static ɵfac = function MyPostsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MyPostsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MyPostsPage, selectors: [["app-my-posts-page"]], decls: 15, vars: 4, consts: [[1, "page"], [1, "eyebrow"], ["routerLink", "/community", 3, "queryParams"], [1, "state"], [1, "toast"], [3, "click"], [1, "summary"], [1, "post-list"], [1, "post-main"], [1, "badges"], [1, "status"], [1, "actions"], [1, "secondary"], [1, "danger", 3, "click"], [1, "secondary", 3, "click"]], template: function MyPostsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "header")(2, "div", 1);
            i0.ɵɵtext(3, "Your contributions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "My posts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Track every request and offer you have shared with the HelpHive community.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "a", 2);
            i0.ɵɵtext(9, "Create a new post \uFF0B");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(10, MyPostsPage_Conditional_10_Template, 2, 0, "div", 3)(11, MyPostsPage_Conditional_11_Template, 5, 1, "div", 3)(12, MyPostsPage_Conditional_12_Template, 9, 2, "div", 3)(13, MyPostsPage_Conditional_13_Template, 17, 5);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(14, MyPostsPage_Conditional_14_Template, 2, 1, "div", 4);
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("queryParams", i0.ɵɵpureFunction0(3, _c0));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading() ? 10 : ctx.error() ? 11 : ctx.posts().length === 0 ? 12 : 13);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.toast() ? 14 : -1);
        } }, dependencies: [RouterLink, DatePipe], styles: [".page[_ngcontent-%COMP%] { max-width: 1100px; margin: 0 auto; padding: 70px 24px 100px; }.page[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] { position: relative; margin-bottom: 34px; }.eyebrow[_ngcontent-%COMP%] { color: var(--%NS%coral); text-transform: uppercase; letter-spacing: 2px; font-size: 10px; font-weight: 800; }h1[_ngcontent-%COMP%] { margin: 10px 0; font: 800 48px 'Manrope'; letter-spacing: -2px; }header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { color: var(--%NS%muted); }header[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%], .state[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] { display: inline-flex; min-height: 42px; align-items: center; padding: 0 16px; border-radius: 7px; background: var(--%NS%green); color: white; font-size: 12px; font-weight: 800; }header[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%] { position: absolute; right: 0; bottom: 0; }.summary[_ngcontent-%COMP%] { margin-bottom: 14px; color: var(--%NS%muted); font-size: 12px; }.summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--%NS%green); }.summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { padding: 0 8px; }\r\n.post-list[_ngcontent-%COMP%] { display: grid; gap: 14px; }.post-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr auto; gap: 30px; padding: 25px; border: 1px solid var(--%NS%line); border-radius: 12px; background: white; }.badges[_ngcontent-%COMP%] { display: flex; gap: 7px; }.badges[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { padding: 5px 8px; border-radius: 4px; background: #ffe7e1; color: #9d3b2b; font-size: 9px; font-weight: 800; }.badges[_ngcontent-%COMP%]   span.offer[_ngcontent-%COMP%] { background: #dfeee8; color: #21604c; }.badges[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] { background: var(--%NS%cream); color: var(--%NS%muted); }.badges[_ngcontent-%COMP%]   .status.done[_ngcontent-%COMP%] { background: #e1ede8; color: var(--%NS%green); }.post-main[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 12px 0 7px; font: 800 20px 'Manrope'; }.post-main[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0 0 14px; color: var(--%NS%muted); line-height: 1.6; }.post-main[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: #7e8985; }.actions[_ngcontent-%COMP%] { display: flex; flex-direction: column; justify-content: center; gap: 8px; min-width: 135px; }.actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .state[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { min-height: 38px; padding: 0 13px; border: 0; border-radius: 6px; background: var(--%NS%green); color: white; cursor: pointer; font-weight: 700; }.actions[_ngcontent-%COMP%]   .secondary[_ngcontent-%COMP%] { background: var(--%NS%cream); color: var(--%NS%green); }.actions[_ngcontent-%COMP%]   .danger[_ngcontent-%COMP%] { background: transparent; color: #a84034; border: 1px solid #e2c5bf; }.state[_ngcontent-%COMP%] { min-height: 320px; display: grid; place-items: center; align-content: center; gap: 8px; padding: 40px; border-radius: 12px; background: var(--%NS%cream); text-align: center; }.state[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 36px; color: var(--%NS%coral); }.state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; }.state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { color: var(--%NS%muted); }.toast[_ngcontent-%COMP%] { position: fixed; left: 50%; bottom: 28px; transform: translateX(-50%); padding: 12px 18px; border-radius: 999px; background: #10261f; color: white; font-size: 12px; }\r\n@media (max-width: 700px) { header[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%] { position: static; margin-top: 12px; }.post-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] { grid-template-columns: 1fr; }.actions[_ngcontent-%COMP%] { flex-direction: row; flex-wrap: wrap; }.actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { flex: 1; }h1[_ngcontent-%COMP%] { font-size: 40px; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MyPostsPage, [{
        type: Component,
        args: [{ selector: 'app-my-posts-page', imports: [DatePipe, RouterLink], template: "<section class=\"page\">\r\n  <header><div class=\"eyebrow\">Your contributions</div><h1>My posts</h1><p>Track every request and offer you have shared with the HelpHive community.</p><a routerLink=\"/community\" [queryParams]=\"{ create: 'request' }\">Create a new post \uFF0B</a></header>\r\n  @if (loading()) { <div class=\"state\">Loading your posts\u2026</div> }\r\n  @else if (error()) { <div class=\"state\"><p>{{ error() }}</p><button (click)=\"load()\">Try again</button></div> }\r\n  @else if (posts().length === 0) { <div class=\"state\"><span>\u2726</span><h2>You have not posted yet</h2><p>Share a request or offer and it will appear here.</p><a routerLink=\"/community\" [queryParams]=\"{ create: 'request' }\">Create your first post</a></div> }\r\n  @else {\r\n    <div class=\"summary\"><strong>{{ posts().length }}</strong> total <span>\u00B7</span><strong>{{ posts().filter(post => post.status === 'OPEN').length }}</strong> open <span>\u00B7</span><strong>{{ posts().filter(post => post.status === 'COMPLETED').length }}</strong> completed</div>\r\n    <div class=\"post-list\">\r\n      @for (post of posts(); track post.id) {\r\n        <article>\r\n          <div class=\"post-main\"><div class=\"badges\"><span [class.offer]=\"post.type === 'OFFER'\">{{ post.type }}</span><span class=\"status\" [class.done]=\"post.status === 'COMPLETED'\">{{ post.status.replace('_', ' ') }}</span></div><h2>{{ post.title }}</h2><p>{{ post.description }}</p><small>\u2316 {{ post.location }} \u00B7 {{ post.createdAt | date:'mediumDate' }}</small></div>\r\n          <div class=\"actions\">\r\n            @if (post.status === 'OPEN') { <button (click)=\"setStatus(post, 'IN_PROGRESS')\">Start progress</button> }\r\n            @if (post.status === 'IN_PROGRESS') { <button (click)=\"setStatus(post, 'COMPLETED')\">Mark complete</button> }\r\n            @if (post.status === 'COMPLETED') { <button class=\"secondary\" (click)=\"setStatus(post, 'OPEN')\">Reopen</button> }\r\n            <button class=\"danger\" (click)=\"remove(post)\">Delete</button>\r\n          </div>\r\n        </article>\r\n      }\r\n    </div>\r\n  }\r\n</section>\r\n@if (toast()) { <div class=\"toast\">\u2713 {{ toast() }}</div> }\r\n", styles: [".page { max-width: 1100px; margin: 0 auto; padding: 70px 24px 100px; }.page > header { position: relative; margin-bottom: 34px; }.eyebrow { color: var(--coral); text-transform: uppercase; letter-spacing: 2px; font-size: 10px; font-weight: 800; }h1 { margin: 10px 0; font: 800 48px 'Manrope'; letter-spacing: -2px; }header p { color: var(--muted); }header > a,.state a { display: inline-flex; min-height: 42px; align-items: center; padding: 0 16px; border-radius: 7px; background: var(--green); color: white; font-size: 12px; font-weight: 800; }header > a { position: absolute; right: 0; bottom: 0; }.summary { margin-bottom: 14px; color: var(--muted); font-size: 12px; }.summary strong { color: var(--green); }.summary span { padding: 0 8px; }\r\n.post-list { display: grid; gap: 14px; }.post-list article { display: grid; grid-template-columns: 1fr auto; gap: 30px; padding: 25px; border: 1px solid var(--line); border-radius: 12px; background: white; }.badges { display: flex; gap: 7px; }.badges span { padding: 5px 8px; border-radius: 4px; background: #ffe7e1; color: #9d3b2b; font-size: 9px; font-weight: 800; }.badges span.offer { background: #dfeee8; color: #21604c; }.badges .status { background: var(--cream); color: var(--muted); }.badges .status.done { background: #e1ede8; color: var(--green); }.post-main h2 { margin: 12px 0 7px; font: 800 20px 'Manrope'; }.post-main p { margin: 0 0 14px; color: var(--muted); line-height: 1.6; }.post-main small { color: #7e8985; }.actions { display: flex; flex-direction: column; justify-content: center; gap: 8px; min-width: 135px; }.actions button,.state button { min-height: 38px; padding: 0 13px; border: 0; border-radius: 6px; background: var(--green); color: white; cursor: pointer; font-weight: 700; }.actions .secondary { background: var(--cream); color: var(--green); }.actions .danger { background: transparent; color: #a84034; border: 1px solid #e2c5bf; }.state { min-height: 320px; display: grid; place-items: center; align-content: center; gap: 8px; padding: 40px; border-radius: 12px; background: var(--cream); text-align: center; }.state span { font-size: 36px; color: var(--coral); }.state h2,.state p { margin: 0; }.state p { color: var(--muted); }.toast { position: fixed; left: 50%; bottom: 28px; transform: translateX(-50%); padding: 12px 18px; border-radius: 999px; background: #10261f; color: white; font-size: 12px; }\r\n@media (max-width: 700px) { header > a { position: static; margin-top: 12px; }.post-list article { grid-template-columns: 1fr; }.actions { flex-direction: row; flex-wrap: wrap; }.actions button { flex: 1; }h1 { font-size: 40px; } }\r\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MyPostsPage, { className: "MyPostsPage", filePath: "src/app/pages/my-posts-page/my-posts-page.ts", lineNumber: 13 }); })();
