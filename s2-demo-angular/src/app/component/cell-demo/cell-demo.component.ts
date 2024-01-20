import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Map001Component } from '../map001/map001.component';
import { WorldGeojsonImplService } from '../../usecase/service/world-geojson-impl.service';
import { WorldGeojsonService } from '../../usecase/service/world-geojson';
import { CellTableComponent } from '../cell-table/cell-table.component';
import { CellWrapper, CellWrappers } from '../../../lib/s2';
import { Layer } from '../../../lib/layer';

@Component({
  selector: 'app-cell-demo',
  standalone: true,
  imports: [
    Map001Component,
    CellTableComponent,
  ],
  providers: [
    {
      provide: WorldGeojsonService,
      useClass: WorldGeojsonImplService,
    },
  ],
  templateUrl: './cell-demo.component.html',
  styleUrl: './cell-demo.component.scss'
})
export class CellDemoComponent implements OnChanges {
  @Input()
  public center: [number, number] = [0, 0];
  @Input()
  public cells: CellWrappers | undefined;

  public cellTokenIdSetColored: Set<string> = new Set<string>();
  public get cellTokenIdsColored(): string[] {
    return Array.from(this.cellTokenIdSetColored);
  }

  public cellLayers: Layer[] = [];
  constructor(
    public worldGeojsonService: WorldGeojsonService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cells'] != undefined && this.cells != undefined) {
      this.updateCellLayers(this.cells.cells);
      this.cells.onUpdatedCellWrapper.subscribe((cells) => {
        this.updateCellLayers(cells);
      });
    }
  }

  updateCellLayers(cells: readonly CellWrapper[]): void {
    this.cellLayers = cells.map((cell: CellWrapper) => {
      let style = {
        fill: "rgba(255, 0, 0, 0.3)",
        stroke: "red",
      }
      if (this.cellTokenIdsColored.find((cellId) => cellId === cell.tokenId) !== undefined) {
        style.fill = "rgba(255, 0, 0, 0.8)";
      }
      return {
        geojson: cell.vertecies,
        properties: {
          key: cell.tokenId,
        },
        style,
      };
    });
  }

  onCheckColorCell(event: { cell: CellWrapper, checked: boolean }) {
    if (event.checked) {
      this.cellTokenIdSetColored.add(event.cell.tokenId);
      if (this.cells != undefined) {
        this.updateCellLayers(this.cells.cells);
      }
    } else {
      this.cellTokenIdSetColored.delete(event.cell.tokenId);
      if (this.cells != undefined) {
        this.updateCellLayers(this.cells.cells);
      }
    }
  }
}
