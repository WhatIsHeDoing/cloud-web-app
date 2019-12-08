import { NewsArticle, NewsSearchResult } from "../models";

/**
 * Flattens the result of a content search from The Guardian,
 * renames a few fields and omits others.
 */
export const adaptNewsSearchResult = (result: NewsSearchResult): NewsArticle => ({
    id: result.id,
    minutesToRead: Math.round(result.fields.wordcount / wordsPerMinute),
    sectionName: result.sectionName,
    summary: result.fields.trailText,
    thumbnailUrl: result.fields.thumbnail,
    url: result.webUrl,
    webPublicationDate: result.webPublicationDate,
    webTitle: result.webTitle
});

/** @see https://help.medium.com/hc/en-us/articles/214991667-Read-time */
const wordsPerMinute = 265;
