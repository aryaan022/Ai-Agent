import { agent } from "./src/graph/agentGraph";
import { HumanMessage } from "@langchain/core/messages";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({
  input,
  output,
});
async function main() {

  while (true) {

    const userInput = await rl.question("You: ");

    if (userInput.toLowerCase() === "exit") {
      console.log("Bye 👋");
      break;
    }


    const result = await agent.invoke({
      messages: [
        new HumanMessage(userInput)
      ],
    });


    const lastMessage =
      result.messages[result.messages.length - 1];


    console.log(
      `AI: ${lastMessage.content}`
    );
  }


  rl.close();
}


main().catch(console.error);