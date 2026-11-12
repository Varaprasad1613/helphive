import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { HelpResponseService } from '../../help-response.service';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function MyResponsesPage_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 4);
    i0.ɵɵtext(1, "Loading responses\u2026");
    i0.ɵɵdomElementEnd();
} }
function MyResponsesPage_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "div", 4)(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "button", 3);
    i0.ɵɵdomListener("click", function MyResponsesPage_Conditional_18_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵtext(4, "Try again");
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.error());
} }
function MyResponsesPage_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 4)(1, "span");
    i0.ɵɵtext(2, "\u2197");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "h2");
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("No ", ctx_r1.tab(), " responses yet");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.tab() === "received" ? "Responses to your posts will appear here." : "Open a community post and send a thoughtful response.");
} }
function MyResponsesPage_Conditional_20_For_2_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "div", 10)(1, "button", 3);
    i0.ɵɵdomListener("click", function MyResponsesPage_Conditional_20_For_2_Conditional_13_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r3); const response_r4 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.review(response_r4, "ACCEPTED")); });
    i0.ɵɵtext(2, "Accept");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "button", 11);
    i0.ɵɵdomListener("click", function MyResponsesPage_Conditional_20_For_2_Conditional_13_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r3); const response_r4 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.review(response_r4, "DECLINED")); });
    i0.ɵɵtext(4, "Decline");
    i0.ɵɵdomElementEnd()();
} }
function MyResponsesPage_Conditional_20_For_2_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "div", 10)(1, "button", 11);
    i0.ɵɵdomListener("click", function MyResponsesPage_Conditional_20_For_2_Conditional_14_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r5); const response_r4 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.withdraw(response_r4)); });
    i0.ɵɵtext(2, "Withdraw response");
    i0.ɵɵdomElementEnd()();
} }
function MyResponsesPage_Conditional_20_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "article")(1, "div", 7)(2, "span", 8);
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(7, "h2");
    i0.ɵɵtext(8);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(9, "p", 9);
    i0.ɵɵtext(10);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(11, "blockquote");
    i0.ɵɵtext(12);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(13, MyResponsesPage_Conditional_20_For_2_Conditional_13_Template, 5, 0, "div", 10);
    i0.ɵɵconditionalCreate(14, MyResponsesPage_Conditional_20_For_2_Conditional_14_Template, 3, 0, "div", 10);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const response_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("accepted", response_r4.status === "ACCEPTED")("declined", response_r4.status === "DECLINED");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(response_r4.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 11, response_r4.createdAt, "medium"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(response_r4.postTitle);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.tab() === "received" ? "From " + response_r4.responderName + " \u00B7 " + response_r4.responderEmail : "To " + response_r4.postOwnerName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(response_r4.message);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.tab() === "received" && response_r4.status === "PENDING" ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.tab() === "sent" && response_r4.canWithdraw ? 14 : -1);
} }
function MyResponsesPage_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 5);
    i0.ɵɵrepeaterCreate(1, MyResponsesPage_Conditional_20_For_2_Template, 15, 14, "article", null, _forTrack0);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.visible());
} }
function MyResponsesPage_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 6);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u2713 ", ctx_r1.toast());
} }
export class MyResponsesPage {
    service = inject(HelpResponseService);
    sent = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "sent" }] : /* istanbul ignore next */ []));
    received = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "received" }] : /* istanbul ignore next */ []));
    tab = signal('received', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tab" }] : /* istanbul ignore next */ []));
    loading = signal(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    error = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    toast = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "toast" }] : /* istanbul ignore next */ []));
    visible = computed(() => this.tab() === 'received' ? this.received() : this.sent(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "visible" }] : /* istanbul ignore next */ []));
    completedLoads = 0;
    constructor() { this.load(); }
    load() {
        this.loading.set(true);
        this.error.set('');
        this.completedLoads = 0;
        this.service.received().subscribe({ next: items => { this.received.set(items); this.finished(); }, error: () => this.failed() });
        this.service.sent().subscribe({ next: items => { this.sent.set(items); this.finished(); }, error: () => this.failed() });
    }
    review(response, status) {
        this.service.updateStatus(response.id, status).subscribe({
            next: updated => { this.received.update(items => items.map(item => item.id === updated.id ? updated : item)); this.show(`Response ${status.toLowerCase()}.`); this.load(); },
            error: () => this.show('Could not review this response.'),
        });
    }
    withdraw(response) {
        if (!confirm('Withdraw this response?'))
            return;
        this.service.withdraw(response.id).subscribe({
            next: () => { this.sent.update(items => items.filter(item => item.id !== response.id)); this.show('Response withdrawn.'); },
            error: () => this.show('Could not withdraw this response.'),
        });
    }
    finished() { this.completedLoads += 1; if (this.completedLoads === 2)
        this.loading.set(false); }
    failed() { this.loading.set(false); this.error.set('Could not load your responses.'); }
    show(message) { this.toast.set(message); window.setTimeout(() => this.toast.set(''), 2500); }
    static ɵfac = function MyResponsesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MyResponsesPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MyResponsesPage, selectors: [["app-my-responses-page"]], decls: 22, vars: 8, consts: [[1, "page"], [1, "eyebrow"], [1, "tabs"], [3, "click"], [1, "state"], [1, "list"], [1, "toast"], [1, "top"], [1, "status"], [1, "person"], [1, "actions"], [1, "secondary", 3, "click"]], template: function MyResponsesPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "section", 0)(1, "header")(2, "div", 1);
            i0.ɵɵtext(3, "Connections");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(4, "h1");
            i0.ɵɵtext(5, "My responses");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(6, "p");
            i0.ɵɵtext(7, "Manage the messages you sent and the people who responded to your posts.");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(8, "div", 2)(9, "button", 3);
            i0.ɵɵdomListener("click", function MyResponsesPage_Template_button_click_9_listener() { return ctx.tab.set("received"); });
            i0.ɵɵtext(10, "Received ");
            i0.ɵɵdomElementStart(11, "span");
            i0.ɵɵtext(12);
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(13, "button", 3);
            i0.ɵɵdomListener("click", function MyResponsesPage_Template_button_click_13_listener() { return ctx.tab.set("sent"); });
            i0.ɵɵtext(14, "Sent ");
            i0.ɵɵdomElementStart(15, "span");
            i0.ɵɵtext(16);
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵconditionalCreate(17, MyResponsesPage_Conditional_17_Template, 2, 0, "div", 4)(18, MyResponsesPage_Conditional_18_Template, 5, 1, "div", 4)(19, MyResponsesPage_Conditional_19_Template, 7, 2, "div", 4)(20, MyResponsesPage_Conditional_20_Template, 3, 0, "div", 5);
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(21, MyResponsesPage_Conditional_21_Template, 2, 1, "div", 6);
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵclassProp("active", ctx.tab() === "received");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.received().length);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("active", ctx.tab() === "sent");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.sent().length);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 17 : ctx.error() ? 18 : ctx.visible().length === 0 ? 19 : 20);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.toast() ? 21 : -1);
        } }, dependencies: [DatePipe], styles: [".page[_ngcontent-%COMP%] { max-width: 1000px; margin: 0 auto; padding: 70px 24px 100px; }.eyebrow[_ngcontent-%COMP%] { color: var(--%NS%coral); text-transform: uppercase; letter-spacing: 2px; font-size: 10px; font-weight: 800; }h1[_ngcontent-%COMP%] { margin: 10px 0; font: 800 48px 'Manrope'; letter-spacing: -2px; }header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { color: var(--%NS%muted); }.tabs[_ngcontent-%COMP%] { display: flex; gap: 6px; margin: 32px 0 18px; padding: 5px; border-radius: 9px; background: var(--%NS%cream); }.tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { flex: 1; padding: 12px; border: 0; border-radius: 7px; background: transparent; cursor: pointer; color: var(--%NS%muted); font-weight: 800; }.tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] { background: white; color: var(--%NS%green); box-shadow: 0 2px 8px rgba(23,45,40,.08); }.tabs[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: inline-grid; place-items: center; min-width: 22px; height: 22px; margin-left: 5px; border-radius: 999px; background: var(--%NS%cream); }\r\n.list[_ngcontent-%COMP%] { display: grid; gap: 14px; }.list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] { padding: 25px; border: 1px solid var(--%NS%line); border-radius: 12px; background: white; }.top[_ngcontent-%COMP%] { display: flex; justify-content: space-between; }.top[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: var(--%NS%muted); }.status[_ngcontent-%COMP%] { padding: 5px 8px; border-radius: 4px; background: #fbf3da; color: #916d17; font-size: 9px; font-weight: 800; }.status.accepted[_ngcontent-%COMP%] { background: #dfeee8; color: #21604c; }.status.declined[_ngcontent-%COMP%] { background: #f2e7e4; color: #98483d; }.list[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 13px 0 4px; font: 800 20px 'Manrope'; }.person[_ngcontent-%COMP%] { margin: 0; color: var(--%NS%muted); font-size: 12px; }blockquote[_ngcontent-%COMP%] { margin: 18px 0 0; padding: 14px 16px; border-left: 3px solid var(--%NS%coral); background: var(--%NS%cream); line-height: 1.65; }.actions[_ngcontent-%COMP%] { display: flex; gap: 8px; margin-top: 18px; }.actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .state[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { min-height: 38px; padding: 0 16px; border: 0; border-radius: 6px; background: var(--%NS%green); color: white; cursor: pointer; font-weight: 800; }.actions[_ngcontent-%COMP%]   .secondary[_ngcontent-%COMP%] { border: 1px solid var(--%NS%line); background: white; color: var(--%NS%green); }.state[_ngcontent-%COMP%] { min-height: 300px; display: grid; place-items: center; align-content: center; gap: 8px; padding: 40px; border-radius: 12px; background: var(--%NS%cream); text-align: center; }.state[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { font-size: 35px; color: var(--%NS%coral); }.state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; }.state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { color: var(--%NS%muted); }.toast[_ngcontent-%COMP%] { position: fixed; left: 50%; bottom: 28px; transform: translateX(-50%); padding: 12px 18px; border-radius: 999px; background: #10261f; color: white; font-size: 12px; }\r\n@media (max-width: 600px) { h1[_ngcontent-%COMP%] { font-size: 40px; }.top[_ngcontent-%COMP%] { gap: 10px; }.actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { flex: 1; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MyResponsesPage, [{
        type: Component,
        args: [{ selector: 'app-my-responses-page', imports: [DatePipe], template: "<section class=\"page\">\r\n  <header><div class=\"eyebrow\">Connections</div><h1>My responses</h1><p>Manage the messages you sent and the people who responded to your posts.</p></header>\r\n  <div class=\"tabs\"><button [class.active]=\"tab() === 'received'\" (click)=\"tab.set('received')\">Received <span>{{ received().length }}</span></button><button [class.active]=\"tab() === 'sent'\" (click)=\"tab.set('sent')\">Sent <span>{{ sent().length }}</span></button></div>\r\n  @if (loading()) { <div class=\"state\">Loading responses\u2026</div> }\r\n  @else if (error()) { <div class=\"state\"><p>{{ error() }}</p><button (click)=\"load()\">Try again</button></div> }\r\n  @else if (visible().length === 0) { <div class=\"state\"><span>\u2197</span><h2>No {{ tab() }} responses yet</h2><p>{{ tab() === 'received' ? 'Responses to your posts will appear here.' : 'Open a community post and send a thoughtful response.' }}</p></div> }\r\n  @else {\r\n    <div class=\"list\">\r\n      @for (response of visible(); track response.id) {\r\n        <article>\r\n          <div class=\"top\"><span class=\"status\" [class.accepted]=\"response.status === 'ACCEPTED'\" [class.declined]=\"response.status === 'DECLINED'\">{{ response.status }}</span><small>{{ response.createdAt | date:'medium' }}</small></div>\r\n          <h2>{{ response.postTitle }}</h2>\r\n          <p class=\"person\">{{ tab() === 'received' ? 'From ' + response.responderName + ' \u00B7 ' + response.responderEmail : 'To ' + response.postOwnerName }}</p>\r\n          <blockquote>{{ response.message }}</blockquote>\r\n          @if (tab() === 'received' && response.status === 'PENDING') { <div class=\"actions\"><button (click)=\"review(response, 'ACCEPTED')\">Accept</button><button class=\"secondary\" (click)=\"review(response, 'DECLINED')\">Decline</button></div> }\r\n          @if (tab() === 'sent' && response.canWithdraw) { <div class=\"actions\"><button class=\"secondary\" (click)=\"withdraw(response)\">Withdraw response</button></div> }\r\n        </article>\r\n      }\r\n    </div>\r\n  }\r\n</section>\r\n@if (toast()) { <div class=\"toast\">\u2713 {{ toast() }}</div> }\r\n", styles: [".page { max-width: 1000px; margin: 0 auto; padding: 70px 24px 100px; }.eyebrow { color: var(--coral); text-transform: uppercase; letter-spacing: 2px; font-size: 10px; font-weight: 800; }h1 { margin: 10px 0; font: 800 48px 'Manrope'; letter-spacing: -2px; }header p { color: var(--muted); }.tabs { display: flex; gap: 6px; margin: 32px 0 18px; padding: 5px; border-radius: 9px; background: var(--cream); }.tabs button { flex: 1; padding: 12px; border: 0; border-radius: 7px; background: transparent; cursor: pointer; color: var(--muted); font-weight: 800; }.tabs button.active { background: white; color: var(--green); box-shadow: 0 2px 8px rgba(23,45,40,.08); }.tabs span { display: inline-grid; place-items: center; min-width: 22px; height: 22px; margin-left: 5px; border-radius: 999px; background: var(--cream); }\r\n.list { display: grid; gap: 14px; }.list article { padding: 25px; border: 1px solid var(--line); border-radius: 12px; background: white; }.top { display: flex; justify-content: space-between; }.top small { color: var(--muted); }.status { padding: 5px 8px; border-radius: 4px; background: #fbf3da; color: #916d17; font-size: 9px; font-weight: 800; }.status.accepted { background: #dfeee8; color: #21604c; }.status.declined { background: #f2e7e4; color: #98483d; }.list h2 { margin: 13px 0 4px; font: 800 20px 'Manrope'; }.person { margin: 0; color: var(--muted); font-size: 12px; }blockquote { margin: 18px 0 0; padding: 14px 16px; border-left: 3px solid var(--coral); background: var(--cream); line-height: 1.65; }.actions { display: flex; gap: 8px; margin-top: 18px; }.actions button,.state button { min-height: 38px; padding: 0 16px; border: 0; border-radius: 6px; background: var(--green); color: white; cursor: pointer; font-weight: 800; }.actions .secondary { border: 1px solid var(--line); background: white; color: var(--green); }.state { min-height: 300px; display: grid; place-items: center; align-content: center; gap: 8px; padding: 40px; border-radius: 12px; background: var(--cream); text-align: center; }.state > span { font-size: 35px; color: var(--coral); }.state h2,.state p { margin: 0; }.state p { color: var(--muted); }.toast { position: fixed; left: 50%; bottom: 28px; transform: translateX(-50%); padding: 12px 18px; border-radius: 999px; background: #10261f; color: white; font-size: 12px; }\r\n@media (max-width: 600px) { h1 { font-size: 40px; }.top { gap: 10px; }.actions button { flex: 1; } }\r\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MyResponsesPage, { className: "MyResponsesPage", filePath: "src/app/pages/my-responses-page/my-responses-page.ts", lineNumber: 12 }); })();
