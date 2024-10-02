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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlZWNoMlRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9haS9zcGVlY2gyVGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFVBQVUsS0FBSyxDQUFDLE9BQWdCLEVBQUUsR0FBUTtJQUM1RCxNQUFNLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQztJQUNyQyxNQUFNLFNBQVMsR0FDYixrTUFBa00sQ0FBQztJQUVyTSxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFO1FBQzFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsQ0FBQztLQUNGLENBQUMsQ0FBQztJQUNILE1BQU0sU0FBUyxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hDLE1BQU0sS0FBSyxHQUFHLE1BQU0sU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RDLE1BQU0sS0FBSyxHQUFrQyw0QkFBNEIsQ0FBQztJQUUxRSxNQUFNLFFBQVEsR0FBOEIsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFM0UsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDM0QsQ0FBQyJ9