import { VIDEOS_TITLE_URL, type VideoURLObj } from "@/vids/videoURLs.js";
import _ from "lodash";

export const getFirst = (title: string): VideoURLObj | null => {
  return (
    _.find(VIDEOS_TITLE_URL, (value: VideoURLObj) => {
      return value.title.toLowerCase().includes(title);
    }) ?? null
  );
};

export const getAll = (title: string): VideoURLObj[] | null => {
  return (
    _.filter(VIDEOS_TITLE_URL, (value) => {
      return value.title.toLowerCase().includes(title);
    }) ?? null
  );
};
