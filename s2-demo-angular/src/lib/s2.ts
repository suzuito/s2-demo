
export interface S2 {
    NewCellFromFace(face: number): CellWrapper;
}

export interface PointWrapper {
    lat: number;
    lng: number;
}

export interface RectWrapper {
    points: PointWrapper[];
}

export interface CellWrapper {
    readonly cellIDToken: string,
    readonly rectBound: RectWrapper,
}

export function geoJSONFromCellWrapper(cell: CellWrapper): any {
    return {
        type: "Feature",
        properties: {
            cellIDToken: cell.cellIDToken,
        },
        geometry: {
            type: "Polygon",
            coordinates: [
                [
                    [cell.rectBound.points[0].lng, cell.rectBound.points[0].lat],
                    [cell.rectBound.points[1].lng, cell.rectBound.points[1].lat],
                    [cell.rectBound.points[2].lng, cell.rectBound.points[2].lat],
                    [cell.rectBound.points[3].lng, cell.rectBound.points[3].lat],
                    [cell.rectBound.points[0].lng, cell.rectBound.points[0].lat],
                ],
            ],
        },
    };
}