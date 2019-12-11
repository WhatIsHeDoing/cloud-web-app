import { SymbolResult } from ".";

/** @see https://www.alphavantage.co/documentation/#symbolsearch */
export interface SymbolMatchResults {
    bestMatches: SymbolResult[];
}
