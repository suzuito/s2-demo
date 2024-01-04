import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Map001Component } from '../../component/map001/map001.component';
import { Layer } from '../../../lib/layer';
import { CellWrapper, geoJSONFromCellWrapper } from '../../../lib/s2';

@Component({
  selector: 'app-demo001',
  standalone: true,
  imports: [
    Map001Component,
  ],
  templateUrl: './demo001.component.html',
  styleUrl: './demo001.component.scss'
})
export class Demo001Component {
  public worldGeoJSON: any | undefined;
  public layers: Layer[] | undefined;

  constructor(
    private http: HttpClient,
  ) {
    // this.projection = d3.geoMercator();
    this.http.get('assets/world.geo.json').subscribe((worldGeoJSON: any) => {
      this.worldGeoJSON = worldGeoJSON;
    });

    const cells: CellWrapper[] = [
      window.s2.NewCellFromFace(0),
      window.s2.NewCellFromFace(1),
      window.s2.NewCellFromFace(2),
      window.s2.NewCellFromFace(3),
      window.s2.NewCellFromFace(4),
      window.s2.NewCellFromFace(5),
    ];

    cells.forEach((cell: CellWrapper) => {
      console.log(cell.cellIDToken, parseInt(cell.cellIDToken, 16), parseInt(cell.cellIDToken, 16).toString(2));
    });

    console.log(cells);
    this.layers = cells.map((cell: CellWrapper) => {
      return {
        geojson: geoJSONFromCellWrapper(cell),
        style: {
          fill: "rgba(255, 0, 0, 0.3)",
          stroke: "red",
        },
      };
    });
  }

}
