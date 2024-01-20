export interface Layer {
    geojson: GeoJSON.FeatureCollection | GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.Geometry;
    properties: LayerProperties;
    style: {
        fill: string | undefined;
        stroke: string | undefined;
    }
}

export interface LayerProperties {
    readonly key: string;
}