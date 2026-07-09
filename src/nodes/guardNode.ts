import { GraphNode } from "@langchain/langgraph";
import { MessagesState } from "../state/agent.states";



export const guardNode: GraphNode<typeof MessagesState> = async (state)=>{

  const lastMessage = state.messages.at(-1);

  if (!lastMessage) {
    return {};
  }

  const content = lastMessage.content;
  const text = typeof content === "string" ? content.toLowerCase() : "";

 if(
   text.includes("tool") ||
   text.includes("function") ||
   text.includes("internal")
 ){
    return {
      messages:[
        {
          role:"assistant",
          content:
          "I cannot share internal implementation details."
        }
      ]
    };
 }

 return {};
}