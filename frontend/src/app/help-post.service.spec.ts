import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HelpPostService } from './help-post.service';

describe('HelpPostService', () => {
  let service: HelpPostService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(HelpPostService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('requests a filtered page with its page metadata', () => {
    const result = {
      content: [],
      page: 1,
      size: 9,
      totalElements: 10,
      totalPages: 2,
      first: false,
      last: true,
    };

    service.list({ search: 'garden', category: 'HOME_AND_GARDEN' }, 1, 9)
      .subscribe(page => expect(page).toEqual(result));

    const request = http.expectOne(req =>
      req.url === '/api/posts'
      && req.params.get('search') === 'garden'
      && req.params.get('category') === 'HOME_AND_GARDEN'
      && req.params.get('page') === '1'
      && req.params.get('size') === '9',
    );
    expect(request.request.method).toBe('GET');
    request.flush(result);
  });
});
