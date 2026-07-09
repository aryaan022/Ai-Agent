import {agent} from "./src/graph/agentGraph"
import { HumanMessage } from "@langchain/core/messages";

async function main() {
  const result = await agent.invoke({
    messages: [new HumanMessage("What is the capital of France? Convert it to uppercase.")],
  });

  for (const message of result.messages) {
    console.log(`[${message.type}]: ${message.content}`);
  }
}

main().catch(console.error);