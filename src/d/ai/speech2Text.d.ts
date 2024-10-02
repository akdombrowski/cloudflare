import type { Request } from "@cloudflare/workers-types";
export default function fetch(request: Request, env: Env): Promise<Response>;
