import { getAll } from "@/vids/videoFuns.ts";
import type { VideoURLObj } from "@/vids/videoURLs.ts";
import type {
  Request as WorkerRequest,
  ExecutionContext,
  ResponseInit,
} from "@cloudflare/workers-types";
import type { ReducerStateWithoutAction } from "react";

const searchFromGET = (
  request: WorkerRequest<unknown, IncomingRequestCfProperties<unknown>>,
  env: Env,
  ctx: ExecutionContext,
): VideoURLObj[] | null => {
  const url = new URL(request.url);
  const queryParams = url.searchParams;
  const keyword = queryParams.getAll("keyword");

  if (keyword) {
    return getAll(keyword.join(" "));
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
    const methodLowerCase = method.toLowerCase();
    let res = new FormData();

    switch (methodLowerCase) {
      case "get":
        const searchResults = searchFromGET(request, env, ctx);
        searchResults?.forEach((result: VideoURLObj) => {
          console.log(result);
          res.append(result.title, result.url);
        });
        console.log("\n\nsearch results\n");
        res.forEach(function callback(val: File | string, key: string, parent: FormData) {
          console.log(key);
          console.log(val);
          console.log();
        });
        break;
      case "post":
        break;
      default:
        break;
    }

    const options: ResponseInit = {
      encodeBody: "manual",
      headers: new Headers({ "Content-Type": "text/plain" }),
    };

    const resData: string[] = [];
    res.forEach((value: File | string, key: string): void => {
      resData.push(`${key}: ${value}`);
    });

    console.log("\n", resData.join("\n\n"), "\n");

    // FormData
    const response = new Response(resData.join("\n\n"), options);

    // Object {title: url}
    options.headers = new Headers({ "Content-Type": "application/json" });
    const response2 = new Response(res, options);

    // above object stringified
    options.headers = new Headers({ "Content-Type": "text/plain" });
    // const rStr = ;
    // const response3 = new Response(rStr, options);

    // html code
    options.headers = new Headers({ "Content-Type": "text/html" });
    // const html = `<pre>${rStr}</pre>`;
    // const response4 = new Response(html, options);

    return response;
  },
};
