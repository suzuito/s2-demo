import { Subject } from "rxjs";

export interface S2 {
    NewCellFromFace(face: number): CellWrapper;
    CellLevel(cellIDToken: string): number;
    CellGetChildren(cellIDToken: string): CellWrapper[];
}

export interface CellWrapper {
    readonly tokenId: string,
    readonly center: GeoJSON.Feature<GeoJSON.Point>,
    readonly vertecies: GeoJSON.Feature<GeoJSON.Polygon>,
    readonly level: number,
}


export class CellWrappers {
    readonly onUpdatedCellWrapper: Subject<readonly CellWrapper[]> = new Subject<readonly CellWrapper[]>();
    constructor(
        readonly cells: CellWrapper[] = [],
    ) {
    }

    add(...cells: CellWrapper[]) {
        cells.forEach((cell: CellWrapper) => {
            const exists = this.cells.find((c: CellWrapper) => {
                return c.tokenId === cell.tokenId;
            });
            if (exists !== undefined) {
                return;
            }
            this.cells.push(cell);
        });
        this.cells.sort((a: CellWrapper, b: CellWrapper) => {
            return a.tokenId < b.tokenId ? -1 : 1;
        });
        this.onUpdatedCellWrapper.next(this.cells);
    }
}
