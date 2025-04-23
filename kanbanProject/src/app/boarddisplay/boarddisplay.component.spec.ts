import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoarddisplayComponent } from './boarddisplay.component';

describe('BoarddisplayComponent', () => {
  let component: BoarddisplayComponent;
  let fixture: ComponentFixture<BoarddisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoarddisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoarddisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
