import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('form should be valid with correct values', () => {
    component.form.setValue({
      emailAddress: 'test@test.com',
      password: '123456'
    });
    expect(component.form.valid).toBe(true);
  });

  it('email field should be invalid with wrong format', () => {
    component.form.get('emailAddress')?.setValue('notanemail');
    expect(component.form.get('emailAddress')?.invalid).toBe(true);
  });

  it('should not call login when form is invalid', () => {
    const spy = vi.spyOn((component as any).auth, 'login');
    component.submit();
    expect(spy).not.toHaveBeenCalled();
  });
});
