import { SymbolTimeSeries } from "../models";
import { SymbolTimeSeriesResponseValues } from "../models/alpha-vantage/time-series";

/** Takes the slightly bizarre output from Alpha Vantage and maps it to a cleaner representation 🧹 */
export const adaptSymbolTimeSeries = (data: SymbolTimeSeriesResponseValues): SymbolTimeSeries[] => Object
    .entries(data)
    .map(([timestamp, value]) => ({
        close: +value["4. close"],
        high: +value["2. high"],
        low: +value["3. low"],
        open: +value["1. open"],
        timestamp,
        volume: +value["5. volume"]
    } as SymbolTimeSeries));
