import { HfInference } from "@huggingface/inference";

const client = new HfInference(process.env.NEXT_PUBLIC_NLP_API);

export const getSuggestion=async(condition,temperature)=>{
    const prompt = `The weather here is ${condition} at temperature of ${temperature} celsius.`
    
    const chatCompletion = await client.chatCompletion({
        model: "mistralai/Mistral-7B-Instruct-v0.3",
        messages: [
            {
                role: "user",
                content: `${prompt} Suggest an active sustainable measure for a common man within 50 words`
            }
        ],
        max_tokens: 50
    });
    return chatCompletion.choices[0].message
}