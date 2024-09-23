import type { Request as WorkerRequest, ExecutionContext } from "@cloudflare/workers-types";
export default function fetch(request: WorkerRequest, env: unknown, ctx: ExecutionContext): Promise<Response>;
