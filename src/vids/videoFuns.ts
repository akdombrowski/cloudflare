import VIDEOS_TITLE_URL, { type VideoURLObj } from "./videoURLs";
import _ from "lodash";

export const getFirst = (title: string): VideoURLObj => {
  return _.find(VIDEOS_TITLE_URL, (value: VideoURLObj, index: number) => {
    return value.title.includes(title);
  });
};

export const getAll = (title: string): VideoURLObj[] => {
  return _.filter(VIDEOS_TITLE_URL, (value, index, collection) => {
    return value.title.includes(title);
  });
};
