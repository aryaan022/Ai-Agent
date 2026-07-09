import { START, END, StateGraph } from "@langchain/langgraph";
import { llmCall } from "../nodes/llmNode";
import { toolNode } from "../nodes/toolNode";
import { guardNode } from "../nodes/guardNode";
import { shouldContinue, checkGuard } from "../edges/shouldContinue";
import { MessagesState } from "../state/agent.states";


 export const agent = new StateGraph(MessagesState)
  .addNode("llmCall", llmCall)
  .addNode("toolNode", toolNode)
  .addNode("guardNode", guardNode)
  .addEdge(START, "guardNode")
  .addConditionalEdges("guardNode", checkGuard, ["llmCall", END])
  .addConditionalEdges("llmCall", shouldContinue, ["toolNode", END])
  .addEdge("toolNode", "llmCall")
  .compile();

// Invoke