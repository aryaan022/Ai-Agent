import { AIMessage, ToolMessage } from "@langchain/core/messages";
import { GraphNode } from "@langchain/langgraph";

import { MessagesState } from "../state/agent.states";
import { llmWithTools } from "../models/llm";
import { toolsByName } from "../tools/calculator";

export const toolNode: GraphNode<typeof MessagesState> = async (state) => {
  const lastMessage = state.messages.at(-1);

  if (lastMessage == null || !AIMessage.isInstance(lastMessage)) {
    return { messages: [] };
  }

  const result: ToolMessage[] = [];
  for (const toolCall of lastMessage.tool_calls ?? []) {

    const tool = toolsByName[toolCall.name as keyof typeof toolsByName];
    if (!tool) {
      throw new Error(`Tool ${toolCall.name} not found`);
    }
    
    const observation = await tool.invoke(toolCall);
    result.push(observation);
  }

  return { messages: result };
};