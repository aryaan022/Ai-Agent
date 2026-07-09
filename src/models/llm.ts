import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import { calculatorTools } from "../tools/calculator";

export const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  temperature: 0,
});

export const llmWithTools = llm.bindTools(calculatorTools);