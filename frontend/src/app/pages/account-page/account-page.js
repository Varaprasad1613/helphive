import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function AccountPage_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Member since ", ctx_r0.auth.user()?.createdAt?.slice(0, 10));
} }
function AccountPage_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 9);
    i0.ɵɵtext(1, "Enter a name and valid email.");
    i0.ɵɵelementEnd();
} }
function AccountPage_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.profileMessage());
} }
function AccountPage_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.passwordMessage());
} }
function AccountPage_Conditional_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error());
} }
export class AccountPage {
    fb = inject(FormBuilder);
    auth = inject(AuthService);
    savingProfile = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "savingProfile" }] : /* istanbul ignore next */ []));
    savingPassword = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "savingPassword" }] : /* istanbul ignore next */ []));
    profileMessage = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "profileMessage" }] : /* istanbul ignore next */ []));
    passwordMessage = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "passwordMessage" }] : /* istanbul ignore next */ []));
    error = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    profileForm = this.fb.nonNullable.group({
        name: [this.auth.user()?.name ?? '', [Validators.required, Validators.maxLength(60)]],
        email: [this.auth.user()?.email ?? '', [Validators.required, Validators.email, Validators.maxLength(120)]],
    });
    passwordForm = this.fb.nonNullable.group({
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(72)]],
        confirmPassword: ['', Validators.required],
    });
    saveProfile() {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            return;
        }
        this.savingProfile.set(true);
        this.error.set('');
        this.profileMessage.set('');
        this.auth.updateProfile(this.profileForm.getRawValue()).subscribe({
            next: () => { this.savingProfile.set(false); this.profileMessage.set('Profile updated successfully.'); },
            error: (response) => { this.savingProfile.set(false); this.error.set(response.error?.message ?? 'Could not update your profile.'); },
        });
    }
    savePassword() {
        const value = this.passwordForm.getRawValue();
        if (this.passwordForm.invalid || value.newPassword !== value.confirmPassword) {
            this.passwordForm.markAllAsTouched();
            this.error.set('New password and confirmation must match.');
            return;
        }
        this.savingPassword.set(true);
        this.error.set('');
        this.passwordMessage.set('');
        this.auth.changePassword({ currentPassword: value.currentPassword, newPassword: value.newPassword }).subscribe({
            next: () => { this.savingPassword.set(false); this.passwordForm.reset(); this.passwordMessage.set('Password changed successfully.'); },
            error: (response) => { this.savingPassword.set(false); this.error.set(response.error?.message ?? 'Could not change your password.'); },
        });
    }
    static ɵfac = function AccountPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AccountPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AccountPage, selectors: [["app-account-page"]], decls: 53, vars: 15, consts: [[1, "page"], [1, "eyebrow"], [1, "account-grid"], [1, "profile-summary"], [1, "avatar"], [1, "forms"], [3, "ngSubmit", "formGroup"], ["formControlName", "name", "autocomplete", "name"], ["type", "email", "formControlName", "email", "autocomplete", "email"], [1, "error"], [1, "success"], [3, "disabled"], ["type", "password", "formControlName", "currentPassword", "autocomplete", "current-password"], ["type", "password", "formControlName", "newPassword", "autocomplete", "new-password"], ["type", "password", "formControlName", "confirmPassword", "autocomplete", "new-password"]], template: function AccountPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "header")(2, "div", 1);
            i0.ɵɵtext(3, "Your member profile");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "My account");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Keep your public name, contact email, and password up to date.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 2)(9, "article", 3)(10, "div", 4);
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "h2");
            i0.ɵɵtext(13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "p");
            i0.ɵɵtext(15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "span");
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(18, AccountPage_Conditional_18_Template, 2, 1, "small");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 5)(20, "form", 6);
            i0.ɵɵlistener("ngSubmit", function AccountPage_Template_form_ngSubmit_20_listener() { return ctx.saveProfile(); });
            i0.ɵɵelementStart(21, "h2");
            i0.ɵɵtext(22, "Profile details");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "p");
            i0.ɵɵtext(24, "This name and email appear on your help posts.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "label");
            i0.ɵɵtext(26, "Display name");
            i0.ɵɵelement(27, "input", 7);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "label");
            i0.ɵɵtext(29, "Email address");
            i0.ɵɵelement(30, "input", 8);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(31, AccountPage_Conditional_31_Template, 2, 0, "p", 9);
            i0.ɵɵconditionalCreate(32, AccountPage_Conditional_32_Template, 2, 1, "p", 10);
            i0.ɵɵelementStart(33, "button", 11);
            i0.ɵɵtext(34);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "form", 6);
            i0.ɵɵlistener("ngSubmit", function AccountPage_Template_form_ngSubmit_35_listener() { return ctx.savePassword(); });
            i0.ɵɵelementStart(36, "h2");
            i0.ɵɵtext(37, "Change password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "p");
            i0.ɵɵtext(39, "Use at least 8 characters and do not reuse your current password.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "label");
            i0.ɵɵtext(41, "Current password");
            i0.ɵɵelement(42, "input", 12);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "label");
            i0.ɵɵtext(44, "New password");
            i0.ɵɵelement(45, "input", 13);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "label");
            i0.ɵɵtext(47, "Confirm new password");
            i0.ɵɵelement(48, "input", 14);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(49, AccountPage_Conditional_49_Template, 2, 1, "p", 10);
            i0.ɵɵconditionalCreate(50, AccountPage_Conditional_50_Template, 2, 1, "p", 9);
            i0.ɵɵelementStart(51, "button", 11);
            i0.ɵɵtext(52);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.auth.user()?.name?.charAt(0));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.auth.user()?.name);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.auth.user()?.email);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.auth.user()?.role);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.auth.user()?.createdAt ? 18 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.profileForm);
            i0.ɵɵadvance(7);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.profileForm.invalid && ctx.profileForm.touched ? 31 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.profileMessage() ? 32 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.savingProfile());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.savingProfile() ? "Saving\u2026" : "Save profile");
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.passwordForm);
            i0.ɵɵadvance(7);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.passwordMessage() ? 49 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.error() ? 50 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.savingPassword());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.savingPassword() ? "Changing\u2026" : "Change password");
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName], styles: [".page[_ngcontent-%COMP%] { max-width: 1120px; margin: 0 auto; padding: 70px 24px 100px; }.page[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] { max-width: 650px; margin-bottom: 38px; }.eyebrow[_ngcontent-%COMP%] { color: var(--%NS%coral); text-transform: uppercase; letter-spacing: 2px; font-size: 10px; font-weight: 800; }.page[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin: 10px 0; font: 800 48px 'Manrope',sans-serif; letter-spacing: -2px; }.page[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], form[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { color: var(--%NS%muted); }\r\n.account-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: 280px 1fr; gap: 24px; align-items: start; }.profile-summary[_ngcontent-%COMP%], form[_ngcontent-%COMP%] { padding: 28px; border: 1px solid var(--%NS%line); border-radius: 14px; background: white; }.profile-summary[_ngcontent-%COMP%] { text-align: center; position: sticky; top: 110px; }.avatar[_ngcontent-%COMP%] { width: 84px; height: 84px; margin: 0 auto 15px; border-radius: 50%; display: grid; place-items: center; background: var(--%NS%green); color: white; font: 800 32px 'Manrope'; }.profile-summary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 0; }.profile-summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { color: var(--%NS%muted); }.profile-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: inline-block; padding: 6px 10px; border-radius: 999px; background: var(--%NS%cream); color: var(--%NS%green); font-size: 10px; font-weight: 800; }.profile-summary[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { display: block; margin-top: 16px; color: var(--%NS%muted); }\r\n.forms[_ngcontent-%COMP%] { display: grid; gap: 20px; }form[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 0; font: 800 22px 'Manrope'; }form[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { margin: 6px 0 20px; font-size: 13px; }label[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 7px; margin-top: 14px; text-transform: uppercase; letter-spacing: .8px; font-size: 10px; font-weight: 800; }input[_ngcontent-%COMP%] { padding: 13px; border: 1px solid var(--%NS%line); border-radius: 7px; outline: none; font-size: 14px; }input[_ngcontent-%COMP%]:focus { border-color: var(--%NS%green); box-shadow: 0 0 0 3px rgba(47,102,85,.1); }button[_ngcontent-%COMP%] { min-height: 44px; margin-top: 20px; padding: 0 20px; border: 0; border-radius: 7px; background: var(--%NS%green); color: white; cursor: pointer; font-weight: 800; }button[_ngcontent-%COMP%]:disabled { opacity: .6; }.success[_ngcontent-%COMP%] { color: #257257!important; }.error[_ngcontent-%COMP%] { color: #a84034!important; }\r\n@media (max-width: 760px) { .account-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }.profile-summary[_ngcontent-%COMP%] { position: static; }.page[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { font-size: 40px; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AccountPage, [{
        type: Component,
        args: [{ selector: 'app-account-page', imports: [ReactiveFormsModule], template: "<section class=\"page\">\r\n  <header><div class=\"eyebrow\">Your member profile</div><h1>My account</h1><p>Keep your public name, contact email, and password up to date.</p></header>\r\n  <div class=\"account-grid\">\r\n    <article class=\"profile-summary\">\r\n      <div class=\"avatar\">{{ auth.user()?.name?.charAt(0) }}</div>\r\n      <h2>{{ auth.user()?.name }}</h2><p>{{ auth.user()?.email }}</p>\r\n      <span>{{ auth.user()?.role }}</span>\r\n      @if (auth.user()?.createdAt) { <small>Member since {{ auth.user()?.createdAt?.slice(0, 10) }}</small> }\r\n    </article>\r\n    <div class=\"forms\">\r\n      <form [formGroup]=\"profileForm\" (ngSubmit)=\"saveProfile()\">\r\n        <h2>Profile details</h2><p>This name and email appear on your help posts.</p>\r\n        <label>Display name<input formControlName=\"name\" autocomplete=\"name\"></label>\r\n        <label>Email address<input type=\"email\" formControlName=\"email\" autocomplete=\"email\"></label>\r\n        @if (profileForm.invalid && profileForm.touched) { <p class=\"error\">Enter a name and valid email.</p> }\r\n        @if (profileMessage()) { <p class=\"success\">{{ profileMessage() }}</p> }\r\n        <button [disabled]=\"savingProfile()\">{{ savingProfile() ? 'Saving\u2026' : 'Save profile' }}</button>\r\n      </form>\r\n      <form [formGroup]=\"passwordForm\" (ngSubmit)=\"savePassword()\">\r\n        <h2>Change password</h2><p>Use at least 8 characters and do not reuse your current password.</p>\r\n        <label>Current password<input type=\"password\" formControlName=\"currentPassword\" autocomplete=\"current-password\"></label>\r\n        <label>New password<input type=\"password\" formControlName=\"newPassword\" autocomplete=\"new-password\"></label>\r\n        <label>Confirm new password<input type=\"password\" formControlName=\"confirmPassword\" autocomplete=\"new-password\"></label>\r\n        @if (passwordMessage()) { <p class=\"success\">{{ passwordMessage() }}</p> }\r\n        @if (error()) { <p class=\"error\">{{ error() }}</p> }\r\n        <button [disabled]=\"savingPassword()\">{{ savingPassword() ? 'Changing\u2026' : 'Change password' }}</button>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</section>\r\n", styles: [".page { max-width: 1120px; margin: 0 auto; padding: 70px 24px 100px; }.page > header { max-width: 650px; margin-bottom: 38px; }.eyebrow { color: var(--coral); text-transform: uppercase; letter-spacing: 2px; font-size: 10px; font-weight: 800; }.page h1 { margin: 10px 0; font: 800 48px 'Manrope',sans-serif; letter-spacing: -2px; }.page header p, form > p { color: var(--muted); }\r\n.account-grid { display: grid; grid-template-columns: 280px 1fr; gap: 24px; align-items: start; }.profile-summary, form { padding: 28px; border: 1px solid var(--line); border-radius: 14px; background: white; }.profile-summary { text-align: center; position: sticky; top: 110px; }.avatar { width: 84px; height: 84px; margin: 0 auto 15px; border-radius: 50%; display: grid; place-items: center; background: var(--green); color: white; font: 800 32px 'Manrope'; }.profile-summary h2 { margin: 0; }.profile-summary p { color: var(--muted); }.profile-summary span { display: inline-block; padding: 6px 10px; border-radius: 999px; background: var(--cream); color: var(--green); font-size: 10px; font-weight: 800; }.profile-summary small { display: block; margin-top: 16px; color: var(--muted); }\r\n.forms { display: grid; gap: 20px; }form h2 { margin: 0; font: 800 22px 'Manrope'; }form > p { margin: 6px 0 20px; font-size: 13px; }label { display: flex; flex-direction: column; gap: 7px; margin-top: 14px; text-transform: uppercase; letter-spacing: .8px; font-size: 10px; font-weight: 800; }input { padding: 13px; border: 1px solid var(--line); border-radius: 7px; outline: none; font-size: 14px; }input:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(47,102,85,.1); }button { min-height: 44px; margin-top: 20px; padding: 0 20px; border: 0; border-radius: 7px; background: var(--green); color: white; cursor: pointer; font-weight: 800; }button:disabled { opacity: .6; }.success { color: #257257!important; }.error { color: #a84034!important; }\r\n@media (max-width: 760px) { .account-grid { grid-template-columns: 1fr; }.profile-summary { position: static; }.page h1 { font-size: 40px; } }\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AccountPage, { className: "AccountPage", filePath: "src/app/pages/account-page/account-page.ts", lineNumber: 12 }); })();
