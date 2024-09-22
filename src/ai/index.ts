import type {
  Request as WorkerRequest,
  ExecutionContext,
} from "@cloudflare/workers-types";

export default async function fetch(request: WorkerRequest, env: unknown, ctx: ExecutionContext) {
  const { body, method } = request;

  const answer = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
    prompt: "What is the origin of the phrase 'Hello, World'",
    stream: true,
  });

  return new Response(answer, {
    headers: { "content-type": "text/event-stream" },
  });
}
