import { VIDEOS_TITLE_URL } from "@/vids/videoURLs.js";
import _ from "lodash";
export const getFirst = (title) => {
    return (_.find(VIDEOS_TITLE_URL, (value) => {
        return value.title.toLowerCase().includes(title);
    }) ?? null);
};
export const getAll = (title) => {
    return (_.filter(VIDEOS_TITLE_URL, (value) => {
        return value.title.toLowerCase().includes(title);
    }) ?? null);
};
//# sourceMappingURL=videoFuns.js.map