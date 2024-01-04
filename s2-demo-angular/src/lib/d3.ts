
export interface InvertibleGeoProjection extends d3.GeoProjection {
    invert(point: [number, number]): [number, number] | null;
}

export function asInvertibleGeoProjection(projection: d3.GeoProjection): InvertibleGeoProjection {
    // TODO: Check if projection is invertible.
    return projection as InvertibleGeoProjection;
}
