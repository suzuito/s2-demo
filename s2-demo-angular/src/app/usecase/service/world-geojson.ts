import { Subject } from "rxjs";

export abstract class WorldGeojsonService {
    lightGeoJSON: GeoJSON.FeatureCollection | undefined;
    onUpdatedLightGeoJSON: Subject<void> = new Subject<void>();
}
