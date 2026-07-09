import {
  StateGraph,
  StateSchema,
  MessagesValue,
  ReducedValue,
  GraphNode,
  ConditionalEdgeRouter,
  START,
  END,
} from "@langchain/langgraph";
import { z } from "zod/v4";
 


///basicaly for tracking how many times our agent run nd it stores the messages in the state also for e.g if model runs >10 times then we can stop the model from running further so in that case tracking the model how many time run itss  is stroes in llm calls

export const MessagesState = new StateSchema({
  messages: MessagesValue,
  llmCalls: new ReducedValue(
    z.number().default(0),
    { reducer: (x, y) => x + y }
  ),
});