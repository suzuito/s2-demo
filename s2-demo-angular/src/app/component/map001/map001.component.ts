import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InvertibleGeoProjection, asInvertibleGeoProjection } from '../../../lib/d3';
import { Versor } from '../../../lib/versor';
import * as d3 from "d3";
import { Layer } from '../../../lib/layer';

@Component({
  selector: 'app-map001',
  standalone: true,
  imports: [],
  templateUrl: './map001.component.html',
  styleUrl: './map001.component.scss'
})
export class Map001Component implements OnChanges, AfterViewInit {
  private projection: InvertibleGeoProjection;
  readonly id: string;
  readonly width: number = 1000;
  readonly height: number = 500;
  @Input()
  public worldGeoJSON: any | undefined;
  @Input()
  public layers: Layer[] | undefined;
  // versor
  private v0: [number, number, number] = [0, 0, 0];
  private r0: [number, number, number] = [0, 0, 0];
  private q0: [number, number, number, number] = [0, 0, 0, 0];

  constructor() {
    this.projection = asInvertibleGeoProjection(d3.geoOrthographic());
    this.id = `m-${Date.now().toString()}`;
  }

  ngAfterViewInit(): void {
    const selection: d3.Selection<any, any, any, any> = d3.select(`canvas#${this.id}`);
    selection.call(d3.drag()
      /**
       * dragイベントの座標(DragEventのxとy)は、下記container関数により指定された要素(以降、container要素と呼ぶ)の「高さ」と「幅」に基づいて計算される。
       * 座標系は左上を原点とした座標系である。
       * https://d3js.org/d3-drag#drag_container
       * デフォルトのcontainer要素は、dragイベントが登録された要素の「親」である(下記)。
       * function container() {
       *   return this.parentNode;
       * }
       * 
       * 親が、Angularの仮想要素(app-map001)になることがある。
       * この仮想要素の幅と高さは出鱈目な値である(表示されないから？)。
       * 
       * 従って、dragイベントの座標が出鱈目な値になる。
       * 
       * そこで、container要素を、親要素ではなく、canvas要素に変更する。
       */
      .container(selection.node())
      .on("start", (event: DragEvent) => {
        const lonlat = this.projection.invert([event.x, event.y]);
        if (lonlat === null) {
          return;
        }
        this.v0 = Versor.cartesian(lonlat);
        this.r0 = this.projection.rotate();
        this.q0 = Versor.fromAngles(this.r0);
      })
      .on("drag", (event: DragEvent) => {
        const lonlat = this.projection.rotate(this.r0).invert([event.x, event.y]);
        if (lonlat === null) {
          return;
        }
        const v1 = Versor.cartesian(lonlat);
        const q1 = Versor.multiply(this.q0, Versor.delta(this.v0, v1));
        this.projection.rotate(Versor.toAngles(q1));
      })
      .on("drag.render", (event: DragEvent) => {
        this.redisplay();
      })
      .on("end.render", (event: DragEvent) => {
        this.redisplay();
      })
    )
      ;
    this.redisplay();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if (changes['worldGeoJSON'] !== undefined) {
      this.redisplay();
    }
  }

  private redisplay(): void {
    const selection: d3.Selection<any, any, any, any> = d3.select(`canvas#${this.id}`);
    if (selection.empty()) {
      return;
    }
    const context: CanvasRenderingContext2D = selection.node().getContext('2d');
    const path = d3.geoPath(this.projection, context);
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    path({ type: "Sphere" });
    context.fillStyle = '#00f';
    context.fill();
    // context.beginPath();
    // path(d3.geoGraticule10());
    // context.strokeStyle = '#ccc';
    // context.stroke();
    context.beginPath();
    context.strokeStyle = '#000';
    context.fillStyle = '#0f0';
    path(this.worldGeoJSON);
    context.fill();
    context.stroke();
    if (this.layers) {
      this.layers.forEach((layer: Layer) => {
        context.beginPath();
        if (layer.style.stroke !== undefined) {
          context.strokeStyle = layer.style.stroke;
        }
        if (layer.style.fill !== undefined) {
          context.fillStyle = layer.style.fill;
        }
        path(layer.geojson);
        context.fill();
        context.stroke();
      });
    }
  }

}
