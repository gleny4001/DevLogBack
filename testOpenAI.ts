// testOpenAI.ts
import { createTodoFromLog } from "./src/services/openaiTodo";
import dotenv from "dotenv";
dotenv.config();

(async () => {
    const mockLog = {
        whatIDid: [
            "Fixed layout issues on the dashboard",
            "Integrated user authentication API",
        ],
        whatsNext: [
            "Write tests for new API endpoints",
            "Refactor the sidebar component",
        ],
        bug: [
            "Login state not persisting on refresh",
            "Broken link in profile page",
        ],
    };

    try {
        const todos = await createTodoFromLog(mockLog);
        console.log("📝 Generated Todos:", JSON.stringify(todos, null, 2));
    } catch (err) {
        console.error("❌ Error while testing OpenAI:", err);
    }
})();
