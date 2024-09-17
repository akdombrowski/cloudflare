import { getAll } from "@/vids/videoFuns";
import type { Request, Context, Environment } from "@cloudflare/workers-types";

const searchFromGET = (req, env, ctx): VideoURLObj[] | null => {
  const url = new URL(req.url);
  const queryParams = url.searchParams;
  const keyword = queryParams.getAll("keyword");

  if (keyword) {
    return getAll(keyword);
  }

  return null;
};

export default {
  async fetch(request: Request, env: Environment, ctx: Context): Promise<Response> {
    const { body, method } = request;
    const methodLowerCase = method.toLowerCase();
    let res = new FormData();

    switch (methodLowerCase) {
      case "get":
        const searchResults = searchFromGET(request, env, ctx);
        searchResults?.forEach((result) => {
          res.append(result.title, result.url);
        });
        break;
      case "post":
        break;
      default:
        break;
    }

    return new Response(res, {
      encodeBody: "manual",
      headers: new Headers({ "Content-Type": "application/json" }),
    });
  },
} satisfies ExportedHandler<Env>;
