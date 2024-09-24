import { getAll } from "@/vids/videoFuns.ts";
import type { VideoURLObj } from "@/vids/videoURLs.ts";
import type {
  Request as WorkerRequest,
  ExecutionContext,
  ResponseInit,
  BodyInit,
} from "@cloudflare/workers-types";
import { Buffer } from "node:buffer";
import { Readable } from "node:stream";

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
          res.append(result.title, result.url);
        });
        break;
      case "post":
        break;
      default:
        break;
    }

    const options: ResponseInit = {
      // encodeBody: "manual",
      headers: new Headers({ "Content-Type": "application/octet-stream" }),
    };

    const resData: string[] = [];
    res.forEach((value: File | string, key: string): void => {
      resData.push(`${key}: ${value}`);
    });

    const buf: Buffer = Buffer.from(resData.join(", "));
    const uint16array = new Uint16Array(
      buf.buffer,
      buf.byteOffset,
      buf.length / Uint16Array.BYTES_PER_ELEMENT,
    );

    const readable = Readable.from(res.entries()) as unknown as ReadableStream;


    // FormData
    const response = new Response(readable, options);

    // Object {title: url}
    options.headers = new Headers({ "Content-Type": "application/json" });
    const response2 = new Response(uint16array, options);

    // above object stringified
    options.headers = new Headers({ "Content-Type": "text/plain" });
    // const rStr = ;
    // const response3 = new Response(rStr, options);

    // html code
    options.headers = new Headers({ "Content-Type": "text/html" });
    // const html = `<pre>${rStr}</pre>`;
    // const response4 = new Response(html, options);

    // console.log("\n", resData.join("\n\n"), "\n");

    // const resSt = encodeURIComponent(resData.join("\n\n"));
    // const response5 = new Response(resSt, options);

    return response;
  },
};
