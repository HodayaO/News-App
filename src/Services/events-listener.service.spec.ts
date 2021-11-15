import { TestBed } from '@angular/core/testing';

import { EventsListenerService } from './events-listener.service';

describe('EventsListenerService', () => {
  let service: EventsListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
