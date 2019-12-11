import { NewsSearchResult } from ".";

export interface NewsSearchResults {
    currentPage: number;
    orderBy: string;
    pages: number;
    pageSize: number;
    results: NewsSearchResult[];
    startIndex: number;
    status: string;
    total: number;
    userTier: string;
}
