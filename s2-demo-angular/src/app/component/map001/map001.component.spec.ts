import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Map001Component } from './map001.component';

describe('Map001Component', () => {
  let component: Map001Component;
  let fixture: ComponentFixture<Map001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Map001Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Map001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
