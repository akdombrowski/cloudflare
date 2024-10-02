import axios from "axios";
export default async function fetch(request, env) {
    const model_name = "whisper-tiny-en";
    const audio_url = "https://soundcloud.com/anthony-dombrowski-617297343/the-origins-of-the-foundation-flow-ping?si=7cf1794e356d48d8a6c77d60543f5d5d&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing";
    const audioRes = await axios.get(audio_url, {
        transformResponse: (data) => {
            return data.blob();
        },
    });
    const audioBlob = await audioRes.data();
    const audio = await audioBlob.bytes();
    const model = "@cf/openai/whisper-tiny-en";
    const response = await env.AI.run(model, audio);
    return Response.json({ input: { audio: [] }, response });
}
//# sourceMappingURL=speech2Text.js.map