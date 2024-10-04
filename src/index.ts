import faitch from "@/ai/index.js";
import { getAll, getFirst } from "@/vids/videoFuns.js";
import type { VideoURLObj } from "@/vids/videoURLs.ts";
import type {
  Request as WorkerRequest,
  ExecutionContext,
  ResponseInit,
  BodyInit,
  CfProperties,
} from "@cloudflare/workers-types";


const searchFromGET = async (
  request: WorkerRequest<unknown, IncomingRequestCfProperties<unknown>>,
  env: Env,
  ctx: ExecutionContext,
): Promise<VideoURLObj[] | null> => {
  const url = new URL(request.url);
  const queryParams = url.searchParams;
  const keyword = queryParams.getAll("keyword");

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

const checkIfRequestIsForMe = (url: URL) => {
  if (url.pathname.endsWith("/")) {
    return true;
  }

  if (url.pathname.endsWith("/ai")) {
    return true;
  }

  console.log("\nurl path:", url.pathname);
  console.log("not for me. returning early.");
  return false;
};

const processGET = async (
  request: WorkerRequest<CfProperties, IncomingRequestCfProperties<CfProperties>>,
  env: Env,
  ctx: ExecutionContext,
) => {
  let res = new FormData();
  const resObj: { [key: string]: string } = {};
  let str;
  const arr: string[] | globalThis.BodyInit | null | undefined = [];

  const searchResults: VideoURLObj[] = (await searchFromGET(request, env, ctx))!;
  searchResults?.forEach((result: VideoURLObj) => {
    res.append(result.title, result.url);
    resObj[result.title] = result.url;
    arr.push(JSON.stringify(result, null, 2));
  });

  str = JSON.stringify(searchResults);
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const options: ResponseInit = {
    headers: headers,
    status: 200,
    statusText: "Ok. I think?",
  };

  const response = new Response(str, options);

  return response;
};

const processAI = async (
  request: WorkerRequest<CfProperties, IncomingRequestCfProperties<CfProperties>>,
  env: Env,
  ctx: ExecutionContext,
) => {
  console.log("ai time. let's faitch");
  const ans = await faitch(request, env, ctx);
  return new Response();
};

const processRequest = async (
  request: WorkerRequest<CfProperties, IncomingRequestCfProperties<CfProperties>>,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> => {
  const method = request.method.toLowerCase();
  const url = new URL(request.url);

  console.log("url.pathname");
  console.log(url.pathname);

  if (url.pathname.endsWith("ai")) {
    return await processAI(request, env, ctx);
  }

  switch (method) {
    case "get":
      return await processGET(request, env, ctx);
    case "post":
      break;
    default:
      break;
  }

  return new Response();
};

export default {
  async fetch(
    request: WorkerRequest<CfProperties, IncomingRequestCfProperties<CfProperties>>,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const { body, method } = request;
    const url = new URL(request.url);

    // check if the request needs processing by checking pathname
    // ex of one that does NOT = '/favicon.ico'
    // only processes root pathname URLs = '/'
    if (!checkIfRequestIsForMe(url)) {
      return new Response();
    }

    const response = await processRequest(request, env, ctx);

    return response;
  },
};
