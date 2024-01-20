import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CellWrapper, CellWrappers } from '../../../lib/s2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cell-table',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './cell-table.component.html',
  styleUrl: './cell-table.component.scss'
})
export class CellTableComponent {
  @Input()
  cells: CellWrappers | undefined;
  @Input()
  cellTokenIdsColored: string[] | undefined;
  @Output()
  clickGetChildren: EventEmitter<CellWrapper> = new EventEmitter<CellWrapper>();
  @Output()
  onCheckColorCell: EventEmitter<{ cell: CellWrapper, checked: boolean }> = new EventEmitter<{ cell: CellWrapper, checked: boolean }>();
  constructor() { }

  getCells(): CellWrapper[] {
    return this.cells ? this.cells.cells : [];
  }

  isColoredCell(cell: CellWrapper): boolean {
    if (this.cellTokenIdsColored === undefined) {
      return false;
    }
    return this.cellTokenIdsColored.find((cellId) => cellId === cell.tokenId) !== undefined;
  }

  onUpdateCellColorCheckbox(cell: CellWrapper, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.onCheckColorCell.emit({ cell, checked });
  }
}
