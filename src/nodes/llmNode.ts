import { SystemMessage } from "@langchain/core/messages"; //system prompt
import { GraphNode } from "@langchain/langgraph";

import { MessagesState } from "../state/agent.states";
import { llmWithTools } from "../models/llm";


export const llmCall: GraphNode<typeof MessagesState> = async (state) => {
  const response = await llmWithTools.invoke([
    new SystemMessage(
      "You are a helpful assistant tasked with performing arithmetic on a set of inputs."
    ),
    ...state.messages,
  ]);
  return {
    messages: [response],
    llmCalls: 1,
  };
};