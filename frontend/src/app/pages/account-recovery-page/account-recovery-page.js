import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function AccountRecoveryPage_Conditional_6_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Checking your secure verification link\u2026");
    i0.ɵɵelementEnd();
} }
function AccountRecoveryPage_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1, "\u2709");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "h1");
    i0.ɵɵtext(3, "Verify your email");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, AccountRecoveryPage_Conditional_6_Conditional_4_Template, 2, 0, "p");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r0.busy() ? 4 : -1);
} }
function AccountRecoveryPage_Conditional_7_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 8);
    i0.ɵɵlistener("ngSubmit", function AccountRecoveryPage_Conditional_7_Conditional_6_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.resetPassword()); });
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "New password");
    i0.ɵɵelement(3, "input", 9);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "label");
    i0.ɵɵtext(5, "Confirm password");
    i0.ɵɵelement(6, "input", 10);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 11);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formGroup", ctx_r0.resetForm);
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.busy());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.busy() ? "Saving\u2026" : "Reset password");
} }
function AccountRecoveryPage_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1, "\u2318");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "h1");
    i0.ɵɵtext(3, "Choose a new password");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Enter a strong new password for your HelpHive account.");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(6, AccountRecoveryPage_Conditional_7_Conditional_6_Template, 9, 3, "form", 7);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(!ctx_r0.message() ? 6 : -1);
} }
function AccountRecoveryPage_Conditional_8_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 8);
    i0.ɵɵlistener("ngSubmit", function AccountRecoveryPage_Conditional_8_Conditional_6_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.requestReset()); });
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Email address");
    i0.ɵɵelement(3, "input", 12);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 11);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formGroup", ctx_r0.emailForm);
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.busy());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.busy() ? "Sending\u2026" : "Send reset link");
} }
function AccountRecoveryPage_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1, "\u21BB");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "h1");
    i0.ɵɵtext(3, "Forgot your password?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Enter your account email and we will send a secure 30-minute reset link.");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(6, AccountRecoveryPage_Conditional_8_Conditional_6_Template, 6, 3, "form", 7);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(!ctx_r0.message() ? 6 : -1);
} }
function AccountRecoveryPage_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u2713 ", ctx_r0.message());
} }
function AccountRecoveryPage_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error());
} }
export class AccountRecoveryPage {
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    auth = inject(AuthService);
    mode = this.route.snapshot.url.at(-1)?.path ?? 'forgot-password';
    busy = signal(this.mode === 'verify-email', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "busy" }] : /* istanbul ignore next */ []));
    message = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "message" }] : /* istanbul ignore next */ []));
    error = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    emailForm = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]] });
    resetForm = this.fb.nonNullable.group({
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(72)]],
        confirmPassword: ['', Validators.required],
    });
    constructor() {
        if (this.mode === 'verify-email')
            this.verify();
    }
    requestReset() {
        if (this.emailForm.invalid) {
            this.emailForm.markAllAsTouched();
            return;
        }
        this.busy.set(true);
        this.error.set('');
        this.auth.forgotPassword(this.emailForm.controls.email.value).subscribe({
            next: response => { this.busy.set(false); this.message.set(response.message); },
            error: () => { this.busy.set(false); this.error.set('Could not request a reset email.'); },
        });
    }
    resetPassword() {
        const value = this.resetForm.getRawValue();
        if (this.resetForm.invalid || value.password !== value.confirmPassword) {
            this.resetForm.markAllAsTouched();
            this.error.set('Passwords must match and contain at least 8 characters.');
            return;
        }
        const token = this.route.snapshot.queryParamMap.get('token') ?? '';
        if (!token) {
            this.error.set('This reset link is missing its token.');
            return;
        }
        this.busy.set(true);
        this.error.set('');
        this.auth.resetPassword(token, value.password).subscribe({
            next: response => { this.busy.set(false); this.message.set(response.message); this.resetForm.reset(); },
            error: (response) => { this.busy.set(false); this.error.set(response.error?.message ?? 'Could not reset the password.'); },
        });
    }
    verify() {
        const token = this.route.snapshot.queryParamMap.get('token') ?? '';
        if (!token) {
            this.busy.set(false);
            this.error.set('This verification link is missing its token.');
            return;
        }
        this.auth.verifyEmail(token).subscribe({
            next: response => { this.busy.set(false); this.message.set(response.message); },
            error: (response) => { this.busy.set(false); this.error.set(response.error?.message ?? 'Could not verify this email.'); },
        });
    }
    static ɵfac = function AccountRecoveryPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AccountRecoveryPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AccountRecoveryPage, selectors: [["app-account-recovery-page"]], decls: 13, vars: 3, consts: [[1, "recovery-page"], ["routerLink", "/auth/login", 1, "brand"], [1, "card"], [1, "success"], [1, "error"], ["routerLink", "/auth/login", 1, "back"], [1, "icon"], [3, "formGroup"], [3, "ngSubmit", "formGroup"], ["type", "password", "formControlName", "password", "autocomplete", "new-password"], ["type", "password", "formControlName", "confirmPassword", "autocomplete", "new-password"], [3, "disabled"], ["type", "email", "formControlName", "email", "autocomplete", "email"]], template: function AccountRecoveryPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "a", 1)(2, "span");
            i0.ɵɵtext(3, "H");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(4, " HelpHive");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "section", 2);
            i0.ɵɵconditionalCreate(6, AccountRecoveryPage_Conditional_6_Template, 5, 1)(7, AccountRecoveryPage_Conditional_7_Template, 7, 1)(8, AccountRecoveryPage_Conditional_8_Template, 7, 1);
            i0.ɵɵconditionalCreate(9, AccountRecoveryPage_Conditional_9_Template, 2, 1, "p", 3);
            i0.ɵɵconditionalCreate(10, AccountRecoveryPage_Conditional_10_Template, 2, 1, "p", 4);
            i0.ɵɵelementStart(11, "a", 5);
            i0.ɵɵtext(12, "\u2190 Back to sign in");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(ctx.mode === "verify-email" ? 6 : ctx.mode === "reset-password" ? 7 : 8);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.message() ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.error() ? 10 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], styles: ["[_nghost-%COMP%] { display: block; min-height: 100vh; background: linear-gradient(135deg,#10261f,#2f6655 55%,#8eb7a8); }.recovery-page[_ngcontent-%COMP%] { min-height: 100vh; display: grid; place-items: center; padding: 80px 20px 30px; }.brand[_ngcontent-%COMP%] { position: absolute; top: 28px; left: 38px; display: flex; align-items: center; gap: 9px; color: white; font: 800 22px 'Manrope'; }.brand[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { width: 34px; height: 34px; border-radius: 50% 50% 50% 12px; background: var(--%NS%coral); display: grid; place-items: center; }.card[_ngcontent-%COMP%] { width: min(480px,100%); padding: 38px; border-radius: 16px; background: var(--%NS%paper); box-shadow: 0 30px 90px rgba(0,0,0,.25); text-align: center; }.icon[_ngcontent-%COMP%] { width: 58px; height: 58px; margin: 0 auto 15px; border-radius: 50%; display: grid; place-items: center; background: var(--%NS%cream); color: var(--%NS%green); font-size: 24px; }.card[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin: 0 0 10px; font: 800 30px 'Manrope'; }.card[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { color: var(--%NS%muted); line-height: 1.6; }form[_ngcontent-%COMP%] { text-align: left; }label[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 7px; margin-top: 14px; text-transform: uppercase; letter-spacing: .8px; font-size: 10px; font-weight: 800; }input[_ngcontent-%COMP%] { padding: 13px; border: 1px solid var(--%NS%line); border-radius: 7px; outline: none; }button[_ngcontent-%COMP%] { width: 100%; min-height: 46px; margin-top: 20px; border: 0; border-radius: 7px; background: var(--%NS%coral); cursor: pointer; font-weight: 800; }button[_ngcontent-%COMP%]:disabled { opacity: .6; }.success[_ngcontent-%COMP%] { padding: 13px; border-radius: 8px; background: #e5f2ec; color: var(--%NS%green)!important; }.error[_ngcontent-%COMP%] { color: #a84034!important; }.back[_ngcontent-%COMP%] { display: inline-block; margin-top: 20px; color: var(--%NS%green); font-size: 12px; font-weight: 700; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AccountRecoveryPage, [{
        type: Component,
        args: [{ selector: 'app-account-recovery-page', imports: [ReactiveFormsModule, RouterLink], template: "<div class=\"recovery-page\"><a class=\"brand\" routerLink=\"/auth/login\"><span>H</span> HelpHive</a><section class=\"card\">\r\n  @if (mode === 'verify-email') {\r\n    <div class=\"icon\">\u2709</div><h1>Verify your email</h1>\r\n    @if (busy()) { <p>Checking your secure verification link\u2026</p> }\r\n  } @else if (mode === 'reset-password') {\r\n    <div class=\"icon\">\u2318</div><h1>Choose a new password</h1><p>Enter a strong new password for your HelpHive account.</p>\r\n    @if (!message()) { <form [formGroup]=\"resetForm\" (ngSubmit)=\"resetPassword()\"><label>New password<input type=\"password\" formControlName=\"password\" autocomplete=\"new-password\"></label><label>Confirm password<input type=\"password\" formControlName=\"confirmPassword\" autocomplete=\"new-password\"></label><button [disabled]=\"busy()\">{{ busy() ? 'Saving\u2026' : 'Reset password' }}</button></form> }\r\n  } @else {\r\n    <div class=\"icon\">\u21BB</div><h1>Forgot your password?</h1><p>Enter your account email and we will send a secure 30-minute reset link.</p>\r\n    @if (!message()) { <form [formGroup]=\"emailForm\" (ngSubmit)=\"requestReset()\"><label>Email address<input type=\"email\" formControlName=\"email\" autocomplete=\"email\"></label><button [disabled]=\"busy()\">{{ busy() ? 'Sending\u2026' : 'Send reset link' }}</button></form> }\r\n  }\r\n  @if (message()) { <p class=\"success\">\u2713 {{ message() }}</p> }\r\n  @if (error()) { <p class=\"error\">{{ error() }}</p> }\r\n  <a class=\"back\" routerLink=\"/auth/login\">\u2190 Back to sign in</a>\r\n</section></div>\r\n", styles: [":host { display: block; min-height: 100vh; background: linear-gradient(135deg,#10261f,#2f6655 55%,#8eb7a8); }.recovery-page { min-height: 100vh; display: grid; place-items: center; padding: 80px 20px 30px; }.brand { position: absolute; top: 28px; left: 38px; display: flex; align-items: center; gap: 9px; color: white; font: 800 22px 'Manrope'; }.brand span { width: 34px; height: 34px; border-radius: 50% 50% 50% 12px; background: var(--coral); display: grid; place-items: center; }.card { width: min(480px,100%); padding: 38px; border-radius: 16px; background: var(--paper); box-shadow: 0 30px 90px rgba(0,0,0,.25); text-align: center; }.icon { width: 58px; height: 58px; margin: 0 auto 15px; border-radius: 50%; display: grid; place-items: center; background: var(--cream); color: var(--green); font-size: 24px; }.card h1 { margin: 0 0 10px; font: 800 30px 'Manrope'; }.card > p { color: var(--muted); line-height: 1.6; }form { text-align: left; }label { display: flex; flex-direction: column; gap: 7px; margin-top: 14px; text-transform: uppercase; letter-spacing: .8px; font-size: 10px; font-weight: 800; }input { padding: 13px; border: 1px solid var(--line); border-radius: 7px; outline: none; }button { width: 100%; min-height: 46px; margin-top: 20px; border: 0; border-radius: 7px; background: var(--coral); cursor: pointer; font-weight: 800; }button:disabled { opacity: .6; }.success { padding: 13px; border-radius: 8px; background: #e5f2ec; color: var(--green)!important; }.error { color: #a84034!important; }.back { display: inline-block; margin-top: 20px; color: var(--green); font-size: 12px; font-weight: 700; }\r\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AccountRecoveryPage, { className: "AccountRecoveryPage", filePath: "src/app/pages/account-recovery-page/account-recovery-page.ts", lineNumber: 13 }); })();
