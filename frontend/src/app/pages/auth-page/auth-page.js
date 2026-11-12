import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function AuthPage_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.notice());
} }
function AuthPage_Conditional_18_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1, "Enter a valid email and password.");
    i0.ɵɵelementEnd();
} }
function AuthPage_Conditional_18_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error());
} }
function AuthPage_Conditional_18_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function AuthPage_Conditional_18_Conditional_11_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.resendVerification()); });
    i0.ɵɵtext(1, "Resend verification email");
    i0.ɵɵelementEnd();
} }
function AuthPage_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 8);
    i0.ɵɵlistener("ngSubmit", function AuthPage_Conditional_18_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.submit()); });
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Email");
    i0.ɵɵelement(3, "input", 9);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "label");
    i0.ɵɵtext(5, "Password");
    i0.ɵɵelement(6, "input", 10);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "a", 11);
    i0.ɵɵtext(8, "Forgot password?");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(9, AuthPage_Conditional_18_Conditional_9_Template, 2, 0, "p", 12);
    i0.ɵɵconditionalCreate(10, AuthPage_Conditional_18_Conditional_10_Template, 2, 1, "p", 12);
    i0.ɵɵconditionalCreate(11, AuthPage_Conditional_18_Conditional_11_Template, 2, 0, "button", 13);
    i0.ɵɵelementStart(12, "button", 14);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.loginForm);
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r0.loginForm.invalid && ctx_r0.loginForm.touched ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.error() ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.error().toLowerCase().includes("verify") ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.busy());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.busy() ? "Signing in\u2026" : "Sign in \u2192");
} }
function AuthPage_Conditional_19_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1, "Use a name, valid email, and at least 8 password characters.");
    i0.ɵɵelementEnd();
} }
function AuthPage_Conditional_19_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error());
} }
function AuthPage_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 8);
    i0.ɵɵlistener("ngSubmit", function AuthPage_Conditional_19_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.submit()); });
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Name");
    i0.ɵɵelement(3, "input", 16);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "label");
    i0.ɵɵtext(5, "Email");
    i0.ɵɵelement(6, "input", 9);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "label");
    i0.ɵɵtext(8, "Password");
    i0.ɵɵelement(9, "input", 17);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(10, AuthPage_Conditional_19_Conditional_10_Template, 2, 0, "p", 12);
    i0.ɵɵconditionalCreate(11, AuthPage_Conditional_19_Conditional_11_Template, 2, 1, "p", 12);
    i0.ɵɵelementStart(12, "button", 14);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.registerForm);
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.registerForm.invalid && ctx_r0.registerForm.touched ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.error() ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.busy());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.busy() ? "Creating account\u2026" : "Create account \u2192");
} }
export class AuthPage {
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    router = inject(Router);
    auth = inject(AuthService);
    mode = signal(this.route.snapshot.url.at(-1)?.path === 'register' ? 'register' : 'login', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "mode" }] : /* istanbul ignore next */ []));
    busy = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "busy" }] : /* istanbul ignore next */ []));
    error = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    notice = signal(this.route.snapshot.queryParamMap.get('notice') ?? '', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "notice" }] : /* istanbul ignore next */ []));
    loginForm = this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]], password: ['', Validators.required],
    });
    registerForm = this.fb.nonNullable.group({
        name: ['', [Validators.required, Validators.maxLength(60)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(72)]],
    });
    switchMode(mode) {
        this.mode.set(mode);
        this.error.set('');
        this.notice.set('');
        void this.router.navigate(['/auth', mode], { replaceUrl: true });
    }
    submit() {
        const form = this.mode() === 'login' ? this.loginForm : this.registerForm;
        if (form.invalid) {
            form.markAllAsTouched();
            return;
        }
        this.busy.set(true);
        this.error.set('');
        if (this.mode() === 'login') {
            this.auth.login(this.loginForm.getRawValue()).subscribe({
                next: () => {
                    this.busy.set(false);
                    const requested = this.route.snapshot.queryParamMap.get('returnUrl');
                    void this.router.navigateByUrl(requested?.startsWith('/') ? requested : '/community');
                },
                error: (response) => { this.busy.set(false); this.error.set(response.error?.message ?? 'Sign in failed.'); },
            });
            return;
        }
        this.auth.register(this.registerForm.getRawValue()).subscribe({
            next: user => {
                this.busy.set(false);
                this.loginForm.setValue({ email: user.email, password: '' });
                this.registerForm.reset();
                this.mode.set('login');
                this.notice.set(user.emailVerified === false
                    ? 'Account created. Check your email and verify it before signing in.'
                    : 'Account created successfully. Sign in with your new password.');
                void this.router.navigate(['/auth/login'], { replaceUrl: true });
            },
            error: (response) => { this.busy.set(false); this.error.set(response.error?.message ?? 'Could not create the account.'); },
        });
    }
    resendVerification() {
        const email = this.loginForm.controls.email.value;
        if (!email || this.loginForm.controls.email.invalid) {
            this.error.set('Enter your account email first.');
            return;
        }
        this.busy.set(true);
        this.auth.resendVerification(email).subscribe({
            next: response => { this.busy.set(false); this.error.set(''); this.notice.set(response.message); },
            error: () => { this.busy.set(false); this.error.set('Could not resend the verification email.'); },
        });
    }
    static ɵfac = function AuthPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuthPage, selectors: [["app-auth-page"]], decls: 22, vars: 8, consts: [[1, "auth-page"], ["routerLink", "/auth/login", 1, "brand"], [1, "auth-card"], [1, "eyebrow"], [1, "tabs"], [3, "click"], [1, "notice"], [3, "formGroup"], [3, "ngSubmit", "formGroup"], ["type", "email", "formControlName", "email", "autocomplete", "email", "placeholder", "you@example.com"], ["type", "password", "formControlName", "password", "autocomplete", "current-password", "placeholder", "Your password"], ["routerLink", "/auth/forgot-password", 1, "forgot"], [1, "error"], ["type", "button", 1, "link-button"], [1, "submit", 3, "disabled"], ["type", "button", 1, "link-button", 3, "click"], ["type", "text", "formControlName", "name", "autocomplete", "name", "placeholder", "Your name"], ["type", "password", "formControlName", "password", "autocomplete", "new-password", "placeholder", "At least 8 characters"]], template: function AuthPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "a", 1)(2, "span");
            i0.ɵɵtext(3, "H");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(4, " HelpHive");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "section", 2)(6, "div", 3);
            i0.ɵɵtext(7, "\u2014 Your HelpHive account");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "h1");
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p");
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "div", 4)(13, "button", 5);
            i0.ɵɵlistener("click", function AuthPage_Template_button_click_13_listener() { return ctx.switchMode("login"); });
            i0.ɵɵtext(14, "Sign in");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "button", 5);
            i0.ɵɵlistener("click", function AuthPage_Template_button_click_15_listener() { return ctx.switchMode("register"); });
            i0.ɵɵtext(16, "Create account");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(17, AuthPage_Conditional_17_Template, 2, 1, "p", 6);
            i0.ɵɵconditionalCreate(18, AuthPage_Conditional_18_Template, 14, 6, "form", 7)(19, AuthPage_Conditional_19_Template, 14, 5, "form", 7);
            i0.ɵɵelementStart(20, "small");
            i0.ɵɵtext(21, "Passwords are BCrypt-hashed. Your token stays in this browser session.");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.mode() === "login" ? "Welcome back" : "Join the community");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.mode() === "login" ? "Sign in to enter the private community." : "Create an account to ask for help and support your neighbors.");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.mode() === "login");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.mode() === "register");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.notice() ? 17 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.mode() === "login" ? 18 : 19);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], styles: ["[_nghost-%COMP%] { display: block; min-height: 100vh; background: radial-gradient(circle at 82% 18%,rgba(247,212,106,.42),transparent 26%),linear-gradient(135deg,#10261f,#2f6655 52%,#8eb7a8); }\r\n.auth-page[_ngcontent-%COMP%] { min-height: 100vh; display: grid; place-items: center; padding: 80px 20px 30px; position: relative; }\r\n.brand[_ngcontent-%COMP%] { position: absolute; top: 28px; left: 38px; display: flex; align-items: center; gap: 9px; color: white; font: 800 22px 'Manrope',sans-serif; }.brand[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { width: 34px; height: 34px; border-radius: 50% 50% 50% 12px; background: var(--%NS%coral); display: grid; place-items: center; }\r\n.auth-card[_ngcontent-%COMP%] { width: min(500px,100%); padding: 38px; border-radius: 16px; background: var(--%NS%paper); box-shadow: 0 30px 90px rgba(0,0,0,.25); }\r\n.eyebrow[_ngcontent-%COMP%] { color: var(--%NS%green); text-transform: uppercase; letter-spacing: 2px; font-size: 10px; font-weight: 800; }.auth-card[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin: 12px 0; font: 800 34px 'Manrope',sans-serif; }.auth-card[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { color: var(--%NS%muted); }\r\n.tabs[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; padding: 5px; margin: 22px 0; border-radius: 9px; background: var(--%NS%cream); }.tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { border: 0; padding: 11px; border-radius: 6px; background: transparent; cursor: pointer; font-weight: 700; }.tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] { background: white; color: var(--%NS%green); box-shadow: 0 2px 8px rgba(23,45,40,.08); }\r\nform[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 7px; margin-top: 15px; text-transform: uppercase; letter-spacing: .8px; font-size: 10px; font-weight: 800; }input[_ngcontent-%COMP%] { border: 1px solid var(--%NS%line); border-radius: 7px; padding: 13px; outline: none; font: 400 14px inherit; text-transform: none; letter-spacing: 0; }input[_ngcontent-%COMP%]:focus { border-color: var(--%NS%green); box-shadow: 0 0 0 3px rgba(47,102,85,.1); }\r\n.submit[_ngcontent-%COMP%] { width: 100%; min-height: 48px; margin-top: 22px; border: 0; border-radius: 7px; background: var(--%NS%coral); color: var(--%NS%ink); cursor: pointer; font-weight: 800; }.submit[_ngcontent-%COMP%]:disabled { opacity: .6; }.error[_ngcontent-%COMP%] { color: #a84034!important; font-size: 11px; }.notice[_ngcontent-%COMP%] { padding: 11px 13px; border: 1px solid #a8c9bc; border-radius: 8px; background: #edf4f1; color: var(--%NS%green)!important; font-size: 11px; }.auth-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { display: block; margin-top: 18px; text-align: center; color: var(--%NS%muted); font-size: 10px; }\r\n@media (max-width: 560px) { .auth-card[_ngcontent-%COMP%] { padding: 30px 22px; }.brand[_ngcontent-%COMP%] { left: 20px; } }\r\n.forgot[_ngcontent-%COMP%] { display: block; margin-top: 9px; color: var(--%NS%green); text-align: right; font-size: 11px; font-weight: 700; }.link-button[_ngcontent-%COMP%] { width: 100%; border: 0; background: transparent; color: var(--%NS%green); text-decoration: underline; cursor: pointer; font-weight: 700; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthPage, [{
        type: Component,
        args: [{ selector: 'app-auth-page', imports: [ReactiveFormsModule, RouterLink], template: "<div class=\"auth-page\">\r\n  <a class=\"brand\" routerLink=\"/auth/login\"><span>H</span> HelpHive</a>\r\n  <section class=\"auth-card\">\r\n    <div class=\"eyebrow\">\u2014 Your HelpHive account</div>\r\n    <h1>{{ mode() === 'login' ? 'Welcome back' : 'Join the community' }}</h1>\r\n    <p>{{ mode() === 'login' ? 'Sign in to enter the private community.' : 'Create an account to ask for help and support your neighbors.' }}</p>\r\n    <div class=\"tabs\"><button [class.active]=\"mode() === 'login'\" (click)=\"switchMode('login')\">Sign in</button><button [class.active]=\"mode() === 'register'\" (click)=\"switchMode('register')\">Create account</button></div>\r\n    @if (notice()) { <p class=\"notice\">{{ notice() }}</p> }\r\n    @if (mode() === 'login') {\r\n      <form [formGroup]=\"loginForm\" (ngSubmit)=\"submit()\">\r\n        <label>Email<input type=\"email\" formControlName=\"email\" autocomplete=\"email\" placeholder=\"you@example.com\"></label>\r\n        <label>Password<input type=\"password\" formControlName=\"password\" autocomplete=\"current-password\" placeholder=\"Your password\"></label>\r\n        <a class=\"forgot\" routerLink=\"/auth/forgot-password\">Forgot password?</a>\r\n        @if (loginForm.invalid && loginForm.touched) { <p class=\"error\">Enter a valid email and password.</p> }\r\n        @if (error()) { <p class=\"error\">{{ error() }}</p> }\r\n        @if (error().toLowerCase().includes('verify')) { <button class=\"link-button\" type=\"button\" (click)=\"resendVerification()\">Resend verification email</button> }\r\n        <button class=\"submit\" [disabled]=\"busy()\">{{ busy() ? 'Signing in\u2026' : 'Sign in \u2192' }}</button>\r\n      </form>\r\n    } @else {\r\n      <form [formGroup]=\"registerForm\" (ngSubmit)=\"submit()\">\r\n        <label>Name<input type=\"text\" formControlName=\"name\" autocomplete=\"name\" placeholder=\"Your name\"></label>\r\n        <label>Email<input type=\"email\" formControlName=\"email\" autocomplete=\"email\" placeholder=\"you@example.com\"></label>\r\n        <label>Password<input type=\"password\" formControlName=\"password\" autocomplete=\"new-password\" placeholder=\"At least 8 characters\"></label>\r\n        @if (registerForm.invalid && registerForm.touched) { <p class=\"error\">Use a name, valid email, and at least 8 password characters.</p> }\r\n        @if (error()) { <p class=\"error\">{{ error() }}</p> }\r\n        <button class=\"submit\" [disabled]=\"busy()\">{{ busy() ? 'Creating account\u2026' : 'Create account \u2192' }}</button>\r\n      </form>\r\n    }\r\n    <small>Passwords are BCrypt-hashed. Your token stays in this browser session.</small>\r\n  </section>\r\n</div>\r\n", styles: [":host { display: block; min-height: 100vh; background: radial-gradient(circle at 82% 18%,rgba(247,212,106,.42),transparent 26%),linear-gradient(135deg,#10261f,#2f6655 52%,#8eb7a8); }\r\n.auth-page { min-height: 100vh; display: grid; place-items: center; padding: 80px 20px 30px; position: relative; }\r\n.brand { position: absolute; top: 28px; left: 38px; display: flex; align-items: center; gap: 9px; color: white; font: 800 22px 'Manrope',sans-serif; }.brand span { width: 34px; height: 34px; border-radius: 50% 50% 50% 12px; background: var(--coral); display: grid; place-items: center; }\r\n.auth-card { width: min(500px,100%); padding: 38px; border-radius: 16px; background: var(--paper); box-shadow: 0 30px 90px rgba(0,0,0,.25); }\r\n.eyebrow { color: var(--green); text-transform: uppercase; letter-spacing: 2px; font-size: 10px; font-weight: 800; }.auth-card h1 { margin: 12px 0; font: 800 34px 'Manrope',sans-serif; }.auth-card > p { color: var(--muted); }\r\n.tabs { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; padding: 5px; margin: 22px 0; border-radius: 9px; background: var(--cream); }.tabs button { border: 0; padding: 11px; border-radius: 6px; background: transparent; cursor: pointer; font-weight: 700; }.tabs button.active { background: white; color: var(--green); box-shadow: 0 2px 8px rgba(23,45,40,.08); }\r\nform label { display: flex; flex-direction: column; gap: 7px; margin-top: 15px; text-transform: uppercase; letter-spacing: .8px; font-size: 10px; font-weight: 800; }input { border: 1px solid var(--line); border-radius: 7px; padding: 13px; outline: none; font: 400 14px inherit; text-transform: none; letter-spacing: 0; }input:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(47,102,85,.1); }\r\n.submit { width: 100%; min-height: 48px; margin-top: 22px; border: 0; border-radius: 7px; background: var(--coral); color: var(--ink); cursor: pointer; font-weight: 800; }.submit:disabled { opacity: .6; }.error { color: #a84034!important; font-size: 11px; }.notice { padding: 11px 13px; border: 1px solid #a8c9bc; border-radius: 8px; background: #edf4f1; color: var(--green)!important; font-size: 11px; }.auth-card small { display: block; margin-top: 18px; text-align: center; color: var(--muted); font-size: 10px; }\r\n@media (max-width: 560px) { .auth-card { padding: 30px 22px; }.brand { left: 20px; } }\r\n.forgot { display: block; margin-top: 9px; color: var(--green); text-align: right; font-size: 11px; font-weight: 700; }.link-button { width: 100%; border: 0; background: transparent; color: var(--green); text-decoration: underline; cursor: pointer; font-weight: 700; }\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AuthPage, { className: "AuthPage", filePath: "src/app/pages/auth-page/auth-page.ts", lineNumber: 13 }); })();
