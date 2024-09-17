import VIDEOS_TITLE_URL, { type VideoURLObj } from "./videoURLs";
import _ from "lodash";

export const getFirst = (title: string): VideoURLObj => {
  _.find(VIDEOS_TITLE_URL, (value, index, collection) => {
    return value.includes(title);
  });
};

export const getAll = (title: string): VideoURLObj[] => {
  _.filter(VIDEOS_TITLE_URL, (value, index, collection) => {
    return value.includes(title);
  });
};
