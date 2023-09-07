import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackHandlerComponent } from './callback-handler.component';

describe('CallbackHandlerComponent', () => {
  let component: CallbackHandlerComponent;
  let fixture: ComponentFixture<CallbackHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallbackHandlerComponent]
    });
    fixture = TestBed.createComponent(CallbackHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
