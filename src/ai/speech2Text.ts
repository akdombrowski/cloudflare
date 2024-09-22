const CF_API_KEY = process.env.CF_API_KEY;
const model_name = "whisper-tiny-en";
const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.ACCOUNT_ID}/ai/run/${model_name}`;
const audio_url =
  "https://soundcloud.com/anthony-dombrowski-617297343/the-origins-of-the-foundation-flow-ping?si=7cf1794e356d48d8a6c77d60543f5d5d&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing";

const audioRes = await fetch(audio_url);
const audio = audioRes.bytes();

const options = {
  method: "POST",
  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${CF_API_KEY}` },
  body: { audio: audio },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));
