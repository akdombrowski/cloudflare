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
    let r = {};

    switch (methodLowerCase) {
      case "get":
        const searchResults = searchFromGET(request, env, ctx);
        searchResults?.forEach((result) => {
          res.append(result.title, result.url);
          r[result.title] = result.url;
        });
        break;
      case "post":
        break;
      default:
        break;
    }

    const options = {
      encodeBody: "manual",
      headers: new Headers({ "Content-Type":  "text/plain" }),
    };

    // FormData
    const response = new Response(res, options);

    // Object {title: url}
    options.headers = new Headers({ "Content-Type": "application/json" });
    const response2 = new Response(r, options);

    // above object stringified
    options.headers = new Headers({ "Content-Type": "text/plain" });
    const rStr = JSON.stringify(r);
    const response3 = new Response(rStr, options);

    // html code
    options.headers = new Headers({ "Content-Type": "text/html" });
    const html = `<pre>${rStr}abc</pre>`;
    const response4 = new Response(html, options);

    return response4;
  },
} satisfies ExportedHandler<Env>;
