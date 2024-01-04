import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Map001Component } from '../../component/map001/map001.component';
import { Layer } from '../../../lib/layer';
import { CommonModule } from '@angular/common';
import { Cell, Cells } from '../../../lib/s2w';

@Component({
  selector: 'app-demo001',
  standalone: true,
  imports: [
    Map001Component,
    CommonModule,
  ],
  templateUrl: './demo001.component.html',
  styleUrl: './demo001.component.scss'
})
export class Demo001Component {
  public worldGeoJSON: any | undefined;
  public layers: Layer[] | undefined;
  public cells: Cells;

  public cellMouseOvered: Cell | undefined;

  constructor(
    private http: HttpClient,
  ) {
    // this.projection = d3.geoMercator();
    this.http.get('assets/world.geo.json').subscribe((worldGeoJSON: any) => {
      this.worldGeoJSON = worldGeoJSON;
    });
    this.cells = new Cells();
    this.cells.add(
      window.s2w.NewCellFromFace(0),
    );

    this.redisplay();
  }

  onMouseOverCell(cell: Cell) {
    this.cellMouseOvered = cell;
    this.redisplay();
  }

  onMouseOutCell() {
    this.cellMouseOvered = undefined;
    this.redisplay();
  }

  clickGetChildren(cell: Cell) {
    const cells = window.s2w.CellGetChildren(cell.cellIDToken);
    this.cells.add(...cells);
    this.redisplay();
  }

  redisplay() {
    this.layers = this.cells.cells.map((cell: Cell) => {
      const layer: Layer = {
        geojson: cell.geojson(),
        style: {
          fill: "rgba(255, 0, 0, 0.3)",
          stroke: "red",
        },
      };
      if (this.cellMouseOvered !== undefined) {
        if (cell.cellIDToken === this.cellMouseOvered.cellIDToken) {
          layer.style.fill = "rgba(255, 0, 0, 1)";
        }
      }
      return layer;
    });
  }
}
