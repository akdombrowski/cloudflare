import { getAll } from "@/vids/videoFuns.js";
import { Buffer } from "node:buffer";
import { Readable } from "node:stream";
const searchFromGET = async (request, env, ctx) => {
    const url = new URL(request.url);
    const queryParams = url.searchParams;
    const keyword = queryParams.getAll("keyword");
    if (keyword) {
        return getAll(keyword.join(" "));
    }
    return null;
};
export default {
    async fetch(request, env, ctx) {
        const { body, method } = request;
        const methodLowerCase = method.toLowerCase();
        let res = new FormData();
        const resObj = {};
        let str;
        const arr = [];
        let searchResults = [];
        switch (methodLowerCase) {
            case "get":
                searchResults = (await searchFromGET(request, env, ctx));
                searchResults?.forEach((result) => {
                    res.append(result.title, result.url);
                    resObj[result.title] = result.url;
                    arr.push(JSON.stringify(result, null, 2));
                });
                str = JSON.stringify(searchResults);
                break;
            case "post":
                break;
            default:
                break;
        }
        const options = {
            encodeBody: "manual",
            headers: new Headers({
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "http://localhost:5173",
            }),
        };
        const resData = [];
        res.forEach((value, key) => {
            resData.push(`${key}: ${value}`);
        });
        // const buf: Buffer = Buffer.from(searchResults.join(", "));
        const buf = Buffer.from(JSON.stringify(searchResults));
        const uint16array = new Uint16Array(buf.buffer, buf.byteOffset, buf.length / Uint16Array.BYTES_PER_ELEMENT);
        const readable = Readable.from(searchResults, {
            objectMode: false,
        });
        // FormData
        const response = new Response(readable, options);
        const response6 = new Response(str, options);
        str = searchResults.join("\n\n");
        console.log();
        console.log("searchResults[0]");
        console.log(searchResults[0]);
        console.log();
        // Object {title: url}
        const response7 = new Response(JSON.parse(JSON.stringify(searchResults)), options);
        const encoder = new TextEncoder();
        const enc = encoder.encode(JSON.stringify(searchResults[0]));
        const uint8arr = Uint8Array.from(enc);
        const response8 = new Response(uint8arr);
        options.headers = new Headers({ "Content-Type": "application/json" });
        // above object stringified
        options.headers = new Headers({ "Content-Type": "text/plain" });
        // const rStr = ;
        // const response3 = new Response(rStr, options);
        // html code
        options.headers = new Headers({ "Content-Type": "text/html" });
        options.headers = new Headers({ "Content-Type": "application/octet-stream" });
        const response2 = new Response(enc, options);
        // const html = `<pre>${rStr}</pre>`;
        // const response4 = new Response(html, options);
        // console.log("\n", resData.join("\n\n"), "\n");
        // const resSt = encodeURIComponent(resData.join("\n\n"));
        // const response5 = new Response(resSt, options);
        return response8;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFRN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXZDLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFDekIsT0FBcUUsRUFDckUsR0FBUSxFQUNSLEdBQXFCLEVBQ1UsRUFBRTtJQUNqQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQztJQUNyQyxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTlDLElBQUksT0FBTyxFQUFFLENBQUM7UUFDWixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDO0FBUUYsZUFBZTtJQUNiLEtBQUssQ0FBQyxLQUFLLENBQ1QsT0FBcUUsRUFDckUsR0FBUSxFQUNSLEdBQXFCO1FBRXJCLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ2pDLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QyxJQUFJLEdBQUcsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sTUFBTSxHQUE4QixFQUFFLENBQUM7UUFDN0MsSUFBSSxHQUFHLENBQUM7UUFDUixNQUFNLEdBQUcsR0FBc0QsRUFBRSxDQUFDO1FBRWxFLElBQUksYUFBYSxHQUFrQixFQUFFLENBQUM7UUFF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