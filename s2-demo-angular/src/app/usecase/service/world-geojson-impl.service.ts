import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WorldGeojsonService } from './world-geojson';

@Injectable({
  providedIn: 'root'
})
export class WorldGeojsonImplService extends WorldGeojsonService {
  constructor(private http: HttpClient) {
    super();
    this.http.get<GeoJSON.FeatureCollection>('assets/world.geo.json').subscribe((worldGeoJSON: GeoJSON.FeatureCollection) => {
      this.lightGeoJSON = worldGeoJSON;
      this.onUpdatedLightGeoJSON.next();
    });
  }
}
