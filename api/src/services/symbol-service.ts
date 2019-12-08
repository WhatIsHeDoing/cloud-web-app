/** @see https://www.alphavantage.co/documentation/ */

import fetch from "node-fetch";
import { getManager } from "typeorm";
import { adaptSymbol } from "../adapters";
import { Symbol } from "../entities";
import { PossibleSymbols, SymbolMatchResults } from "../models";

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
    const uri = "https://www.alphavantage.co/query?" + searchParams.toString();

    const response = await fetch(uri);

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
