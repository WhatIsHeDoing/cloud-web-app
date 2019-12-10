import { SymbolTimeSeriesResponseMetaData, SymbolTimeSeriesResponseValues } from ".";

export interface SymbolTimeSeriesResponse {
    "Meta Data": SymbolTimeSeriesResponseMetaData;
    /** Other intervals are also returned if requested! 🤦‍♂️ */
    "Time Series (1min)": SymbolTimeSeriesResponseValues;
}
