import { START, END, StateGraph } from "@langchain/langgraph";
import { llmCall } from "../nodes/llmNode";
import { toolNode } from "../nodes/toolNode";
import { shouldContinue } from "../edges/shouldContinue";
import { MessagesState } from "../state/agent.states";


 export const agent = new StateGraph(MessagesState)
  .addNode("llmCall", llmCall)
  .addNode("toolNode", toolNode)
  .addEdge(START, "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, ["toolNode", END])
  .addEdge("toolNode", "llmCall")
  .compile();

// Invoke