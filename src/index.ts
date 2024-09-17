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

const getVids = (req, env, ctx) => {
  const url = new URL(req.url);
  const queryParams = url.searchParams;
  let results = [];
  if (queryParams?.size) {
    for (const [key, value] of queryParams) {
      const searchRes = getAll(value);
      if (searchRes?.length) {
        results.concat(searchRes);
      }
    }
  }
  return results;
};

export default {
  async fetch(request: Request, env: Environment, ctx: Context): Promise<Response> {
    const { body, method } = request;
    const methodLowerCase = method.toLowerCase();

    switch (methodLowerCase) {
      case "get":
        break;
      case "post":
        break;
      default:
        break;
    }

    return new Response("Hello Anthony!");
  },
} satisfies ExportedHandler<Env>;
