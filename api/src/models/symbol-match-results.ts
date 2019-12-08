import { SymbolResult } from "./symbol-result";

/** @see https://www.alphavantage.co/documentation/#symbolsearch */
export interface SymbolMatchResults {
    bestMatches: SymbolResult[];
}
