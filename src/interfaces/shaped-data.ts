export interface MathData {
    mean: number | null;
    median: number | null;
    mode: number[];
    range: number[];
}

export interface YearData extends MathData {
    year: number;
}

export interface ShapedData extends MathData {
    dataByYear: YearData[];
}
