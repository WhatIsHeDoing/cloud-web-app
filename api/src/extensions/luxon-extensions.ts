import { DateTime } from "luxon";

/** Pass to a `sort` function to compare Luxon dates. */
export const sortLuxonDateTimes = (a: DateTime, b: DateTime): number => {
    // tslint:disable: strict-comparisons
    if (a > b) {
        return -1;
    }

    return a < b ? 1 : 0;
};
