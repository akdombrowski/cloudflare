import type { Request as WorkerRequest } from "@cloudflare/workers-types";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const MODEL = "@cf/unum/uform-gen2-qwen-500m";

const SUPER_MR_TOOFER_URL = "https://i.postimg.cc/brC8zk9F/supermr-Toofer.png";
export default async function faitch(
  request: WorkerRequest<CfProperties, IncomingRequestCfProperties<CfProperties>>,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  const res = await fetch(SUPER_MR_TOOFER_URL);
  const blob = await res.blob();
  const u8Img = await blob.bytes();

  // const img =
  const response = await env.AI.run(MODEL, {
    image: Array.from(u8Img),
    prompt: "Generate a caption for this image",
    max_tokens: 512,
  });
  return new Response(JSON.stringify(response));
}
