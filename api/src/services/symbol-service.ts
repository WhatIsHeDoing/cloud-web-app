/** @see https://www.alphavantage.co/documentation/ */

import fetch from "node-fetch";
import { getManager } from "typeorm";
import { adaptSymbol, adaptSymbolTimeSeries } from "../adapters";
import { Symbol } from "../entities";
import { PossibleSymbols, SymbolMatchResults } from "../models";
import { SymbolTimeSeriesResponse } from "../models/alpha-vantage/time-series";

/** Finds the details of an exact match, or a list of potential matches. */
export const searchSymbol = async (symbol: string): Promise<Symbol | PossibleSymbols> => {
    // Attempt to lookup the symbol from the Mongo cache.
    const manager = getManager();

    const cachedSymbol = await manager.findOne(Symbol, { symbol: symbol });

    if (cachedSymbol) {
        return cachedSymbol;
    }

    // Not found, so search Alpha Vantage.
    const searchParams = new URLSearchParams();
    searchParams.append("apikey", process.env.ALPHA_VANTAGE_API_KEY || "demo");
    searchParams.append("function", "SYMBOL_SEARCH");
    searchParams.append("keywords", symbol);

    const response = await fetch(_baseUrl + searchParams.toString());

    if (!response.ok) {
        throw new Error("Could not fetch from the API 😢");
    }

    const { bestMatches }: SymbolMatchResults = await response.json();
    const symbols = bestMatches.map(adaptSymbol);
    const exactMatch = symbols.find(({ matchScore }) => +matchScore === 1);

    // Save and return an exact match.
    if (exactMatch) {
        const symbolToCache = manager.create(Symbol, exactMatch);
        await manager.save(Symbol, symbolToCache);
        return symbolToCache;
    }

    // No exact match, so return all possible matches.
    return { symbols: symbols };
};

export const symbolTimeSeries = async (symbol: string) => {
    const searchParams = new URLSearchParams();
    searchParams.append("apikey", process.env.ALPHA_VANTAGE_API_KEY || "demo");
    searchParams.append("function", "TIME_SERIES_INTRADAY");
    searchParams.append("interval", "1min");
    searchParams.append("symbol", symbol);

    const response = await fetch(_baseUrl + searchParams.toString());

    if (!response.ok) {
        throw new Error("Could not fetch from the API 😢");
    }

    const data: SymbolTimeSeriesResponse = await response.json();
    return adaptSymbolTimeSeries(data["Time Series (1min)"]);
};

const _baseUrl = "https://www.alphavantage.co/query?";
