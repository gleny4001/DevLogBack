import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

type Log = {
    whatIDid: string[];
    whatsNext: string[];
    bug: string[];
};
export async function createTodoFromLog(log: Log) {
    try {
        const prompt = `You're an AI assistant. Based on daily log, return a JSON array of todo list for next day based on the log, like this:
[
  { "title": "Bug Fixes", "todos": ["Fix bug 1", "Fix bug 2"] },
  { "title": "Refactoring", "todos": ["Improve X", "Remove Y"] }
]

Log:
What I Did:
${log.whatIDid.join("\n")}
What's Next:
${log.whatsNext.join("\n")}
Known Bugs:
${log.bug?.join("\n") || "None"}

Return only valid JSON. No markdown. No explanation. No backticks.`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
        });

        const content = response.choices[0].message?.content;
        console.log(content);
        if (!content) {
            throw new Error("OpenAI did not return content");
        }
        const cleaned = content
            .trim()
            .replace(/^```(?:json)?\n?/, "")
            .replace(/```$/, "");
        console.log("OpenAI response content:", cleaned);
        const json = JSON.parse(cleaned);

        return json;
    } catch (error) {
        console.error("Error in createTodoFromLog:", error);
        throw error;
    }
}
