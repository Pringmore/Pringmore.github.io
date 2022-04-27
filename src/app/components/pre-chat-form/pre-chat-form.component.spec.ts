import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreChatFormComponent } from './pre-chat-form.component';

describe('PreChatFormComponent', () => {
  let component: PreChatFormComponent;
  let fixture: ComponentFixture<PreChatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreChatFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreChatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
