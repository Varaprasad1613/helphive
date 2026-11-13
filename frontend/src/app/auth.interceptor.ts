import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter, switchMap, take } from 'rxjs';

const csrfCookieName = 'XSRF-TOKEN';
const csrfHeaderName = 'X-XSRF-TOKEN';
const safeMethods = new Set(['GET', 'HEAD', 'OPTIONS', 'TRACE']);

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const isApiRequest = request.url.startsWith('/api/');
  const token = isApiRequest ? sessionStorage.getItem('helphive_token') : null;
  const authenticatedRequest = token
    ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : request;

  if (!isApiRequest || safeMethods.has(request.method)) return next(authenticatedRequest);

  const csrfToken = readCsrfCookie();
  if (csrfToken) return next(addCsrfHeader(authenticatedRequest, csrfToken));

  const csrfBootstrapRequest = new HttpRequest('GET', '/api/csrf', {
    withCredentials: request.withCredentials,
  });
  return next(csrfBootstrapRequest).pipe(
    filter((event): event is HttpResponse<unknown> => event instanceof HttpResponse),
    take(1),
    switchMap(() => {
      const bootstrappedToken = readCsrfCookie();
      if (!bootstrappedToken) {
        throw new Error('The backend did not set the CSRF token cookie.');
      }
      return next(addCsrfHeader(authenticatedRequest, bootstrappedToken));
    }),
  );
};

function readCsrfCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const prefix = `${csrfCookieName}=`;
  const cookie = document.cookie.split(';').map(value => value.trim()).find(value => value.startsWith(prefix));
  return cookie ? cookie.slice(prefix.length) : null;
}

function addCsrfHeader(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return request.clone({ setHeaders: { [csrfHeaderName]: token } });
}
