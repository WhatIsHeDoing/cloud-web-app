/** @see https://open-platform.theguardian.com/documentation/search */

import { DateTime } from "luxon";
import fetch from "node-fetch";
import { adaptNewsSearchResult } from "../adapters";
import { sortLuxonDateTimes } from "../extensions/luxon-extensions";
import { NewsArticle, NewsSearchResponse } from "../models";

/** Finds the business news stories relating to search terms. */
export const searchNews = async (keywords: string[], numberOfResults?: number): Promise<NewsArticle[]> => {
    // Build the search URL.
    const searchParams = new URLSearchParams();
    searchParams.append("api-key", process.env.THE_GUARDIAN_API_KEY || "demo");
    searchParams.append("q", keywords.join(" OR "));
    searchParams.append("section", "business");
    searchParams.append("show-fields", "thumbnail,trailText,wordcount");
    const uri = "https://content.guardianapis.com/search?" + searchParams.toString();

    // Search The Guardian.
    const response = await fetch(uri);

    // Bomb out on failure.
    if (!response.ok) {
        throw new Error("Could not fetch from the API 😢");
    }

    // Adapt and return.
    const data: NewsSearchResponse = await response.json();

    return data.response.results
        .map(adaptNewsSearchResult)
        // The default search sorts by relevance, which means less relevant searches are likely not returned.
        // For those that are, though, sort by their publication date.
        // This date should already be cast to a Luxon DateTime, but would then need adapting by GraphQL.
        // For simplicity now, simply convert, compare and return what we have.
        .sort((a, b) => sortLuxonDateTimes(
            DateTime.fromISO(a.webPublicationDate),
            DateTime.fromISO(b.webPublicationDate)
        ))
        // Slice, rather than request less, as relevance is still important.
        .slice(0, numberOfResults || 10);
};
