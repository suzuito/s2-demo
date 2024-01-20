import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellDemoComponent } from './cell-demo.component';

describe('CellDemoComponent', () => {
  let component: CellDemoComponent;
  let fixture: ComponentFixture<CellDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CellDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
