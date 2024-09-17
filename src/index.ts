/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { getAll } from "./vids/videoFuns";
import type { Request, Context, Environment } from "@cloudflare/workers-types";

const searchParamsFromGET = (req, env, ctx) => {
  const url = new URL(req.url);
  const queryParams = url.searchParams;
  const keyword = queryParams.getAll("keyword");
  return keyword;
};

const searchVids = (keyword: string) => {
  let results = [];
  const searchRes = getAll(keyword);
  return results;
};

export default {
  async fetch(request: Request, env: Environment, ctx: Context): Promise<Response> {
    const { body, method } = request;
    const methodLowerCase = method.toLowerCase();

    switch (methodLowerCase) {
      case "get":
        const searchParams = searchParamsFromGET(request, env, ctx);
        break;
      case "post":
        break;
      default:
        break;
    }

    return new Response("Hello Anthony!");
  },
} satisfies ExportedHandler<Env>;
