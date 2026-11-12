export const authInterceptor = (request, next) => {
    const token = sessionStorage.getItem('helphive_token');
    if (!token || !request.url.startsWith('/api/'))
        return next(request);
    return next(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
