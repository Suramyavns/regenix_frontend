import Groq from 'groq-sdk/index.mjs';

const api_key = process.env.NEXT_PUBLIC_NLP_API;
const groq = new Groq({apiKey:api_key,dangerouslyAllowBrowser:true});

export const getSuggestion=async(condition,temperature)=>{
    const prompt = `The weather here is ${condition} at temperature of ${temperature} celsius.`

    const payload = {
        model: "groq/compound",
        messages: [
            {
                role: "user",
                content: `${prompt} Suggest a simple and easy implement to active sustainable measure for a common man within 50 words`
            }
        ],
        max_tokens: 50
    }

    const chatCompletion = await groq.chat.completions.create(payload)
    console.log(chatCompletion)

    return chatCompletion.choices[0].message
}