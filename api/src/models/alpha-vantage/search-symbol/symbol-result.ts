export interface SymbolResult {
    "1. symbol": string;
    "2. name": string;
    "3. type": string;
    "4. region": string;
    "5. marketOpen": string;
    "6. marketClose": string;
    "7. timezone": string;
    "8. currency": string;

    /** A float score from 0-1 against the search term, 1 being a perfect match. */
    "9. matchScore": string;
}
