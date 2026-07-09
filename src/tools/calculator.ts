import { tool } from "@langchain/core/tools";
import * as z from "zod";

const calculatorSchema = z.object({
  a: z.number().describe("First number"),
  b: z.number().describe("Second number"),
});

// Define tools
const add = tool(({ a, b }) => a + b, {
  name: "add",
  description: "Add two numbers",
  schema: calculatorSchema,
});


const multiply = tool(({ a, b }) => a * b, {
  name: "multiply",
  description: "Multiply two numbers",
  schema: calculatorSchema,
});

const divide = tool(({ a, b }) => a / b, {
  name: "divide",
  description: "Divide two numbers",
  schema: calculatorSchema,
});


//tools registration
export const toolsByName = {
  [add.name]: add,
  [multiply.name]: multiply,
  [divide.name]: divide,
};


export const tools = Object.values(toolsByName);