import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellTableComponent } from './cell-table.component';

describe('CellTableComponent', () => {
  let component: CellTableComponent;
  let fixture: ComponentFixture<CellTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CellTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
