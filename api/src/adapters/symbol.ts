import { Symbol, SymbolResult } from "../models";

/** Takes the slightly bizarre output from Alpha Vantage and maps it to a cleaner representation for caching 🧹 */
export const adaptSymbol = (result: SymbolResult): Symbol => ({
    currency: result["8. currency"],
    marketClose: result["6. marketClose"],
    marketOpen: result["5. marketOpen"],
    matchScore: +result["9. matchScore"],
    name: result["2. name"],
    region: result["4. region"],
    symbol: result["1. symbol"],
    timezone: result["7. timezone"],
    type: result["3. type"]
});
