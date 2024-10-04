import type { Request as WorkerRequest } from "@cloudflare/workers-types";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const MODEL = "@cf/unum/uform-gen2-qwen-500m";

export default async function faitch(
  request: WorkerRequest<CfProperties, IncomingRequestCfProperties<CfProperties>>,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  const file = resolve("assets/fujisama.png");
  const img =  readFileSync(file);
  const u8 = new Uint8Array(img.buffer, img.byteOffset, img.length / Uint8Array.BYTES_PER_ELEMENT);
  // const img =
  const response = await env.AI.run(MODEL, {image: Array.from(u8), });
  return new Response(JSON.stringify(response));
}
