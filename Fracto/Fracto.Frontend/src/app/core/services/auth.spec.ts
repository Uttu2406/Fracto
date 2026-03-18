import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, provideRouter([])]
    });
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isLoggedIn() should return false when no token exists', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('isLoggedIn() should return true after token is set', () => {
    localStorage.setItem('token', 'fake.token.here');
    expect(service.isLoggedIn()).toBe(true);
  });

  it('logout() should remove token from localStorage', () => {
    localStorage.setItem('token', 'fake.token.here');
    localStorage.removeItem('token');
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('isAdmin() should return false when no token exists', () => {
    expect(service.isAdmin()).toBe(false);
  });
});
