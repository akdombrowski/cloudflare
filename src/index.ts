import { getAll, getFirst } from "@/vids/videoFuns.js";
import type { VideoURLObj } from "@/vids/videoURLs.ts";
import type {
  Request as WorkerRequest,
  ExecutionContext,
  ResponseInit,
  BodyInit,
} from "@cloudflare/workers-types";
import { Buffer } from "node:buffer";
import { Readable } from "node:stream";

const searchFromGET = async (
  request: WorkerRequest<unknown, IncomingRequestCfProperties<unknown>>,
  env: Env,
  ctx: ExecutionContext,
): Promise<VideoURLObj[] | null> => {
  const url = new URL(request.url);
  const queryParams = url.searchParams;
  const keyword = queryParams.getAll("keyword");
  console.log("keyword:", keyword);
  if (keyword?.length > 0) {
    return getAll(keyword.join(" "));
  }

  const video: VideoURLObj[] = [];
  const oauth = getFirst("oauth");

  if (oauth) {
    video.push(oauth);
    return video;
  }

  return null;
};

interface IBody {
  [key: string]: string;
}

type IBodyInit = IBody | BodyInit;

export default {
  async fetch(
    request: WorkerRequest<unknown, IncomingRequestCfProperties<unknown>>,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const { body, method } = request;
    const url = new URL(request.url);

    if (!url.pathname.endsWith("/")) {
      console.log("\nurl path:", url.pathname);
      console.log("not for me. returning early.");
      return new Response();
    }
    const methodLowerCase = method.toLowerCase();

    let res = new FormData();
    const resObj: { [key: string]: string } = {};
    let str;
    const arr: string[] | globalThis.BodyInit | null | undefined = [];

    let searchResults: VideoURLObj[] = [];

    switch (methodLowerCase) {
      case "get":
        searchResults = (await searchFromGET(request, env, ctx))!;
        searchResults?.forEach((result: VideoURLObj) => {
          res.append(result.title, result.url);
          resObj[result.title] = result.url;
          arr.push(JSON.stringify(result, null, 2));
        });
        str = JSON.stringify(searchResults);
        break;
      case "post":
        break;
      default:
        break;
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options: ResponseInit = {
      headers: headers,
      status: 200,
      statusText: "Ok. I think?",
    };

    const response = new Response(str, options);

    return response;
  },
};
