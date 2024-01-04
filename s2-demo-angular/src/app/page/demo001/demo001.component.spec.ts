import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Demo001Component } from './demo001.component';

describe('Demo001Component', () => {
  let component: Demo001Component;
  let fixture: ComponentFixture<Demo001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Demo001Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Demo001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
