import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpPostService } from '../../help-post.service';
import { AuthService } from '../../auth.service';
import { HelpResponseService } from '../../help-response.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = () => [1, 2, 3];
const _forTrack0 = ($index, $item) => $item.value;
const _forTrack1 = ($index, $item) => $item.id;
function CommunityPage_For_96_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 23);
    i0.ɵɵlistener("click", function CommunityPage_For_96_Template_button_click_0_listener() { const item_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setCategory(item_r2.value)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r2.category() === item_r2.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r2.icon);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r2.label);
} }
function CommunityPage_Conditional_126_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 49);
} }
function CommunityPage_Conditional_126_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37);
    i0.ɵɵrepeaterCreate(1, CommunityPage_Conditional_126_For_2_Template, 1, 0, "div", 49, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function CommunityPage_Conditional_127_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 38)(1, "div");
    i0.ɵɵtext(2, "\u21BB");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "We couldn't load the board");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 50);
    i0.ɵɵlistener("click", function CommunityPage_Conditional_127_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.refresh()); });
    i0.ɵɵtext(8, "Try again");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.error());
} }
function CommunityPage_Conditional_128_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 38)(1, "div");
    i0.ɵɵtext(2, "\u2315");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "No posts match those filters");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Try a broader search or be the first person to post here.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 51);
    i0.ɵɵlistener("click", function CommunityPage_Conditional_128_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.clearFilters()); });
    i0.ɵɵtext(8, "Clear all filters");
    i0.ɵɵelementEnd()();
} }
function CommunityPage_Conditional_129_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 53);
    i0.ɵɵlistener("click", function CommunityPage_Conditional_129_For_2_Template_article_click_0_listener() { const post_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.view(post_r7)); })("keydown.enter", function CommunityPage_Conditional_129_For_2_Template_article_keydown_enter_0_listener() { const post_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.view(post_r7)); });
    i0.ɵɵelementStart(1, "div", 54)(2, "span", 55);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "span", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 57);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "h3");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 58);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 59)(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "footer")(20, "div", 60);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div")(23, "b");
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "small");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "button", 61);
    i0.ɵɵlistener("click", function CommunityPage_Conditional_129_For_2_Template_button_click_27_listener($event) { const post_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r2.view(post_r7)); });
    i0.ɵɵtext(28, "\u2197");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const post_r7 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("offer", post_r7.type === "OFFER");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(post_r7.type === "REQUEST" ? "Needs a hand" : "Happy to help");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("progress", post_r7.status === "IN_PROGRESS")("done", post_r7.status === "COMPLETED");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.categoryIcon(post_r7.category));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(post_r7.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(post_r7.description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\u2316 ", post_r7.location);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(18, 15, post_r7.createdAt, "MMM d"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(post_r7.authorName.charAt(0));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(post_r7.authorName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.categoryLabel(post_r7.category));
} }
function CommunityPage_Conditional_129_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 39);
    i0.ɵɵrepeaterCreate(1, CommunityPage_Conditional_129_For_2_Template, 29, 18, "article", 52, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.posts());
} }
function CommunityPage_Conditional_174_For_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 75);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r9 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r9.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r9.label);
} }
function CommunityPage_Conditional_174_Conditional_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 77);
    i0.ɵɵtext(1, "Please complete every field. The description needs at least 20 characters.");
    i0.ɵɵelementEnd();
} }
function CommunityPage_Conditional_174_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 62);
    i0.ɵɵlistener("mousedown", function CommunityPage_Conditional_174_Template_div_mousedown_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵelementStart(1, "section", 63);
    i0.ɵɵlistener("mousedown", function CommunityPage_Conditional_174_Template_section_mousedown_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "button", 64);
    i0.ɵɵlistener("click", function CommunityPage_Conditional_174_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(3, "\u00D7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 3);
    i0.ɵɵelement(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "h2", 65);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "form", 66);
    i0.ɵɵlistener("ngSubmit", function CommunityPage_Conditional_174_Template_form_ngSubmit_9_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submit()); });
    i0.ɵɵelementStart(10, "div", 67)(11, "label");
    i0.ɵɵelement(12, "input", 68);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14, "\u2199");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div")(16, "b");
    i0.ɵɵtext(17, "I need help");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "small");
    i0.ɵɵtext(19, "Ask the community");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "label");
    i0.ɵɵelement(21, "input", 69);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(22, "span");
    i0.ɵɵtext(23, "\u2197");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div")(25, "b");
    i0.ɵɵtext(26, "I can help");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "small");
    i0.ɵɵtext(28, "Offer time or a skill");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(29, "label");
    i0.ɵɵtext(30, "Title");
    i0.ɵɵelement(31, "input", 70);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(32, "small");
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "label");
    i0.ɵɵtext(35, "Description");
    i0.ɵɵelement(36, "textarea", 71);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(37, "small");
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "div", 72)(40, "label");
    i0.ɵɵtext(41, "Location");
    i0.ɵɵelement(42, "input", 73);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "label");
    i0.ɵɵtext(44, "Category");
    i0.ɵɵelementStart(45, "select", 74);
    i0.ɵɵrepeaterCreate(46, CommunityPage_Conditional_174_For_47_Template, 2, 2, "option", 75, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "p", 76);
    i0.ɵɵtext(49, "Posting as ");
    i0.ɵɵelementStart(50, "strong");
    i0.ɵɵtext(51);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(52);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(53, CommunityPage_Conditional_174_Conditional_53_Template, 2, 0, "p", 77);
    i0.ɵɵelementStart(54, "button", 78);
    i0.ɵɵtext(55);
    i0.ɵɵelementStart(56, "span");
    i0.ɵɵtext(57, "\u2197");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.editingId() ? "Update the details" : "Start a connection");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.editingId() ? "Edit your post" : "What would you like to share?");
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r2.postForm);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("selected", ctx_r2.postForm.controls.type.value === "REQUEST");
    i0.ɵɵadvance();
    i0.ɵɵcontrol();
    i0.ɵɵadvance(8);
    i0.ɵɵclassProp("selected", ctx_r2.postForm.controls.type.value === "OFFER");
    i0.ɵɵadvance();
    i0.ɵɵcontrol();
    i0.ɵɵadvance(10);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r2.postForm.controls.title.value.length, "/90");
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r2.postForm.controls.description.value.length, "/800");
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.categories);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.auth.user()?.name);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u00B7 ", ctx_r2.auth.user()?.email);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.postForm.invalid && ctx_r2.postForm.touched ? 53 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r2.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx_r2.saving() ? "Saving\u2026" : ctx_r2.editingId() ? "Save changes" : "Publish to the board", " ");
} }
function CommunityPage_Conditional_175_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 82)(1, "span");
    i0.ɵɵtext(2, "\u2709");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "b");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "strong");
    i0.ɵɵtext(9, "\u2197");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const post_r11 = i0.ɵɵnextContext();
    i0.ɵɵproperty("href", "mailto:" + post_r11.contact, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("Contact ", post_r11.authorName.split(" ")[0]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(post_r11.contact);
} }
function CommunityPage_Conditional_175_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 83)(1, "span");
    i0.ɵɵtext(2, "\u2659");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "small");
    i0.ɵɵtext(5, "Community privacy");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "b");
    i0.ɵɵtext(7, "Contact details are for signed-in members");
    i0.ɵɵelementEnd()()();
} }
function CommunityPage_Conditional_175_Conditional_33_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 50);
    i0.ɵɵlistener("click", function CommunityPage_Conditional_175_Conditional_33_Conditional_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r13); const post_r11 = i0.ɵɵnextContext(2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.advanceStatus(post_r11)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const post_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(post_r11.status === "OPEN" ? "Start progress" : "Mark complete");
} }
function CommunityPage_Conditional_175_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 86);
    i0.ɵɵtext(1, "This is your post. You control its details and status.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 87)(3, "button", 51);
    i0.ɵɵlistener("click", function CommunityPage_Conditional_175_Conditional_33_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r12); const post_r11 = i0.ɵɵnextContext(); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openEdit(post_r11)); });
    i0.ɵɵtext(4, "Edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 88);
    i0.ɵɵlistener("click", function CommunityPage_Conditional_175_Conditional_33_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r12); const post_r11 = i0.ɵɵnextContext(); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.remove(post_r11)); });
    i0.ɵɵtext(6, "Delete");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, CommunityPage_Conditional_175_Conditional_33_Conditional_7_Template, 2, 1, "button", 89);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const post_r11 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵconditional(post_r11.status !== "COMPLETED" ? 7 : -1);
} }
function CommunityPage_Conditional_175_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 84);
    i0.ɵɵtext(1, "This is a read-only demo post.");
    i0.ɵɵelementEnd();
} }
function CommunityPage_Conditional_175_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 85)(1, "h3");
    i0.ɵɵtext(2, "Respond to this post");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Introduce yourself and explain how you can help or connect.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "textarea", 90);
    i0.ɵɵlistener("input", function CommunityPage_Conditional_175_Conditional_35_Template_textarea_input_5_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.responseMessage.set($event.target.value)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 91);
    i0.ɵɵlistener("click", function CommunityPage_Conditional_175_Conditional_35_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r14); const post_r11 = i0.ɵɵnextContext(); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.sendResponse(post_r11)); });
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r2.responseMessage());
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r2.responding());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.responding() ? "Sending\u2026" : "Send response \u2197");
} }
function CommunityPage_Conditional_175_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 62);
    i0.ɵɵlistener("mousedown", function CommunityPage_Conditional_175_Template_div_mousedown_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.selectedPost.set(null)); });
    i0.ɵɵelementStart(1, "section", 79);
    i0.ɵɵlistener("mousedown", function CommunityPage_Conditional_175_Template_section_mousedown_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "button", 64);
    i0.ɵɵlistener("click", function CommunityPage_Conditional_175_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r10); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.selectedPost.set(null)); });
    i0.ɵɵtext(3, "\u00D7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 55);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2", 80);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 81);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "dl")(11, "div")(12, "dt");
    i0.ɵɵtext(13, "Posted by");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "dd");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div")(17, "dt");
    i0.ɵɵtext(18, "Location");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "dd");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div")(22, "dt");
    i0.ɵɵtext(23, "Category");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "dd");
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div")(27, "dt");
    i0.ɵɵtext(28, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "dd");
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(31, CommunityPage_Conditional_175_Conditional_31_Template, 10, 3, "a", 82)(32, CommunityPage_Conditional_175_Conditional_32_Template, 8, 0, "div", 83);
    i0.ɵɵconditionalCreate(33, CommunityPage_Conditional_175_Conditional_33_Template, 8, 1)(34, CommunityPage_Conditional_175_Conditional_34_Template, 2, 0, "p", 84)(35, CommunityPage_Conditional_175_Conditional_35_Template, 8, 3, "div", 85);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const post_r11 = ctx;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("offer", post_r11.type === "OFFER");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(post_r11.type);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(post_r11.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(post_r11.description);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(post_r11.authorName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(post_r11.location);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.categoryLabel(post_r11.category));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(post_r11.status.replace("_", " "));
    i0.ɵɵadvance();
    i0.ɵɵconditional(post_r11.contact ? 31 : 32);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(post_r11.ownedByCurrentUser ? 33 : post_r11.ownerId === null ? 34 : post_r11.status !== "COMPLETED" ? 35 : -1);
} }
function CommunityPage_Conditional_176_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48)(1, "span");
    i0.ɵɵtext(2, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.toast());
} }
export class CommunityPage {
    service = inject(HelpPostService);
    fb = inject(FormBuilder);
    router = inject(Router);
    route = inject(ActivatedRoute);
    responseService = inject(HelpResponseService);
    auth = inject(AuthService);
    posts = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "posts" }] : /* istanbul ignore next */ []));
    stats = signal({ total: 0, open: 0, offers: 0, requests: 0, completed: 0 }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "stats" }] : /* istanbul ignore next */ []));
    loading = signal(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    saving = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "saving" }] : /* istanbul ignore next */ []));
    error = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    toast = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "toast" }] : /* istanbul ignore next */ []));
    responseMessage = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "responseMessage" }] : /* istanbul ignore next */ []));
    responding = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "responding" }] : /* istanbul ignore next */ []));
    modalOpen = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "modalOpen" }] : /* istanbul ignore next */ []));
    selectedPost = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "selectedPost" }] : /* istanbul ignore next */ []));
    editingId = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "editingId" }] : /* istanbul ignore next */ []));
    search = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "search" }] : /* istanbul ignore next */ []));
    category = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "category" }] : /* istanbul ignore next */ []));
    type = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "type" }] : /* istanbul ignore next */ []));
    status = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "status" }] : /* istanbul ignore next */ []));
    resultLabel = computed(() => `${this.posts().length} ${this.posts().length === 1 ? 'match' : 'matches'}`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "resultLabel" }] : /* istanbul ignore next */ []));
    categories = [
        { value: 'EDUCATION', label: 'Education', icon: '✦' },
        { value: 'TECHNOLOGY', label: 'Technology', icon: '⌘' },
        { value: 'HOME_AND_GARDEN', label: 'Home & garden', icon: '⌂' },
        { value: 'TRANSPORTATION', label: 'Transportation', icon: '↗' },
        { value: 'WELLNESS', label: 'Wellness', icon: '♡' },
        { value: 'OTHER', label: 'Other', icon: '•' },
    ];
    postForm = this.fb.nonNullable.group({
        title: ['', [Validators.required, Validators.maxLength(90)]],
        description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(800)]],
        location: ['', [Validators.required, Validators.maxLength(80)]],
        category: ['EDUCATION', Validators.required],
        type: ['REQUEST', Validators.required],
    });
    constructor() {
        this.refresh();
        this.route.queryParamMap.subscribe(params => {
            const create = params.get('create');
            if (create === 'request' || create === 'offer') {
                this.openCreate(create === 'offer' ? 'OFFER' : 'REQUEST');
                void this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true });
            }
        });
    }
    refresh() {
        if (!this.auth.authenticated()) {
            this.posts.set([]);
            this.stats.set({ total: 0, open: 0, offers: 0, requests: 0, completed: 0 });
            this.loading.set(false);
            return;
        }
        this.loading.set(true);
        this.error.set('');
        this.service.list({ search: this.search(), category: this.category(), type: this.type(), status: this.status() })
            .subscribe({
            next: posts => { this.posts.set(posts); this.loading.set(false); },
            error: (response) => {
                if (response.status === 401) {
                    this.restrictAccess('Your session expired. Sign in again to continue.');
                    return;
                }
                this.error.set('The community board is taking a little longer to wake up. Please try again.');
                this.loading.set(false);
            },
        });
        this.service.stats().subscribe({ next: stats => this.stats.set(stats) });
    }
    onSearch(event) {
        this.search.set(event.target.value);
        this.refresh();
    }
    setCategory(value) {
        this.category.set(value);
        this.refresh();
    }
    setType(value) {
        this.type.set(value);
        this.refresh();
    }
    setStatus(value) {
        this.status.set(value);
        this.refresh();
    }
    clearFilters() {
        this.search.set('');
        this.category.set('');
        this.type.set('');
        this.status.set('');
        this.refresh();
    }
    openCreate(type = 'REQUEST') {
        if (!this.auth.authenticated()) {
            void this.router.navigate(['/auth/login']);
            return;
        }
        this.editingId.set(null);
        this.postForm.reset({ title: '', description: '', location: '', category: 'EDUCATION', type });
        this.modalOpen.set(true);
    }
    openEdit(post) {
        if (!post.ownedByCurrentUser) {
            this.showToast('Only the post owner can edit it');
            return;
        }
        this.selectedPost.set(null);
        this.editingId.set(post.id);
        this.postForm.setValue({
            title: post.title, description: post.description,
            location: post.location, category: post.category, type: post.type,
        });
        this.modalOpen.set(true);
    }
    closeModal() {
        if (!this.saving())
            this.modalOpen.set(false);
    }
    submit() {
        if (this.postForm.invalid) {
            this.postForm.markAllAsTouched();
            return;
        }
        this.saving.set(true);
        const input = this.postForm.getRawValue();
        const request = this.editingId() ? this.service.update(this.editingId(), input) : this.service.create(input);
        request.subscribe({
            next: () => {
                this.saving.set(false);
                this.modalOpen.set(false);
                this.showToast(this.editingId() ? 'Post updated successfully' : 'Your post is live');
                this.refresh();
            },
            error: (response) => {
                this.saving.set(false);
                this.showToast(response.error?.message ?? 'Could not save the post');
            },
        });
    }
    view(post) { this.responseMessage.set(''); this.selectedPost.set(post); }
    sendResponse(post) {
        const message = this.responseMessage().trim();
        if (message.length < 10) {
            this.showToast('Add a message of at least 10 characters');
            return;
        }
        this.responding.set(true);
        this.responseService.create(post.id, message).subscribe({
            next: () => { this.responding.set(false); this.selectedPost.set(null); this.responseMessage.set(''); this.showToast('Your response was sent'); },
            error: (response) => { this.responding.set(false); this.showToast(response.error?.message ?? 'Could not send your response'); },
        });
    }
    advanceStatus(post) {
        if (!post.ownedByCurrentUser) {
            this.showToast('Only the post owner can update its status');
            return;
        }
        const next = post.status === 'OPEN' ? 'IN_PROGRESS' : 'COMPLETED';
        this.service.updateStatus(post.id, next).subscribe({
            next: updated => {
                this.selectedPost.set(updated);
                this.showToast(next === 'IN_PROGRESS' ? 'Help is on the way' : 'Marked as completed');
                this.refresh();
            },
            error: () => this.showToast('Could not update the status'),
        });
    }
    remove(post) {
        if (!post.ownedByCurrentUser) {
            this.showToast('Only the post owner can delete it');
            return;
        }
        if (!confirm(`Delete “${post.title}”?`))
            return;
        this.service.delete(post.id).subscribe({
            next: () => { this.selectedPost.set(null); this.showToast('Post deleted'); this.refresh(); },
            error: () => this.showToast('Could not delete the post'),
        });
    }
    categoryLabel(value) {
        return this.categories.find(category => category.value === value)?.label ?? value;
    }
    categoryIcon(value) {
        return this.categories.find(category => category.value === value)?.icon ?? '•';
    }
    restrictAccess(message) {
        this.auth.logout();
        this.posts.set([]);
        this.stats.set({ total: 0, open: 0, offers: 0, requests: 0, completed: 0 });
        this.loading.set(false);
        void this.router.navigate(['/auth/login'], { queryParams: { notice: message } });
    }
    showToast(message) {
        this.toast.set(message);
        window.setTimeout(() => this.toast.set(''), 2800);
    }
    static ɵfac = function CommunityPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CommunityPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CommunityPage, selectors: [["app-community-page"]], decls: 177, vars: 15, consts: [["id", "top"], [1, "hero"], [1, "hero-copy"], [1, "eyebrow"], [1, "hero-actions"], [1, "button", "button-primary", 3, "click"], [1, "button", "button-ghost", 3, "click"], [1, "trust-line"], [1, "avatars"], ["aria-label", "Illustration of a helpful community", 1, "hero-art"], [1, "sun"], [1, "arch", "arch-back"], [1, "arch", "arch-front"], [1, "community-card", "card-one"], [1, "card-icon"], [1, "community-card", "card-two"], [1, "heart"], [1, "spark", "spark-one"], [1, "spark", "spark-two"], ["aria-label", "Community impact", 1, "impact-strip"], ["id", "board", 1, "board"], [1, "section-heading"], ["aria-label", "Filter by category", 1, "category-row"], [3, "click"], [3, "active"], [1, "filter-bar"], [1, "search-box"], ["type", "search", "placeholder", "Search help, skills, or places\u2026", 3, "input", "value"], [1, "sr-only"], [3, "change", "value"], ["value", ""], ["value", "REQUEST"], ["value", "OFFER"], ["value", "OPEN"], ["value", "IN_PROGRESS"], ["value", "COMPLETED"], [1, "result-count"], ["aria-label", "Loading posts", 1, "post-grid"], [1, "empty-state"], [1, "post-grid"], ["id", "how-it-works", 1, "how"], [1, "eyebrow", "light"], [1, "how-grid"], [1, "steps"], [1, "site-footer"], ["href", "#top", 1, "brand"], [1, "brand-mark"], [1, "modal-backdrop"], [1, "toast"], [1, "post-card", "skeleton"], [1, "button", "button-dark", 3, "click"], [1, "text-button", 3, "click"], ["tabindex", "0", 1, "post-card"], ["tabindex", "0", 1, "post-card", 3, "click", "keydown.enter"], [1, "card-topline"], [1, "type-tag"], [1, "status-dot"], [1, "category-icon"], [1, "description"], [1, "meta"], [1, "author-avatar"], ["aria-label", "View post", 3, "click"], [1, "modal-backdrop", 3, "mousedown"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "form-title", 1, "modal", "form-modal", 3, "mousedown"], ["aria-label", "Close", 1, "close-button", 3, "click"], ["id", "form-title"], [3, "ngSubmit", "formGroup"], [1, "type-picker"], ["type", "radio", "formControlName", "type", "value", "REQUEST"], ["type", "radio", "formControlName", "type", "value", "OFFER"], ["type", "text", "formControlName", "title", "placeholder", "A short, specific headline"], ["rows", "4", "formControlName", "description", "placeholder", "Add the details someone would need to respond\u2026"], [1, "form-row"], ["type", "text", "formControlName", "location", "placeholder", "Neighborhood or Online"], ["formControlName", "category"], [3, "value"], [1, "identity-note"], [1, "form-error"], ["type", "submit", 1, "button", "button-primary", "submit-button", 3, "disabled"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "detail-title", 1, "modal", "detail-modal", 3, "mousedown"], ["id", "detail-title"], [1, "detail-description"], [1, "contact-box", 3, "href"], [1, "contact-box"], [1, "owner-note", "muted"], [1, "response-box"], [1, "owner-note"], [1, "detail-actions"], [1, "text-button", "danger", 3, "click"], [1, "button", "button-dark"], ["rows", "3", "maxlength", "600", "placeholder", "Write a helpful message\u2026", 3, "input", "value"], [1, "button", "button-primary", 3, "click", "disabled"]], template: function CommunityPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "section", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵelement(4, "span");
            i0.ɵɵtext(5, " Neighbors helping neighbors");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h1");
            i0.ɵɵtext(7, "Small acts.");
            i0.ɵɵelement(8, "br");
            i0.ɵɵelementStart(9, "em");
            i0.ɵɵtext(10, "Real impact.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "p");
            i0.ɵɵtext(12, "Ask for a hand, share what you know, and turn the people around you into a stronger community.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div", 4)(14, "button", 5);
            i0.ɵɵlistener("click", function CommunityPage_Template_button_click_14_listener() { return ctx.openCreate("REQUEST"); });
            i0.ɵɵtext(15, "Ask for help ");
            i0.ɵɵelementStart(16, "span");
            i0.ɵɵtext(17, "\u2197");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "button", 6);
            i0.ɵɵlistener("click", function CommunityPage_Template_button_click_18_listener() { return ctx.openCreate("OFFER"); });
            i0.ɵɵtext(19, "Offer your time");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "div", 7)(21, "div", 8)(22, "span");
            i0.ɵɵtext(23, "MC");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "span");
            i0.ɵɵtext(25, "NW");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "span");
            i0.ɵɵtext(27, "PS");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span");
            i0.ɵɵtext(29, "+");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "p")(31, "strong");
            i0.ɵɵtext(32);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(33, "br");
            i0.ɵɵtext(34, "and growing every day");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(35, "div", 9);
            i0.ɵɵelement(36, "div", 10)(37, "div", 11)(38, "div", 12);
            i0.ɵɵelementStart(39, "div", 13)(40, "span", 14);
            i0.ɵɵtext(41, "\u2302");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "b");
            i0.ɵɵtext(43, "Garden help");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "small");
            i0.ɵɵtext(45, "North Hills");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(46, "div", 15)(47, "span", 14);
            i0.ɵɵtext(48, "\u2726");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "b");
            i0.ɵɵtext(50, "Study group");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "small");
            i0.ɵɵtext(52, "Saturday \u00B7 10 AM");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(53, "div", 16);
            i0.ɵɵtext(54, "\u2665");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "div", 17);
            i0.ɵɵtext(56, "\u2726");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "div", 18);
            i0.ɵɵtext(58, "\u2726");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(59, "section", 19)(60, "div")(61, "strong");
            i0.ɵɵtext(62);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "span");
            i0.ɵɵtext(64, "Open connections");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(65, "div")(66, "strong");
            i0.ɵɵtext(67);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "span");
            i0.ɵɵtext(69, "Skills offered");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(70, "div")(71, "strong");
            i0.ɵɵtext(72);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "span");
            i0.ɵɵtext(74, "Requests shared");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(75, "div")(76, "strong");
            i0.ɵɵtext(77);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "span");
            i0.ɵɵtext(79, "Good deeds done");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(80, "section", 20)(81, "div", 21)(82, "div")(83, "div", 3);
            i0.ɵɵelement(84, "span");
            i0.ɵɵtext(85, " Community board");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(86, "h2");
            i0.ɵɵtext(87, "Find your way to help");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(88, "p");
            i0.ɵɵtext(89, "Explore what people nearby need\u2014or discover someone ready to share their time and talent.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(90, "div", 22)(91, "button", 23);
            i0.ɵɵlistener("click", function CommunityPage_Template_button_click_91_listener() { return ctx.setCategory(""); });
            i0.ɵɵelementStart(92, "span");
            i0.ɵɵtext(93, "\u2318");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(94, " All");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(95, CommunityPage_For_96_Template, 4, 4, "button", 24, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "div", 25)(98, "label", 26)(99, "span");
            i0.ɵɵtext(100, "\u2315");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(101, "input", 27);
            i0.ɵɵlistener("input", function CommunityPage_Template_input_input_101_listener($event) { return ctx.onSearch($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(102, "label")(103, "span", 28);
            i0.ɵɵtext(104, "Post type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(105, "select", 29);
            i0.ɵɵlistener("change", function CommunityPage_Template_select_change_105_listener($event) { return ctx.setType($event.target.value); });
            i0.ɵɵelementStart(106, "option", 30);
            i0.ɵɵtext(107, "Request & offer");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(108, "option", 31);
            i0.ɵɵtext(109, "Requests");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(110, "option", 32);
            i0.ɵɵtext(111, "Offers");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(112, "label")(113, "span", 28);
            i0.ɵɵtext(114, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(115, "select", 29);
            i0.ɵɵlistener("change", function CommunityPage_Template_select_change_115_listener($event) { return ctx.setStatus($event.target.value); });
            i0.ɵɵelementStart(116, "option", 30);
            i0.ɵɵtext(117, "Any status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(118, "option", 33);
            i0.ɵɵtext(119, "Open");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(120, "option", 34);
            i0.ɵɵtext(121, "In progress");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(122, "option", 35);
            i0.ɵɵtext(123, "Completed");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(124, "span", 36);
            i0.ɵɵtext(125);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(126, CommunityPage_Conditional_126_Template, 3, 1, "div", 37)(127, CommunityPage_Conditional_127_Template, 9, 1, "div", 38)(128, CommunityPage_Conditional_128_Template, 9, 0, "div", 38)(129, CommunityPage_Conditional_129_Template, 3, 0, "div", 39);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(130, "section", 40)(131, "div", 41);
            i0.ɵɵelement(132, "span");
            i0.ɵɵtext(133, " How it works");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(134, "div", 42)(135, "h2");
            i0.ɵɵtext(136, "Good things start");
            i0.ɵɵelement(137, "br");
            i0.ɵɵtext(138, "with a simple hello.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(139, "div", 43)(140, "article")(141, "b");
            i0.ɵɵtext(142, "01");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(143, "div")(144, "h3");
            i0.ɵɵtext(145, "Share what you need");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(146, "p");
            i0.ɵɵtext(147, "Post a clear request, or offer a skill you would love to share.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(148, "article")(149, "b");
            i0.ɵɵtext(150, "02");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(151, "div")(152, "h3");
            i0.ɵɵtext(153, "Make a connection");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(154, "p");
            i0.ɵɵtext(155, "Discover people nearby and reach out through the contact they provide.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(156, "article")(157, "b");
            i0.ɵɵtext(158, "03");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(159, "div")(160, "h3");
            i0.ɵɵtext(161, "Keep kindness moving");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(162, "p");
            i0.ɵɵtext(163, "Mark it complete and look for the next small way to make a difference.");
            i0.ɵɵelementEnd()()()()()()();
            i0.ɵɵelementStart(164, "footer", 44)(165, "a", 45)(166, "span", 46);
            i0.ɵɵtext(167, "H");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(168, "span");
            i0.ɵɵtext(169, "HelpHive");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(170, "p");
            i0.ɵɵtext(171, "Built for stronger communities.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(172, "span");
            i0.ɵɵtext(173, "Spring Boot \u00B7 Angular \u00B7 PostgreSQL");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(174, CommunityPage_Conditional_174_Template, 58, 14, "div", 47);
            i0.ɵɵconditionalCreate(175, CommunityPage_Conditional_175_Template, 36, 11, "div", 47);
            i0.ɵɵconditionalCreate(176, CommunityPage_Conditional_176_Template, 4, 1, "div", 48);
        } if (rf & 2) {
            let tmp_13_0;
            i0.ɵɵadvance(32);
            i0.ɵɵtextInterpolate1("", ctx.stats().total, " community posts");
            i0.ɵɵadvance(30);
            i0.ɵɵtextInterpolate(ctx.stats().open);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.stats().offers);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.stats().requests);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.stats().completed);
            i0.ɵɵadvance(14);
            i0.ɵɵclassProp("active", ctx.category() === "");
            i0.ɵɵadvance(4);
            i0.ɵɵrepeater(ctx.categories);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("value", ctx.search());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("value", ctx.type());
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("value", ctx.status());
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate(ctx.resultLabel());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 126 : ctx.error() ? 127 : ctx.posts().length === 0 ? 128 : 129);
            i0.ɵɵadvance(48);
            i0.ɵɵconditional(ctx.modalOpen() ? 174 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_13_0 = ctx.selectedPost()) ? 175 : -1, tmp_13_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.toast() ? 176 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.RadioControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, DatePipe], styles: ["[_nghost-%COMP%] { display: block; overflow: hidden; }\r\n\r\n.site-header[_ngcontent-%COMP%] { height: 78px; padding: 0 clamp(24px, 5vw, 80px); display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--%NS%line); background: rgba(255,253,248,.93); backdrop-filter: blur(12px); position: relative; z-index: 10; }\r\n.header-actions[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 12px; }.account-chip[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; }.account-chip[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { width: 30px; height: 30px; border-radius: 50%; background: var(--%NS%green); color: white; display: grid; place-items: center; }\r\n.brand[_ngcontent-%COMP%] { display: inline-flex; align-items: center; gap: 10px; font: 800 20px 'Manrope', sans-serif; letter-spacing: -.7px; }\r\n.brand-mark[_ngcontent-%COMP%] { width: 34px; height: 34px; border-radius: 50% 50% 50% 12px; display: grid; place-items: center; background: var(--%NS%green); color: white; font-size: 17px; transform: rotate(-5deg); }\r\nnav[_ngcontent-%COMP%] { display: flex; gap: 36px; font-size: 14px; font-weight: 600; }\r\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] { transition: color .2s; } nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover { color: var(--%NS%coral); }\r\n\r\n.button[_ngcontent-%COMP%] { border: 0; border-radius: 7px; min-height: 48px; padding: 0 22px; display: inline-flex; align-items: center; justify-content: center; gap: 20px; cursor: pointer; font-weight: 700; transition: transform .2s, box-shadow .2s, background .2s; }\r\n.button[_ngcontent-%COMP%]:hover { transform: translateY(-2px); }\r\n.button[_ngcontent-%COMP%]:disabled { opacity: .6; cursor: wait; transform: none; }\r\n.button-primary[_ngcontent-%COMP%] { background: var(--%NS%coral); color: #2e211e; box-shadow: 0 10px 25px rgba(255,118,95,.2); }\r\n.button-primary[_ngcontent-%COMP%]:hover { box-shadow: 0 12px 30px rgba(255,118,95,.32); }\r\n.button-dark[_ngcontent-%COMP%] { background: var(--%NS%green); color: white; }\r\n.button-small[_ngcontent-%COMP%] { min-height: 42px; padding: 0 17px; gap: 12px; font-size: 13px; }\r\n.button-ghost[_ngcontent-%COMP%] { border: 1px solid var(--%NS%ink); background: transparent; }\r\n.text-button[_ngcontent-%COMP%] { border: 0; background: none; padding: 8px; font-weight: 700; cursor: pointer; text-decoration: underline; text-underline-offset: 4px; }\r\n.danger[_ngcontent-%COMP%] { color: #b74335; }\r\n\r\n.hero[_ngcontent-%COMP%] { min-height: 650px; display: grid; grid-template-columns: 1.04fr .96fr; background: var(--%NS%cream); }\r\n.hero-copy[_ngcontent-%COMP%] { padding: 90px 7vw 75px max(7vw, calc((100vw - 1320px)/2)); display: flex; flex-direction: column; align-items: flex-start; }\r\n.eyebrow[_ngcontent-%COMP%] { text-transform: uppercase; letter-spacing: 2.3px; font: 700 11px 'Manrope', sans-serif; display: flex; align-items: center; gap: 10px; }\r\n.eyebrow[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { width: 25px; height: 2px; background: var(--%NS%coral); }\r\n.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin: 24px 0 24px; font: 800 clamp(56px, 6vw, 92px)/.97 'Manrope', sans-serif; letter-spacing: -6px; }\r\n.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] { color: var(--%NS%green-2); font-style: normal; }\r\n.hero-copy[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { max-width: 530px; color: var(--%NS%muted); font-size: 18px; line-height: 1.7; margin: 0; }\r\n.hero-actions[_ngcontent-%COMP%] { display: flex; gap: 12px; margin-top: 38px; }\r\n.trust-line[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 16px; margin-top: auto; padding-top: 54px; }\r\n.avatars[_ngcontent-%COMP%] { display: flex; }\r\n.avatars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { width: 35px; height: 35px; border: 2px solid var(--%NS%cream); margin-left: -8px; border-radius: 50%; background: #d6d8cd; display: grid; place-items: center; font-size: 10px; font-weight: 800; }\r\n.avatars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child { margin-left: 0; background: #eeb8a7; }.avatars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) { background: #9cbda9; }.avatars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3) { background: #e4ca7d; }.avatars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child { background: var(--%NS%green); color: white; }\r\n.trust-line[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; font-size: 12px; color: var(--%NS%muted); line-height: 1.55; }.trust-line[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--%NS%ink); }\r\n\r\n.hero-art[_ngcontent-%COMP%] { position: relative; overflow: hidden; background: #8eb7a8; min-height: 600px; }\r\n.sun[_ngcontent-%COMP%] { position: absolute; width: 240px; height: 240px; border-radius: 50%; background: var(--%NS%yellow); top: 80px; right: 11%; box-shadow: 0 0 0 22px rgba(255,255,255,.10); }\r\n.arch[_ngcontent-%COMP%] { position: absolute; border-radius: 200px 200px 0 0; bottom: -10px; }\r\n.arch-back[_ngcontent-%COMP%] { width: 72%; height: 77%; right: -12%; background: #407b67; transform: rotate(-10deg); }\r\n.arch-front[_ngcontent-%COMP%] { width: 70%; height: 65%; left: -18%; background: #f4ead7; transform: rotate(14deg); box-shadow: inset -16px 0 rgba(23,45,40,.08); }\r\n.community-card[_ngcontent-%COMP%] { position: absolute; z-index: 3; width: 198px; padding: 16px; border-radius: 12px; background: var(--%NS%paper); box-shadow: 0 22px 50px rgba(23,45,40,.18); display: grid; grid-template-columns: 42px 1fr; column-gap: 10px; }\r\n.community-card[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] { font-size: 13px; align-self: end; }.community-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: var(--%NS%muted); font-size: 10px; }.card-icon[_ngcontent-%COMP%] { width: 42px; height: 42px; border-radius: 10px; grid-row: span 2; display: grid; place-items: center; color: white; background: var(--%NS%green); }\r\n.card-one[_ngcontent-%COMP%] { left: 12%; bottom: 24%; transform: rotate(-7deg); }.card-two[_ngcontent-%COMP%] { right: 7%; top: 28%; transform: rotate(6deg); }.card-two[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] { background: var(--%NS%coral); }\r\n.heart[_ngcontent-%COMP%] { position: absolute; z-index: 2; left: 40%; bottom: 12%; font-size: 72px; color: var(--%NS%coral); transform: rotate(-10deg); text-shadow: 0 8px rgba(23,45,40,.12); }\r\n.spark[_ngcontent-%COMP%] { position: absolute; color: #fff6da; font-size: 30px; }.spark-one[_ngcontent-%COMP%] { top: 18%; left: 15%; }.spark-two[_ngcontent-%COMP%] { right: 22%; bottom: 14%; font-size: 18px; }\r\n\r\n.impact-strip[_ngcontent-%COMP%] { background: var(--%NS%green); color: white; min-height: 112px; display: grid; grid-template-columns: repeat(4, 1fr); padding: 0 max(7vw, calc((100vw - 1320px)/2)); }\r\n.impact-strip[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: center; gap: 15px; border-right: 1px solid rgba(255,255,255,.16); }.impact-strip[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:last-child { border: 0; }\r\n.impact-strip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font: 700 34px 'Manrope'; color: #f7d46a; }.impact-strip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { max-width: 80px; font-size: 12px; line-height: 1.35; color: #d8e3de; }\r\n\r\n.board[_ngcontent-%COMP%] { padding: 100px max(6vw, calc((100vw - 1280px)/2)) 120px; background: var(--%NS%paper); }\r\n.section-heading[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: end; gap: 40px; }.section-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 16px 0 0; font: 800 clamp(36px, 4vw, 54px) 'Manrope'; letter-spacing: -3px; }.section-heading[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { max-width: 450px; margin: 0 0 5px; color: var(--%NS%muted); line-height: 1.7; }\r\n.category-row[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 8px; margin: 44px 0 22px; }\r\n.category-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { border: 1px solid var(--%NS%line); border-radius: 999px; background: white; padding: 9px 14px; display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 12px; font-weight: 600; transition: .2s; }.category-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 17px; }.category-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, .category-row[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] { background: var(--%NS%green); color: white; border-color: var(--%NS%green); }\r\n.filter-bar[_ngcontent-%COMP%] { padding: 12px; border: 1px solid var(--%NS%line); border-radius: 10px; display: flex; align-items: center; gap: 10px; background: #fff; margin-bottom: 30px; }\r\n.search-box[_ngcontent-%COMP%] { flex: 1; display: flex; align-items: center; gap: 10px; padding: 0 8px; }.search-box[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 25px; color: var(--%NS%muted); }.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { width: 100%; border: 0; outline: 0; padding: 10px 0; color: var(--%NS%ink); }\r\n.filter-bar[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] { border: 0; border-left: 1px solid var(--%NS%line); outline: 0; padding: 9px 28px 9px 15px; background: white; color: var(--%NS%ink); font-size: 12px; font-weight: 600; }.result-count[_ngcontent-%COMP%] { padding: 0 8px; color: var(--%NS%muted); font-size: 11px; white-space: nowrap; }\r\n.post-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; min-height: 310px; }\r\n.post-card[_ngcontent-%COMP%] { border: 1px solid var(--%NS%line); border-radius: 12px; padding: 24px; background: white; cursor: pointer; min-height: 350px; display: flex; flex-direction: column; transition: transform .25s, box-shadow .25s, border-color .25s; outline: none; }.post-card[_ngcontent-%COMP%]:hover, .post-card[_ngcontent-%COMP%]:focus { transform: translateY(-5px); box-shadow: 0 18px 45px rgba(23,45,40,.09); border-color: #afc0ba; }\r\n.card-topline[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; }.type-tag[_ngcontent-%COMP%] { display: inline-block; padding: 6px 9px; border-radius: 4px; background: #ffe7e1; color: #9d3b2b; text-transform: uppercase; font: 800 9px 'Manrope'; letter-spacing: 1.1px; }.type-tag.offer[_ngcontent-%COMP%] { background: #dfeee8; color: #21604c; }\r\n.status-dot[_ngcontent-%COMP%] { width: 8px; height: 8px; border-radius: 50%; background: #59a477; box-shadow: 0 0 0 4px #e9f4ed; }.status-dot.progress[_ngcontent-%COMP%] { background: #d8a62b; box-shadow: 0 0 0 4px #fbf3da; }.status-dot.done[_ngcontent-%COMP%] { background: #8c9692; box-shadow: 0 0 0 4px #eef0ef; }\r\n.category-icon[_ngcontent-%COMP%] { margin-top: 30px; width: 43px; height: 43px; border-radius: 50%; background: var(--%NS%cream); display: grid; place-items: center; font-size: 20px; }\r\n.post-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { font: 800 19px/1.3 'Manrope'; letter-spacing: -.5px; margin: 14px 0 8px; }.description[_ngcontent-%COMP%] { margin: 0; color: var(--%NS%muted); font-size: 13px; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }.meta[_ngcontent-%COMP%] { display: flex; gap: 7px; margin: 16px 0; color: #7e8985; font-size: 11px; }\r\n.post-card[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] { border-top: 1px solid var(--%NS%line); padding-top: 16px; margin-top: auto; display: flex; align-items: center; gap: 10px; }.author-avatar[_ngcontent-%COMP%] { width: 34px; height: 34px; border-radius: 50%; background: var(--%NS%green); color: white; display: grid; place-items: center; font-weight: 800; }.post-card[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(2) { display: flex; flex-direction: column; }.post-card[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] { font-size: 11px; }.post-card[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { font-size: 9px; color: var(--%NS%muted); }.post-card[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { margin-left: auto; border: 1px solid var(--%NS%line); background: white; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; }\r\n.skeleton[_ngcontent-%COMP%] { border: 0; background: linear-gradient(100deg,#f0eee8 20%,#faf9f4 35%,#f0eee8 50%); background-size: 300% 100%; animation: _ngcontent-%COMP%_shimmer 1.3s infinite; }.empty-state[_ngcontent-%COMP%] { min-height: 350px; display: grid; place-items: center; align-content: center; text-align: center; background: var(--%NS%cream); border-radius: 12px; padding: 40px; }.empty-state[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { font-size: 35px; }.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 10px 0 0; font: 800 24px 'Manrope'; }.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { color: var(--%NS%muted); max-width: 480px; }\r\n\r\n.how[_ngcontent-%COMP%] { background: var(--%NS%green); color: white; padding: 105px max(7vw, calc((100vw - 1280px)/2)); }.eyebrow.light[_ngcontent-%COMP%] { color: #e0e8e4; }.how-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: .9fr 1.1fr; gap: 10vw; margin-top: 36px; }.how[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 0; font: 700 clamp(38px,5vw,65px)/1.1 'Manrope'; letter-spacing: -3px; }.steps[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] { display: grid; grid-template-columns: 60px 1fr; gap: 20px; padding: 26px 0; border-top: 1px solid rgba(255,255,255,.18); }.steps[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]:last-child { border-bottom: 1px solid rgba(255,255,255,.18); }.steps[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > b[_ngcontent-%COMP%] { color: #f1cc62; font: 600 12px 'Manrope'; }.steps[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0 0 7px; font: 700 18px 'Manrope'; }.steps[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: #b9cbc4; line-height: 1.6; font-size: 13px; max-width: 440px; }\r\n.site-footer[_ngcontent-%COMP%] { padding: 36px max(6vw, calc((100vw - 1280px)/2)); display: flex; align-items: center; justify-content: space-between; background: #10261f; color: white; }.site-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .site-footer[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { font-size: 11px; color: #90a39c; }\r\n\r\n.modal-backdrop[_ngcontent-%COMP%] { position: fixed; inset: 0; z-index: 100; background: rgba(12,30,24,.69); display: grid; place-items: center; padding: 20px; backdrop-filter: blur(6px); animation: _ngcontent-%COMP%_fade .18s ease-out; }\r\n.modal[_ngcontent-%COMP%] { width: min(680px, 100%); max-height: calc(100vh - 40px); overflow-y: auto; position: relative; background: var(--%NS%paper); border-radius: 16px; padding: 38px; box-shadow: 0 30px 90px rgba(0,0,0,.25); animation: _ngcontent-%COMP%_rise .25s ease-out; }.modal[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 12px 40px 24px 0; font: 800 32px 'Manrope'; letter-spacing: -1.5px; }.close-button[_ngcontent-%COMP%] { position: absolute; right: 22px; top: 18px; border: 0; background: transparent; font-size: 30px; cursor: pointer; color: var(--%NS%muted); }\r\n.form-modal[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%], .form-row[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 7px; position: relative; margin-top: 16px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .8px; }.form-modal[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-modal[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], .form-modal[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] { width: 100%; border: 1px solid var(--%NS%line); border-radius: 7px; padding: 13px; background: white; outline: none; color: var(--%NS%ink); text-transform: none; letter-spacing: 0; font-weight: 400; }.form-modal[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .form-modal[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus, .form-modal[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus { border-color: var(--%NS%green); box-shadow: 0 0 0 3px rgba(47,102,85,.1); }.form-modal[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] { position: absolute; right: 9px; bottom: 8px; color: #9ba4a1; font-size: 9px; font-weight: 400; letter-spacing: 0; }.form-modal[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] { resize: vertical; }.form-row[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }\r\n.identity-note[_ngcontent-%COMP%], .owner-note[_ngcontent-%COMP%] { background: #edf4f1; border-radius: 8px; padding: 12px 14px; color: var(--%NS%green); font-size: 11px; margin: 18px 0 0; }.owner-note.muted[_ngcontent-%COMP%] { color: var(--%NS%muted); background: var(--%NS%cream); }\r\n.type-picker[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }.type-picker[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { border: 1px solid var(--%NS%line); border-radius: 8px; padding: 14px; display: flex; align-items: center; gap: 12px; cursor: pointer; }.type-picker[_ngcontent-%COMP%]   label.selected[_ngcontent-%COMP%] { border-color: var(--%NS%green); background: #edf4f1; }.type-picker[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { display: none; }.type-picker[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { font-size: 24px; }.type-picker[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] { display: flex; flex-direction: column; }.type-picker[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] { font-size: 13px; }.type-picker[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: var(--%NS%muted); font-size: 10px; }.submit-button[_ngcontent-%COMP%] { width: 100%; margin-top: 24px; }.form-error[_ngcontent-%COMP%] { color: #a84034; font-size: 11px; margin-bottom: -12px; }\r\n.detail-modal[_ngcontent-%COMP%]   .type-tag[_ngcontent-%COMP%] { margin-bottom: 5px; }.detail-description[_ngcontent-%COMP%] { color: var(--%NS%muted); line-height: 1.75; }.detail-modal[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--%NS%line); border-radius: 8px; overflow: hidden; margin: 25px 0; }.detail-modal[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] { padding: 14px; border-bottom: 1px solid var(--%NS%line); }.detail-modal[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(odd) { border-right: 1px solid var(--%NS%line); }.detail-modal[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-last-child(-n+2) { border-bottom: 0; }.detail-modal[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] { color: var(--%NS%muted); text-transform: uppercase; letter-spacing: 1px; font-size: 9px; }.detail-modal[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] { margin: 4px 0 0; font-size: 13px; font-weight: 700; text-transform: capitalize; }.contact-box[_ngcontent-%COMP%] { background: var(--%NS%green); color: white; border-radius: 9px; padding: 16px; display: flex; align-items: center; gap: 13px; }.contact-box[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { font-size: 24px; }.contact-box[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] { display: flex; flex-direction: column; }.contact-box[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: #b8cbc4; }.contact-box[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { margin-left: auto; }.detail-actions[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; margin-top: 20px; }.detail-actions[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] { margin-left: auto; min-height: 42px; }\r\n.contact-login[_ngcontent-%COMP%] { width: 100%; border: 0; text-align: left; cursor: pointer; }\r\n.response-box[_ngcontent-%COMP%] { margin-top: 20px; padding: 18px; border-radius: 9px; background: var(--%NS%cream); }.response-box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0 0 5px; font: 800 16px 'Manrope'; }.response-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0 0 12px; color: var(--%NS%muted); font-size: 12px; }.response-box[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] { width: 100%; padding: 12px; border: 1px solid var(--%NS%line); border-radius: 7px; resize: vertical; outline: none; }.response-box[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] { width: 100%; min-height: 42px; margin-top: 9px; }\r\n.toast[_ngcontent-%COMP%] { position: fixed; z-index: 200; left: 50%; bottom: 30px; transform: translateX(-50%); background: #10261f; color: white; padding: 12px 18px; border-radius: 999px; box-shadow: 0 15px 35px rgba(0,0,0,.25); display: flex; gap: 9px; align-items: center; font-size: 12px; font-weight: 600; }.toast[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: #f1cc62; }\r\n.auth-modal[_ngcontent-%COMP%] { width: min(500px, 100%); }.auth-intro[_ngcontent-%COMP%] { color: var(--%NS%muted); margin-top: -14px; }.auth-tabs[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; background: var(--%NS%cream); border-radius: 9px; padding: 5px; margin: 22px 0 6px; }.auth-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { border: 0; border-radius: 6px; padding: 11px; background: transparent; color: var(--%NS%muted); cursor: pointer; font-size: 12px; font-weight: 700; }.auth-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] { background: white; color: var(--%NS%green); box-shadow: 0 2px 8px rgba(23,45,40,.08); }.auth-modal[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 7px; margin-top: 15px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .8px; }.auth-modal[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { width: 100%; border: 1px solid var(--%NS%line); border-radius: 7px; padding: 13px; background: white; outline: none; color: var(--%NS%ink); text-transform: none; letter-spacing: 0; font-weight: 400; }.auth-modal[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus { border-color: var(--%NS%green); box-shadow: 0 0 0 3px rgba(47,102,85,.1); }.auth-error[_ngcontent-%COMP%] { margin: 14px 0 -8px; }.auth-security[_ngcontent-%COMP%] { margin: 18px 0 0; text-align: center; color: var(--%NS%muted); font-size: 10px; }\r\n.auth-gate[_ngcontent-%COMP%] { background: radial-gradient(circle at 82% 18%, rgba(247,212,106,.42), transparent 26%), linear-gradient(135deg, #10261f 0%, #2f6655 52%, #8eb7a8 100%); }\r\n.auth-gate[_ngcontent-%COMP%]::before { content: 'HelpHive'; position: fixed; top: 28px; left: 38px; color: white; font: 800 22px 'Manrope', sans-serif; letter-spacing: -.7px; }\r\n.auth-notice[_ngcontent-%COMP%] { border: 1px solid #a8c9bc; border-radius: 8px; padding: 11px 13px; margin: 14px 0 0; background: #edf4f1; color: var(--%NS%green); font-size: 11px; line-height: 1.5; }\r\n\r\n@keyframes _ngcontent-%COMP%_shimmer { to { background-position-x: 0%; } from { background-position-x: 100%; } }\r\n@keyframes _ngcontent-%COMP%_fade { from { opacity: 0; } } @keyframes _ngcontent-%COMP%_rise { from { opacity: 0; transform: translateY(18px) scale(.98); } }\r\n\r\n@media (max-width: 960px) {\r\n  nav[_ngcontent-%COMP%] { display: none; }.hero[_ngcontent-%COMP%] { grid-template-columns: 1fr; }.hero-copy[_ngcontent-%COMP%] { min-height: 590px; }.hero-art[_ngcontent-%COMP%] { min-height: 480px; }.impact-strip[_ngcontent-%COMP%] { grid-template-columns: 1fr 1fr; padding: 15px 7vw; }.impact-strip[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] { border-bottom: 1px solid rgba(255,255,255,.16); }.impact-strip[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(2) { border-right: 0; }.impact-strip[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-last-child(-n+2) { border-bottom: 0; }.post-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr 1fr; }.how-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; gap: 50px; }\r\n}\r\n@media (max-width: 640px) {\r\n  .site-header[_ngcontent-%COMP%] { height: 68px; padding: 0 18px; }.site-header[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] { padding: 0 12px; }.site-header[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .account-chip[_ngcontent-%COMP%] { display: none; }.header-actions[_ngcontent-%COMP%] { gap: 6px; }.header-actions[_ngcontent-%COMP%]   .text-button[_ngcontent-%COMP%] { font-size: 10px; }.hero-copy[_ngcontent-%COMP%] { padding: 65px 24px 55px; min-height: 570px; }.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { letter-spacing: -3.8px; }.hero-actions[_ngcontent-%COMP%] { flex-direction: column; width: 100%; }.hero-actions[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] { width: 100%; }.hero-art[_ngcontent-%COMP%] { min-height: 410px; }.community-card[_ngcontent-%COMP%] { transform: scale(.85); }.card-one[_ngcontent-%COMP%] { left: 1%; }.card-two[_ngcontent-%COMP%] { right: -3%; }.impact-strip[_ngcontent-%COMP%] { min-height: 210px; }.impact-strip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: 28px; }.board[_ngcontent-%COMP%] { padding: 70px 18px 80px; }.section-heading[_ngcontent-%COMP%] { display: block; }.section-heading[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { margin-top: 20px; }.filter-bar[_ngcontent-%COMP%] { flex-wrap: wrap; }.search-box[_ngcontent-%COMP%] { flex-basis: 100%; }.filter-bar[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:not(.search-box) { flex: 1; }.filter-bar[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] { width: 100%; border-left: 0; border-top: 1px solid var(--%NS%line); }.post-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }.how[_ngcontent-%COMP%] { padding: 70px 24px; }.site-footer[_ngcontent-%COMP%] { flex-direction: column; gap: 15px; text-align: center; }.modal[_ngcontent-%COMP%] { padding: 30px 20px; }.form-row[_ngcontent-%COMP%], .type-picker[_ngcontent-%COMP%] { grid-template-columns: 1fr; }.detail-modal[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] { grid-template-columns: 1fr; }.detail-modal[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], .detail-modal[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(odd) { border-right: 0; border-bottom: 1px solid var(--%NS%line); }.detail-modal[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(3) { border-bottom: 1px solid var(--%NS%line); }.detail-actions[_ngcontent-%COMP%] { flex-wrap: wrap; }.detail-actions[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] { width: 100%; margin: 5px 0 0; }\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommunityPage, [{
        type: Component,
        args: [{ selector: 'app-community-page', imports: [ReactiveFormsModule, DatePipe], template: "<main id=\"top\">\r\n  <section class=\"hero\">\r\n    <div class=\"hero-copy\">\r\n      <div class=\"eyebrow\"><span></span> Neighbors helping neighbors</div>\r\n      <h1>Small acts.<br><em>Real impact.</em></h1>\r\n      <p>Ask for a hand, share what you know, and turn the people around you into a stronger community.</p>\r\n      <div class=\"hero-actions\">\r\n        <button class=\"button button-primary\" (click)=\"openCreate('REQUEST')\">Ask for help <span>\u2197</span></button>\r\n        <button class=\"button button-ghost\" (click)=\"openCreate('OFFER')\">Offer your time</button>\r\n      </div>\r\n      <div class=\"trust-line\">\r\n        <div class=\"avatars\"><span>MC</span><span>NW</span><span>PS</span><span>+</span></div>\r\n        <p><strong>{{ stats().total }} community posts</strong><br>and growing every day</p>\r\n      </div>\r\n    </div>\r\n    <div class=\"hero-art\" aria-label=\"Illustration of a helpful community\">\r\n      <div class=\"sun\"></div>\r\n      <div class=\"arch arch-back\"></div>\r\n      <div class=\"arch arch-front\"></div>\r\n      <div class=\"community-card card-one\"><span class=\"card-icon\">\u2302</span><b>Garden help</b><small>North Hills</small></div>\r\n      <div class=\"community-card card-two\"><span class=\"card-icon\">\u2726</span><b>Study group</b><small>Saturday \u00B7 10 AM</small></div>\r\n      <div class=\"heart\">\u2665</div>\r\n      <div class=\"spark spark-one\">\u2726</div><div class=\"spark spark-two\">\u2726</div>\r\n    </div>\r\n  </section>\r\n\r\n  <section class=\"impact-strip\" aria-label=\"Community impact\">\r\n    <div><strong>{{ stats().open }}</strong><span>Open connections</span></div>\r\n    <div><strong>{{ stats().offers }}</strong><span>Skills offered</span></div>\r\n    <div><strong>{{ stats().requests }}</strong><span>Requests shared</span></div>\r\n    <div><strong>{{ stats().completed }}</strong><span>Good deeds done</span></div>\r\n  </section>\r\n\r\n  <section class=\"board\" id=\"board\">\r\n    <div class=\"section-heading\">\r\n      <div>\r\n        <div class=\"eyebrow\"><span></span> Community board</div>\r\n        <h2>Find your way to help</h2>\r\n      </div>\r\n      <p>Explore what people nearby need\u2014or discover someone ready to share their time and talent.</p>\r\n    </div>\r\n\r\n    <div class=\"category-row\" aria-label=\"Filter by category\">\r\n      <button [class.active]=\"category() === ''\" (click)=\"setCategory('')\"><span>\u2318</span> All</button>\r\n      @for (item of categories; track item.value) {\r\n        <button [class.active]=\"category() === item.value\" (click)=\"setCategory(item.value)\"><span>{{ item.icon }}</span> {{ item.label }}</button>\r\n      }\r\n    </div>\r\n\r\n    <div class=\"filter-bar\">\r\n      <label class=\"search-box\">\r\n        <span>\u2315</span>\r\n        <input type=\"search\" placeholder=\"Search help, skills, or places\u2026\" [value]=\"search()\" (input)=\"onSearch($event)\">\r\n      </label>\r\n      <label>\r\n        <span class=\"sr-only\">Post type</span>\r\n        <select [value]=\"type()\" (change)=\"setType($any($event.target).value)\">\r\n          <option value=\"\">Request & offer</option><option value=\"REQUEST\">Requests</option><option value=\"OFFER\">Offers</option>\r\n        </select>\r\n      </label>\r\n      <label>\r\n        <span class=\"sr-only\">Status</span>\r\n        <select [value]=\"status()\" (change)=\"setStatus($any($event.target).value)\">\r\n          <option value=\"\">Any status</option><option value=\"OPEN\">Open</option><option value=\"IN_PROGRESS\">In progress</option><option value=\"COMPLETED\">Completed</option>\r\n        </select>\r\n      </label>\r\n      <span class=\"result-count\">{{ resultLabel() }}</span>\r\n    </div>\r\n\r\n    @if (loading()) {\r\n      <div class=\"post-grid\" aria-label=\"Loading posts\">\r\n        @for (item of [1, 2, 3]; track item) { <div class=\"post-card skeleton\"></div> }\r\n      </div>\r\n    } @else if (error()) {\r\n      <div class=\"empty-state\"><div>\u21BB</div><h3>We couldn't load the board</h3><p>{{ error() }}</p><button class=\"button button-dark\" (click)=\"refresh()\">Try again</button></div>\r\n    } @else if (posts().length === 0) {\r\n      <div class=\"empty-state\"><div>\u2315</div><h3>No posts match those filters</h3><p>Try a broader search or be the first person to post here.</p><button class=\"text-button\" (click)=\"clearFilters()\">Clear all filters</button></div>\r\n    } @else {\r\n      <div class=\"post-grid\">\r\n        @for (post of posts(); track post.id) {\r\n          <article class=\"post-card\" (click)=\"view(post)\" tabindex=\"0\" (keydown.enter)=\"view(post)\">\r\n            <div class=\"card-topline\">\r\n              <span class=\"type-tag\" [class.offer]=\"post.type === 'OFFER'\">{{ post.type === 'REQUEST' ? 'Needs a hand' : 'Happy to help' }}</span>\r\n              <span class=\"status-dot\" [class.progress]=\"post.status === 'IN_PROGRESS'\" [class.done]=\"post.status === 'COMPLETED'\"></span>\r\n            </div>\r\n            <div class=\"category-icon\">{{ categoryIcon(post.category) }}</div>\r\n            <h3>{{ post.title }}</h3>\r\n            <p class=\"description\">{{ post.description }}</p>\r\n            <div class=\"meta\"><span>\u2316 {{ post.location }}</span><span>\u00B7</span><span>{{ post.createdAt | date:'MMM d' }}</span></div>\r\n            <footer>\r\n              <div class=\"author-avatar\">{{ post.authorName.charAt(0) }}</div>\r\n              <div><b>{{ post.authorName }}</b><small>{{ categoryLabel(post.category) }}</small></div>\r\n              <button aria-label=\"View post\" (click)=\"$event.stopPropagation(); view(post)\">\u2197</button>\r\n            </footer>\r\n          </article>\r\n        }\r\n      </div>\r\n    }\r\n  </section>\r\n\r\n  <section class=\"how\" id=\"how-it-works\">\r\n    <div class=\"eyebrow light\"><span></span> How it works</div>\r\n    <div class=\"how-grid\">\r\n      <h2>Good things start<br>with a simple hello.</h2>\r\n      <div class=\"steps\">\r\n        <article><b>01</b><div><h3>Share what you need</h3><p>Post a clear request, or offer a skill you would love to share.</p></div></article>\r\n        <article><b>02</b><div><h3>Make a connection</h3><p>Discover people nearby and reach out through the contact they provide.</p></div></article>\r\n        <article><b>03</b><div><h3>Keep kindness moving</h3><p>Mark it complete and look for the next small way to make a difference.</p></div></article>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</main>\r\n\r\n<footer class=\"site-footer\"><a class=\"brand\" href=\"#top\"><span class=\"brand-mark\">H</span><span>HelpHive</span></a><p>Built for stronger communities.</p><span>Spring Boot \u00B7 Angular \u00B7 PostgreSQL</span></footer>\r\n\r\n@if (modalOpen()) {\r\n  <div class=\"modal-backdrop\" (mousedown)=\"closeModal()\">\r\n    <section class=\"modal form-modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"form-title\" (mousedown)=\"$event.stopPropagation()\">\r\n      <button class=\"close-button\" aria-label=\"Close\" (click)=\"closeModal()\">\u00D7</button>\r\n      <div class=\"eyebrow\"><span></span> {{ editingId() ? 'Update the details' : 'Start a connection' }}</div>\r\n      <h2 id=\"form-title\">{{ editingId() ? 'Edit your post' : 'What would you like to share?' }}</h2>\r\n      <form [formGroup]=\"postForm\" (ngSubmit)=\"submit()\">\r\n        <div class=\"type-picker\">\r\n          <label [class.selected]=\"postForm.controls.type.value === 'REQUEST'\"><input type=\"radio\" formControlName=\"type\" value=\"REQUEST\"><span>\u2199</span><div><b>I need help</b><small>Ask the community</small></div></label>\r\n          <label [class.selected]=\"postForm.controls.type.value === 'OFFER'\"><input type=\"radio\" formControlName=\"type\" value=\"OFFER\"><span>\u2197</span><div><b>I can help</b><small>Offer time or a skill</small></div></label>\r\n        </div>\r\n        <label>Title<input type=\"text\" formControlName=\"title\" placeholder=\"A short, specific headline\"><small>{{ postForm.controls.title.value.length }}/90</small></label>\r\n        <label>Description<textarea rows=\"4\" formControlName=\"description\" placeholder=\"Add the details someone would need to respond\u2026\"></textarea><small>{{ postForm.controls.description.value.length }}/800</small></label>\r\n        <div class=\"form-row\">\r\n          <label>Location<input type=\"text\" formControlName=\"location\" placeholder=\"Neighborhood or Online\"></label>\r\n          <label>Category<select formControlName=\"category\">@for (item of categories; track item.value) { <option [value]=\"item.value\">{{ item.label }}</option> }</select></label>\r\n        </div>\r\n        <p class=\"identity-note\">Posting as <strong>{{ auth.user()?.name }}</strong> \u00B7 {{ auth.user()?.email }}</p>\r\n        @if (postForm.invalid && postForm.touched) { <p class=\"form-error\">Please complete every field. The description needs at least 20 characters.</p> }\r\n        <button class=\"button button-primary submit-button\" type=\"submit\" [disabled]=\"saving()\">{{ saving() ? 'Saving\u2026' : editingId() ? 'Save changes' : 'Publish to the board' }} <span>\u2197</span></button>\r\n      </form>\r\n    </section>\r\n  </div>\r\n}\r\n\r\n@if (selectedPost(); as post) {\r\n  <div class=\"modal-backdrop\" (mousedown)=\"selectedPost.set(null)\">\r\n    <section class=\"modal detail-modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"detail-title\" (mousedown)=\"$event.stopPropagation()\">\r\n      <button class=\"close-button\" aria-label=\"Close\" (click)=\"selectedPost.set(null)\">\u00D7</button>\r\n      <span class=\"type-tag\" [class.offer]=\"post.type === 'OFFER'\">{{ post.type }}</span>\r\n      <h2 id=\"detail-title\">{{ post.title }}</h2>\r\n      <p class=\"detail-description\">{{ post.description }}</p>\r\n      <dl><div><dt>Posted by</dt><dd>{{ post.authorName }}</dd></div><div><dt>Location</dt><dd>{{ post.location }}</dd></div><div><dt>Category</dt><dd>{{ categoryLabel(post.category) }}</dd></div><div><dt>Status</dt><dd>{{ post.status.replace('_', ' ') }}</dd></div></dl>\r\n      @if (post.contact) {\r\n        <a class=\"contact-box\" [href]=\"'mailto:' + post.contact\"><span>\u2709</span><div><small>Contact {{ post.authorName.split(' ')[0] }}</small><b>{{ post.contact }}</b></div><strong>\u2197</strong></a>\r\n      } @else {\r\n        <div class=\"contact-box\"><span>\u2659</span><div><small>Community privacy</small><b>Contact details are for signed-in members</b></div></div>\r\n      }\r\n      @if (post.ownedByCurrentUser) {\r\n        <p class=\"owner-note\">This is your post. You control its details and status.</p>\r\n        <div class=\"detail-actions\"><button class=\"text-button\" (click)=\"openEdit(post)\">Edit</button><button class=\"text-button danger\" (click)=\"remove(post)\">Delete</button>@if (post.status !== 'COMPLETED') { <button class=\"button button-dark\" (click)=\"advanceStatus(post)\">{{ post.status === 'OPEN' ? 'Start progress' : 'Mark complete' }}</button> }</div>\r\n      } @else if (post.ownerId === null) {\r\n        <p class=\"owner-note muted\">This is a read-only demo post.</p>\r\n      } @else if (post.status !== 'COMPLETED') {\r\n        <div class=\"response-box\">\r\n          <h3>Respond to this post</h3><p>Introduce yourself and explain how you can help or connect.</p>\r\n          <textarea rows=\"3\" maxlength=\"600\" placeholder=\"Write a helpful message\u2026\" [value]=\"responseMessage()\" (input)=\"responseMessage.set($any($event.target).value)\"></textarea>\r\n          <button class=\"button button-primary\" [disabled]=\"responding()\" (click)=\"sendResponse(post)\">{{ responding() ? 'Sending\u2026' : 'Send response \u2197' }}</button>\r\n        </div>\r\n      }\r\n    </section>\r\n  </div>\r\n}\r\n@if (toast()) { <div class=\"toast\"><span>\u2713</span>{{ toast() }}</div> }\r\n", styles: [":host { display: block; overflow: hidden; }\r\n\r\n.site-header { height: 78px; padding: 0 clamp(24px, 5vw, 80px); display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--line); background: rgba(255,253,248,.93); backdrop-filter: blur(12px); position: relative; z-index: 10; }\r\n.header-actions { display: flex; align-items: center; gap: 12px; }.account-chip { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; }.account-chip > span { width: 30px; height: 30px; border-radius: 50%; background: var(--green); color: white; display: grid; place-items: center; }\r\n.brand { display: inline-flex; align-items: center; gap: 10px; font: 800 20px 'Manrope', sans-serif; letter-spacing: -.7px; }\r\n.brand-mark { width: 34px; height: 34px; border-radius: 50% 50% 50% 12px; display: grid; place-items: center; background: var(--green); color: white; font-size: 17px; transform: rotate(-5deg); }\r\nnav { display: flex; gap: 36px; font-size: 14px; font-weight: 600; }\r\nnav a { transition: color .2s; } nav a:hover { color: var(--coral); }\r\n\r\n.button { border: 0; border-radius: 7px; min-height: 48px; padding: 0 22px; display: inline-flex; align-items: center; justify-content: center; gap: 20px; cursor: pointer; font-weight: 700; transition: transform .2s, box-shadow .2s, background .2s; }\r\n.button:hover { transform: translateY(-2px); }\r\n.button:disabled { opacity: .6; cursor: wait; transform: none; }\r\n.button-primary { background: var(--coral); color: #2e211e; box-shadow: 0 10px 25px rgba(255,118,95,.2); }\r\n.button-primary:hover { box-shadow: 0 12px 30px rgba(255,118,95,.32); }\r\n.button-dark { background: var(--green); color: white; }\r\n.button-small { min-height: 42px; padding: 0 17px; gap: 12px; font-size: 13px; }\r\n.button-ghost { border: 1px solid var(--ink); background: transparent; }\r\n.text-button { border: 0; background: none; padding: 8px; font-weight: 700; cursor: pointer; text-decoration: underline; text-underline-offset: 4px; }\r\n.danger { color: #b74335; }\r\n\r\n.hero { min-height: 650px; display: grid; grid-template-columns: 1.04fr .96fr; background: var(--cream); }\r\n.hero-copy { padding: 90px 7vw 75px max(7vw, calc((100vw - 1320px)/2)); display: flex; flex-direction: column; align-items: flex-start; }\r\n.eyebrow { text-transform: uppercase; letter-spacing: 2.3px; font: 700 11px 'Manrope', sans-serif; display: flex; align-items: center; gap: 10px; }\r\n.eyebrow span { width: 25px; height: 2px; background: var(--coral); }\r\n.hero h1 { margin: 24px 0 24px; font: 800 clamp(56px, 6vw, 92px)/.97 'Manrope', sans-serif; letter-spacing: -6px; }\r\n.hero h1 em { color: var(--green-2); font-style: normal; }\r\n.hero-copy > p { max-width: 530px; color: var(--muted); font-size: 18px; line-height: 1.7; margin: 0; }\r\n.hero-actions { display: flex; gap: 12px; margin-top: 38px; }\r\n.trust-line { display: flex; align-items: center; gap: 16px; margin-top: auto; padding-top: 54px; }\r\n.avatars { display: flex; }\r\n.avatars span { width: 35px; height: 35px; border: 2px solid var(--cream); margin-left: -8px; border-radius: 50%; background: #d6d8cd; display: grid; place-items: center; font-size: 10px; font-weight: 800; }\r\n.avatars span:first-child { margin-left: 0; background: #eeb8a7; }.avatars span:nth-child(2) { background: #9cbda9; }.avatars span:nth-child(3) { background: #e4ca7d; }.avatars span:last-child { background: var(--green); color: white; }\r\n.trust-line p { margin: 0; font-size: 12px; color: var(--muted); line-height: 1.55; }.trust-line strong { color: var(--ink); }\r\n\r\n.hero-art { position: relative; overflow: hidden; background: #8eb7a8; min-height: 600px; }\r\n.sun { position: absolute; width: 240px; height: 240px; border-radius: 50%; background: var(--yellow); top: 80px; right: 11%; box-shadow: 0 0 0 22px rgba(255,255,255,.10); }\r\n.arch { position: absolute; border-radius: 200px 200px 0 0; bottom: -10px; }\r\n.arch-back { width: 72%; height: 77%; right: -12%; background: #407b67; transform: rotate(-10deg); }\r\n.arch-front { width: 70%; height: 65%; left: -18%; background: #f4ead7; transform: rotate(14deg); box-shadow: inset -16px 0 rgba(23,45,40,.08); }\r\n.community-card { position: absolute; z-index: 3; width: 198px; padding: 16px; border-radius: 12px; background: var(--paper); box-shadow: 0 22px 50px rgba(23,45,40,.18); display: grid; grid-template-columns: 42px 1fr; column-gap: 10px; }\r\n.community-card b { font-size: 13px; align-self: end; }.community-card small { color: var(--muted); font-size: 10px; }.card-icon { width: 42px; height: 42px; border-radius: 10px; grid-row: span 2; display: grid; place-items: center; color: white; background: var(--green); }\r\n.card-one { left: 12%; bottom: 24%; transform: rotate(-7deg); }.card-two { right: 7%; top: 28%; transform: rotate(6deg); }.card-two .card-icon { background: var(--coral); }\r\n.heart { position: absolute; z-index: 2; left: 40%; bottom: 12%; font-size: 72px; color: var(--coral); transform: rotate(-10deg); text-shadow: 0 8px rgba(23,45,40,.12); }\r\n.spark { position: absolute; color: #fff6da; font-size: 30px; }.spark-one { top: 18%; left: 15%; }.spark-two { right: 22%; bottom: 14%; font-size: 18px; }\r\n\r\n.impact-strip { background: var(--green); color: white; min-height: 112px; display: grid; grid-template-columns: repeat(4, 1fr); padding: 0 max(7vw, calc((100vw - 1320px)/2)); }\r\n.impact-strip div { display: flex; align-items: center; justify-content: center; gap: 15px; border-right: 1px solid rgba(255,255,255,.16); }.impact-strip div:last-child { border: 0; }\r\n.impact-strip strong { font: 700 34px 'Manrope'; color: #f7d46a; }.impact-strip span { max-width: 80px; font-size: 12px; line-height: 1.35; color: #d8e3de; }\r\n\r\n.board { padding: 100px max(6vw, calc((100vw - 1280px)/2)) 120px; background: var(--paper); }\r\n.section-heading { display: flex; justify-content: space-between; align-items: end; gap: 40px; }.section-heading h2 { margin: 16px 0 0; font: 800 clamp(36px, 4vw, 54px) 'Manrope'; letter-spacing: -3px; }.section-heading > p { max-width: 450px; margin: 0 0 5px; color: var(--muted); line-height: 1.7; }\r\n.category-row { display: flex; flex-wrap: wrap; gap: 8px; margin: 44px 0 22px; }\r\n.category-row button { border: 1px solid var(--line); border-radius: 999px; background: white; padding: 9px 14px; display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 12px; font-weight: 600; transition: .2s; }.category-row button span { font-size: 17px; }.category-row button:hover,.category-row button.active { background: var(--green); color: white; border-color: var(--green); }\r\n.filter-bar { padding: 12px; border: 1px solid var(--line); border-radius: 10px; display: flex; align-items: center; gap: 10px; background: #fff; margin-bottom: 30px; }\r\n.search-box { flex: 1; display: flex; align-items: center; gap: 10px; padding: 0 8px; }.search-box span { font-size: 25px; color: var(--muted); }.search-box input { width: 100%; border: 0; outline: 0; padding: 10px 0; color: var(--ink); }\r\n.filter-bar select { border: 0; border-left: 1px solid var(--line); outline: 0; padding: 9px 28px 9px 15px; background: white; color: var(--ink); font-size: 12px; font-weight: 600; }.result-count { padding: 0 8px; color: var(--muted); font-size: 11px; white-space: nowrap; }\r\n.post-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; min-height: 310px; }\r\n.post-card { border: 1px solid var(--line); border-radius: 12px; padding: 24px; background: white; cursor: pointer; min-height: 350px; display: flex; flex-direction: column; transition: transform .25s, box-shadow .25s, border-color .25s; outline: none; }.post-card:hover,.post-card:focus { transform: translateY(-5px); box-shadow: 0 18px 45px rgba(23,45,40,.09); border-color: #afc0ba; }\r\n.card-topline { display: flex; justify-content: space-between; align-items: center; }.type-tag { display: inline-block; padding: 6px 9px; border-radius: 4px; background: #ffe7e1; color: #9d3b2b; text-transform: uppercase; font: 800 9px 'Manrope'; letter-spacing: 1.1px; }.type-tag.offer { background: #dfeee8; color: #21604c; }\r\n.status-dot { width: 8px; height: 8px; border-radius: 50%; background: #59a477; box-shadow: 0 0 0 4px #e9f4ed; }.status-dot.progress { background: #d8a62b; box-shadow: 0 0 0 4px #fbf3da; }.status-dot.done { background: #8c9692; box-shadow: 0 0 0 4px #eef0ef; }\r\n.category-icon { margin-top: 30px; width: 43px; height: 43px; border-radius: 50%; background: var(--cream); display: grid; place-items: center; font-size: 20px; }\r\n.post-card h3 { font: 800 19px/1.3 'Manrope'; letter-spacing: -.5px; margin: 14px 0 8px; }.description { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }.meta { display: flex; gap: 7px; margin: 16px 0; color: #7e8985; font-size: 11px; }\r\n.post-card footer { border-top: 1px solid var(--line); padding-top: 16px; margin-top: auto; display: flex; align-items: center; gap: 10px; }.author-avatar { width: 34px; height: 34px; border-radius: 50%; background: var(--green); color: white; display: grid; place-items: center; font-weight: 800; }.post-card footer div:nth-child(2) { display: flex; flex-direction: column; }.post-card footer b { font-size: 11px; }.post-card footer small { font-size: 9px; color: var(--muted); }.post-card footer button { margin-left: auto; border: 1px solid var(--line); background: white; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; }\r\n.skeleton { border: 0; background: linear-gradient(100deg,#f0eee8 20%,#faf9f4 35%,#f0eee8 50%); background-size: 300% 100%; animation: shimmer 1.3s infinite; }.empty-state { min-height: 350px; display: grid; place-items: center; align-content: center; text-align: center; background: var(--cream); border-radius: 12px; padding: 40px; }.empty-state > div { font-size: 35px; }.empty-state h3 { margin: 10px 0 0; font: 800 24px 'Manrope'; }.empty-state p { color: var(--muted); max-width: 480px; }\r\n\r\n.how { background: var(--green); color: white; padding: 105px max(7vw, calc((100vw - 1280px)/2)); }.eyebrow.light { color: #e0e8e4; }.how-grid { display: grid; grid-template-columns: .9fr 1.1fr; gap: 10vw; margin-top: 36px; }.how h2 { margin: 0; font: 700 clamp(38px,5vw,65px)/1.1 'Manrope'; letter-spacing: -3px; }.steps article { display: grid; grid-template-columns: 60px 1fr; gap: 20px; padding: 26px 0; border-top: 1px solid rgba(255,255,255,.18); }.steps article:last-child { border-bottom: 1px solid rgba(255,255,255,.18); }.steps article > b { color: #f1cc62; font: 600 12px 'Manrope'; }.steps h3 { margin: 0 0 7px; font: 700 18px 'Manrope'; }.steps p { margin: 0; color: #b9cbc4; line-height: 1.6; font-size: 13px; max-width: 440px; }\r\n.site-footer { padding: 36px max(6vw, calc((100vw - 1280px)/2)); display: flex; align-items: center; justify-content: space-between; background: #10261f; color: white; }.site-footer p,.site-footer > span { font-size: 11px; color: #90a39c; }\r\n\r\n.modal-backdrop { position: fixed; inset: 0; z-index: 100; background: rgba(12,30,24,.69); display: grid; place-items: center; padding: 20px; backdrop-filter: blur(6px); animation: fade .18s ease-out; }\r\n.modal { width: min(680px, 100%); max-height: calc(100vh - 40px); overflow-y: auto; position: relative; background: var(--paper); border-radius: 16px; padding: 38px; box-shadow: 0 30px 90px rgba(0,0,0,.25); animation: rise .25s ease-out; }.modal h2 { margin: 12px 40px 24px 0; font: 800 32px 'Manrope'; letter-spacing: -1.5px; }.close-button { position: absolute; right: 22px; top: 18px; border: 0; background: transparent; font-size: 30px; cursor: pointer; color: var(--muted); }\r\n.form-modal form > label,.form-row label { display: flex; flex-direction: column; gap: 7px; position: relative; margin-top: 16px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .8px; }.form-modal input,.form-modal textarea,.form-modal select { width: 100%; border: 1px solid var(--line); border-radius: 7px; padding: 13px; background: white; outline: none; color: var(--ink); text-transform: none; letter-spacing: 0; font-weight: 400; }.form-modal input:focus,.form-modal textarea:focus,.form-modal select:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(47,102,85,.1); }.form-modal label > small { position: absolute; right: 9px; bottom: 8px; color: #9ba4a1; font-size: 9px; font-weight: 400; letter-spacing: 0; }.form-modal textarea { resize: vertical; }.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }\r\n.identity-note,.owner-note { background: #edf4f1; border-radius: 8px; padding: 12px 14px; color: var(--green); font-size: 11px; margin: 18px 0 0; }.owner-note.muted { color: var(--muted); background: var(--cream); }\r\n.type-picker { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }.type-picker label { border: 1px solid var(--line); border-radius: 8px; padding: 14px; display: flex; align-items: center; gap: 12px; cursor: pointer; }.type-picker label.selected { border-color: var(--green); background: #edf4f1; }.type-picker input { display: none; }.type-picker label > span { font-size: 24px; }.type-picker div { display: flex; flex-direction: column; }.type-picker b { font-size: 13px; }.type-picker small { color: var(--muted); font-size: 10px; }.submit-button { width: 100%; margin-top: 24px; }.form-error { color: #a84034; font-size: 11px; margin-bottom: -12px; }\r\n.detail-modal .type-tag { margin-bottom: 5px; }.detail-description { color: var(--muted); line-height: 1.75; }.detail-modal dl { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; margin: 25px 0; }.detail-modal dl div { padding: 14px; border-bottom: 1px solid var(--line); }.detail-modal dl div:nth-child(odd) { border-right: 1px solid var(--line); }.detail-modal dl div:nth-last-child(-n+2) { border-bottom: 0; }.detail-modal dt { color: var(--muted); text-transform: uppercase; letter-spacing: 1px; font-size: 9px; }.detail-modal dd { margin: 4px 0 0; font-size: 13px; font-weight: 700; text-transform: capitalize; }.contact-box { background: var(--green); color: white; border-radius: 9px; padding: 16px; display: flex; align-items: center; gap: 13px; }.contact-box > span { font-size: 24px; }.contact-box div { display: flex; flex-direction: column; }.contact-box small { color: #b8cbc4; }.contact-box strong { margin-left: auto; }.detail-actions { display: flex; align-items: center; gap: 8px; margin-top: 20px; }.detail-actions .button { margin-left: auto; min-height: 42px; }\r\n.contact-login { width: 100%; border: 0; text-align: left; cursor: pointer; }\r\n.response-box { margin-top: 20px; padding: 18px; border-radius: 9px; background: var(--cream); }.response-box h3 { margin: 0 0 5px; font: 800 16px 'Manrope'; }.response-box p { margin: 0 0 12px; color: var(--muted); font-size: 12px; }.response-box textarea { width: 100%; padding: 12px; border: 1px solid var(--line); border-radius: 7px; resize: vertical; outline: none; }.response-box .button { width: 100%; min-height: 42px; margin-top: 9px; }\r\n.toast { position: fixed; z-index: 200; left: 50%; bottom: 30px; transform: translateX(-50%); background: #10261f; color: white; padding: 12px 18px; border-radius: 999px; box-shadow: 0 15px 35px rgba(0,0,0,.25); display: flex; gap: 9px; align-items: center; font-size: 12px; font-weight: 600; }.toast span { color: #f1cc62; }\r\n.auth-modal { width: min(500px, 100%); }.auth-intro { color: var(--muted); margin-top: -14px; }.auth-tabs { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; background: var(--cream); border-radius: 9px; padding: 5px; margin: 22px 0 6px; }.auth-tabs button { border: 0; border-radius: 6px; padding: 11px; background: transparent; color: var(--muted); cursor: pointer; font-size: 12px; font-weight: 700; }.auth-tabs button.active { background: white; color: var(--green); box-shadow: 0 2px 8px rgba(23,45,40,.08); }.auth-modal form > label { display: flex; flex-direction: column; gap: 7px; margin-top: 15px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .8px; }.auth-modal input { width: 100%; border: 1px solid var(--line); border-radius: 7px; padding: 13px; background: white; outline: none; color: var(--ink); text-transform: none; letter-spacing: 0; font-weight: 400; }.auth-modal input:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(47,102,85,.1); }.auth-error { margin: 14px 0 -8px; }.auth-security { margin: 18px 0 0; text-align: center; color: var(--muted); font-size: 10px; }\r\n.auth-gate { background: radial-gradient(circle at 82% 18%, rgba(247,212,106,.42), transparent 26%), linear-gradient(135deg, #10261f 0%, #2f6655 52%, #8eb7a8 100%); }\r\n.auth-gate::before { content: 'HelpHive'; position: fixed; top: 28px; left: 38px; color: white; font: 800 22px 'Manrope', sans-serif; letter-spacing: -.7px; }\r\n.auth-notice { border: 1px solid #a8c9bc; border-radius: 8px; padding: 11px 13px; margin: 14px 0 0; background: #edf4f1; color: var(--green); font-size: 11px; line-height: 1.5; }\r\n\r\n@keyframes shimmer { to { background-position-x: 0%; } from { background-position-x: 100%; } }\r\n@keyframes fade { from { opacity: 0; } } @keyframes rise { from { opacity: 0; transform: translateY(18px) scale(.98); } }\r\n\r\n@media (max-width: 960px) {\r\n  nav { display: none; }.hero { grid-template-columns: 1fr; }.hero-copy { min-height: 590px; }.hero-art { min-height: 480px; }.impact-strip { grid-template-columns: 1fr 1fr; padding: 15px 7vw; }.impact-strip div { border-bottom: 1px solid rgba(255,255,255,.16); }.impact-strip div:nth-child(2) { border-right: 0; }.impact-strip div:nth-last-child(-n+2) { border-bottom: 0; }.post-grid { grid-template-columns: 1fr 1fr; }.how-grid { grid-template-columns: 1fr; gap: 50px; }\r\n}\r\n@media (max-width: 640px) {\r\n  .site-header { height: 68px; padding: 0 18px; }.site-header .button { padding: 0 12px; }.site-header .button span,.account-chip { display: none; }.header-actions { gap: 6px; }.header-actions .text-button { font-size: 10px; }.hero-copy { padding: 65px 24px 55px; min-height: 570px; }.hero h1 { letter-spacing: -3.8px; }.hero-actions { flex-direction: column; width: 100%; }.hero-actions .button { width: 100%; }.hero-art { min-height: 410px; }.community-card { transform: scale(.85); }.card-one { left: 1%; }.card-two { right: -3%; }.impact-strip { min-height: 210px; }.impact-strip strong { font-size: 28px; }.board { padding: 70px 18px 80px; }.section-heading { display: block; }.section-heading > p { margin-top: 20px; }.filter-bar { flex-wrap: wrap; }.search-box { flex-basis: 100%; }.filter-bar label:not(.search-box) { flex: 1; }.filter-bar select { width: 100%; border-left: 0; border-top: 1px solid var(--line); }.post-grid { grid-template-columns: 1fr; }.how { padding: 70px 24px; }.site-footer { flex-direction: column; gap: 15px; text-align: center; }.modal { padding: 30px 20px; }.form-row,.type-picker { grid-template-columns: 1fr; }.detail-modal dl { grid-template-columns: 1fr; }.detail-modal dl div,.detail-modal dl div:nth-child(odd) { border-right: 0; border-bottom: 1px solid var(--line); }.detail-modal dl div:nth-child(3) { border-bottom: 1px solid var(--line); }.detail-actions { flex-wrap: wrap; }.detail-actions .button { width: 100%; margin: 5px 0 0; }\r\n}\r\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CommunityPage, { className: "CommunityPage", filePath: "src/app/pages/community-page/community-page.ts", lineNumber: 17 }); })();
