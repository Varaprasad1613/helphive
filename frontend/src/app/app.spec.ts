import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    sessionStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('creates the application', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the product name', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('HelpHive');
  });

  it('shows only the account gate to an anonymous visitor', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Sign in to enter the private community');
    expect(text).not.toContain('Community board');
  });
});
