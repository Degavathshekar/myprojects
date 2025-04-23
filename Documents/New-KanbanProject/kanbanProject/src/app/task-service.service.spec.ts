import { TestBed } from '@angular/core/testing';

import { TaskService } from './task-service.service';  // Use the correct service name

describe('TaskService', () => {  // Match the service name here
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
