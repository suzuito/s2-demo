import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Map001Component } from '../../component/map001/map001.component';
import { Layer } from '../../../lib/layer';
import { CommonModule } from '@angular/common';
import { CellWrapper, CellWrappers } from '../../../lib/s2';
import { CellTableComponent } from '../../component/cell-table/cell-table.component';
import { CellDemoComponent } from '../../component/cell-demo/cell-demo.component';
import { WorldGeojsonService } from '../../usecase/service/world-geojson';
import { WorldGeojsonImplService } from '../../usecase/service/world-geojson-impl.service';

@Component({
  selector: 'app-demo001',
  standalone: true,
  imports: [
    CellDemoComponent,
    Map001Component,
    CellTableComponent,
    CommonModule,
  ],
  templateUrl: './demo001.component.html',
  styleUrl: './demo001.component.scss'
})
export class Demo001Component {
  public layers: Layer[] | undefined;

  readonly cellsAtlevel0: CellWrappers = new CellWrappers([
    window.s2.NewCellFromFace(0),
    window.s2.NewCellFromFace(1),
    window.s2.NewCellFromFace(2),
    window.s2.NewCellFromFace(3),
    window.s2.NewCellFromFace(4),
    window.s2.NewCellFromFace(5),
  ]);

  constructor(
    private http: HttpClient,
  ) {
  }

}
