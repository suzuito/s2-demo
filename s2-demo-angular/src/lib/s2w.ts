import { CellWrapper, PointWrapper, RectWrapper } from "./s2";


export class S2W {
    NewCellFromFace(face: number): Cell {
        const cell = window.s2.NewCellFromFace(face);
        return new Cell(cell);
    }
    CellGetChildren(cellIDToken: string): Cell[] {
        const cellWrappers = window.s2.CellGetChildren(cellIDToken);
        return cellWrappers.map((cellWrapper: CellWrapper) => {
            return new Cell(cellWrapper);
        });
    }
}

export class Cell {
    readonly cellIDToken: string;
    readonly rectBound: Rect;
    constructor(
        cell: CellWrapper,
    ) {
        this.cellIDToken = cell.cellIDToken;
        this.rectBound = new Rect(cell.rectBound);
    }

    level(): number {
        return window.s2.CellLevel(this.cellIDToken);
    }

    a(): string {
        const b = parseInt(this.cellIDToken, 16).toString(2);
        return b;
    }

    geojson(): any {
        return {
            type: "Feature",
            properties: {
                cellIDToken: this.cellIDToken,
            },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [this.rectBound.points[0].lng, this.rectBound.points[0].lat],
                        [this.rectBound.points[1].lng, this.rectBound.points[1].lat],
                        [this.rectBound.points[2].lng, this.rectBound.points[2].lat],
                        [this.rectBound.points[3].lng, this.rectBound.points[3].lat],
                        [this.rectBound.points[0].lng, this.rectBound.points[0].lat],
                    ],
                ],
            },
        };
    }
}

export class Cells {
    readonly cells: Cell[];
    constructor(
        cells: Cell[] = [],
    ) {
        this.cells = cells;
    }

    add(...cells: Cell[]) {
        cells.forEach((cell: Cell) => {
            const exists = this.cells.find((c: Cell) => {
                return c.cellIDToken === cell.cellIDToken;
            });
            if (exists !== undefined) {
                return;
            }
            console.log(exists);
            this.cells.push(cell);
        });
        this.cells.sort((a: Cell, b: Cell) => {
            return a.cellIDToken < b.cellIDToken ? -1 : 1;
        });
        console.log(this.cells.length);
    }
}

export class Rect {
    readonly points: Point[];
    constructor(
        rect: RectWrapper,
    ) {
        this.points = rect.points.map((point: PointWrapper) => {
            return new Point(point);
        });
    }
}

export class Point {
    readonly lat: number;
    readonly lng: number;
    constructor(
        point: PointWrapper,
    ) {
        this.lat = point.lat;
        this.lng = point.lng;
    }
}