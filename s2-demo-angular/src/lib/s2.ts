
export interface S2 {
    NewCellFromFace(face: number): CellWrapper;
    CellLevel(cellIDToken: string): number;
    CellGetChildren(cellIDToken: string): CellWrapper[];
}

export interface PointWrapper {
    readonly lat: number;
    readonly lng: number;
}

export interface RectWrapper {
    readonly points: PointWrapper[];
}

export interface CellWrapper {
    readonly cellIDToken: string,
    readonly rectBound: RectWrapper,
}
