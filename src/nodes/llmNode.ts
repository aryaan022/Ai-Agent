import { SystemMessage } from "@langchain/core/messages"; //system prompt
import { GraphNode } from "@langchain/langgraph";

import { MessagesState } from "../state/agent.states";
import { llmWithTools } from "../models/llm";


export const llmCall: GraphNode<typeof MessagesState> = async (state) => {
  const response = await llmWithTools.invoke([
    new SystemMessage(
      "You are a helpful assistant tasked with performing arithmetic on a set of inputs. Use the provided tools to calculate the answers and present the final results clearly to the user. Do not explain the tools themselves or share any internal code details."
    ),
    ...state.messages,
  ]);
  return {
    messages: [response],
    llmCalls: 1,
  };
};