import { NewsSearchResultFields } from ".";

export interface NewsSearchResult {
    apiUrl: string;
    fields: NewsSearchResultFields;
    id: string;
    isHosted: boolean;
    pillarId: string;
    pillarName: string;
    sectionId: string;
    sectionName: string;
    type: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
}
