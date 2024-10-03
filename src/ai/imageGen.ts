import type { Request as WorkerRequest } from "@cloudflare/workers-types";
const { readFile } = require("node:fs/promises");
const { resolve } = require("node:path");

const MODEL = "@cf/unum/uform-gen2-qwen-500m";

export default async function fetch(
  request: WorkerRequest<CfProperties, IncomingRequestCfProperties<CfProperties>>,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  const file = resolve("assets/fujisama.png");
  const img = await readFile(file);
  // const img =
  const response = await env.AI.run(MODEL, img);
  return new Response(JSON.stringify(response));
}
