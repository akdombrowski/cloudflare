import { getAll, getFirst } from "@/vids/videoFuns.js";
const searchFromGET = async (request, env, ctx) => {
    const url = new URL(request.url);
    const queryParams = url.searchParams;
    const keyword = queryParams.getAll("keyword");
    if (keyword?.length > 0) {
        return getAll(keyword.join(" "));
    }
    const video = [];
    const oauth = getFirst("oauth");
    if (oauth) {
        video.push(oauth);
        return video;
    }
    return null;
};
const checkIfRequestIsForMe = (url) => {
    if (url.pathname.endsWith("/")) {
        return true;
    }
    console.log("\nurl path:", url.pathname);
    console.log("not for me. returning early.");
    return false;
};
const process = async (request, env, ctx) => {
    // const { body, method } = request;
    return new Response();
};
export default {
    async fetch(request, env, ctx) {
        const { body, method } = request;
        const url = new URL(request.url);
        // check if the request needs processing by checking pathname
        // ex of one that does NOT = '/favicon.ico'
        // only processes root pathname URLs = '/'
        if (!checkIfRequestIsForMe(url)) {
            return new Response();
        }
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
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            headers: headers,
            status: 200,
            statusText: "Ok. I think?",
        };
        const response = new Response(str, options);
        return response;
    },
};
//# sourceMappingURL=index.js.map